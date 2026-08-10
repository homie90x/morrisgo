// lib/auth-client.ts
// This file handles authentication on the client side

// Types for user data
export interface User {
  id: string;
  email: string;
  name: string;
  role: "RIDER" | "DRIVER" | "ADMIN";
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

// Store the auth token and user data
export function setAuthData(token: string, user: User) {
  // Store token in localStorage for API calls
  localStorage.setItem("token", token);
  // Store user data for quick access
  localStorage.setItem("user", JSON.stringify(user));
  
  // Also store in cookie for middleware (optional but recommended)
  document.cookie = `token=${token}; path=/; max-age=604800; SameSite=Lax`;
}

// Remove auth data on logout
export function removeAuthData() {  
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  document.cookie = "token=; path=/; max-age=0";
}

// Get the auth token
export function getAuthToken(): string | null {
  return localStorage.getItem("token");
}

// Get the current user
export function getCurrentUser(): User | null {
  const userStr = localStorage.getItem("user");
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return !!getAuthToken();
}

// Make authenticated API calls
export async function authFetch(url: string, options: RequestInit = {}) {
  const token = getAuthToken();
  if (!token) {
    throw new Error("Not authenticated");
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response;
}

// Logout function
export function logout() {
  removeAuthData();
  // Redirect to login page
  window.location.href = "/login";
}