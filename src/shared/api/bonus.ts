"use server"

import { BonusType } from '@prisma/client'
import { bonusStatusAdminForm } from '../types/user'
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

export async function minusBonus(id: string, currentAmount: number, minusAmount: number, currentHistory: any[]){
	const amount = currentAmount - minusAmount
	const history = {
		type: 'minus',
		title: 'Оформление товара',
		date: new Date(),
		amount: minusAmount,
	}

	currentHistory.push(history) 

	try{
		const bonus = await prisma.bonus.update({
			where:{
				id
			},
			data:{
				amount,
				history: currentHistory
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
console.log(price)
	try {
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
		const history:any = bonus.history
		history.push({
			type: 'add',
			title: 'Оформление товара',
			date: new Date(),
			amount: perc,
		})

		await prisma.bonus.update({
			where:{
			 id: bonus.id
			},
			data:{
				amount: total,
				history
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

		const bonus = await prisma.bonus.findFirst({
			where:{userId: userId as string}
		})

		return {
			success: bonus,
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