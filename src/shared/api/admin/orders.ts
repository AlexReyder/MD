"use server"

import { OrderDbUpdate, OrderDbUpdateSchema } from '@/shared/types/validation/order'
import { prisma } from '../prismaInstance'

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

export async function updateOrder(unsafeData: OrderDbUpdate){
	const { success, data } = OrderDbUpdateSchema.safeParse(unsafeData)
	if (!success) return {
		success: null, 
		error: 'Неправильно введенные данные.'
	}

		try{
					await prisma.order.update({
						where:{
							id: data.id
						},
						data:{
							status: data.status,
							trackNumber: data.trackNumber
						}
					})
	
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