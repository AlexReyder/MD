
import { getProductsByIsBestseller, getProductsByIsNew } from '@/shared/api/catalog'
import { MainPageTemplate } from '@/templates'
import { Metadata } from 'next'
import { Suspense } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const metadata: Metadata = {
  title: "Главная"
};

export default async function MainPage() {
  const bestsellers = await getProductsByIsBestseller()
  const newProducts = await getProductsByIsNew()

  return (
    <main>
        <Suspense fallback={<Skeleton count={7}/>}>
      <MainPageTemplate bestsellers = {bestsellers.success} news={newProducts.success}/>
      </Suspense>
    </main>
  );
}
