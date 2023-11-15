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
  const { form, handleSubmit, isLoading } = useProductForm({
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
                  <Input className="shadow-md" type="number" {...field} />
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
                  <Input className="shadow-md" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <Select
                  disabled={isLoading}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="shadow-md">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="5d9d95b0-7a1a-402d-a89b-e0c2b0570628">
                      Jogos
                    </SelectItem>
                    <SelectItem value="6c7371d2-8c7a-46b4-91ae-0117dc4e2d33">
                      Periféricos
                    </SelectItem>
                    <SelectItem value="bff0bfbc-abd1-491e-9612-e2a488a1be15">
                      Notebooks
                    </SelectItem>
                    <SelectItem value="1d52ad22-7251-49d3-8029-8fb2f5e2e3c3">
                      Smartphones
                    </SelectItem>
                  </SelectContent>
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
