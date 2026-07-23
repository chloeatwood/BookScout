import { Slot } from 'expo-router';
import { BookProvider } from '@/context/BookContext';

export default function RootLayout() {
  return (
    <BookProvider>
      <Slot />
    </BookProvider>
  );
}