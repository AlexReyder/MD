"use server"

import { UpdateDeliveryPrices, UpdateDeliveryPricesSchema } from '@/shared/types/validation/delivery-prices'
import { gResponse } from '@/shared/utils/common'
import { prisma } from '../prismaInstance'

export async function deleteDeliveryPrice(id: string){
	try {
		await prisma.deliveryPrice.delete({
			where:{
				id
			}
		})
		return gResponse(true, null)
	} catch(e){
		return gResponse(null, e as string)
	}
}

export async function upsertDeliveryPrice(unsafeData: UpdateDeliveryPrices){
	const { success, data } = UpdateDeliveryPricesSchema.safeParse(unsafeData)
	if (!success) return gResponse(null, 'VALIDATION')
	try {
		await prisma.deliveryPrice.upsert({
			where:{
				id: data.id
			},
			create:{
				deliver: data.deliver,
				price: data.price
			}, 
			update: {
				deliver: data.deliver,
				price: data.price
			}
		})
		return gResponse(true, null)
	} catch(e){
		return gResponse(null, e as string)
	}
}