import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, MessageCircle, Users, UserPlus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const EmergencyContacts = () => {
  const [contacts] = useState([
    { name: 'Sarah Miller', relation: 'Sister', phone: '+1 (555) 123-4567', priority: 1 },
    { name: 'Police Dept', relation: 'Emergency', phone: '911', priority: 1 },
    { name: 'John Davis', relation: 'Friend', phone: '+1 (555) 987-6543', priority: 2 },
  ]);

  const callContact = (phone: string, name: string) => {
    // In a real app, this would initiate a phone call
    window.open(`tel:${phone}`, '_self');
  };

  const textContact = (phone: string, name: string) => {
    const message = `Emergency! I need help. This is an automated message from my Safety Guardian app. Please check on me. My current location will be shared separately.`;
    window.open(`sms:${phone}?body=${encodeURIComponent(message)}`, '_self');
  };

  const getPriorityBadge = (priority: number) => {
    return priority === 1 ? (
      <Badge variant="destructive" className="text-xs">High Priority</Badge>
    ) : (
      <Badge variant="secondary" className="text-xs">Normal</Badge>
    );
  };

  return (
    <Card className="shadow-soft">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center justify-between">
          <div className="flex items-center">
            <Users className="w-5 h-5 text-primary mr-2" />
            Emergency Contacts
          </div>
          <Button size="sm" variant="outline" className="text-xs">
            <UserPlus className="w-3 h-3 mr-1" />
            Add
          </Button>
        </CardTitle>
        <CardDescription>
          Quick access to your trusted contacts
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-3">
        
        {contacts.map((contact, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
            
            {/* Contact Info */}
            <div className="flex-1 min-w-0 mr-3">
              <div className="flex items-center space-x-2">
                <h4 className="font-medium text-sm truncate">{contact.name}</h4>
                {getPriorityBadge(contact.priority)}
              </div>
              <p className="text-xs text-muted-foreground truncate">{contact.relation}</p>
              <p className="text-xs font-mono text-muted-foreground">{contact.phone}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="default"
                className="p-2 bg-gradient-emergency hover:scale-105 transition-transform"
                onClick={() => callContact(contact.phone, contact.name)}
              >
                <Phone className="w-4 h-4" />
              </Button>
              
              <Button
                size="sm"
                variant="outline"
                className="p-2 hover:scale-105 transition-transform"
                onClick={() => textContact(contact.phone, contact.name)}
              >
                <MessageCircle className="w-4 h-4" />
              </Button>
            </div>
            
          </div>
        ))}

        {/* Quick Call All Button */}
        <Button 
          variant="outline" 
          className="w-full mt-4 border-emergency text-emergency hover:bg-emergency hover:text-white"
          onClick={() => {
            contacts.forEach(contact => {
              setTimeout(() => textContact(contact.phone, contact.name), 500);
            });
          }}
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Alert All Contacts
        </Button>
        
      </CardContent>
    </Card>
  );
};