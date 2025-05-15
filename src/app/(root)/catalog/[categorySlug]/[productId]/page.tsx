import { Product } from '@/entities/Product/Product'
import { Breadcrumbs } from '@/features'
import { getOneProduct } from '@/shared/api/catalog'
import { ProductsDb } from '@/shared/types/validation/products'
import { Section } from '@/shared/ui'
import { ErrorPageTemplate } from '@/templates'
import slug from 'slug'

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>
}) {
  const { productId } = await params
  const {success} = await getOneProduct(productId);
  const jsonLd = {
  "@context": "https://schema.org/", 
  "@type": "Product", 
  "name": success.name,
  "description": success.description,
  "brand": {
    "@type": "Maldito",
    "name": success.name
  },
  "sku": success.articleNumber,
  "offers": {
    "@type": "Offer",
    "url": `https://maldito.ru/${success.category[0].value}/${slug(success.name)}`,
    "priceCurrency": "RUB",
    "availability": "https://schema.org/InStock",
    "itemCondition": "https://schema.org/NewCondition"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "ratingCount": "0"
  }
  }
  
  return (
    <main>
      <Section>
        {
          success ? 
          (
           <>
            <Breadcrumbs name={success.name as string}/>
            <Product product={success as ProductsDb}/>
           </>
          ) 
          :
          <ErrorPageTemplate/>
        }
       <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      </Section>
    </main>
  )
}