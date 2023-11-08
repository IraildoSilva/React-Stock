import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

import { MappedProduct } from '@/@types/MappedProduct'

interface ITablesContainerProps {
  productsRunningOut: MappedProduct[]
  recentlyCreatedProducts: MappedProduct[]
}

export default function TablesContainer({
  productsRunningOut,
  recentlyCreatedProducts,
}: ITablesContainerProps) {
  return (
    <div className="flex justify-center gap-6 mt-6">
      <div className="flex-grow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produtos Recentes</TableHead>
              <TableHead className="w-[200px]">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {recentlyCreatedProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>
                  <Button size={'sm'}>
                    <Link to={`/product/${product.id}`}>Ver</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex-grow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produtos acabando</TableHead>
              <TableHead className="w-[100px]">Qtd.</TableHead>
              <TableHead className="w-[100px]">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {productsRunningOut.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell className="font-medium">
                  {product.quantity}
                </TableCell>
                <TableCell>
                  <Button size={'sm'}>
                    <Link to={`/product/${product.id}`}>Ver</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
