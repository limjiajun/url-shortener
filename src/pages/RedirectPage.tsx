
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const RedirectPage = () => {
  const { shortCode } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real application, this would make an API call to fetch the original URL
    // For now, we'll check the localStorage to find matching URLs
    const loadAndRedirect = async () => {
      try {
        // Simulate API call with a small delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Retrieve stored URLs from localStorage
        const storedUrlsString = localStorage.getItem('shortenedUrls');
        const storedUrls = storedUrlsString ? JSON.parse(storedUrlsString) : [];
        
        // For testing purposes, log what we found
        console.log('Searching for shortCode:', shortCode);
        console.log('Available URLs:', storedUrls);
        
        // Find the URL with matching shortCode
        // We need to extract just the shortCode part from the full URL
        const urlData = storedUrls.find((item: any) => {
          const itemShortCode = item.shortUrl.split('/').pop();
          return itemShortCode === shortCode;
        });
        
        if (urlData) {
          console.log('Found matching URL:', urlData);
          // Redirect to the original URL
          window.location.href = urlData.originalUrl;
        } else {
          console.error('No matching URL found for shortCode:', shortCode);
          setError('The requested short link was not found.');
          // Don't navigate away immediately, show the error first
          setTimeout(() => {
            navigate('/', { replace: true });
          }, 3000);
        }
      } catch (error) {
        console.error('Error during redirect:', error);
        setError('An error occurred while processing your request.');
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
