import * as z from 'zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Spinner from '@/components/Loader/Spinner'

import { MappedProduct } from '@/@types/MappedProduct'
import { formSchema } from '@/lib/formSchema'
import useProductForm from './useProductForm'

export interface IProductFormProps {
  product?: MappedProduct
  onSubmit: (data: z.infer<typeof formSchema>) => Promise<void>
}

export default function ProductForm({ product, onSubmit }: IProductFormProps) {
  const { form, handleSubmit, isLoading, categories, isLoadingCategories } =
    useProductForm({
      product,
      onSubmit,
    })

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 mt-8 max-w-xl mx-auto"
        >
          <FormField
            disabled={isLoading}
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    className="shadow-md"
                    placeholder="Nome do produto"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            disabled={isLoading}
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantidade</FormLabel>
                <FormControl>
                  <Input
                    placeholder="0"
                    className="shadow-md"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            disabled={isLoading}
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço</FormLabel>
                <FormControl>
                  <Input
                    placeholder="0"
                    className="shadow-md"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>Categoria</FormLabel>
                <Select
                  disabled={isLoading || isLoadingCategories}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="shadow-md">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                  {isLoadingCategories && (
                    <div className="absolute top-8 right-12">
                      <Spinner
                        className="h-5 w-5 text-gray-100 dark:text-gray-900"
                        pathClassName="text-gray-900 dark:text-gray-100"
                      />
                    </div>
                  )}
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            disabled={isLoading}
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Descrição do produto"
                    className="resize-none shadow-md"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isLoading}
            size={'lg'}
            className="w-full"
            type="submit"
          >
            {isLoading && <Spinner className="h-6 w-6" />}
            {!isLoading && <span>Submit</span>}
          </Button>
        </form>
      </Form>
    </>
  )
}
