"use server"

import { UserForm } from '@/shared/shadcnui/user-table/dialogs/users-action-dialog'
import { BonusAdminForm } from '@/shared/shadcnui/user-table/dialogs/users-bonus-dialog'
import { BonusesTypeEnum, BonusHistoryType, DynamicBonusesType } from '@/shared/types/validation/bonus'
import { Role } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { hashPassword } from '../auth'
import { filterBonuses } from '../bonus'
import { mailBonusEmail } from '../mail'
import { prisma } from '../prismaInstance'

export async function getAllUsers(){
	try{
		const users = await prisma.user.findMany({include:{Bonus: true}})
		return {
			success: users, 
			error: null
		}
	} catch(e) {
		return {
			success: null,
			error: e as string
		}
	}
}

export async function removeUser(id: string){

	try{
		const userCart = await prisma.cart.findFirst({where:{userId: id}})
		if(userCart){
			await prisma.cart.delete({where:{id: userCart.id}})
		}

		const userOrders = await prisma.order.findFirst({where:{userId: id}})
		if(userOrders){
			await prisma.order.delete({where:{id: userOrders.id}})
		}

		const userBonuses = await prisma.bonus.findFirst({where:{userId: id}})
		if(userBonuses){
			await prisma.bonus.delete({where:{id: userBonuses.id}})
		}

		const users = await prisma.user.delete({where:{id}})
		revalidatePath('/admin/users')
		return {
			success: users,
			error: null
		};
	} catch(e){
		return {
			success: null,
			error: e as string
		}
	}
}

export async function upsertUser(data: UserForm){
	try{
		const hashedPassword = await hashPassword(data.password)
		const users = await prisma.user.upsert({
			where:{
				email: data.email
			},
			create:{
				name: data.name,
				surname: data.surname,
				email:data.email,
				phone: data.phone,
				password: hashedPassword,
				role:Role[data.role],
				Bonus: {
					create:{
						amount: 0,
						history: [],
						status:data.Bonus.status,
					}
				}
			},
			update:{
				name: data.name,
				surname: data.surname,
				email:data.email,
				phone: data.phone,
				password: hashedPassword,
				role:Role[data.role],
				Bonus:{
					update:{
						where:{
							id:data.Bonus.id
						},
						data:{
							status:data.Bonus.status
						}
					}
				}
			}
		})
		revalidatePath('/admin/users')
		return {
			success: users,
			error: null
		};
	} catch(e){
		return {
			success: null,
			error: e as string
		}
	}
}

export async function getUserOrders(userId: string){
	const orders = await prisma.order.findMany({where:{userId}})
	return orders;
}

export async function addUserBonus(data:BonusAdminForm){

	try{

		const user = await prisma.user.findFirst({where: {id: data.userId}, select:{email: true}})

		if(!user){
			return {
				success: null,
				error: 'Пользователя не существует'
			}
		}
		await filterBonuses(data.userId)
		const getCurrentBonusData = await prisma.bonus.findFirst({
			where: {
				userId: data.userId
			}
		})

		if(!getCurrentBonusData){
			return {
				success: null,
				error: 'Бонусы пользователя не существуют'
			}
		}

		const currentBonusHistory = [...getCurrentBonusData.history] as unknown as BonusHistoryType[]
		const currentDynamicsBonuses = [...getCurrentBonusData.dynamicBonuses] as unknown as DynamicBonusesType[]

		const newDynamicBonus: DynamicBonusesType = {
				amount: data.addNum,
				title: data.addPurpose,
				type: BonusesTypeEnum.ADD,
				expiresAt: data.addExpiresAt,
				createdAt: new Date()
		}
		currentBonusHistory.push(newDynamicBonus)
		currentDynamicsBonuses.push(newDynamicBonus)

		const bonus = await prisma.bonus.update({
			where:{
				id: data.id
			},
			data:{
				history: currentBonusHistory,
				dynamicBonuses: currentDynamicsBonuses
			}
		})

		if(data.mailTitle !== '' && data.mailDescription !== ''){
			await mailBonusEmail(user.email, data.mailTitle, data.mailDescription)
		}
		revalidatePath('/admin/users')

		return {
			success: bonus,
			error: null
		}
	} catch(e){
		return {
			success: null,
			error: e as string
		}
	}
	
}