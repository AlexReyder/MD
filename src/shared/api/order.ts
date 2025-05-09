"use server"

import { redirect } from 'next/navigation'
import { CreateOrder, CreateOrderSchema } from '../types/validation/order'
import { minusBonus, updateBonusStatus } from './bonus'
import { removeDbCart } from './cart'
import { mailOrderConfirm } from './mail'
import { prisma } from './prismaInstance'
import { applyPromocode } from './promocode'
import { verifySession } from './session'

// export async function makeOrder(unsafeData: z.infer<typeof makeOrderSchema>, cart: CartItems) {
export async function makeOrder(unsafeData: CreateOrder) {
	const { success, data } = CreateOrderSchema.safeParse(unsafeData)
	if (!success) return {
		success: null,
		error: 'Неправильно введенные данные'
	}

	const {isAuth, userId}= await verifySession()
	if(isAuth){

		const existingUser = await prisma.user.findFirst({where: {
			id: userId as string
		}, include:{Bonus:true}})

		if (existingUser === null) {
			return {
				success: null, 
				error: 'AUTH'
			}
		}

		const detailsClient = {
			name: data.name,
			surname: data.surname,
			address: data.address,
			phone: data.phone,
			email: data.email,
			comment: data.comment
		}

		const bonus = await prisma.bonus.findFirst({
			where:{
				userId: userId as string
			}
		})
		if(!bonus) {
			return {
				success: null,
				error: 'BONUS USER DATA NOT FOUND'
			}
		}

		let price = 0;
		data.products.forEach((item:any) => {
			price+= +item.price * +item.quantity
		})

		let total = price - data.bonusMinusAmount
		if(data.promocodeId.id !== ''){
      total = total - data.promocodeId.discount
    }
		total+= data.deliveryPrice
		try {
			const order = await prisma.order.create({
					data: {
							userId: userId as string,
							products: data.products,
							details: detailsClient,
							payment: data.payment,
							delivery: data.delivery,
							deliveryPrice: data.deliveryPrice,
							amount: total,
							bonusMinusAmount: data.bonusMinusAmount,
							promocodeId: data.promocodeId.id === '' ? null : data.promocodeId.id,
						},
					});
			
			if(!order){
					return {
							success: null,
					error: 'ORDER_NOT_CREATED'
				}
			}

			if(data.bonusMinusAmount > 0){
				const minusBonusDb = await minusBonus(userId as string, data.bonusMinusAmount)
			}

			if(data.promocodeId.id !== ''){
				await applyPromocode(data.promocodeId.id, userId as string)
			}

			
			await mailOrderConfirm(existingUser.email, data)
			await removeDbCart()
			
			await updateBonusStatus(existingUser.id)
			
			return {
				success: order.id,
				error: null
			}

		} catch (e) {
			return {
				success: null,
				error: e as string
			}
		}
	}
	
	return {
		success: null,
		error: 'AUTH'
	}


	// redirect("/profile/general")
}

export async function getOrderHistory(){
	const {isAuth, userId}= await verifySession()
	if(!isAuth){
		redirect('/signin')
	}
	try{
		const orders = await prisma.order.findMany({where:{userId: userId as string}})
		if(!orders){
			return {
				success: null,
				error: 'EMPTY_ORDERS'
			}
		}
		return {
			success: orders,
			error:null
		}
	} catch(e) {
		return {
			success: null,
			error: e as string
		}
	}

	
	

}

