import { Breadcrumbs } from '@/features'
import { getProductsFromCart } from '@/shared/api/cart'
import { getProfileData } from '@/shared/api/user'
import { ICartGetProducts } from '@/shared/types/cart'
import { UserProfileDTO } from '@/shared/types/user'
import { HeadingWithCount, Section } from '@/shared/ui'
import OrderPageTemplate from '@/templates/OrderPageTemplate'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: "Оформление заказа"
};

export default async function OrderPage() {
	const cartData: ICartGetProducts = await getProductsFromCart()
	const profileData: UserProfileDTO = await getProfileData();
  return (
		<main>
			<Section>
			<Breadcrumbs/>
			<HeadingWithCount
							doCount={false}
							title='Оформление заказа'
						/>
			<OrderPageTemplate cartData={cartData.success} profileData={profileData}/>

			</Section>
		</main>
	)
}