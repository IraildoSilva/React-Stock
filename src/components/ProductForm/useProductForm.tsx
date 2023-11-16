import * as z from 'zod'
import { formSchema } from '@/lib/formSchema'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IProductFormProps } from '.'
import { zodResolver } from '@hookform/resolvers/zod'

export default function useProductForm({
  product,
  onSubmit,
}: IProductFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  let defaultValues

  if (!product) {
    defaultValues = {
      name: '',
      quantity: '0',
      price: '0',
      categoryId: '',
      description: '',
    }
  } else {
    defaultValues = {
      name: product.name,
      quantity: product.quantity.toString(),
      price: product.price.toString(),
      categoryId: product.category.id ?? '',
      description: product.description,
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  async function handleSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)

    await onSubmit(data)

    setIsLoading(false)
  }

  return {
    form,
    handleSubmit,
    isLoading,
  }
}
