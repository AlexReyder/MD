'use client'

import { updateOrder } from '@/shared/api/admin/orders'
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
import { orderStatusTypes } from '@/shared/types/user'
import { OrderDb, OrderDbUpdate, OrderDbUpdateSchema } from '@/shared/types/validation/order'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import { SelectDropdown } from '../../select-dropdown'


interface Props {
	currentRow?: OrderDb
	open: boolean
	onOpenChange: (open: boolean) => void
}

export function OrderUpdateDialog({ currentRow, open, onOpenChange }: Props) {
	const form = useForm<OrderDbUpdate>({
		resolver: zodResolver(OrderDbUpdateSchema),
		defaultValues: 
				{
					...currentRow,
					trackNumber: currentRow?.trackNumber ?? ''
				}
	})

	const onSubmit = async (values: OrderDbUpdate) => {
			const {success, error} = await updateOrder(values)

			if(success){
				toast.success('Заказ успешно обновлен!')
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
						Обновить заказ
						</DialogTitle>
					</DialogHeader>
					<div className='-mr-4 h-[26.25rem] w-full overflow-y-auto py-1 pr-4'>
						<Form {...form}>
							<form
								id='order-form'
								onSubmit={form.handleSubmit(onSubmit)}
								className='space-y-4 p-0.5'
							>
								<FormField
									control={form.control}
									name='trackNumber'
									render={({ field }) => (
										<FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
											<FormLabel className='col-span-2 text-right'>
											 Трек-номер
											</FormLabel>
											<FormControl>
												<Input
													placeholder='Трек-номер'
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
									name='status'
									render={({ field }) => (
										<FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
											<FormLabel className='col-span-2 text-right'>
											 Статус
											</FormLabel>
											<FormControl>
												<SelectDropdown
													defaultValue={field.value}
													onValueChange={field.onChange}
													placeholder='Статус'
													className='col-span-4'
													items={orderStatusTypes.map(({ label, value }) => ({
														label,
														value,
													}))}
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
						<Button type='submit' form='order-form'>
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