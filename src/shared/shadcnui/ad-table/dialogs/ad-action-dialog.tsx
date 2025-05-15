'use client'

import { upsertAd } from '@/shared/api/admin/ad'
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
import { AdAdmin } from '@/shared/types/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import { z } from 'zod'
import { AdsFileUploader } from '../ad-upload'

const formSchema = z
  .object({
    id: z.string(),
    alt: z.string().min(6, { message: 'Обязательное поле. Минимум 6 символов.' }),
    link: z.string().min(6, { message: 'Обязательное поле. Минимум 6 символов.' }),
    url: z.string(),
    mobileUrl: z.string()
  })

export type AdAdminForm = z.infer<typeof formSchema>

interface Props {
  currentRow?: AdAdmin
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AdActionDialog({ currentRow, open, onOpenChange }: Props) {
  const [image, setImage] = useState<string>(currentRow?.url ?? '')
  const [imageMobile, setImageMobile] = useState<string>(currentRow?.mobileUrl ?? '')
  const isEdit = !!currentRow
  const form = useForm<AdAdminForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
          ...currentRow,
					alt: currentRow.alt,
					link: currentRow.link,
					url: currentRow.url,
          mobileUrl: currentRow.mobileUrl
        }
      : {
          id: '',
          alt: '',
					link: '',
					url: '',
          mobileUrl: ''
        },
  })

  const onSubmit = async (values: AdAdminForm) => {
      values.url = image
      values.mobileUrl = imageMobile
      const {success, error} = await upsertAd(values)
      form.reset()
      const toastMessage = isEdit ? 'Баннер успешно изменен' : 'Баннер успешно добавлен'
      if(success){
        toast.success(toastMessage)
      }
      if(error){
        toast.error('Произошла ошибка')
      }
      setImage('')
      setImageMobile('')
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
        <DialogContent className='sm:max-w-xl'>
          <DialogHeader className='text-left'>
            <DialogTitle>
              {isEdit? `Изменить баннер` : `Добавить баннер`}
            </DialogTitle>
          </DialogHeader>
          <div className='-mr-4 h-[26.25rem] w-full overflow-y-auto py-1 pr-4'>
            <Form {...form}>
              <form
                id='filter-form'
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4 p-0.5'
              >
                <FormField
                  control={form.control}
                  name='alt'
                  render={({ field }) => (
                    <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                      <FormLabel className='col-span-2 text-right'>
                       Заголовок (SEO)
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder=''
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
                  name='link'
                  render={({ field }) => (
                    <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                      <FormLabel className='col-span-2 text-right'>
                        Ссылка на рекламу
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder=''
                          className='col-span-4'
                          autoComplete='off'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className='col-span-4 col-start-3' />
                    </FormItem>
                  )}
                  />
                   <p className='text-muted-foreground'>
										Разрешение изображения для десктопной версии 1920x480
									</p>
                <AdsFileUploader value={image} onValueChange={setImage} text='десктопной версии'/>
                 <p className='text-muted-foreground'>
									Разрешение изображения для мобильной версии 720 x 320
								</p>
                <AdsFileUploader value={imageMobile} onValueChange={setImageMobile} text='мобильной версии'/>

              </form>
  
            </Form>
          </div>
          <DialogFooter>
            <Button type='submit' form='filter-form'>
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