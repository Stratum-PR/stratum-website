
import React from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error} resetError={this.resetError} />;
      }

      return <DefaultErrorFallback error={this.state.error} resetError={this.resetError} />;
    }

    return this.props.children;
  }
}

const DefaultErrorFallback: React.FC<{ error?: Error; resetError: () => void }> = ({ error, resetError }) => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-[400px] flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <h2 className="font-telegraf font-bold text-2xl text-primary mb-4">
          {t('common.error')}
        </h2>
        <p className="font-telegraf text-gray-600 mb-6">
          Something went wrong. Please try again or contact support if the problem persists.
        </p>
        {error && (
          <details className="text-left mb-4 p-4 bg-gray-50 rounded border text-sm">
            <summary className="cursor-pointer font-semibold">Error Details</summary>
            <pre className="mt-2 text-xs overflow-auto">{error.message}</pre>
          </details>
        )}
        <Button onClick={resetError} className="font-telegraf">
          Try Again
        </Button>
      </div>
    </div>
  );
};
