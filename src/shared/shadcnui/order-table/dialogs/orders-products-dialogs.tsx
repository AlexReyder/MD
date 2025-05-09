'use client'

import { getItemsPurePrice } from '@/entities/OrderInfoBlock/OrderInfoBlock'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle
} from '@/shared/shadcnui/ui/dialog'
import { OrderDb } from '@/shared/types/validation/order'
import Image from 'next/image'
import { Card } from '../../ui/card'


interface Props {
	currentRow?: OrderDb
	open: boolean
	onOpenChange: (open: boolean) => void
}

export function OrderProductsDialog({ currentRow, open, onOpenChange }: Props) {
	const purePrice = currentRow?.products ? getItemsPurePrice(currentRow.products) : ''
	return (
		<>
		<Dialog
				open={open}
				onOpenChange={(state) => {
					onOpenChange(state)
				}}
			>
				<DialogContent className='sm:max-w-6xl h-8/9 block'>
					<DialogHeader className='text-left'>
						<DialogTitle>
						Список товары
						</DialogTitle>
					</DialogHeader>
					{/* <ScrollArea> */}
					<div className='h-full w-full overflow-y-auto py-1 pr-4 mt-6'>
						{
							currentRow?.products.map((product) => {
								return (
									<Card key={product.productId + product.color + product.size} className='px-2 py-2 flex mb-4'>
										<Image src={product.image} alt={product.name} width={100} height={100}/>
										<div>
										<div className='flex items-center gap-2'>
											<h4 className="leading-7 font-semibold tracking-tight">Товар: </h4>
											<p className="leading-7">{product.name}</p>
										</div>
										<div className='flex items-center gap-2'>
											<h4 className="leading-7 font-semibold tracking-tight">Цвет: </h4>
											<p className="leading-7">{product.color}</p>
										</div>
										<div className='flex items-center gap-2 mt-1'>
											<h4 className="leading-7 font-semibold tracking-tight">Размер: </h4>
											<p className="leading-7">{product.size}</p>
										</div>
										<div className='flex items-center gap-2 mt-1'>
											<h4 className="leading-7 font-semibold tracking-tight">Количество: </h4>
											<p className="leading-7">{product.quantity}</p>
										</div>
										<div className='flex items-center gap-2 mt-1'>
											<h4 className="leading-7 font-semibold tracking-tight">Цена: </h4>
											<p className="leading-7">{product.price}</p>
										</div>
										</div>
									</Card>
								)
							})
						}
						<h3 className='mt-6 font-bold text-xl'>Итого: {purePrice}</h3>
					</div>
					{/* </ScrollArea> */}
				</DialogContent>
		</Dialog>
		</>
	)
}