
import React from 'react';
import Header from '../components/Header';
import UrlShortener from '../components/UrlShortener';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-28 pb-16 px-4">
        <UrlShortener />
      </main>
      
      <footer className="py-6 border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} URL Shortener. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
