'use client'

import { upsertDeliveryPrice } from '@/shared/api/admin/delivery-prices'
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
import { DeliveryPricesDb, UpdateDeliveryPrices, UpdateDeliveryPricesSchema } from '@/shared/types/validation/delivery-prices'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'


interface Props {
  currentRow?: DeliveryPricesDb
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DeliveryPricesActionDialog({ currentRow, open, onOpenChange }: Props) {


  const form = useForm<UpdateDeliveryPrices>({
    resolver: zodResolver(UpdateDeliveryPricesSchema),
    defaultValues: {
      id: currentRow?.id ?? '',
      CDEK: currentRow?.CDEK ?? 0,
      CDEKdays: currentRow?.CDEKdays ?? '',
      YANDEX: currentRow?.YANDEX ?? 0,
      YANDEXdays: currentRow?.YANDEXdays ?? '',
      MAILRUSSIA: currentRow?.MAILRUSSIA ?? 0,
      MAILRUSSIAdays: currentRow?.MAILRUSSIAdays ?? '',
      FIVEPOST: currentRow?.FIVEPOST ?? 0,
      FIVEPOSTdays: currentRow?.FIVEPOSTdays ?? '',
      COURIER: currentRow?.COURIER ?? 0,
      COURIERdays: currentRow?.COURIERdays ?? '',
    }
  })
  const onSubmit = async (values: UpdateDeliveryPrices) => {

      const {success, error} = await upsertDeliveryPrice(values)
      form.reset()
      const toastMessage = 'Успешно изменено'
      if(success){
        toast.success(toastMessage)
      }
      if(error){
        toast.error('Произошла ошибка')
      }
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
        <DialogContent className='sm:max-w-6xl'>
          <DialogHeader className='text-left'>
            <DialogTitle>Обновление стоимости и сроков доставки</DialogTitle>
          </DialogHeader>
          <div className='-mr-4 h-[26.25rem] w-full overflow-y-auto py-1 pr-4'>
            <Form {...form}>
              <form
                id='delivery-prices-form'
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4 p-0.5'
              >
                <div className='flex flex-col gap-1 mb-6'>
                <FormField
                  control={form.control}
                  name='CDEK'
                  render={({ field }) => (
                    <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                      <FormLabel className='col-span-2 text-left'>
                      Стоимость доставки CDEK:
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
                  name='CDEKdays'
                  render={({ field }) => (
                    <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                      <FormLabel className='col-span-2 text-left'>
                      Срок доставки CDEK:
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
                </div>
                <div className='flex flex-col gap-1 mb-6'>
                <FormField
                  control={form.control}
                  name='MAILRUSSIA'
                  render={({ field }) => (
                    <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                      <FormLabel className='col-span-2 text-left'>
                      Стоимость доставки Почты России:
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
                  name='MAILRUSSIAdays'
                  render={({ field }) => (
                    <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                      <FormLabel className='col-span-2 text-left'>
                      Срок доставки Почты России:
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
                </div>
                <div className='flex flex-col gap-1 mb-6'>
                <FormField
                  control={form.control}
                  name='YANDEX'
                  render={({ field }) => (
                    <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                      <FormLabel className='col-span-2 text-left'>
                      Стоимость доставки Яндекс Доставка:
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
                  name='YANDEXdays'
                  render={({ field }) => (
                    <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                      <FormLabel className='col-span-2 text-left'>
                      Срок доставки Яндекс Доставка:
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
                </div>
                <div className='flex flex-col gap-1 mb-6'>
                <FormField
                  control={form.control}
                  name='FIVEPOST'
                  render={({ field }) => (
                    <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                      <FormLabel className='col-span-2 text-left'>
                      Стоимость доставки 5POST:
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
                  name='FIVEPOSTdays'
                  render={({ field }) => (
                    <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                      <FormLabel className='col-span-2 text-left'>
                      Срок доставки 5POST:
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
                </div>
                <div className='flex flex-col gap-1 mb-6'>
                <FormField
                  control={form.control}
                  name='COURIER'
                  render={({ field }) => (
                    <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                      <FormLabel className='col-span-2 text-left'>
                      Стоимость доставки курьером:
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
                  name='COURIERdays'
                  render={({ field }) => (
                    <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                      <FormLabel className='col-span-2 text-left'>
                      Срок доставки курьером:
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
                </div>
              </form>
  
            </Form>
          </div>
          <DialogFooter>
            <Button type='submit' form='delivery-prices-form'>
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