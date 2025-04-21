"use server"

import { NotifyProductsMail, NotifyProductsMailSchema } from '@/shared/types/validation/notify-products'
import { revalidatePath } from 'next/cache'
import { mailNotifyProduct } from '../mail'
import { prisma } from '../prismaInstance'

export async function getNotifies(){
	try{
		const notifies = await prisma.notifyProducts.findMany({include: 
			{ User: true , Product: true }})

		return {
			success: notifies,
			error: null
		}
	} catch(e){
		return {
			success: null,
			error: e as string
		}
	}
}

export async function mailNotify(unsafeData: NotifyProductsMail){
	const { success, data } = NotifyProductsMailSchema.safeParse(unsafeData)
			if (!success) return {
				success: null, 
				error: 'Неправильно введенные данные.'
			}
			
			try{
				await mailNotifyProduct(data.User.email,data.mailTitle, data.mailBody)
				await prisma.notifyProducts.update({
					where:{
						id: data.id
					},
					data:{
						isNotified: true,
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

export async function deleteNotify(id: string){
	try{
			const notifies = await prisma.notifyProducts.delete({
				where:{ id }
			})
			revalidatePath('/admin/notify')
			return {
				success: notifies,
				error: null
			}
		} catch(e){
			return {
				success: null,
				error: e as string
			}
		}
}