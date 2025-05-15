import { getAllProducts } from '@/shared/api/catalog'
import { MetadataRoute } from "next"
import slug from 'slug'
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const defaultPages = [
    {
      url: "https://maldito.ru",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1
    },
    {
      url: "https://maldito.ru/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9
    },
    {
      url: "https://maldito.ru/cart",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9
    },
		{
      url: "https://maldito.ru/catalog",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1
    },
		{
      url: "https://maldito.ru/catalog/futbolki",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1
    },
		{
      url: "https://maldito.ru/catalog/longslivy",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1
    },
		{
      url: "https://maldito.ru/catalog/flagi",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1
    },
		{
      url: "https://maldito.ru/catalog/nashivki",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1
    },
		{
      url: "https://maldito.ru/contacts",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9
    },
    {
      url: "https://maldito.ru/delivery",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9
    },
		{
      url: "https://maldito.ru/faq",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9
    },
		{
      url: "https://maldito.ru/order",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9
    },
		{
      url: "https://maldito.ru/profile",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9
    },
		{
      url: "https://maldito.ru/profile/general",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9
    },
			{
      url: "https://maldito.ru/profile/orders",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9
    },
		{
      url: "https://maldito.ru/profile/bonus",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9
    },
			{
      url: "https://maldito.ru/profile/password",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9
    },
		{
      url: "https://maldito.ru/return",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1
    },
			{
      url: "https://maldito.ru/signin",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9
    },
		{
      url: "https://maldito.ru/signup",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9
    },
  ];
 
  const products = await getAllProducts();
	const productsSitemap: any[] = []
  if(products && products.length > 0){
	products.forEach((e) => (
		productsSitemap.push({
				url: `https://maldito.ru/${e.category[0].value}/${slug(e.name)}`,
				lastModified: e.updatedAt,
				changeFrequency: "daily",
				priority: 0.8
			})
	))
	}
 
  const sitemap = [
    ...defaultPages,
    ...productsSitemap,
  ];
 
  return sitemap;
}