import { formSchema } from '@/lib/formSchema'
import { productService } from '@/services/Product/ProductService'
import Toast from '@/utils/Toast'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

export default function useNewProduct() {
  const navigate = useNavigate()

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await productService.createProduct(data)
      Toast('success', 'Produto Cadastrado')

      navigate('/products')
    } catch (error) {
      console.log(error)

      Toast('error', 'Ocorreu um erro ao cadastrar o produto')
    }
  }

  return { onSubmit }
}
