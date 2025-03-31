
import React from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { ArrowRight, Link2 } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12 animate-slide-down">
            <h1 className="text-sm uppercase tracking-wider text-primary font-semibold mb-2">About</h1>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Simplify sharing with <span className="text-primary">URL Shortener</span></h2>
            <p className="text-muted-foreground text-lg">
              Our mission is to make link sharing effortless. We help you transform long, complex URLs into short, 
              memorable links that are perfect for social media, messaging, and anywhere character count matters.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="glass-panel p-6 rounded-xl animate-slide-up" style={{ animationDelay: '100ms' }}>
              <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
                <Link2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Simple URL Shortening</h3>
              <p className="text-muted-foreground">
                Transform any long URL into a short, easy-to-share link with just a click. 
                No registration required.
              </p>
            </div>
            
            <div className="glass-panel p-6 rounded-xl animate-slide-up" style={{ animationDelay: '200ms' }}>
              <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
                <Link2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Copy with Ease</h3>
              <p className="text-muted-foreground">
                One-click copy functionality makes it simple to grab your shortened 
                URL and share it anywhere.
              </p>
            </div>
            
            <div className="glass-panel p-6 rounded-xl animate-slide-up" style={{ animationDelay: '300ms' }}>
              <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
                <Link2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">History Tracking</h3>
              <p className="text-muted-foreground">
                We keep track of your recently shortened URLs so you 
                can easily find and reuse them.
              </p>
            </div>
            
            <div className="glass-panel p-6 rounded-xl animate-slide-up" style={{ animationDelay: '400ms' }}>
              <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
                <Link2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Minimalist Design</h3>
              <p className="text-muted-foreground">
                Clean, intuitive interface with no distractions. Focus on what matters—creating 
                and sharing links.
              </p>
            </div>
          </div>
          
          <div className="flex justify-center animate-fade-in" style={{ animationDelay: '500ms' }}>
            <Link 
              to="/" 
              className="flex items-center gap-2 text-primary hover:underline font-medium text-lg"
            >
              Try it now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
      
      <footer className="py-6 border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} URL Shortener. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
