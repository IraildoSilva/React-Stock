import Container from '@/components/Container'
import { Button } from '@/components/ui/button'
import SkeletonGroup from './components/SkeletonGroup'
import formatCurrency from '@/utils/formatCurrency'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import Spinner from '@/components/Loader/Spinner'
import ProductForm from '@/components/ProductForm'
import { Edit, Trash2 } from 'lucide-react'
import useListProduct from './useListProduct'
import { useState } from 'react'

export default function ListProduct() {
  const { isLoading, product, onDelete, onSubmit } = useListProduct()

  const [productName, setProductName] = useState('')
  const [productId, setProductId] = useState('')

  return (
    <div className="mt-4">
      <Dialog modal>
        <AlertDialog>
          {isLoading && <SkeletonGroup />}

          {!isLoading && (
            <>
              <div className="flex gap-8 items-center justify-start">
                <h1 className="">{product?.name}</h1>
                <div className="space-x-2">
                  <DialogTrigger asChild>
                    <Button
                      size={'icon'}
                      variant={'secondary'}
                      className="rounded-full w-8 h-8"
                    >
                      <Edit size={16} />
                    </Button>
                  </DialogTrigger>

                  <AlertDialogTrigger>
                    <Button
                      onClick={() => {
                        setProductName(product.name)
                        setProductId(product.id)
                      }}
                      variant={'destructive'}
                      size={'icon'}
                      className="rounded-full w-8 h-8"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </AlertDialogTrigger>
                </div>
              </div>

              <div className="flex w-full max-w-3xl gap-4 mt-8">
                <Container content={`Categoria: ${product?.category?.name}`} />
                <Container
                  content={`Quantidade em estoque: ${product?.quantity}`}
                />
                <Container
                  content={`Preço: ${formatCurrency(product?.price)}`}
                />
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

          <AlertDialogContent className="dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <AlertDialogHeader>
              <AlertDialogTitle>
                Tem certeza que deseja deletar
                <span className="text-red-500"> {productName}</span> da lista de
                produtos?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Esta ação não poderá ser desfeita. Isto irá remover
                permanentemente o produto e apagará os dados do servidor.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => onDelete(productId)}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Dialog>
    </div>
  )
}
