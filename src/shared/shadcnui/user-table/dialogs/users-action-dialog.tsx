'use client'

import { upsertUser } from '@/shared/api/admin/users'
import { PasswordInput } from '@/shared/shadcnui/password-input'
import { SelectDropdown } from '@/shared/shadcnui/select-dropdown'
import { Button } from '@/shared/shadcnui/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/shared/shadcnui/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/shadcnui/ui/form'
import { Input } from '@/shared/shadcnui/ui/input'
import { User } from '@/shared/types/schemas'
import { bonusStatusAdminForm, userTypes } from '@/shared/types/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { BonusType, Role } from '@prisma/client'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import { z } from 'zod'

const formSchema = z
  .object({
    id: z.string(),
    name: z.string().min(1, { message: 'First Name is required.' }).nullable(),
    surname: z.string().min(1, { message: 'Last Name is required.' }).nullable(),
    phone: z.string().min(1, { message: 'Phone number is required.' }),
    email: z
      .string()
      .min(1, { message: 'Email is required.' })
      .email({ message: 'Email is invalid.' }),
    password: z.string().transform((pwd) => pwd.trim()),
    role: z.nativeEnum(Role),
    confirmPassword: z.string().transform((pwd) => pwd.trim()),
    Bonus: z.object({
      id: z.string().default(''),
      status:z.nativeEnum(BonusType),
    }),
    isEdit: z.boolean(),
  })
  .superRefine(({ isEdit, password, confirmPassword }, ctx) => {
    if (!isEdit || (isEdit && password !== '')) {
      if (password === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Password is required.',
          path: ['password'],
        })
      }

      if (password.length < 8) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Password must be at least 8 characters long.',
          path: ['password'],
        })
      }

      if (!password.match(/[a-z]/)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Password must contain at least one lowercase letter.',
          path: ['password'],
        })
      }

      if (!password.match(/\d/)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Password must contain at least one number.',
          path: ['password'],
        })
      }

      if (password !== confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Passwords don't match.",
          path: ['confirmPassword'],
        })
      }
    }
  })
export type UserForm = z.infer<typeof formSchema>

interface Props {
  currentRow?: User
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UsersActionDialog({ currentRow, open, onOpenChange }: Props) {
  const isEdit = !!currentRow
  const form = useForm<UserForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
          ...currentRow,
					name: currentRow.name ?? '',
					surname: currentRow.surname ?? '',
          Bonus: currentRow.Bonus[0],
          password: '',
          confirmPassword: '',
          isEdit,
        }
      : {
          id:'',
          name: '',
          surname: '',
          email: '',
          role: Role.USER,
          Bonus:{
            id:'',
            status:BonusType.BRONZE
          },
          phone: '',
          password: '',
          confirmPassword: '',
          isEdit,
        },
  })

  const onSubmit = async (values: UserForm) => {
 
    const {success, error} = await upsertUser(values)
    form.reset()
     const toastMessage = isEdit ? 'Пользователь успешно изменен' : 'Пользватель успешно добавлен'
          if(success){
            toast.success(toastMessage)
          }
    
          if(error){
            toast.error('Произошла ошибка')
          }

    onOpenChange(false)
  }

  const isPasswordTouched = !!form.formState.dirtyFields.password

  return (
    <>
        <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader className='text-left'>
          <DialogTitle>{isEdit ? 'Изменить пользователя' : 'Зарегистрировать нового пользователя'}</DialogTitle>
        </DialogHeader>
        <div className='-mr-4 h-[26.25rem] w-full overflow-y-auto py-1 pr-4'>
          <Form {...form}>
            <form
              id='user-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 p-0.5'
            >
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                     Имя
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Имя'
                        className='col-span-4'
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='surname'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      Фамилия
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Фамилия'
                        className='col-span-4'
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Email'
                        className='col-span-4'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      Номер телефона
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='+123456789'
                        className='col-span-4'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='role'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      Роль
                    </FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder='Роль'
                      className='col-span-4'
                      items={userTypes.map(({ label, value }) => ({
                        label,
                        value,
                      }))}
                    />
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='Bonus.status'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-left'>
                      Программа лояльности
                    </FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder='Программа лояльности'
                      className='col-span-4'
                      items={bonusStatusAdminForm.map(({ label, value }) => ({
                        label,
                        value,
                      }))}
                    />
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      Пароль
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder='Пароль'
                        className='col-span-4'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      Повторите пароль
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        disabled={!isPasswordTouched}
                        placeholder='Повторите пароль'
                        className='col-span-4'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button type='submit' form='user-form'>
           Сохранить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
     <Toaster
          position="bottom-right"
          reverseOrder={false}
          toastOptions={{duration:3000}}
        />
    </>
  )
}