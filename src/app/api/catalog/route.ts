import { prisma } from '@/shared/api/prismaInstance'
import { ValidateProductsDbSchema } from '@/shared/types/validation/products'
import { NextRequest } from 'next/server'


export async function GET(request: NextRequest) {
		const {Tsquery} = require('pg-tsquery');
		const parser = new Tsquery();
	
		const searchParams = request.nextUrl.searchParams
		const search = searchParams.get('search') as string
		const offset = searchParams.get('offset') as string
		const bands = searchParams.get('bands') as string
		const genres = searchParams.get('genres') as string
		const manufacturers = searchParams.get('manufacturers') as string
		const colors = searchParams.get('colors') as string
		const sizes = searchParams.get('sizes') as string
		const skip = ( +offset - 1) * 12
		const take = 12
		const where: any = {}

		if(search){
			where.OR = [
				{name: {
					search: parser.parse(search).toString(),
				}},
				{articleNumber: {
					search: parser.parse(search).toString(),
				}},
			]
		}

		if(bands){
			where.bandFilter = {
				hasEvery: bands.split(';')
			}
		}
		if(genres){
			where.genreFilter = {
				hasEvery: genres.split(';')
			}
		}
		if(manufacturers){
			where.manufacturerFilter = {
				hasEvery: manufacturers.split(';')
			}
		}
		if(colors){
			where.colorsFilter = {
				hasEvery: colors.split(';')
			}
		}
		if(sizes){
			where.sizesFilter = {
				hasEvery: sizes.split(';')
			}
		}


		const products = await prisma.shoppingCard.findMany(
			{
				skip, take, where
			}
	);
		const { data } = await ValidateProductsDbSchema.safeParseAsync(products)
		const productsCount = await prisma.shoppingCard.count()
	
		const result = {
			success: {
				products: data ,
				length: productsCount
			},
			error: null
		}
	
  return new Response(JSON.stringify(result), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

// try{
// 	const products = await prisma.shoppingCard.findMany();
// 	const { data } = await ValidateProductsDbSchema.safeParseAsync(products)
// 	const productsCount = await prisma.shoppingCard.count();

// 	const result = {
// 		success: {
// 			products: data ,
// 			length: productsCount
// 		},
// 		error: null
// 	}
// 	return new Response(JSON.stringify(result), {
// 		status: 200,
// 		headers: { 'Content-Type': 'application/json' }
// 	});
// } catch(e){
// 	const result = {
		
// 	}
// 	return new Response(JSON.stringify(result), {
// 		status: 200,
// 		headers: { 'Content-Type': 'application/json' }
// 	});
// }