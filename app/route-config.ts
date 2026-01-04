// Route segment configuration for the dashboard
// This enables caching and reduces server-side fetch times

// Revalidate this page every 60 seconds
export const revalidate = 60;

// Enable dynamic rendering only when needed
export const dynamic = 'auto';

// This allows the page to be statically generated and revalidated
export const fetchCache = 'default-cache';
