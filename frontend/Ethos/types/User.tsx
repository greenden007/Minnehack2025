// types/User.tsx

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    dateOfBirth: string; // ISO 8601 format
    address: string;
    bio: string;
    volunteeringStats: {
      totalHours: number;
      completedOpportunities: number;
      upcomingOpportunities: number;
    };
}
  
  export interface AuthResponse {
    user: User;
    token: string;
  }
  
  export interface PasswordChangeRequest {
    oldPassword: string;
    newPassword: string;
  }
  