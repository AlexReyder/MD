"use server"

import { SpecificationType } from '@/shared/context/specifications-context'
import { SpecForm } from '@/shared/shadcnui/specification-table/dialogs/specification-action-dialog'
import { revalidatePath } from 'next/cache'
import slug from 'slug'
import { prisma } from '../prismaInstance'

export async function getAllSpecifications(specType: SpecificationType) {
	try { 
		const spec = await (prisma[specType] as any).findMany()

		return {
			success:spec,
			error: null
		}

	} catch(e) {
		return {
			success:null,
			error: e as string
		}
	}
}

export async function getOneSpecification(specType: SpecificationType, specId: string){
	const spec = await (prisma[specType] as any).findFirst({where:{id: specId}})
	return spec
}

export async function upsertSpecification(data: SpecForm, specType: SpecificationType){
	try{
		const spec = await (prisma[specType] as any).upsert({
			where:{
				//@ts-ignore:next-line
				id: data.id
			},
			create:{
				name: data.name,
				slug: slug(data.name)
			},
			update:{
				name: data.name,
				slug: slug(data.name)
			}
		})
		revalidatePath(`admin/specifications/${specType}`)
		return {
			success: spec,
			error: null
		};

	} catch(e){
		return {
			success: null,
			error: e as string
		}
	}


}

export async function removeSpecification(id: string, specType: SpecificationType){
	try{
		const spec = await (prisma[specType] as any).delete({where:{id}})
		revalidatePath(`admin/specifications/${specType}`)
		return {
			success: spec,
			error: null
		}


	} catch(e) {
		return {
			success:null,
			error: e as string
		}
	}

}