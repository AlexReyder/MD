'use client'

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle
} from '@/shared/shadcnui/ui/dialog'
import { OrderDb } from '@/shared/types/validation/order'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import Image from 'next/image'
import { Card } from '../../ui/card'


interface Props {
	currentRow?: OrderDb
	open: boolean
	onOpenChange: (open: boolean) => void
}

export function OrderProductsDialog({ currentRow, open, onOpenChange }: Props) {
	return (
		<>
		<Dialog
				open={open}
				onOpenChange={(state) => {
					onOpenChange(state)
				}}
			>
				<DialogContent className='sm:max-w-lg'>
					<DialogHeader className='text-left'>
						<DialogTitle>
						Список товары
						</DialogTitle>
					</DialogHeader>
					<ScrollArea>
					<div className='-mr-4 h-[26.25rem] w-full overflow-y-auto py-1 pr-4'>
						{
							currentRow?.products.map((product) => {
								return (
									<Card key={product.productId + product.color + product.size} className='px-2 py-2'>
										<Image src={product.image} alt={product.name} width={100} height={100}/>
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
									</Card>
								)
							})
						}
					</div>
					</ScrollArea>
				</DialogContent>
		</Dialog>
		</>
	)
}