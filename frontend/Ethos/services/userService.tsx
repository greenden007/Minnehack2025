// services/userServices.tsx

// import axios from 'axios';
import { User, AuthResponse, UserList } from '../types/User';
import { Opportunity, OpportunityList } from '../types/Opportunity';

// const api = axios.create({
//   baseURL: "https://bc62-2607-ea00-107-3407-8839-b7fb-e949-d27c.ngrok-free.app"
// });


/**
 * Fetches the user profile for a given user ID.
 * @param userId The ID of the user to fetch.
 * @returns A Promise that resolves to the User object.
 */
export const fetchUserProfile = async (token: string): Promise<User> => {
  // Implementation here
  // mock
  try {
    const response = await fetch("https://bc62-2607-ea00-107-3407-8839-b7fb-e949-d27c.ngrok-free.app/api/stats/stats", {
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
};

/**
 * Updates the user profile with the provided data.
 * @param userId The ID of the user to update.
 * @param data The partial User object containing the fields to update.
 * @returns A Promise that resolves to the updated User object.
 */
export const updateUserAge = async (userId: string, age: number) => {
  try {
    const response = await fetch("https://bc62-2607-ea00-107-3407-8839-b7fb-e949-d27c.ngrok-free.app/api/stats/update-age", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: userId,
        ageH: age,
      }),
    })

    if (response.status === 200) {
      console.log('Age updated successfully');
    } else {
      throw new Error(`Failed to update age. Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error updating user age:', error);
    throw error;
  }
};

/**
 * Changes the user's password.
 * @param userId The ID of the user changing their password.
 * @param oldPassword The user's current password.
 * @param newPassword The new password to set.
 * @returns A Promise that resolves when the password is successfully changed.
 */
export const changeUserPassword = async (userId: string, newPassword: string): Promise<void> => {
  // Implementation here
  try {
    const response = await fetch("https://bc62-2607-ea00-107-3407-8839-b7fb-e949-d27c.ngrok-free.app/api/stats/update-password", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: userId,
        newPasswordH: newPassword,
      }),
    })

    if (response.status === 200) {
      console.log('Password updated successfully');
    } else {
      throw new Error(`Failed to update password. Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error updating user password:', error);
    throw error;
  }
};

export const changeUserEmail = async (userId: string, email: string): Promise<void> => {
  // Implementation here
  try {
    const response = await fetch("https://bc62-2607-ea00-107-3407-8839-b7fb-e949-d27c.ngrok-free.app/api/stats/update-email", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: userId,
        emailH: email,
      }),
    })

    if (response.status === 200) {
      console.log('Email updated successfully');
    } else {
      throw new Error(`Failed to update email. Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error updating user email:', error);
    throw error;
  }
};

export const changeUserLocation = async (userId: string, location: string): Promise<void> => {
  // Implementation here
  try {
    const response = await fetch("https://bc62-2607-ea00-107-3407-8839-b7fb-e949-d27c.ngrok-free.app/api/stats/update-location", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: userId,
        locationH: location,
      }),
    })

    if (response.status === 200) {
      console.log('Location updated successfully');
    } else {
      throw new Error(`Failed to update location. Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error updating user location:', error);
    throw error;
  }
};


/**
 * Registers a new user.
 * @param userData The data for the new user.
 * @returns A Promise that resolves to the newly created User object.
 */
export const registerUser = async (fName: string, lName: string, email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await fetch("https://bc62-2607-ea00-107-3407-8839-b7fb-e949-d27c.ngrok-free.app/api/auth/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: fName,
        lastName: lName,
        email: email,
        password: password,
        location: '310 15th Ave SE, Minneapolis, MN, USA, 55414', // This field is required by the server but not in the function parameters
      }),
    })

    console.log(response);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Registration failed');
  }
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
  try {
    const response = await fetch("https://bc62-2607-ea00-107-3407-8839-b7fb-e949-d27c.ngrok-free.app/api/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password, // This field is required by the server but not in the function parameters
      }),
    })

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Login failed');
  }


  
};

export const getTopUsers = async (location: string): Promise<UserList> => {
  // Implementation here
  // mock
  try {
    const response = await fetch("https://bc62-2607-ea00-107-3407-8839-b7fb-e949-d27c.ngrok-free.app/api/stats/leaderboard", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        locationH: location,
      }),
    })

    console.log(response);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Getting top players failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Getting top players failed');
  }


  
};
