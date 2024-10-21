import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(amount: string | number): string {
  // Convert to number if it's a string
  const parsedAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  // Check if the parsedAmount is valid
  if (isNaN(parsedAmount)) {
    throw new Error('Invalid amount: must be a valid number or string.');
  }

  // Format as currency
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(parsedAmount);
}
