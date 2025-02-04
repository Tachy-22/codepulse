// lib/feature-flags.ts
export function isFeatureEnabled(feature: string): boolean {
  // Replace with your actual feature flag logic
  const flags: { [key: string]: boolean } = {
    "new-feature": true, // Example
  };
  return flags[feature] || false;
}
