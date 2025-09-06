import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Phone } from 'lucide-react';

interface EmergencyButtonProps {
  onEmergency: () => void;
  isActive: boolean;
}

export const EmergencyButton = ({ onEmergency, isActive }: EmergencyButtonProps) => {
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [holdProgress, setHoldProgress] = useState(0);

  const handleMouseDown = () => {
    const timer = setTimeout(() => {
      onEmergency();
      setHoldProgress(100);
    }, 2000);
    
    setPressTimer(timer);
    
    // Animate progress
    const progressTimer = setInterval(() => {
      setHoldProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const handleMouseUp = () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
    setHoldProgress(0);
  };

  return (
    <div className="relative">
      <Button
        variant="destructive"
        size="lg"
        className={`
          w-full h-32 text-xl font-bold rounded-2xl
          bg-gradient-emergency shadow-emergency
          hover:scale-105 active:scale-95
          transition-all duration-300 ease-bounce
          ${isActive ? 'animate-pulse' : ''}
        `}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
      >
        <div className="flex flex-col items-center space-y-2">
          <AlertTriangle className="w-8 h-8" />
          <span>EMERGENCY</span>
          <span className="text-sm font-normal opacity-80">
            Hold for 2 seconds
          </span>
        </div>
        
        {/* Progress indicator */}
        {holdProgress > 0 && (
          <div className="absolute bottom-2 left-4 right-4 h-1 bg-white/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-100"
              style={{ width: `${holdProgress}%` }}
            />
          </div>
        )}
      </Button>

      {isActive && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-emergency rounded-full animate-ping">
          <div className="w-6 h-6 bg-emergency rounded-full animate-pulse"></div>
        </div>
      )}
    </div>
  );
};