import { BonusType, Role } from '@prisma/client'
import { z } from "zod"
import { BonusDbSchema } from './validation/bonus'

export const signInSchema = z.object({
  email: z.string().email("Неккоректно введен Email.").nonempty("Обязательное поле."),
  password: z.string().min(8, "Минимальная длинна пароля 8 символом").max(20,"Максимальная длинна пароля 20 символов.").nonempty("Обязательное поле."),
})

export const signUpSchema = z.object({
  email: z.string().email("Неккоректно введен Email").nonempty(),
  name: z.string().min(1).max(30).optional(),
  surname: z.string().min(1).max(30).optional(),
  password: z.string().min(8, "Минимальная длинна пароля 8 символом").max(20,"Максимальная длинна пароля 20 символов").nonempty(),
  phone:z.string().min(11).max(11).nonempty('Обязательное поле')
})

export const profilePassword = z.object({
  password: z.string().min(8, "Минимальная длинна пароля 8 символом").max(20,"Максимальная длинна пароля 20 символов").nonempty(),
  confirmPassword:z.string().min(8).max(20)
}).refine((data) => data.password === data.confirmPassword, {
  message:"Пароли не совпадают",
  path:['confirmPassword']
})

export const recoveryEmail = z.object({
  email: z.string().email("Неккоректно введен Email").nonempty("Обязательное поле"),
})

export const productFormSchema = z.object({
  productId: z.string(),
  name: z.string(),
  price: z.number(),
  image: z.string(),
  color: z.string(),
  size: z.string(),
  quantity: z.number(),
})

// type PaymentType = 'TRANSFER' | 'DEFFERED'
// export const PaymentType  = ['TRANSFER', 'DEFFERED'] as const
export enum PaymentEnum {
  TRANSFER = 'TRANSFER',
  DEFFERED = 'DEFFERED',
}

export enum DeliveryEnum {
  CDEK = 'CDEK',
  MAILRUSSIA = 'MAILRUSSIA',
  YANDEX = 'YANDEX',
  FIVEPOST = 'FIVEPOST',
  COURIER = 'COURIER'
}

export const makeOrderSchema = z.object({
  payment:z.nativeEnum(PaymentEnum),
  delivery:z.nativeEnum(DeliveryEnum),
  name: z.string().min(1).max(30).nonempty(),
  surname: z.string().min(1).max(30).nonempty(),
  phone:z.string().max(11).nonempty(),
  email: z.string().email("Неккоректно введен Email").nonempty(),
  comment: z.string().max(300,"Максимальная длинна 300 символов"),
  promocode: z.string().optional()
})


const userRoleSchema= z.nativeEnum(Role)

// const userRoleSchema = z.union([
//   z.literal('admin'),
//   z.literal('user'),
// ])

const userStatusSchema = z.union([
  z.literal('active'),
  z.literal('inactive'),
  z.literal('invited'),
  z.literal('suspended'),
])
export type UserStatus = z.infer<typeof userStatusSchema>

export const userSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  surname: z.string().nullable(),
  email: z.string(),
  phone: z.string(),
  purchasesAmount: z.number(),
  role: userRoleSchema,
  Bonus: BonusDbSchema.array(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
export type User = z.infer<typeof userSchema>
export const userListSchema = z.array(userSchema)


export const orderAdminSchema = z.object({
  id: z.string(),
  userId: z.string(),
  payment:z.nativeEnum(PaymentEnum),
  delivery:z.nativeEnum(DeliveryEnum),
  products:z.string(),
  details:z.string(),
  promocodeValue: z.string().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
export type OrderAdmin = z.infer<typeof orderAdminSchema>
export const orderListSchema = z.array(orderAdminSchema)

export const specificationAdminSchema = z.object({
  id: z.string(),
  name:z.string(),
  slug:z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
export type SpecificationAdmin = z.infer<typeof specificationAdminSchema>
export const specificationListSchema = z.array(specificationAdminSchema)

export const filterAdminSchema = z.object({
  id: z.string(),
  name:z.string(),
  slug:z.string(),
  material:z.any().nullish(),
  print:z.any().nullish(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
export type FilterAdmin = z.infer<typeof filterAdminSchema>
export const filterListSchema = z.array(filterAdminSchema)


export const productAdminSchema = z.object({
  id: z.string().default(''),
  name:z.string(),
  slug:z.string(),
  isActive:z.boolean().default(true),
  isNew:z.boolean().default(false),
  isBestseller:z.boolean().default(false),
  isInStock:z.boolean().default(true),
  articleNumber:z.string(),
  description:z.string(),
  adPrice:z.number(),
  price:z.number(),
  images:z.any(),
  details:z.any(),
  category :z.any(),
  band:z.any(),
  genre:z.any(),
  manufacturer:z.any(),
  colors:z.any(),
  sizes:z.any(),
  material: z.any(),
  print: z.any(),
  country: z.any(),
  createdAt: z.coerce.date().nullish(),
  updatedAt: z.coerce.date().nullish(),
})
export type ProductAdmin = z.infer<typeof productAdminSchema>
export const productListSchema = z.array(productAdminSchema)

export const faqAdminSchema = z.object({
  id: z.string().optional(),
  question:z.string(),
  answer:z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
})
export type FAQAdmin = z.infer<typeof faqAdminSchema>
export const FAQListSchema = z.array(faqAdminSchema)

export const adAdminSchema = z.object({
  id: z.string().optional(),
  url: z.string(),
  mobileUrl: z.string(),
  alt: z.string(),
  link: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
})
export type AdAdmin = z.infer<typeof adAdminSchema>
export const AdListSchema = z.array(adAdminSchema)

export const bonusSchema = z.object({
    id: z.string(),
    status:z.nativeEnum(BonusType),
    history: z.any(),
    amount:z.number(),
    userId: z.string()
})
export type Bonus = z.infer<typeof bonusSchema>