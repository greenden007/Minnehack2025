// services/userServices.tsx

import { User, AuthResponse } from '../types/User';

/**
 * Fetches the user profile for a given user ID.
 * @param userId The ID of the user to fetch.
 * @returns A Promise that resolves to the User object.
 */
export const fetchUserProfile = async (userId: string): Promise<User> => {
  // Implementation here
  // mock
  return {
    id: "12345",
    email: "johndoe@example.com",
    firstName: "John",
    lastName: "Doe",
    age: 30,
    address: "123 Main St, Anytown, USA",
    totalHours: 50,
    completedOpportunities: 5,
    plannedOpportunities: 2
  };
};

/**
 * Updates the user profile with the provided data.
 * @param userId The ID of the user to update.
 * @param data The partial User object containing the fields to update.
 * @returns A Promise that resolves to the updated User object.
 */
export const updateUserProfile = async (userId: string, data: Partial<User>): Promise<User> => {
  // Implementation here
};

/**
 * Changes the user's password.
 * @param userId The ID of the user changing their password.
 * @param oldPassword The user's current password.
 * @param newPassword The new password to set.
 * @returns A Promise that resolves when the password is successfully changed.
 */
export const changeUserPassword = async (userId: string, oldPassword: string, newPassword: string): Promise<void> => {
  // Implementation here
};

/**
 * Logs out the current user.
 * @returns A Promise that resolves when the user is successfully logged out.
 */
export const logout = async (): Promise<void> => {
  // Implementation here
};

/**
 * Registers a new user.
 * @param userData The data for the new user.
 * @returns A Promise that resolves to the newly created User object.
 */
export const registerUser = async (fName: string, lName: string, email: string, password: string): Promise<AuthResponse> => {
  // Implementation here
};

/**
 * Authenticates a user and returns a token.
 * @param email The user's email.
 * @param password The user's password.
 * @returns A Promise that resolves to an object containing the authentication token.
 */
export const login = async (email: string, password: string): Promise<AuthResponse> => {
  // Implementation here
  // mock
  return {
    user: {
      id: "12345",
      email: "johndoe@example.com",
      firstName: "John",
      lastName: "Doe",
      age: 30,
      address: "123 Main St, Anytown, USA",
      totalHours: 50,
      completedOpportunities: 5,
      plannedOpportunities: 2
    },
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NSIsImlhdCI6MTYxNjE2MjAxNywiZXhwIjoxNjE2MjQ4NDE3fQ.T7X9VN1xPvV7nQJ7Yl4J8J8J8J8J8J8J8J8J8J8J8J8"
  };
  
};
