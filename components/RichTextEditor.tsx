"use client";
import { useEffect, useRef, useState } from 'react';

type CoolTextareaProps = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
  placeholder?: string;
  characterLimit?: number;
};

export const CoolTextarea = ({
  value,
  onChange,
  label,
  className,
  placeholder = 'Start typing...',
  characterLimit
}: CoolTextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  // Auto-resize textarea to fit content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <div className={`group space-y-2 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      
      <div className={`relative rounded-lg border transition-all duration-200 
        ${isFocused ? 'border-ring ring-2 ring-accent/30' : 'border-input hover:border-accent/50'}`}>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          maxLength={characterLimit}
          className="w-full resize-none rounded-lg bg-background px-4 py-3 text-foreground 
                   placeholder:text-muted-foreground focus:outline-none"
          style={{ minHeight: '100px' }}
        />

        {characterLimit && (
          <div className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm px-2 text-sm text-muted-foreground rounded">
            {value.length}/{characterLimit}
          </div>
        )}
      </div>

      {/* Optional floating effects */}
      {isFocused && (
        <div className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-accent/10 to-primary/10 blur-xl" />
      )}
    </div>
  );
};