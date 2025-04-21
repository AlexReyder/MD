"use server"

import { BonusType } from '@prisma/client'
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