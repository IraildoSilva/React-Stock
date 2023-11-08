import { MappedProduct } from '@/@types/MappedProduct'
import { productService } from '@/services/ProductService'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

interface IStockContext {
  products: MappedProduct[]
  handleProducts: (products: MappedProduct[]) => void
}

interface IStockContextProviderProps {
  children: ReactNode
}

const StockContext = createContext<IStockContext | undefined>(undefined)

export function StockContextProvider({ children }: IStockContextProviderProps) {
  const [products, setProducts] = useState<MappedProduct[]>([])

  useEffect(() => {
    async function loadContacts() {
      try {
        const productsData = await productService.listProducts()

        setProducts(productsData)
      } catch (error) {
        console.log(error)
      }
    }

    loadContacts()
  }, [])

  function handleProducts(products: MappedProduct[]) {
    setProducts(products)
  }

  return (
    <StockContext.Provider value={{ products, handleProducts }}>
      {children}
    </StockContext.Provider>
  )
}

export default function useStock() {
  const context = useContext(StockContext)

  if (context === undefined) {
    throw new Error('useStock must be used within a StockProvider')
  }

  return context
}
