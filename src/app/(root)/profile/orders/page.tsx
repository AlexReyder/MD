import OrderCartItem from '@/entities/Order/OrderCartItem'
import { getOrderHistory } from '@/shared/api/order'
import { Section } from '@/shared/ui'
import { notFound } from 'next/navigation'
import s from '../styles.module.scss'
export default async function ProfileOrderHistoryPage() {
	const {success, error} = await getOrderHistory()
	if(error && error !== 'EMPTY_ORDERS'){
		notFound()
	}
	return (
		<Section className={s.Wrapper}>
			{
				error && error  === 'EMPTY_ORDERS' ? (<h3>У вас пока нет заказов.</h3>) : null
			}
			 {success && success.map((item, i: number) => {
				const productJson = item.products as string
				const product = JSON.parse(productJson)
				return (
					<div key={i} className={s.OrderDiv}>
					{	product.map((j, z) => {
					return(
						<OrderCartItem
						key={j.productId + j.color + j.size}
						item={j}
						position={z + 1}
					/>
					)
				})}
					</div>
			)
			 })
			 
			 }
		</Section>
	)
}