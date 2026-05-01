import { createAuthClient } from "better-auth/react";

// Detect if we are in a browser and what the URL is
const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return window.location.origin; // This will return 'https://dragon-newspaper-nu.vercel.app' on Vercel
  }
  return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
};

export const authClient = createAuthClient({
  baseURL: getBaseUrl(),
});
