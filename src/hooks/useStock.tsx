import { MappedProduct } from '@/@types/MappedProduct'
import { productService } from '@/services/Product/ProductService'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

interface IStockContext {
  products: MappedProduct[]
  isLoading: boolean
  handleProducts: (products: MappedProduct[]) => void
}

interface IStockContextProviderProps {
  children: ReactNode
}

const StockContext = createContext<IStockContext | undefined>(undefined)

export function StockContextProvider({ children }: IStockContextProviderProps) {
  const [products, setProducts] = useState<MappedProduct[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadContacts() {
      try {
        setIsLoading(true)
        const productsData = await productService.listProducts()

        setProducts(productsData)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    loadContacts()
  }, [])

  function handleProducts(products: MappedProduct[]) {
    setProducts(products)
  }

  return (
    <StockContext.Provider
      value={{
        products,
        isLoading,
        handleProducts,
      }}
    >
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
