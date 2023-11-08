import { MappedProduct } from '@/@types/MappedProduct'
import { ProductType } from '@/@types/ProductType'

class ProductMapper {
  toDomain(persistanceProduct: ProductType): MappedProduct {
    return {
      id: persistanceProduct.id,
      name: persistanceProduct.name,
      price: persistanceProduct.price,
      quantity: persistanceProduct.quantity,
      categoryId: persistanceProduct.category_id,
      description: persistanceProduct.description,
      createdAt: new Date(persistanceProduct.created_at),
      updatedAt: new Date(persistanceProduct.updated_at),
    }
  }
}

export const productMapper = new ProductMapper()
