import { Link, useParams } from 'react-router-dom'
import { productService } from '@/services/ProductService'
import { useEffect, useState } from 'react'

import Container from '@/components/Container'
import { Button } from '@/components/ui/button'
import { MappedProduct } from '@/@types/MappedProduct'

export default function ListProduct() {
  const [product, setProduct] = useState<MappedProduct>({} as MappedProduct)

  const { id } = useParams()

  useEffect(() => {
    async function loadProduct() {
      try {
        const product = await productService.getProductById(id!)

        setProduct(product)
      } catch (error) {
        console.log(error)
      }
    }

    loadProduct()
  }, [id])

  console.log(product)

  return (
    <div className="mt-4">
      <div className="flex gap-8 items-center justify-start">
        <h1 className="">{product?.name}</h1>
        <div>
          <Link to={`/products/edit/${product?.id}`}>
            <Button variant={'secondary'}>Atualizar</Button>
          </Link>
          <Button className="ml-3" variant={'destructive'}>
            Excluir
          </Button>
        </div>
      </div>

      <div className="flex w-full max-w-3xl gap-4 mt-8">
        <Container content={`Categoria: ${product?.category?.name}`} />
        <Container content={`Quantidade em estoque: ${product?.quantity}`} />
        <Container content={`Preço: R$${product?.price},00`} />
      </div>

      <span className="mt-8 block">{product?.description}</span>

      <div className="mt-8 flex items-center justify-start gap-8">
        <span>Cadastrado em: {product?.createdAt}</span>
        <span>Atualizado em: {product?.updatedAt}</span>
      </div>
    </div>
  )
}
