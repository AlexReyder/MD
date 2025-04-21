"use server"
import { FAQAdmin, faqAdminSchema } from '@/shared/types/schemas'
import { revalidatePath } from 'next/cache'
import { prisma } from '../prismaInstance'

export async function getFAQs(){
	try{
		const faqs = await prisma.faq.findMany()
		return {
			success: faqs,
			error: null
		}
	} catch(e){
		return {
			success: null,
			error: e as string
		}
	}
}

export async function createFAQ(unsafeData: FAQAdmin){
	const { success, data } = faqAdminSchema.safeParse(unsafeData)
		if (!success) return {
			success: null, 
			error: 'Неправильно введенные данные.'
		}

		try{
			const faq = await prisma.faq.upsert({
				where:{id: data.id},
				create: {
					question: data.question,
					answer: data.answer,
				},
				update:{
					question: data.question,
					answer: data.answer,
				}
			})
			revalidatePath('/admin/faq')
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

export async function deleteFAQ(id: string){
	try{
		const faq = await prisma.faq.delete({where:{id}})
		revalidatePath('/admin/faq')
		return {
			success: faq,
			error: null
		}
	} catch(e){
		return {
			success: null,
			error: e as string
		}
	}

}