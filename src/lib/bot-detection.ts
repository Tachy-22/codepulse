// lib/bot-detection.ts

export function isBot(userAgent: string | null): boolean {
  if (!userAgent) return false;

  // Example: Detect common bot user agents
  const bots = ["bot", "spider", "crawler"];
  return bots.some((bot) => userAgent.toLowerCase().includes(bot));
}
