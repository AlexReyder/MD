import HistoryOrderItem from '@/entities/ProfileHistoryOrder/HistoryOrderItem'
import { getOrderHistory } from '@/shared/api/order'
import { isProtected } from '@/shared/api/user'
import { FormHeader, Section } from '@/shared/ui'
import { notFound } from 'next/navigation'
import s from '../styles.module.scss'
export default async function ProfileOrderHistoryPage() {
	await isProtected()
	const {success, error} = await getOrderHistory()
	if(error && error !== 'EMPTY_ORDERS'){
		notFound()
	}
	return (
		<div className={s.Wrapper}>
				<FormHeader title='История заказов' description=''/>
			{
				error && error  === 'EMPTY_ORDERS' ? (<h3>У вас пока нет заказов.</h3>) : null
			}
			<div className={s.OrdersWrapper}>
						 {success && success.map((item, i: number) => {
				const productJson = item.products
				const product = productJson
				return (
					<div key={i} className={s.OrderDiv}>
					{	product.map((j, z) => {
					return(
						<HistoryOrderItem
						key={j.productId + j.color + j.size}
						main = {item}
						item={j}
						position={z + 1}
					/>
					)
				})}
					</div>
			)
			 })
			 }
			</div>

		</div>
	)
}
