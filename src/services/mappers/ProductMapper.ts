import { MappedProduct } from '@/@types/MappedProduct'
import { ProductType } from '@/@types/ProductType'
import formatCurrency from '@/utils/formatCurrency'

class ProductMapper {
  toDomain(persistanceProduct: ProductType): MappedProduct {
    return {
      id: persistanceProduct.id,
      name: persistanceProduct.name,
      price: formatCurrency(persistanceProduct.price),
      quantity: persistanceProduct.quantity,
      description: persistanceProduct.description,
      createdAt: new Date(persistanceProduct.created_at).toLocaleString(),
      updatedAt: new Date(persistanceProduct.updated_at).toLocaleString(),
      category: {
        id: persistanceProduct.category_id,
        name: persistanceProduct.category_name,
      },
    }
  }
}

export const productMapper = new ProductMapper()
