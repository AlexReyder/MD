"use client"
import { signUp } from '@/shared/api/auth'
import { signUpSchema } from '@/shared/types/schemas'
import { Form, FormContainer, FormFooter, FormHeader, FormSubmit, Input } from '@/shared/ui'
import { FormError } from '@/shared/ui/Form/FormError'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type FormSchema = z.infer<typeof signUpSchema>

const AuthPopupRegistration = ({className = ''}: {className?: string}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const router = useRouter()
  const {handleSubmit, register, formState:{ isDirty, isSubmitting, errors }} = useForm<FormSchema>({
      defaultValues: {
        name:"",
        surname:"",
        phone:"",
        email: "",
        password: "",
      },
      resolver: zodResolver(signUpSchema)
    })

    async function onSubmit(data: FormSchema) {
      const {success, error} = await signUp(data)
      if(success){
        router.push('/signin')
      }
      setErrorMessage(error)
    }


  return (

      <FormContainer className={className}>
      <FormHeader title='Регистрация' description='Создать аккаунт'/>   
        <Form action={handleSubmit(onSubmit)}>
        <Input registerName='name' register={register} errors={errors.email} type='text' placeholder='Имя' />
        <Input registerName='surname' register={register} errors={errors.email} type='text' placeholder='Фамилия' />
        <Input registerName='email' register={register} errors={errors.email} type='email' placeholder='Электронная почта' />
        <Input registerName='phone' register={register} errors={errors.email} type='text' placeholder='Номер телефона' />
        <Input registerName='password' register={register} errors={errors.password} type='password' placeholder='Пароль' />
        <FormSubmit 
                title='Создать' 
                isDisabled={!isDirty || isSubmitting}       
                isSubmitting={isSubmitting}
        />
        <FormFooter>
        <FormError errorMessage={errorMessage}/>
        <span className='inner__bottom__text'>
               Уже есть аккаунт?
              </span>
              <Link
                href='/signin'
                className='btn-reset inner__switch'
              >
               Войти!
              </Link>
        </FormFooter>
        </Form>
      </FormContainer>
  )
}

export default AuthPopupRegistration
