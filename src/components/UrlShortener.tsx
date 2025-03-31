
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Check, ClipboardCopy, Link as LinkIcon, RefreshCw, QrCode, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import QRCode from 'react-qr-code';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface ShortenedUrl {
  originalUrl: string;
  shortUrl: string;
  createdAt: Date;
}

const UrlShortener = () => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recentUrls, setRecentUrls] = useState<ShortenedUrl[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  
  // The domain for generating short URLs
  const shortUrlDomain = 'https://url-shortener-phi-sepia.vercel.app';
  
  // Load stored URLs from localStorage on component mount
  useEffect(() => {
    const storedUrls = localStorage.getItem('shortenedUrls');
    if (storedUrls) {
      try {
        const parsedUrls = JSON.parse(storedUrls);
        setRecentUrls(parsedUrls);
      } catch (error) {
        console.error('Error parsing stored URLs:', error);
      }
    }
  }, []);

  // Save URLs to localStorage whenever recentUrls changes
  useEffect(() => {
    if (recentUrls.length > 0) {
      localStorage.setItem('shortenedUrls', JSON.stringify(recentUrls));
    }
  }, [recentUrls]);
  
  const generateRandomString = (length: number = 6) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };
  
  const shortenUrl = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      toast.error('Please enter a valid URL');
      return;
    }
    
    // Validate URL format
    try {
      new URL(url);
    } catch {
      toast.error('Please enter a valid URL with http:// or https://');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const shortCode = generateRandomString();
      const shortUrl = `${shortUrlDomain}/${shortCode}`;
      
      const newShortenedUrl = {
        originalUrl: url,
        shortUrl,
        createdAt: new Date(),
      };
      
      setRecentUrls(prev => [newShortenedUrl, ...prev.slice(0, 4)]);
      setUrl('');
      setIsLoading(false);
      toast.success('URL shortened successfully');
    }, 800);
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    toast('Copied to clipboard');
    
    setTimeout(() => {
      setCopied(null);
    }, 2000);
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="mb-8 animate-slide-down">
        <h2 className="text-sm uppercase tracking-wider text-primary font-semibold mb-2">URL Shortening Tool</h2>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Transform long links into <span className="text-primary">short URLs</span></h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Simplify your links for easier sharing. Enter a long URL below to create a compact, shareable link in seconds.
        </p>
      </div>
      
      <form onSubmit={shortenUrl} className="w-full relative mb-8 animate-slide-up">
        <Card className="p-1 shadow-md flex overflow-hidden">
          <div className="flex-1 flex items-center pl-3 text-muted-foreground">
            <LinkIcon className="h-4 w-4 mr-2 flex-shrink-0" />
            <Input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter your long URL here..."
              className="flex-1 border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 h-12"
            />
          </div>
          <Button 
            type="submit" 
            className="h-12 px-6 text-base rounded-md transition-all duration-200 shadow-sm"
            disabled={isLoading}
          >
            {isLoading ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              'Shorten URL'
            )}
          </Button>
        </Card>
      </form>
      
      {recentUrls.length > 0 && (
        <div className="space-y-4 animate-fade-in">
          <h3 className="text-lg font-medium">Your shortened URLs</h3>
          <div className="space-y-3">
            {recentUrls.map((item, index) => (
              <Card key={index} className="glass-panel p-4 transition-all duration-200 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex flex-col sm:flex-row justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col">
                      <a 
                        href={item.shortUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-sm font-medium text-primary flex items-center hover:underline"
                      >
                        {item.shortUrl}
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                      <p className="text-xs text-muted-foreground mt-1 hidden">Created: {new Date(item.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 rounded-full"
                      onClick={() => copyToClipboard(item.shortUrl)}
                      title="Copy to clipboard"
                    >
                      {copied === item.shortUrl ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <ClipboardCopy className="h-4 w-4" />
                      )}
                    </Button>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 rounded-full"
                          title="Show QR Code"
                        >
                          <QrCode className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>QR Code for Shortened URL</DialogTitle>
                          <DialogDescription>
                            Scan this QR code to access: {item.shortUrl}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex items-center justify-center p-6">
                          <div className="p-4 bg-white rounded-lg">
                            <QRCode 
                              value={item.shortUrl} 
                              size={200}
                            />
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UrlShortener;
