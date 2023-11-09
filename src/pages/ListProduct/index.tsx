import Container from '@/components/Container'
import { Button } from '@/components/ui/button'
import useStock from '@/hooks/useStock'
import { Link, useParams } from 'react-router-dom'

export default function ListProduct() {
  const { products } = useStock()

  const { id } = useParams()

  const product = products.find((product) => product.id === id)

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
        <Container content={`Categoria: ${product?.category.name}`} />
        <Container content={`Quantidade em estoque: ${product?.quantity}`} />
        <Container content={`Preço: R$${399},00`} />
      </div>

      <span className="mt-8 block">{product?.description}</span>

      <div className="mt-8 flex items-center justify-start gap-8">
        <span>Cadastrado em: {product?.createdAt}</span>
        <span>Atualizado em: {product?.updatedAt}</span>
      </div>
    </div>
  )
}
