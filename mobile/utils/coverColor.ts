import { colors } from '@/constants/Colors';

// Pulled from the theme palette so fallback covers always match the app's look.
const coverPalette = [
  colors.forest,
  colors.sage,
  colors.lavender,
  colors.brown,
  colors.dark,
];

// Deterministic "random" color based on the book's id, so the same book
// always gets the same fallback color instead of changing on every render.
export function getCoverColor(id: string): string {
  let hash = 0;

  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % coverPalette.length;
  return coverPalette[index];
}