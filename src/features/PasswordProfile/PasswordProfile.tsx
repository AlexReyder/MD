"use client"
import { changePassword } from '@/shared/api/user'
import { profilePassword } from '@/shared/types/schemas'
import { Form, FormContainer, FormHeader, FormSubmit, Input } from '@/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type FormSchema = z.infer<typeof profilePassword>

  const PasswordProfile = ( {className}: {className?: string}) => {
		const {handleSubmit, register, formState:{ isDirty, isSubmitting, errors }} = useForm<FormSchema>({
			defaultValues: {
				password:'',
				confirmPassword:'',
			},
			resolver: zodResolver(profilePassword)
		})

		async function onSubmit(data: FormSchema) {
			const error = await changePassword(data)
			console.log(error)
			// setError(error)
		}


	return (
		<FormContainer className={className}>
					<FormHeader title='Изменения пароля' description='Введите и повторите новый пароль'/>
				<Form action={handleSubmit(onSubmit)}>
				<Input registerName='password' register={register} errors={errors.password} type='password' placeholder='Пароль' />
				<Input registerName='confirmPassword' register={register} errors={errors.confirmPassword} type='password' placeholder='Повторите пароль' />
					<div className='card-body__inner'>
						<div className='inner__top'>
							<FormSubmit  title='Сохранить' 
            isDisabled={!isDirty || isSubmitting}       
            isSubmitting={isSubmitting}/>

						</div>
					</div>
				</Form>

		</FormContainer>
	)
}

export default PasswordProfile