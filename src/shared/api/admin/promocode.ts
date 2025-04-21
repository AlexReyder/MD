"use server"

import { PromocodeAdd, PromocodeAddSchema, PromocodeDb } from '@/shared/types/validation/promocode'
import { revalidatePath } from 'next/cache'
import { prisma } from '../prismaInstance'

export async function getPromocodes(){
	try{
		const promocodes: PromocodeDb[] = await prisma.promocode.findMany()
		return {
			success: promocodes,
			error: null
		}
	} catch(e){
		return {
			success: null,
			error: e as string
		}
	}
}

export async function createPromocode(unsafeData: PromocodeAdd){
	const { success, data } = PromocodeAddSchema.safeParse(unsafeData)
		if (!success) return {
			success: null, 
			error: 'Неправильно введенные данные.'
		}

		try{
			const values = {
				value: data.value,
				expiresAt: data.expiresAt,
				discount: data.discount,
			}

			const promocode = await prisma.promocode.upsert({
				where: {
					id: data.id
				},
				create: values,
				update: values
			})

			revalidatePath('/admin/promocodes')

			return{
				success: promocode,
				error: null
			}

		}	catch(e){
			return {
				success: null,
				error: e as string
			}
		}
	
}

export async function deletePromocode(id: string){
	try{
		const promocode = await prisma.promocode.delete({
			where:{ id }
		})
		revalidatePath('/admin/promocodes')
		return {
			success: promocode,
			error: null
		}
	} catch(e){
		return {
			success: null,
			error: e as string
		}
	}
}