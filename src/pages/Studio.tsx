import React, { useEffect, useRef, useState } from 'react';

// This component renders Sanity Studio
const Studio: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    setLoading(true);
    setError(null);

    // Dynamically import and render Sanity Studio
    import('sanity').then((sanity) => {
      if (!containerRef.current) return;
      
      // Check if renderStudio exists
      if (!sanity.renderStudio) {
        throw new Error('renderStudio is not available. Please use npm run studio for standalone mode.');
      }
      
      // Clear any existing content
      containerRef.current.innerHTML = '';
      
      // Import the config
      import('../../sanity.config').then((configModule) => {
        if (!containerRef.current) return;
        
        const studioConfig = configModule.default;
        
        console.log('Rendering Sanity Studio...', { config: studioConfig });
        
        // Render the studio
        try {
          const cleanup = sanity.renderStudio(
            containerRef.current,
            studioConfig,
            {
              reactStrictMode: false,
              basePath: '/studio',
            }
          );

          // Store cleanup function
          (containerRef.current as any).__cleanup = cleanup;
          setLoading(false);
          console.log('Sanity Studio rendered successfully');
        } catch (renderError: any) {
          console.error('Error rendering studio:', renderError);
          setError(renderError.message || 'Failed to render Sanity Studio');
          setLoading(false);
        }
      }).catch((err) => {
        console.error('Error loading Sanity config:', err);
        setError(`Failed to load Sanity config: ${err.message}`);
        setLoading(false);
      });
    }).catch((err) => {
      console.error('Error loading Sanity Studio:', err);
      setError(`Failed to load Sanity Studio: ${err.message}`);
      setLoading(false);
    });

    // Cleanup on unmount
    return () => {
      if (containerRef.current && (containerRef.current as any).__cleanup) {
        const cleanup = (containerRef.current as any).__cleanup;
        if (typeof cleanup === 'function') {
          cleanup();
        }
      }
    };
  }, []);

  if (error) {
    return (
      <div
        style={{
          height: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          backgroundColor: '#fff',
        }}
      >
        <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Sanity Studio Error</h1>
        <p style={{ color: '#666', marginBottom: '1rem' }}>{error}</p>
        <p style={{ color: '#999', fontSize: '0.875rem' }}>
          Try running <code style={{ padding: '0.25rem 0.5rem', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>npm run studio</code> in a separate terminal instead.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div
        style={{
          height: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
        }}
      >
        <p>Loading Sanity Studio...</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{
        height: '100vh',
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        backgroundColor: '#fff',
      }}
    />
  );
};

export default Studio;
