import { prisma } from '@/shared/api/prismaInstance'

export async function GET(request: Request) {
	const colorsDb = await prisma.colors.findMany()
	const colors = colorsDb.map((color) => color.name)
	
	const sizesDb = await prisma.sizes.findMany()
	const sizes = sizesDb.map((color) => color.name)
	
	const manufacturerDb = await prisma.manufacturer.findMany()
	const manufacturer = manufacturerDb.map((color) => color.name)
	
	const genreDb = await prisma.genre.findMany()
	const genre = genreDb.map((color) => color.name)
		
	const bandDb = await prisma.band.findMany()
	const bands = bandDb.map((color) => color.name)	

	const result = {
		success:{
			bands,
			colors,
			sizes,
			genre,
			manufacturer
		}, 
		error: null
	}
	
	
	return new Response(JSON.stringify(result), {
		status: 200,
		headers: { 'Content-Type': 'application/json' }
	});
}
