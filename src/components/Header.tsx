
import React from 'react';
import { Link } from 'react-router-dom';
import { MenuIcon } from 'lucide-react';
import { Button } from './ui/button';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-8 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-primary font-bold text-xl tracking-tight">
            URL
          </span>
          <span className="text-foreground font-light text-xl tracking-tight">
            Shortener
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-foreground/80 hover:text-primary transition-colors duration-200">
            Home
          </Link>
          <Link to="/about" className="text-foreground/80 hover:text-primary transition-colors duration-200">
            About
          </Link>
          <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90 transition-all duration-200 shadow-sm">
            Get Started
          </Button>
        </nav>
        
        <Button variant="ghost" size="icon" className="md:hidden">
          <MenuIcon className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
