"use server"

import { redirect } from 'next/navigation'
import { CreateOrder, CreateOrderSchema } from '../types/validation/order'
import { calculateBonusDiscount } from '../utils/common'
import { minusBonus } from './bonus'
import { removeDbCart } from './cart'
import { mailOrderConfirm } from './mail'
import { prisma } from './prismaInstance'
import { applyPromocode } from './promocode'
import { verifySession } from './session'
import { updateUserPurchasesAmount } from './user'

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

		let total = calculateBonusDiscount(+price, bonus.status, data.bonusMinusAmount)
		if(data.promocodeId.id !== ''){
      total = total - data.promocodeId.discount
    }

		try {
			const order = await prisma.order.create({
				data: {
					userId: userId as string,
					products: data.products,
					details: detailsClient,
					payment: data.payment,
					delivery: data.delivery,
					amount: total
				},
			});
			
			if(!order){
				return {
					success: null,
					error: 'ORDER_NOT_CREATED'
				}
			}
			
			await minusBonus(bonus.id, bonus.amount, data.bonusMinusAmount, bonus.history)
			await updateUserPurchasesAmount(userId as string, existingUser.purchasesAmount, total)
			await applyPromocode(data.promocodeId.id, userId as string)


			await mailOrderConfirm(existingUser.email, data)
			await removeDbCart()
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