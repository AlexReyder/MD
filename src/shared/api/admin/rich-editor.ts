"use server"

import { prisma } from '../prismaInstance'

export async function getContent(db: "deliveryInfo" | "aboutInfo" | "returnInfo" | "adLineInfo", name: string){
	try{
		const content = await (prisma[db] as any).findFirst({
			where: {
				name
			}
		})

		return {
			success: content,
			error: null
		}
	} catch(e){
		return {
			success: null,
			error: e as string
		}
	}
}

export async function saveContent(db: "deliveryInfo" | "aboutInfo" | "returnInfo" | "adLineInfo" ,name: string, html: string, json: any){
	try {
		await (prisma[db] as any).upsert({
			where: {
				name
			},
			create:{
				name,
				html,
				json
			},
			update: {
				html,
				json
			}
		})

		return {
			success: true,
			error: null
		}

	} catch(e){
		return {
			success: null,
			error: e as string
		}
	}
}