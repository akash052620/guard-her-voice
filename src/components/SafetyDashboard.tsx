import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Mic, MapPin, Users, AlertTriangle, Phone, Volume2 } from 'lucide-react';
import { EmergencyButton } from './EmergencyButton';
import { VoiceActivation } from './VoiceActivation';
import { LocationTracker } from './LocationTracker';
import { AIMonitor } from './AIMonitor';
import { EmergencyContacts } from './EmergencyContacts';

const SafetyDashboard = () => {
  const [isListening, setIsListening] = useState(false);
  const [safetyStatus, setSafetyStatus] = useState<'safe' | 'alert' | 'emergency'>('safe');
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      });
    }
  }, []);

  const handleEmergency = () => {
    setSafetyStatus('emergency');
    setIsListening(true);
    // In a real app, this would trigger emergency protocols
  };

  const handleVoiceActivation = (listening: boolean) => {
    setIsListening(listening);
    if (listening) {
      setSafetyStatus('alert');
    }
  };

  const getStatusColor = () => {
    switch (safetyStatus) {
      case 'safe': return 'safety';
      case 'alert': return 'status-alert';
      case 'emergency': return 'emergency';
      default: return 'safety';
    }
  };

  const getStatusText = () => {
    switch (safetyStatus) {
      case 'safe': return 'All Clear';
      case 'alert': return 'Monitoring';
      case 'emergency': return 'Emergency Active';
      default: return 'All Clear';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-calm p-4 pb-20">
      <div className="max-w-md mx-auto space-y-6">
        
        {/* Header with Status */}
        <div className="text-center space-y-4 pt-8">
          <div className="flex items-center justify-center space-x-2">
            <Shield className={`w-8 h-8 text-${getStatusColor()}`} />
            <h1 className="text-2xl font-bold text-foreground">Safety Guardian</h1>
          </div>
          
          <Badge 
            variant="outline" 
            className={`px-4 py-2 text-sm font-medium border-${getStatusColor()} text-${getStatusColor()}`}
          >
            <div className={`w-2 h-2 rounded-full bg-${getStatusColor()} mr-2 animate-pulse`}></div>
            {getStatusText()}
          </Badge>
        </div>

        {/* Emergency Button - Most Prominent */}
        <EmergencyButton onEmergency={handleEmergency} isActive={safetyStatus === 'emergency'} />

        {/* Voice Activation */}
        <VoiceActivation 
          isListening={isListening}
          onActivation={handleVoiceActivation}
        />

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 gap-4">
          
          {/* Location Card */}
          <LocationTracker location={location} />
          
          {/* AI Monitor */}
          <AIMonitor 
            isMonitoring={isListening}
            safetyStatus={safetyStatus}
          />
          
        </div>

        {/* Emergency Contacts */}
        <EmergencyContacts />

        {/* Safety Tips Card */}
        <Card className="shadow-soft">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <AlertTriangle className="w-5 h-5 text-status-alert mr-2" />
              Safety Reminders
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• Keep your phone charged and location services on</p>
              <p>• Share your location with trusted contacts</p>
              <p>• Trust your instincts - activate monitoring if unsure</p>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default SafetyDashboard;