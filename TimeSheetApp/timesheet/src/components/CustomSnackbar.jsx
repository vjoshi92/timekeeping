import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useEffect, useState } from 'react';

export const CustomSnackbar = ({ 
  open, 
  message, 
  severity = "warning",
  duration = 3000, 
  onClose 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (open) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [open, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 min-w-[300px] max-w-[90vw] animate-in fade-in slide-in-from-bottom-4">
      <Alert variant={severity === "warning" ? "destructive" : "default"} className="shadow-lg">
        <AlertTitle className="capitalize">{severity}</AlertTitle>
        <AlertDescription>
          {message}
        </AlertDescription>
        <button 
          onClick={() => {
            setIsVisible(false);
            onClose?.();
          }}
          className="absolute top-2 right-2 opacity-70 ring-offset-background transition-opacity hover:opacity-100"
        >
          <span className="sr-only">Close</span>
          ✕
        </button>
      </Alert>
    </div>
  );
};