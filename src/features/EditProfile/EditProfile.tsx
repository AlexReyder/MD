"use client"
import { updateUserProfile } from '@/shared/api/user'
import { updateUserProfileSchema } from '@/shared/types/schemas'
import { Form, FormContainer, FormFooter, FormHeader, FormSubmit, Input } from '@/shared/ui'
import { CheckboxForm } from '@/shared/ui/Form/FormCheckbox'
import { FormError } from '@/shared/ui/Form/FormError'
import { FormSuccess } from '@/shared/ui/Form/FormSuccess'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import s from './EditProfile.module.scss'

type FormSchema = z.infer<typeof updateUserProfileSchema>
  const EditProfile = ({data, className, btnClass = ''}:{className: any, data: any, btnClass?: string}) => {
		const [formError, setFormError] = useState('')
		const [formSuccess, setFormSuccess] = useState('')
		const {name, surname, email, phone, whatsapp, telegram, patronymic} = data;
		const {handleSubmit, register, formState:{ isDirty, isSubmitting, errors }} = useForm<FormSchema>({
			defaultValues: {
				name: name ?? "",
				surname: surname ?? "",
				patronymic: patronymic ?? "",
				phone,
				email,
				whatsapp,
				telegram
			},
			resolver: zodResolver(updateUserProfileSchema)
		})

		async function onSubmit(data: FormSchema) {
			setFormSuccess('')
			setFormError('')
			const {success, error} = await updateUserProfile(data)
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
				<FormHeader title='Учётные данные' description='Вы можете изменить свои личные данные'/>
				<Form action={handleSubmit(onSubmit)}>
				<Input registerName='surname' register={register} errors={errors.email} type='text' placeholder='Фамилия' />
				<Input registerName='name' register={register} errors={errors.email} type='text' placeholder='Имя' />
				<Input registerName='patronymic' register={register} errors={errors.patronymic} type='text' placeholder='Отчество' />
				<Input registerName='email' register={register} errors={errors.email} type='email' placeholder='Электронная почта' />
				<Input registerName='phone' register={register} errors={errors.email} type='text' placeholder='Номер телефона' />
				<CheckboxForm registerName='whatsapp' register={register} errors={errors.whatsapp} labelText='WhatsApp привязан к телефону'/>
				<CheckboxForm registerName='telegram' register={register} errors={errors.telegram} labelText='Telegram привязан к телефону'/>
				{ formSuccess || formError ? 
				(	
				<FormFooter>
					<FormSuccess successMessage={formSuccess} className={s.Notify}/>
					<FormError errorMessage={formError} className={s.Notify}/>
				</FormFooter>)
				: null
				}
			
					<FormSubmit
						className={btnClass}
						title='Сохранить' 
						isDisabled={!isDirty || isSubmitting}       
						isSubmitting={isSubmitting}
					/>
				</Form>
		</FormContainer>
	)
}

export default EditProfile
