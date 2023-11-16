import * as z from 'zod'
import { formSchema } from '@/lib/formSchema'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { IProductFormProps } from '.'
import { zodResolver } from '@hookform/resolvers/zod'
import { categoryService } from '@/services/Category/CategoryService'
import { ICategoryType } from '@/@types/CategoryType'

export default function useProductForm({
  product,
  onSubmit,
}: IProductFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [categories, setCategories] = useState<ICategoryType[]>([])
  const [isLoadingCategories, setIsLoadingCategories] = useState(true)

  let defaultValues

  if (!product) {
    defaultValues = {
      name: '',
      quantity: '',
      price: '',
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

  useEffect(() => {
    async function loadCategories() {
      try {
        setIsLoadingCategories(true)
        const data = await categoryService.get('/categories')

        setCategories(data)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoadingCategories(false)
      }
    }

    loadCategories()
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  async function handleSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)

    console.log(data)
    await onSubmit(data)

    setIsLoading(false)
  }

  return {
    form,
    handleSubmit,
    isLoading,
    categories,
    isLoadingCategories,
  }
}
