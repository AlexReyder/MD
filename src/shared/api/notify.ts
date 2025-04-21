"use server"
import { CreateNotifyProducts, CreateNotifyProductsSchema } from '@/shared/types/validation/notify-products'
import { prisma } from './prismaInstance'
import { verifySession } from './session'

export async function makeNotifyProducts(unsafeData: CreateNotifyProducts){
	const { success, data } = CreateNotifyProductsSchema.safeParse(unsafeData)
	if (!success) return {
		success: null,
		error: 'Неправильно введенные данные'
	}

	const {isAuth, userId} = await verifySession();
	if(!isAuth){
		return {
			success: null,
			error: 'Пользователь не авторизирован.'
		}
	}



	try{
		// const User = await prisma.user.findFirst({where:{id: userId as string}})
		// if(!User){
		// 	return;
		// }
		// const Product = await prisma.shoppingCard.findFirst({where:{id: data.productId}})

		await prisma.notifyProducts.create({
			data:{
				color: data.color,
				size: data.size,
				userId: userId as string,
				productId: data.productId,
			}
		})
		return{
			success: true,
			error: null,
		}

	} catch(e){
		return {
			success: null,
			error: e as string
		}
	}
}