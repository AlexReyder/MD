"use client"
import { changePassword } from '@/shared/api/user'
import { profilePassword } from '@/shared/types/schemas'
import { Form, FormContainer, FormFooter, FormHeader, FormSubmit, Input } from '@/shared/ui'
import { FormError } from '@/shared/ui/Form/FormError'
import { FormSuccess } from '@/shared/ui/Form/FormSuccess'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import s from './PasswordProfile.module.scss'

type FormSchema = z.infer<typeof profilePassword>

  const PasswordProfile = ( {className}: {className?: string}) => {
		const [formError, setFormError] = useState('')
		const [formSuccess, setFormSuccess] = useState('')

		const {handleSubmit, register, formState:{ isDirty, isSubmitting, errors }} = useForm<FormSchema>({
			defaultValues: {
				password:'',
				confirmPassword:'',
			},
			resolver: zodResolver(profilePassword)
		})

		async function onSubmit(data: FormSchema) {
			setFormSuccess('')
			setFormError('')
			const {success, error} = await changePassword(data)
			if(error){
				setFormError(error)
				setFormSuccess('')
			}

			if(success){
				setFormSuccess('Данные успешно обновлены')
				setFormError('')
			}
		}


	return (
		<FormContainer className={className}>
					<FormHeader title='Изменения пароля' description='Введите и повторите новый пароль'/>
				<Form action={handleSubmit(onSubmit)}>
				<Input registerName='password' register={register} errors={errors.password} type='password' placeholder='Пароль' />
				<Input registerName='confirmPassword' register={register} errors={errors.confirmPassword} type='password' placeholder='Повторите пароль' />
				<FormFooter>
							<FormSuccess successMessage={formSuccess} className={s.Notify}/>
							<FormError errorMessage={formError} className={s.Notify}/>
				</FormFooter>
				
					<FormSubmit  title='Сохранить' 
            isDisabled={!isDirty || isSubmitting}       
            isSubmitting={isSubmitting}/>
				</Form>

		</FormContainer>
	)
}

export default PasswordProfile