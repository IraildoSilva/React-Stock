import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

import useStock from '@/hooks/useStock.tsx'

export default function StockDashboard() {
  const { products } = useStock()

  return (
    <>
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
                <Link to={`/products/${product.id}`}>
                  <Button size={'sm'}>Ver</Button>
                </Link>

                <Link to={`/products/edit/${product.id}`}>
                  <Button variant={'secondary'} size={'sm'}>
                    Atualizar
                  </Button>
                </Link>

                <Button variant={'destructive'} size={'sm'}>
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
