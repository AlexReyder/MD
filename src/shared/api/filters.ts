"use server"

import { headers } from 'next/headers'
import { prisma } from './prismaInstance'


export async function getFiltersData(){
	const data: any = {
		colors: ["black", "white", "yellow", "blue", "green", "red"],
		sizes: ["x" , "xl" , "xxl", "l"],
	}
	const bands = await prisma.band.findMany({select:{name:true}});
		if(!bands) { data.bands = null} else {data.bands = bands}

	// const details = await prisma.shoppingCard.findFirst({});

	return {
		success: data, 
		error: null
	}	
}

export async function filter(){
	const headersList = await headers()
}