import { Product } from '@/entities/Product/Product'
import { Breadcrumbs } from '@/features'
import { getOneProduct } from '@/shared/api/catalog'
import { Section } from '@/shared/ui'
import { ErrorPageTemplate } from '@/templates'

export default async function ProductPage({
  params,
  searchParams
}: {
  params: Promise<{ productId: string }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { productId } = await params
  const color = (await searchParams).color as string | undefined;
  const {success, error} = await getOneProduct(productId);
  // if(color){
  //   if(!success?.colors.includes(color)){
  //     notFound()
  //   }
  // } else {
  //   redirect(`?color=${success?.colors[0]}`)
  // }
  return (
    <main>
      <Section>
        {
          success ? 
          (
           <>
            <Breadcrumbs/>
            <Product product={success}/>
           </>
          ) 
          :
          <ErrorPageTemplate/>
        }

      </Section>
    </main>
  )
}