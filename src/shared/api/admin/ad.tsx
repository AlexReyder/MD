"use server"

import { AdAdmin, adAdminSchema } from '@/shared/types/schemas'
import { revalidatePath } from 'next/cache'
import { prisma } from '../prismaInstance'

export async function getAds(){
	try{
		const ads = await prisma.banner.findMany()
		return {
			success: ads,
			error: null
		}
	} catch(e){
		return {
			success: null,
			error: e as string
		}
	}
}



export async function upsertAd(unsafeData: AdAdmin){
	const { success, data } = adAdminSchema.safeParse(unsafeData)
		if (!success) return {
			success: null, 
			error: 'Неправильно введенные данные.'
		}

		try{
			const faq = await prisma.banner.upsert({
				where:{id: data.id},
				create: {
					alt: data.alt,
					link: data.link,
					url: data.url,
				},
				update:{
					alt: data.alt,
					link: data.link,
					url: data.url,
				}
			})
			revalidatePath('/admin/ads')
			return{
				success: faq,
				error: null
			}

		}	catch(e){
			return {
				success: null,
				error: e as string
			}
		}
	
}

export async function deleteAd(id: string){
	try{
		const ad = await prisma.banner.delete({where:{id}})
		revalidatePath('/admin/ads')
		return {
			success: ad,
			error: null
		}
	} catch(e){
		return {
			success: null,
			error: e as string
		}
	}

}