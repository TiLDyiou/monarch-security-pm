/**
 * Brand & Application Color Palette
 */
export const PALETTE = {
  teal: '#00A0B0',   // Primary Cyan / Teal
  sky: '#97B5FF',    // Soft Sky Blue
  ice: '#E8F8FA',    // Light Ice / Mint Aqua Tint
  slate: '#848FB6',  // Muted Steel / Slate Blue
  blue: '#2F6BFF',   // Royal / Electric Blue
  aqua: '#BFEFF3',   // Soft Aqua / Pale Turquoise
  navy: '#11285F',   // Deep Midnight Navy
  white: '#FFFFFF',  // Pure White
  black: '#000000',  // Pure Black
} as const;

export type PaletteColor = keyof typeof PALETTE;

export default PALETTE;

