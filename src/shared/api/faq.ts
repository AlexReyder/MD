"use server"

import { prisma } from './prismaInstance'

export async function getFAQContent(){
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