// services/opportunityService.tsx

import { Opportunity } from "@/types/Opportunity";

export const fetchOpportunities = async (token: string): Promise<OpportunityList> => {
    // Implement API call to fetch opportunities
    try {
        const response = await fetch("https://bc62-2607-ea00-107-3407-8839-b7fb-e949-d27c.ngrok-free.app/api/events/nearby", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        })
    
        if (response.status === 200) {
          console.log('Retrieved user profile successfully');
          const data = await response.json();
          return data;
        } else {
          throw new Error(`Failed to retrive user. Status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error retriving user:', error);
        throw error;
      }
    }
};


export const createOpportunity = async (data: Opportunity, token: string) => {
// Implement API call to create an opportunity
    try {
        const response = await fetch("https://bc62-2607-ea00-107-3407-8839-b7fb-e949-d27c.ngrok-free.app/api/events/", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: JSON.stringify(data),
        })
    
        if (response.status === 200) {
          console.log('Created event profile successfully');
          const data = await response.json();
          return data;
        } else {
          throw new Error(`Failed to create event. Status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error creating event:', error);
        throw error;
      }
};

  