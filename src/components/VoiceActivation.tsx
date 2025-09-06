import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2 } from 'lucide-react';

interface VoiceActivationProps {
  isListening: boolean;
  onActivation: (listening: boolean) => void;
}

export const VoiceActivation = ({ isListening, onActivation }: VoiceActivationProps) => {
  const [isSupported, setIsSupported] = useState(false);
  const [mockTriggered, setMockTriggered] = useState(false);

  useEffect(() => {
    // Check for speech recognition support
    setIsSupported('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
  }, []);

  const toggleListening = () => {
    onActivation(!isListening);
  };

  const simulateVoiceTrigger = () => {
    setMockTriggered(true);
    onActivation(true);
    
    setTimeout(() => {
      setMockTriggered(false);
    }, 3000);
  };

  return (
    <Card className="shadow-soft">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <Volume2 className="w-5 h-5 text-primary mr-2" />
          Voice Activation
        </CardTitle>
        <CardDescription>
          Say "Help Me" to activate emergency mode
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        
        {/* Voice Status */}
        <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
          <div className="flex items-center space-x-2">
            {isListening ? (
              <Mic className="w-5 h-5 text-status-listening animate-pulse" />
            ) : (
              <MicOff className="w-5 h-5 text-muted-foreground" />
            )}
            <span className="text-sm font-medium">
              {isListening ? 'Listening for "Help Me"' : 'Voice activation off'}
            </span>
          </div>
          
          {isListening && (
            <div className="flex space-x-1">
              <div className="w-1 h-4 bg-status-listening rounded animate-pulse"></div>
              <div className="w-1 h-6 bg-status-listening rounded animate-pulse delay-75"></div>
              <div className="w-1 h-4 bg-status-listening rounded animate-pulse delay-150"></div>
            </div>
          )}
        </div>

        {/* Control Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant={isListening ? "secondary" : "default"}
            onClick={toggleListening}
            className={`
              transition-all duration-300
              ${isListening ? 'bg-status-listening text-white hover:bg-status-listening/90' : ''}
            `}
          >
            {isListening ? (
              <>
                <MicOff className="w-4 h-4 mr-2" />
                Stop
              </>
            ) : (
              <>
                <Mic className="w-4 h-4 mr-2" />
                Start
              </>
            )}
          </Button>

          <Button
            variant="outline"
            onClick={simulateVoiceTrigger}
            className="border-status-alert text-status-alert hover:bg-status-alert hover:text-white"
          >
            Test "Help Me"
          </Button>
        </div>

        {mockTriggered && (
          <div className="p-3 bg-status-alert/10 border border-status-alert/30 rounded-lg">
            <p className="text-sm text-status-alert font-medium">
              🎤 Voice trigger detected: "Help Me"
            </p>
          </div>
        )}

        {!isSupported && (
          <div className="text-xs text-muted-foreground bg-muted p-2 rounded">
            Voice recognition not supported in this browser. Manual activation available.
          </div>
        )}
        
      </CardContent>
    </Card>
  );
};