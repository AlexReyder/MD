"use server"

import { OrderDbUpdate, OrderDbUpdateSchema } from '@/shared/types/validation/order'
import { revalidatePath } from 'next/cache'
import { addBonus } from '../bonus'
import { mailBonusEmail } from '../mail'
import { prisma } from '../prismaInstance'
import { updateUserPurchasesAmount } from '../user'

export async function getAllOrders(){
	try{
		const orders = await prisma.order.findMany({include:{Promocode: true, User: true}})
		return {
			success: orders,
			error: null
		}
	} catch(e){
		return {
			success: null,
			error: e as string
		}
	}

}

export async function updateOrder(unsafeData: OrderDbUpdate, email: string, userId: string, products: any[]){
	const { success, data } = OrderDbUpdateSchema.safeParse(unsafeData)
	if (!success) return {
		success: null, 
		error: 'Неправильно введенные данные.'
	}

		try{

			const prevOrder = await prisma.order.findFirst({
				where: {
					id: data.id
				},
				include: {
					Promocode: true,
				}
			},
		)

			if(!prevOrder){
				return {
					success: null,
					error: 'ORDER NOT FOUND'
				}
			}

			if(data.status === 'PAID' && prevOrder?.status !== 'PAID'){
				let price = 0;
				products.forEach(item => {
					price+= +item.price * +item.quantity
				})
				const bonus = await addBonus(userId, price)
				await updateUserPurchasesAmount(prevOrder.userId, prevOrder?.amount)
			}
			let newAmount = 0;
			if(prevOrder.deliveryPrice !== data.deliveryPrice){
				let purePriceProducts = 0;
	
				products.forEach(item => {
					purePriceProducts+= +item.price * +item.quantity
				})

				purePriceProducts-= prevOrder.bonusMinusAmount
				if(prevOrder.Promocode){
					purePriceProducts-= prevOrder.Promocode.discount
				}
				purePriceProducts+= data.deliveryPrice
				newAmount = purePriceProducts
			} 
			
			await prisma.order.update({
						where:{
							id: data.id
						},
						data:{
							amount: newAmount > 0 ? newAmount : prevOrder.amount,
							status: data.status,
							trackNumber: data.trackNumber,
							deliveryPrice: data.deliveryPrice
						}
					})

				if(data.mailTitle !== '' && data.mailDescription !== ''){
						await mailBonusEmail(email, data.mailTitle, data.mailDescription)
					}
				revalidatePath('/admin/orders')
					return {
						success: true, 
						error: null
					}
	
				} catch(e) {
					return {
						success: null,
						error: e as string
					}
				}
}