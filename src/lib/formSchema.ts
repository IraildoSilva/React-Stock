import { z } from 'zod'

export const formSchema = z.object({
  name: z.string(),
  quantity: z.string(),
  price: z.string(),
  categoryId: z.string().uuid(),
  description: z.string(),
})
