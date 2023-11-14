import { Link, useNavigate, useParams } from 'react-router-dom'
import { productService } from '@/services/Product/ProductService'
import { useEffect, useState } from 'react'

import { MappedProduct } from '@/@types/MappedProduct'

import Container from '@/components/Container'
import { Button } from '@/components/ui/button'
import SkeletonGroup from './components/SkeletonGroup'
import formatCurrency from '@/utils/formatCurrency'
import Toast from '@/utils/Toast'

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

  return (
    <div className="mt-4">
      {isLoading && <SkeletonGroup />}

      {!isLoading && (
        <>
          <div className="flex gap-8 items-center justify-start">
            <h1 className="">{product?.name}</h1>
            <div>
              <Link to={`/products/edit/${product?.id}`}>
                <Button variant={'secondary'}>Atualizar</Button>
              </Link>
              <Button
                onClick={() => onDelete(product?.id)}
                className="ml-3"
                variant={'destructive'}
              >
                Excluir
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
    </div>
  )
}
