import { getDeliveryPrices } from '@/shared/api/admin/delivery-prices'
import DeliveryPricesProvider from '@/shared/context/delivery-prices-context'
import { columns } from '@/shared/shadcnui/delivery-prices-table/delivery-prices-columns'
import { DeliveryPricesTable } from '@/shared/shadcnui/delivery-prices-table/delivery-prices-table'
import { DeliveryPricesDialogs } from '@/shared/shadcnui/delivery-prices-table/dialogs/delivery-prices-dialogs'
import { ErrorTemplate } from '@/shared/shadcnui/layouts/error-template'
import { Main } from '@/shared/shadcnui/layouts/main'
import { ValidateDeliveryPricesDbSchema } from '@/shared/types/validation/delivery-prices'

export default async function AdminDeliveryPricesPage() {
	const deliveryPricesData = await getDeliveryPrices()
	const data = ValidateDeliveryPricesDbSchema.parse(deliveryPricesData.success)

	return(
			<>
					{deliveryPricesData.error === null ? 
						<DeliveryPricesProvider>
									<Main>
										<div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
												<div>
															<h2 className='text-2xl font-bold tracking-tight'>
																Стоимость доставки и сроки
															</h2>
															<p className='text-muted-foreground'>
																Управление стоимостью и сроками доставки товара.
															</p>
												</div>
										</div>
										<div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
												<DeliveryPricesTable data={data} columns={columns}/>
										</div>
									</Main>
									<DeliveryPricesDialogs/>
						</DeliveryPricesProvider>
					: <ErrorTemplate/>}
					</>
	)
}

