import { Breadcrumbs } from '@/features'
import { getDeliveryPrices } from '@/shared/api/admin/delivery-prices'
import { getBonus } from '@/shared/api/bonus'
import { getProductsFromCart } from '@/shared/api/cart'
import { getProfileData, isProtected } from '@/shared/api/user'
import { ICartGetProducts } from '@/shared/types/cart'
import { UserProfileDTO } from '@/shared/types/user'
import { HeadingWithCount, Section } from '@/shared/ui'
import OrderPageTemplate from '@/templates/OrderPageTemplate'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: "Оформление заказа"
};

export default async function OrderPage() {
	await isProtected()
	const cartData: ICartGetProducts = await getProductsFromCart()
	const profileData: UserProfileDTO = await getProfileData();
	const deliveryPricesData = await getDeliveryPrices()
	const bonusData = await getBonus()
  return (
		<main>
			<Section>
			<Breadcrumbs/>
			<HeadingWithCount
							doCount={false}
							title='Оформление заказа'
						/>
			<OrderPageTemplate cartData={cartData.success} profileData={profileData} bonusData={bonusData.success} deliveryPricesData={deliveryPricesData.success?.[0]}/>
			</Section>
		</main>
	)
}