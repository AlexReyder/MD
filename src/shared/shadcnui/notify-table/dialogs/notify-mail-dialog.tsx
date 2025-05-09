'use client'

import { mailNotify } from '@/shared/api/admin/notify'
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
import { NotifyProductsDb, NotifyProductsMail, NotifyProductsMailSchema } from '@/shared/types/validation/notify-products'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import { Textarea } from '../../ui/textarea'


interface Props {
  currentRow?: NotifyProductsDb
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NotifyMailDialog({ currentRow, open, onOpenChange }: Props) {
  const form = useForm<NotifyProductsMail>({
    resolver: zodResolver(NotifyProductsMailSchema),
    defaultValues: 
        {
          ...currentRow,
          mailTitle: '',
          mailBody: ''
        }
  })

  const onSubmit = async (values: NotifyProductsMail) => {
      const {success, error} = await mailNotify(values)

      if(success){
        toast.success('Уведомление успешно отправлено на почту!')
      }
      
      if(error){
        toast.error('Произошла ошибка')
      }

      form.reset()
      onOpenChange(false)
  }

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
            <DialogTitle>
              Отправить уведомление на почту
            </DialogTitle>
            <p className='text-muted-foreground'>
							Вы можете отправить уведомление  на электронную почту клиента о поступлении товара.
							</p>
          </DialogHeader>
          <div className='-mr-4 h-[26.25rem] w-full overflow-y-auto py-1 pr-4'>
            <Form {...form}>
              <form
                id='promo-form'
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4 p-0.5'
              >
                <FormField
                  control={form.control}
                  name='mailTitle'
                  render={({ field }) => (
                    <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                      <FormLabel className='col-span-2 text-right'>
                       Заголовок письма
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Заголовок'
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
                  name='mailBody'
                  render={({ field }) => (
                    <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                      <FormLabel className='col-span-2 text-right'>
                       Тело письма
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='Сообщение'
                          className='col-span-4'
                          autoComplete='off'
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
            <Button type='submit' form='promo-form'>
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