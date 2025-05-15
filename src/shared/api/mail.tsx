"use server"
import { render } from '@react-email/components'
import nodemailer from 'nodemailer'
import { z } from 'zod'
import { BonusEmailFC } from '../emails/bonus'
import { ConfirmEmailFC } from '../emails/confirm'
import { NotifyEmailFC } from '../emails/notify'
import { OrderEmailFC } from '../emails/order'
import { RecoveryEmailFC } from '../emails/recovery'
import { recoveryEmail } from '../types/schemas'
import { CreateOrder } from '../types/validation/order'
import { prisma } from './prismaInstance'

const site = process.env.SITE_DOMAIN
const user = process.env.EMAIL_LOGIN
const pass = process.env.EMAIL_PASS

const transporter = nodemailer.createTransport({
	// host: 'smtp.mail.ru',
	host: 'smtp.beget.com',
	port: 465,
	secure: true,
	auth: {
		user,
		pass,
	},
})

export async function mailPasswordRecovery(unsafeData: z.infer<typeof recoveryEmail>){
	const { success, data } = recoveryEmail.safeParse(unsafeData)
	if (!success) return {
    success: null, 
    error: 'Неправильно введенные данные.'
  }

	const existingUser = await prisma.user.findFirst({where: {
		email: data.email
	}})

	if(existingUser === null) return {
    success: null, 
    error: 'Такой пользователь не существует.'
  }

	const {email, recoveryToken} = existingUser
	

	const message = `Для того чтобы восстановить пароль перейдите по следующей ссылке: ${site}/password-recovery/?email=${email}&token=${recoveryToken}`

	const emailHtml = await render(<RecoveryEmailFC url={`${site}/password-recovery/?email=${email}&token=${recoveryToken}`}/>);

	

	const mailOptions = {
			from: user,
			to: email,
			subject: 'Сброс пароля',
			text: message,
			html: emailHtml,
		}

	try {
		 transporter.sendMail(mailOptions, function (error: any, info: any) {
			if (error) {
				console.log(error)
			}
		}
	)
	
	return {
    success: true, 
    error: null
  }
	} catch(e){
		return {
			success: null, 
			error: e as string
		};
	}		

}

export async function mailConfirmSignUp(to: string, token: string){
	const message = `Для того чтобы подтвердить регистрацию перейдите по следующей ссылке: ${site}/email/verify?email=${to}&token=${token}`
	
	const emailHtml = await render(<ConfirmEmailFC url={`${site}/email/verify?email=${to}&token=${token}`}/>);

	const mailOptions = {
			from: user,
			to,
			subject: 'Подтверждение регистрации',
			text: message,
			html: emailHtml,
		}


	try {
		 transporter.sendMail(mailOptions, function (error: any, info: any) {
			if (error) {
				console.log(error)
			}
		}
	)
	return {send: true}
	} catch(e){
		return e;
	}		

}

export async function mailOrderConfirm(to: string, details: CreateOrder){
	const message = 'Заказ оформлен. '

	const emailHtml = await render(<OrderEmailFC details={details}/>);

	const mailOptions = {
			from: user,
			to,
			to: [to, "berdinazzi@yandex.ru", "deathvastador@mail.ru"],
			subject: 'Заказ оформлен',
			text: message,
			html: emailHtml,
		}

	try {
		 transporter.sendMail(mailOptions, function (error: any, info: any) {
			if (error) {
				console.log(error)
			}
		}
	)
	return {send: true}
	} catch(e){
		return e;
	}		
}

export async function mailBonusEmail(to: string, subject: string, description: string){
	const message = 'Заказ создан. '

	const emailHtml = await render(<BonusEmailFC title={subject} text={description}/>);

	const mailOptions = {
			from: user,
			to,
			subject,
			text: description,
			html: emailHtml
		}

	try {
		 transporter.sendMail(mailOptions, function (error: any, info: any) {
			if (error) {
				console.log(error)
			}
		}
	)
	return {send: true}
	} catch(e){
		return e;
	}		
}

export async function mailNotifyProduct(to: string, subject: string, description: string){
	
	const emailHtml = await render(<NotifyEmailFC title={subject} text={description}/>);

	const mailOptions = {
			from: user,
			to,
			subject,
			text: description,
			html: emailHtml
		}

	try {
		 transporter.sendMail(mailOptions, function (error: any, info: any) {
			if (error) {
				console.log(error)
			}
		}
	)
	return {send: true}
	} catch(e){
		return e;
	}		
}
