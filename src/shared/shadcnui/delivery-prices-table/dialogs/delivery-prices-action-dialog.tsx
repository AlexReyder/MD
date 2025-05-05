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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/shadcnui/ui/select"
import { DeliveryPricesDb, UpdateDeliveryPrices, UpdateDeliveryPricesSchema } from '@/shared/types/validation/delivery-prices'
import { zodResolver } from '@hookform/resolvers/zod'
import { DeliveryType } from '@prisma/client'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'


interface Props {
  currentRow?: DeliveryPricesDb
  open: boolean
  onOpenChange: (open: boolean) => void
  data: DeliveryPricesDb[]
}

export function DeliveryPricesActionDialog({ currentRow, open, onOpenChange, data }: Props) {
  const [availableDeliver, setAvailableDeliver] = useState()
  useEffect(() => {
    if(data.length > 0){
      const delivery = Object.values(DeliveryType)
      const leftover = Object.values(DeliveryType).filter((item) => )
    }
  },[])

  const isEdit = !!currentRow
  const form = useForm<UpdateDeliveryPrices>({
    resolver: zodResolver(UpdateDeliveryPricesSchema),
    defaultValues: isEdit
      ? {
          ...currentRow,
        }
      : {
          id: '',
        },
  })
  const onSubmit = async (values: UpdateDeliveryPrices) => {

      const {success, error} = await upsertDeliveryPrice(values)
      form.reset()
      const toastMessage = isEdit ? 'Успешно изменено' : 'Успешно добавлено'
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
        <DialogContent className='sm:max-w-lg'>
          <DialogHeader className='text-left'>
            <DialogTitle>{isEdit ? `Изменить параметры доставки` : `Добавить параметры доставки`}</DialogTitle>
          </DialogHeader>
          <div className='-mr-4 h-[26.25rem] w-full overflow-y-auto py-1 pr-4'>
            <Form {...form}>
              <form
                id='filter-form'
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4 p-0.5'
              >
                {/* <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                      <FormLabel className='col-span-2 text-right'>
                       Название
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
                  name='deliver'
                  render={({ field }) => (
                    <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                      <FormLabel className='col-span-2 text-right'>
                        Доставка
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите доставку" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {materialsData?.map((material) =>  <SelectItem key={material.id} value={material.id}>{material.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                      <FormMessage className='col-span-4 col-start-3' />
                    </FormItem>
                  )}
                  /> */}

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