
import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/Header';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-md animate-fade-in">
          <h1 className="text-7xl font-bold text-primary mb-4">404</h1>
          <p className="text-xl text-foreground mb-6">
            Oops! We couldn't find the page you're looking for.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Return to home
          </Link>
        </div>
      </main>
      
      <footer className="py-6 border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} snappy urlify. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default NotFound;
