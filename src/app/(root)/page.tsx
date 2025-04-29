
import { MainPageTemplate } from '@/templates'
import { Metadata } from 'next'
import 'react-loading-skeleton/dist/skeleton.css'

export const metadata: Metadata = {
  title: "Главная"
};

export default async function MainPage() {
  return (
    <main>
      <MainPageTemplate/>
    </main>
  );
}
