"use server"

import { prisma } from './prismaInstance'
import { verifySession } from './session'

export async function verifyPromocode(value: string){
	try{
		const {isAuth, userId} = await verifySession()
		if(!isAuth){
			return {
				success: null,
				error: 'AUTH'
			}
		}

		const promocode = await prisma.promocode.findFirst({
			where:{value}
		})
		const currentData = new Date()
		if(promocode && currentData > promocode.expiresAt){
			return {
				success: null,
				error: 'Промокод больше не действует.'
			}
		}
		if(promocode && promocode.Users.find((el) => el === userId)){
			return {
				success: null,
				error: 'Промокод уже был использован.'
			}
		}

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

export async function applyPromocode(id: string, userId: string){
	try{
		const promocode = await prisma.promocode.findFirst({where:{id}})
		const appliedUsers = promocode?.Users
		appliedUsers?.push(userId)

		await prisma.promocode.update({
			where:{
				id
			},
			data: {
				Users: appliedUsers
			}
		})

		return{
			success:true,
			error: null
		}

	} catch(e){
		return {
			success:null,
			error: e as string
		}
	}
}