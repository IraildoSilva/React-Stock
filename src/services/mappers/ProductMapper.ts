import { z } from 'zod'
import {
  MappedProduct,
  MappedProductToPersistance,
} from '@/@types/MappedProduct'
import { ProductType } from '@/@types/ProductType'
import { formSchema } from '@/lib/formSchema'

import formatCurrency from '@/utils/formatCurrency'

class ProductMapper {
  toPersistance(
    domainProduct: z.infer<typeof formSchema>
  ): MappedProductToPersistance {
    return {
      name: domainProduct.name,
      price: Number(domainProduct.price),
      quantity: Number(domainProduct.quantity),
      category_id: domainProduct.categoryId,
      description: domainProduct.description,
    }
  }

  toDomain(persistanceProduct: ProductType): MappedProduct {
    return {
      id: persistanceProduct.id,
      name: persistanceProduct.name,
      price: formatCurrency(persistanceProduct.price),
      quantity: persistanceProduct.quantity,
      description: persistanceProduct.description,
      createdAt: new Date(persistanceProduct.created_at!).toLocaleString(),
      updatedAt: new Date(persistanceProduct.updated_at!).toLocaleString(),
      category: {
        id: persistanceProduct.category_id,
        name: persistanceProduct.category_name,
      },
    }
  }
}

export const productMapper = new ProductMapper()
