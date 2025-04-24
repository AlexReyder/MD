import { prisma } from '@/shared/api/prismaInstance'
import { verifySession } from '@/shared/api/session'
import { BonusDbSchema } from '@/shared/types/validation/bonus'

export async function GET(
	request: Request,
) {
	const {isAuth, userId} = await verifySession()
	
	const bonus = await prisma.bonus.findFirst({
		where: {
			id: userId as string
		}
	});

	const { data } = await BonusDbSchema.safeParseAsync(bonus)

	const result = {
		success: data,
		error: null
	}

	return new Response(JSON.stringify(result), {
		status: 200,
		headers: { 'Content-Type': 'application/json' }
	});
}