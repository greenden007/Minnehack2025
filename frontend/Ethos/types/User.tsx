// types/User.tsx

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  age: number; // ISO 8601 format
  address: string;
  totalHours: number;
  completedOpportunities: number;
  plannedOpportunities: number;
}

export interface UserList {
  userList: User[];
}
  
export interface AuthResponse {
  id: string;
  token: string;
}

export interface PasswordChangeRequest {
  oldPassword: string;
  newPassword: string;
}
  