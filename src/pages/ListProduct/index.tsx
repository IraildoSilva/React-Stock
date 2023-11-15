import { useNavigate, useParams } from 'react-router-dom'
import { productService } from '@/services/Product/ProductService'
import { useEffect, useState } from 'react'

import { MappedProduct } from '@/@types/MappedProduct'

import Container from '@/components/Container'
import { Button } from '@/components/ui/button'
import SkeletonGroup from './components/SkeletonGroup'
import formatCurrency from '@/utils/formatCurrency'
import Toast from '@/utils/Toast'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import Spinner from '@/components/Loader/Spinner'
import ProductForm from '@/components/ProductForm'
import { z } from 'zod'
import { formSchema } from '@/lib/formSchema'
import { Edit, Trash2 } from 'lucide-react'

export default function ListProduct() {
  const [product, setProduct] = useState<MappedProduct>({} as MappedProduct)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    async function loadProduct() {
      try {
        setIsLoading(true)
        const product = await productService.getProductById(id!)

        setProduct(product)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    loadProduct()
  }, [id])

  async function onDelete(id: string) {
    try {
      await productService.deleteProduct(id)

      Toast('success', 'Produto excluído')
      navigate('/products')
    } catch (error) {
      console.log(error)
      Toast('error', 'Ocorreu um erro ao deletar o produto')
    }
  }

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await productService.updateProduct(id!, data)
      Toast('success', 'Produto atualizado!')
    } catch (error) {
      console.log(error)
      Toast('error', 'Ocorreu um erro ao atualizar o produto...')
    }
  }

  return (
    <div className="mt-4">
      <Dialog modal>
        {isLoading && <SkeletonGroup />}

        {!isLoading && (
          <>
            <div className="flex gap-8 items-center justify-start">
              <h1 className="">{product?.name}</h1>
              <div className="space-x-2">
                <DialogTrigger>
                  <Button
                    size={'icon'}
                    variant={'secondary'}
                    className="rounded-full w-8 h-8"
                  >
                    <Edit size={16} />
                  </Button>
                </DialogTrigger>

                <Button
                  onClick={() => onDelete(product?.id)}
                  variant={'destructive'}
                  size={'icon'}
                  className="rounded-full w-8 h-8"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>

            <div className="flex w-full max-w-3xl gap-4 mt-8">
              <Container content={`Categoria: ${product?.category?.name}`} />
              <Container
                content={`Quantidade em estoque: ${product?.quantity}`}
              />
              <Container content={`Preço: ${formatCurrency(product?.price)}`} />
            </div>

            <span className="mt-8 block">{product?.description}</span>

            <div className="mt-8 flex items-center justify-start gap-8">
              <span>Cadastrado em: {product?.createdAt}</span>
              <span>Atualizado em: {product?.updatedAt}</span>
            </div>
          </>
        )}

        <DialogContent className="min-h-3/4 fixed mx-auto block dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          {!true && (
            <div className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute">
              <Spinner className="w-10 h-10" />
            </div>
          )}

          {true && (
            <>
              <DialogHeader>
                <DialogTitle>Editar Produto</DialogTitle>
              </DialogHeader>
              <ProductForm onSubmit={onSubmit} product={product} />
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
