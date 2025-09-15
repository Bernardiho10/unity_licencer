import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Web3 Theme Configuration
export const web3Theme = {
  colors: {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },
    secondary: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7',
      600: '#9333ea',
      700: '#7c3aed',
      800: '#6b21a8',
      900: '#581c87',
    },
    accent: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    dark: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    }
  },
  gradients: {
    primary: 'bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800',
    secondary: 'bg-gradient-to-r from-purple-600 via-pink-600 to-purple-800',
    accent: 'bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600',
    dark: 'bg-gradient-to-r from-slate-900 via-gray-900 to-slate-800',
    neon: 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600',
  },
  glows: {
    primary: 'shadow-[0_0_20px_rgba(59,130,246,0.5)]',
    secondary: 'shadow-[0_0_20px_rgba(147,51,234,0.5)]',
    accent: 'shadow-[0_0_20px_rgba(34,197,94,0.5)]',
    neon: 'shadow-[0_0_30px_rgba(6,182,212,0.6)]',
  }
}

// Animation presets
export const animations = {
  fadeIn: 'animate-in fade-in duration-500',
  slideUp: 'animate-in slide-in-from-bottom-4 duration-500',
  slideDown: 'animate-in slide-in-from-top-4 duration-500',
  scaleIn: 'animate-in zoom-in-95 duration-300',
  glow: 'animate-pulse',
}
