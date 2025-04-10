"use client"
import { mailPasswordRecovery } from '@/shared/api/mail'
import { recoveryEmail } from '@/shared/types/schemas'
import { Form, FormContainer, FormHeader, FormSubmit, Input } from '@/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type FormSchema = z.infer<typeof recoveryEmail>

const RecoveryPasswordEmail = ({className}: {className?: string}) => {
		const {handleSubmit, register, formState:{ isDirty, isSubmitting, errors }} = useForm<FormSchema>({
			defaultValues: {
				email:'',
			},
			resolver: zodResolver(recoveryEmail)
		})

		async function onSubmit(data: FormSchema) {
			const {success, error} = await mailPasswordRecovery(data)
			// if(success){
			// 	redirect('/')
			// }
			console.log(error)
			// setError(error)
		}


	return (
		<FormContainer className={className}>
			<FormHeader title='Восстановление пароля' description='Введите вашу электронную почту от аккаунта. Мы отправим письмо со ссылкой на восстановление пароля.'/>
				<Form action={handleSubmit(onSubmit)}>
					<Input registerName='email' register={register} errors={errors.email} type='email' placeholder='Электронная почта' />
					<FormSubmit 
						title='Отправить' 
						isDisabled={!isDirty || isSubmitting}       
						isSubmitting={isSubmitting}
					/>
					</Form>
		</FormContainer>
	)
}

export default RecoveryPasswordEmail