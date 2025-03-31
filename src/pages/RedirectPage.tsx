import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const RedirectPage = () => {
  const { shortCode } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAndRedirect = async () => {
      try {
        // Get URLs from localStorage
        const storedUrlsString = localStorage.getItem('shortenedUrls');
        const storedUrls = storedUrlsString ? JSON.parse(storedUrlsString) : [];
        
        // Find matching URL
        const urlData = storedUrls.find((item: any) => 
          item.shortCode === shortCode
        );
        
        if (urlData) {
          // Redirect to original URL
          window.location.href = urlData.originalUrl;
        } else {
          throw new Error('URL not found');
        }
      } catch (error) {
        console.error('Error during redirect:', error);
        setError('The requested short link was not found.');
        // Redirect to home after 3 seconds
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 3000);
      }
    };

    if (shortCode) {
      loadAndRedirect();
    }
  }, [shortCode, navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <p className="text-muted-foreground">Redirecting to home page...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
      <p className="text-lg">Redirecting you to your destination...</p>
    </div>
  );
};

export default RedirectPage;
