"use server"

import { redirect } from 'next/navigation'
import { z } from 'zod'
import { CartItems } from '../types/cart'
import { makeOrderSchema } from '../types/schemas'
import { removeDbCart } from './cart'
import { mailOrderConfirm } from './mail'
import { prisma } from './prismaInstance'
import { verifySession } from './session'

export async function makeOrder(unsafeData: z.infer<typeof makeOrderSchema>, cart: CartItems) {
	const { success, data } = makeOrderSchema.safeParse(unsafeData)
	if (!success) return {
		success: null,
		error: 'Неправильно введенные данные'
	}

	const {isAuth, userId}= await verifySession()
	if(isAuth){

		const existingUser = await prisma.user.findFirst({where: {
			id: userId as string
		}})

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

		try {
			const savedUser = await prisma.order.create({
				data: {
					userId: userId as string,
					products: JSON.stringify(cart),
					details: JSON.stringify(detailsClient),
					payment: data.payment,
					delivery: data.delivery,
					promocodeValue: data.promocode
				},
			});

			if(!savedUser){
				return {
					success: null,
					error: 'ORDER_NOT_CREATED'
				}
			}
			await mailOrderConfirm(existingUser.email, data, cart)
			await removeDbCart()
			return {
				success: savedUser.id,
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