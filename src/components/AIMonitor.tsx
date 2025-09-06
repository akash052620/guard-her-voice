import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Activity, AlertCircle } from 'lucide-react';

interface AIMonitorProps {
  isMonitoring: boolean;
  safetyStatus: 'safe' | 'alert' | 'emergency';
}

export const AIMonitor = ({ isMonitoring, safetyStatus }: AIMonitorProps) => {
  const [threats, setThreats] = useState<Array<{ type: string; confidence: number; time: string }>>([]);
  const [audioLevel, setAudioLevel] = useState(0);

  useEffect(() => {
    if (isMonitoring) {
      // Simulate AI monitoring with mock threats
      const mockThreats = [
        { type: 'Raised voices detected', confidence: 0.7, time: 'now' },
        { type: 'Rapid movement pattern', confidence: 0.5, time: '30s ago' },
        { type: 'Unusual audio pattern', confidence: 0.8, time: '1m ago' }
      ];
      
      const interval = setInterval(() => {
        if (Math.random() > 0.7) { // 30% chance of new threat
          const randomThreat = mockThreats[Math.floor(Math.random() * mockThreats.length)];
          setThreats(prev => [
            { ...randomThreat, confidence: Math.random() * 0.5 + 0.5 },
            ...prev.slice(0, 2)
          ]);
        }
        
        // Simulate audio level monitoring
        setAudioLevel(Math.random() * 100);
      }, 2000);

      return () => clearInterval(interval);
    } else {
      setThreats([]);
      setAudioLevel(0);
    }
  }, [isMonitoring]);

  const getConfidenceColor = (confidence: number) => {
    if (confidence > 0.8) return 'text-emergency';
    if (confidence > 0.6) return 'text-status-alert';
    return 'text-status-listening';
  };

  return (
    <Card className="shadow-soft">
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center">
          <Brain className="w-4 h-4 text-primary mr-2" />
          AI Monitor
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-3">
        
        {/* Monitoring Status */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Status:</span>
          <Badge variant={isMonitoring ? "default" : "secondary"} className="text-xs">
            {isMonitoring ? 'Active' : 'Idle'}
          </Badge>
        </div>

        {/* Audio Level Visualization */}
        {isMonitoring && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Audio Level:</span>
              <span className="text-xs font-mono">{Math.round(audioLevel)}%</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${
                  audioLevel > 70 ? 'bg-emergency' : 
                  audioLevel > 40 ? 'bg-status-alert' : 
                  'bg-status-listening'
                }`}
                style={{ width: `${audioLevel}%` }}
              />
            </div>
          </div>
        )}

        {/* Threat Detection */}
        {isMonitoring && (
          <div className="space-y-2">
            {threats.length > 0 ? (
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Recent Detections:</span>
                {threats.slice(0, 2).map((threat, index) => (
                  <div key={index} className="flex items-start space-x-2 p-2 bg-secondary/50 rounded text-xs">
                    <AlertCircle className="w-3 h-3 text-status-alert mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="truncate">{threat.type}</div>
                      <div className={`${getConfidenceColor(threat.confidence)}`}>
                        {Math.round(threat.confidence * 100)}% confidence
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-2">
                <Activity className="w-6 h-6 text-status-listening mx-auto mb-1 animate-pulse" />
                <p className="text-xs text-muted-foreground">Scanning environment...</p>
              </div>
            )}
          </div>
        )}

        {!isMonitoring && (
          <div className="text-center py-4 text-xs text-muted-foreground">
            AI monitoring inactive
          </div>
        )}
        
      </CardContent>
    </Card>
  );
};