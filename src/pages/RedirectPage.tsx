
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const RedirectPage = () => {
  const { shortCode } = useParams();
  const navigate = useNavigate();

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
        
        // Find the URL with matching shortCode
        const urlData = storedUrls.find((item: any) => 
          item.shortUrl.includes(`/${shortCode}`)
        );
        
        if (urlData) {
          // Redirect to the original URL
          window.location.href = urlData.originalUrl;
        } else {
          // If no matching URL is found, redirect to 404 page
          navigate('/not-found', { replace: true });
        }
      } catch (error) {
        console.error('Error during redirect:', error);
        navigate('/not-found', { replace: true });
      }
    };

    if (shortCode) {
      loadAndRedirect();
    }
  }, [shortCode, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
      <p className="text-lg">Redirecting you to your destination...</p>
    </div>
  );
};

export default RedirectPage;
