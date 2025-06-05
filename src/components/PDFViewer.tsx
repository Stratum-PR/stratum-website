
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Download, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface PDFViewerProps {
  pdfUrl: string;
  title: string;
}

export const PDFViewer = ({ pdfUrl, title }: PDFViewerProps) => {
  const { t } = useLanguage();
  const [pdfError, setPdfError] = useState(false);

  const handlePdfError = () => {
    setPdfError(true);
  };

  if (pdfError) {
    return (
      <div className="text-center py-12">
        <p className="font-telegraf text-gray-600 mb-4">{t('resources.modal.pdfNotSupported')}</p>
        <Button asChild className="bg-primary hover:bg-primary/90 text-white font-telegraf">
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
            <Download className="mr-2 h-4 w-4" />
            {t('resources.modal.downloadPdf')}
          </a>
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="relative w-full h-[500px] border rounded-lg overflow-hidden">
        <iframe
          src={`${pdfUrl}#view=FitH`}
          title={title}
          className="w-full h-full"
          onError={handlePdfError}
        />
      </div>
    </div>
  );
};
