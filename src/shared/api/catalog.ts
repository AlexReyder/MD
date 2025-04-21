"use server"
import { ValidateProductsDbAdd } from '../types/validation/products'
import { prisma } from './prismaInstance'



export async function getAllProducts(selected: number = 1){
	// const products = await prisma.shoppingCard.findMany({skip:(selected - 1) * 12, take: 12 });
	const products = await prisma.shoppingCard.findMany();
	const {data} = await ValidateProductsDbAdd.safeParseAsync(products)
	const productsCount = await prisma.shoppingCard.count();

	return {
		success: {data ,
			length: productsCount
		},
		error: null
	}
}

export async function getProductsByCategory(slug: string, selected: number){
	const products = await prisma.shoppingCard.findMany({where:{categorySlug: slug},skip:(selected - 1) * 12, take: 12});
	const categoryName = await prisma.category.findFirst({where: {slug}, select:{name: true}})
	return {
		success: {products,
			length: products.length,
			categoryName
		},
		error: null
	}
}

export async function getOneProduct(productId: string,){
	const product = await prisma.shoppingCard.findFirst({where:{slug:productId}})

	if(!product) return {
		success: null,
		error: 'Товар не найден'
	}

	return {
		success: product,
		error: null
	}
}

export async function getHeroBanners(){
	const banners = await prisma.banner.findMany();
	if(banners){
		return {
			success: banners,
			error: null
		}
	}
	return {
		success:null,
		error: 'EMPTY'
	}
}

export async function getProductsByIsBestseller(){
	const products = await prisma.shoppingCard.findMany({where:{isBestseller: true}});
	if(products){
		return {
			success: products,
			error: null
		}
	}
	return {
		success:null,
		error: 'EMPTY'
	}
}
export async function getProductsByIsNew(){
	const products = await prisma.shoppingCard.findMany({where:{isNew: true}});
	if(products){
		return {
			success: products,
			error: null
		}
	}
	return {
		success:null,
		error: 'EMPTY'
	}
}
