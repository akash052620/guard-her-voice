import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Share2, Eye } from 'lucide-react';

interface LocationTrackerProps {
  location: { lat: number; lng: number } | null;
}

export const LocationTracker = ({ location }: LocationTrackerProps) => {
  const shareLocation = () => {
    if (location && navigator.share) {
      navigator.share({
        title: 'My Current Location',
        text: 'Sharing my location for safety',
        url: `https://maps.google.com/?q=${location.lat},${location.lng}`
      });
    }
  };

  const formatCoordinate = (coord: number) => {
    return coord.toFixed(4);
  };

  return (
    <Card className="shadow-soft">
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center">
          <MapPin className="w-4 h-4 text-primary mr-2" />
          Location
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {location ? (
          <>
            <div className="text-xs text-muted-foreground space-y-1">
              <div>Lat: {formatCoordinate(location.lat)}</div>
              <div>Lng: {formatCoordinate(location.lng)}</div>
            </div>
            
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="outline"
                className="flex-1 text-xs"
                onClick={shareLocation}
              >
                <Share2 className="w-3 h-3 mr-1" />
                Share
              </Button>
              
              <Button
                size="sm"
                variant="outline"
                className="flex-1 text-xs"
                onClick={() => window.open(`https://maps.google.com/?q=${location.lat},${location.lng}`, '_blank')}
              >
                <Eye className="w-3 h-3 mr-1" />
                View
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-xs text-muted-foreground">Getting location...</p>
          </div>
        )}
        
        <div className="flex items-center justify-center">
          <div className="w-2 h-2 bg-safety rounded-full animate-pulse"></div>
          <span className="text-xs text-muted-foreground ml-2">GPS Active</span>
        </div>
      </CardContent>
    </Card>
  );
};