import { prisma } from '@/shared/api/prismaInstance'
import { gResponse } from '@/shared/utils/common'

export async function GET(req: Request) {
	try {
		const content = await prisma.aboutInfo.findFirst({
			where:{
				name: 'about'
			}
		});
		return new Response(JSON.stringify(gResponse(content, null)), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch(e){
		return new Response(JSON.stringify(gResponse(null, e as string)), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	}
}
