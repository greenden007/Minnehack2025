// File: types/opportunity.ts

  
  export type OpportunityStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  
  export interface Opportunity {
    id: string;
    posterId: string;
    title: string;
    description: string;
    location: string;
    startDate: string; // ISO 8601 format
    startTime: string; // ISO 8601 format
    duration: string;
    category: string;
    status: OpportunityStatus;
    minimumAge: number;
    requiredSkills: string;
  }

  export interface OpportunityList {
    opportunityList: Opportunity[];
  }
  