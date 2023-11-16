import { z } from 'zod'

export const formSchema = z.object({
  name: z.string().refine((data) => data.length > 0, {
    message: 'O nome do produto não pode ser vazio',
  }),
  quantity: z.string().refine((data) => data !== '0' && data.length > 0, {
    message: 'Por favor insira uma quantidade',
  }),
  price: z.string().refine((data) => data !== '0' && data.length > 0, {
    message: 'Por favor insira o preço',
  }),
  categoryId: z.string().uuid(),
  description: z.string(),
})
