import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { MappedProduct } from '@/@types/MappedProduct'
import { Link } from 'react-router-dom'

interface ITableContainerProps {
  products: MappedProduct[]
}

export default function TableContainer({ products }: ITableContainerProps) {
  return (
    <Table className="mt-6">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[400px]">ID</TableHead>
          <TableHead className="w-[250px]">Nome</TableHead>
          <TableHead className="w-[150px]">Em estoque</TableHead>
          <TableHead className="w-[150px]">Categoria</TableHead>
          <TableHead className="w-[250px]">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.id}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.quantity}</TableCell>
            <TableCell>{product.category.name}</TableCell>
            <TableCell className="flex gap-2">
              <Button size={'sm'}>
                <Link to={`/products/${product.id}`}>Ver</Link>
              </Button>
              <Button variant={'secondary'} size={'sm'}>
                <Link to={`/products/edit/${product.id}`}>Atualizar</Link>
              </Button>
              <Button variant={'destructive'} size={'sm'}>
                Excluir
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
