"use server"

import { UpdateDeliveryPrices, UpdateDeliveryPricesSchema } from '@/shared/types/validation/delivery-prices'
import { gResponse } from '@/shared/utils/common'
import { revalidatePath } from 'next/cache'
import { prisma } from '../prismaInstance'

// export async function deleteDeliveryPrice(id: string){
// 	try {
// 		await prisma.deliveryPrice.delete({
// 			where:{
// 				id
// 			}
// 		})
// 		return gResponse(true, null)
// 	} catch(e){
// 		return gResponse(null, e as string)
// 	}
// }

export async function upsertDeliveryPrice(unsafeData: UpdateDeliveryPrices){
	const { success, data } = UpdateDeliveryPricesSchema.safeParse(unsafeData)
	if (!success) return gResponse(null, 'VALIDATION')
	try {
		await prisma.deliveryPrice.upsert({
			where:{
				id: data.id
			},
			create:{
				CDEK: data.CDEK,
				CDEKdays: data.CDEKdays,
				MAILRUSSIA: data.MAILRUSSIA,
				MAILRUSSIAdays: data.MAILRUSSIAdays,
				YANDEX: data.YANDEX,
				YANDEXdays: data.YANDEXdays,
				FIVEPOST: data.FIVEPOST,
				FIVEPOSTdays: data.FIVEPOSTdays,
				COURIER: data.COURIER,
				COURIERdays: data.COURIERdays,
			}, 
			update: {
				CDEK: data.CDEK,
				CDEKdays: data.CDEKdays,
				MAILRUSSIA: data.MAILRUSSIA,
				MAILRUSSIAdays: data.MAILRUSSIAdays,
				YANDEX: data.YANDEX,
				YANDEXdays: data.YANDEXdays,
				FIVEPOST: data.FIVEPOST,
				FIVEPOSTdays: data.FIVEPOSTdays,
				COURIER: data.COURIER,
				COURIERdays: data.COURIERdays,
			}
		})
		revalidatePath('/admin/delivery-prices')
		return gResponse(true, null)
	} catch(e){
		return gResponse(null, e as string)
	}
}

export async function getDeliveryPrices(){
	try{
		const data = await prisma.deliveryPrice.findMany()
		return {
			success: data,
			error: null
		}
	} catch(e){
		return {
			success: null,
			error: e as string
		}
	}
}