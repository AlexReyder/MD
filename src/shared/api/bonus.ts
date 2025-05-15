"use server"

import { BonusType } from '@prisma/client'
import { addMonths } from 'date-fns'
import { bonusStatusAdminForm } from '../types/user'
import { BonusDb, BonusesTypeEnum, BonusHistoryType, DynamicBonusesType } from '../types/validation/bonus'
import { prisma } from './prismaInstance'
import { verifySession } from './session'

export async function createBonusTable(userId: string){
	try{

		await prisma.bonus.create({
			data:{
				amount:0,
				history:[],
				status: BonusType.BRONZE,
				userId
			}
		})

	} catch(e){
		return {
			success: null,
			error: e as string
		}
	}
}

export async function minusBonus(userId: string, bonusMinusAmount: number){

	try{
		const bonus = await prisma.bonus.findFirst({
			where:{
				userId
			}
		}) as unknown as BonusDb
	
		if(!bonus){
			return {
				success: null,
				error: 'Бонусы пользователя не существуют'
			}
		}
	
		let staticBonusAmount = bonus.amount
		const currentBonusHistory = [...bonus.history] as unknown as BonusHistoryType[]
		const currentDynamicBonuses = [...bonus.dynamicBonuses] as unknown as DynamicBonusesType[]
		let newDynamicBonuses: DynamicBonusesType[] = []
	
		const activeDynamicBonuses: DynamicBonusesType[] = []
	
		for (let i = 0; i < currentDynamicBonuses.length; i++) {
			const expiresBonusMs = new Date(currentDynamicBonuses[i].expiresAt).getTime()
			const currentDateMs = new Date().getTime()
	
			if( expiresBonusMs > currentDateMs){
				activeDynamicBonuses.push(currentDynamicBonuses[i])
			}
	
			if(expiresBonusMs <= currentDateMs){
				const oldDynamicBonus = {...currentDynamicBonuses[i]}
				oldDynamicBonus.type = BonusesTypeEnum.MINUS
				oldDynamicBonus.title = 'Время действия истекло'
				currentBonusHistory.push(oldDynamicBonus)
			}
		}

		let remainder = bonusMinusAmount;
		if(activeDynamicBonuses.length > 0){
			const remainderDynamicBonuses = activeDynamicBonuses.map((bonus) => {
				if(remainder > 0){
					const amount = bonus.amount - remainder
				
					if(amount <= 0) {
						remainder-= Math.abs(bonus.amount)
						bonus.title = 'Оформление заказа'
						bonus.type = BonusesTypeEnum.MINUS
						bonus.createdAt = new Date()
						currentBonusHistory.push(bonus)
						return null
					}

					remainder-= Math.abs(remainder)
					bonus.amount = amount
					currentBonusHistory.push({
						type: BonusesTypeEnum.MINUS,
						title: 'Оформление заказа',
						amount: bonusMinusAmount,
						expiresAt: bonus.expiresAt,
						createdAt: new Date(),
					})
				return bonus
				} else {
					return bonus
				}
			}).filter((item) => item !== null)
			newDynamicBonuses = remainderDynamicBonuses
		}

		if(remainder > 0) {
			staticBonusAmount -= remainder
			if(staticBonusAmount < 0) {
				return {
					success: null,
					error: 'Неверное количество бонусов'
				}
			} else {
				currentBonusHistory.push({
					type: BonusesTypeEnum.MINUS,
					title: 'Оформление заказа',
					amount: remainder,
					expiresAt: null,
					createdAt: new Date(),
				})
			}
		}
	
		await prisma.bonus.update({
			where: {
				id: bonus.id
			},
			data:{
				amount: staticBonusAmount,
				history: currentBonusHistory,
				dynamicBonuses: newDynamicBonuses
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

export async function addBonus(userId: string, price: number){

	try {
		await filterBonuses(userId)

		const bonus = await prisma.bonus.findFirst({
			where:{
				userId
			}
		})

		if(!bonus){
			return{
				success: null,
				error: 'NOT FOUND'
			}
		}

		const percentage = bonusStatusAdminForm.filter((item) => item.value === bonus?.status)[0].percentage
		const perc = parseInt((price * (percentage / 100)).toFixed())
		const total = bonus?.amount + perc
		const history = [...bonus.history] as unknown as BonusHistoryType[]
		const dynamicBonuses = [...bonus.dynamicBonuses] as unknown as DynamicBonusesType[]

		history.push({
			type: BonusesTypeEnum.ADD,
			title: 'Покупка товара',
			createdAt: new Date(),
			expiresAt: addMonths(new Date(), 2),
			amount: perc,
		})

		dynamicBonuses.push({
			type: BonusesTypeEnum.ADD,
			title: 'Покупка товара',
			createdAt: new Date(),
			expiresAt: addMonths(new Date(), 2),
			amount: perc,
		})

		await prisma.bonus.update({
			where:{
			 id: bonus.id
			},
			data:{
				amount: total,
				history,
				dynamicBonuses
			}
		})
		return{
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

export async function getBonus(){
	const {isAuth, userId} = await verifySession()

	if(!isAuth){
		return {
			success: null,
			error: 'Пользователь не авторизирован.'
		}
	}

	try{
		await filterBonuses(userId as string)
		const bonus = await prisma.bonus.findFirst({
			where:{userId: userId as string}
		}) as unknown as BonusDb

		if(!bonus){
			return {
				success: null,
				error: 'Бонусы не найдены'
			}
		}

		const bonusStaticAmount = bonus.amount
		
		let dynamicBonusAmounts: number[] = [];

		for (let i = 0; i < bonus.dynamicBonuses.length; i++) {	
			if( new Date(bonus.dynamicBonuses[i].expiresAt).getTime() > new Date().getTime() ){
				dynamicBonusAmounts.push(bonus.dynamicBonuses[i].amount)
			}
		}
		const bonusDynamicAmount = dynamicBonusAmounts.length > 0 ? dynamicBonusAmounts.reduce((a,c) => a + c) : 0

		return {
			success: {
				data: bonus,
				currentAmount: bonusStaticAmount + bonusDynamicAmount
			},
			error: null
		}

	} catch(e) {
		return {
			success:null,
			error: e as string
		}
	}



}


export async function calculateBonus(total: number, status: BonusType, minus: number){
	let discount = 0;
	if(status = BonusType.BRONZE){
		discount = total - (total * 0.01) - minus
	}

	if(status = BonusType.SILVER){
		discount = total - (total * 0.03) - minus
	}

	if(status = BonusType.GOLD){
		discount = total - (total * 0.05) - minus
	}

	if(status = BonusType.PLATINUM){
		discount = total - (total * 0.10) - minus
	}

	return discount;
}

export async function updateBonusStatus(userId: string){
	try {
		const user = await prisma.user.findFirst({
			where: {
				id: userId
			}
		})

		const bonus = await prisma.bonus.findFirst({
			where:{
				userId
			}
		})

		if(!user || !bonus){
			return {
				success: null,
				error: 'NOT FOUND'
			}
		}
		
		const currentStatusFromTypes = bonusStatusAdminForm.filter((item) => item.value === bonus?.status)

		let currentStatus: any;

		bonusStatusAdminForm.forEach((item) => {
			if(item.start <= user?.purchasesAmount && item.end > user.purchasesAmount){
				currentStatus = item;
			}
		})
	
		if(currentStatus?.value !== bonus?.status &&  currentStatus.percentage > currentStatusFromTypes[0].percentage) {
				await prisma.bonus.update({
					where: {
						id: bonus?.id
					},
					data:{
						status: currentStatus.value
					}
				})
				return {
					success: true,
					error:null
				}
		}

		return {
			success: true,
			error:null
		}

	} catch(e){
		return {
			success: null,
			error: e as string
		}
	}




}

export async function filterBonuses(userId: string){
	try{
		const bonus = await prisma.bonus.findFirst({
			where: {
				userId
			}
		}) as unknown as BonusDb
	
		const currentBonusHistory = [...bonus.history] as unknown as BonusHistoryType[]
		const currentDynamicBonuses = [...bonus.dynamicBonuses] as unknown as DynamicBonusesType[]
		const activeDynamicBonuses: DynamicBonusesType[] = []
	
		for (let i = 0; i < currentDynamicBonuses.length; i++) {
			const expiresBonusMs = new Date(currentDynamicBonuses[i].expiresAt).getTime()
			const currentDateMs = new Date().getTime()
	
			if( expiresBonusMs > currentDateMs){
				activeDynamicBonuses.push(currentDynamicBonuses[i])
			}
	
			if(expiresBonusMs <= currentDateMs){
				const oldDynamicBonus = {...currentDynamicBonuses[i]}
				oldDynamicBonus.type = BonusesTypeEnum.MINUS
				oldDynamicBonus.title = 'Время действия истекло'
				currentBonusHistory.push(oldDynamicBonus)
			}
		}

		await prisma.bonus.update({
			where:{
				id: bonus.id
			},
			data: {
				history: currentBonusHistory,
				dynamicBonuses: activeDynamicBonuses
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