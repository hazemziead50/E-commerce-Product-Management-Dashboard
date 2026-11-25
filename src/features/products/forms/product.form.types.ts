import type { CreateProductPayload, Product} from '../api/products.api.types';
import type { ProductFormInput, ProductFormValues } from '../schemas/product.schema';
export type { ProductFormInput, ProductFormValues };

// Default values
export const DEFAULT_PRODUCT_FORM_VALUES:ProductFormInput     ={
    title: '',
    description: '',
    category: '',
    brand: '',
    price: '',
    discountPercentage: '',
    stock:'',
    sku: '',
    thumbnail: '',
    additionalImages: [],  
}
// Form for creat a new product
export function mapFormValuesToCreatePayload(
    value:ProductFormValues):CreateProductPayload {
        return {
            title: value.title,
            description: value.description,
            category: value.category,
            brand: value.brand,
            price: value.price,
            discountPercentage: value.discountPercentage,
            stock: value.stock,
            sku: value.sku,
            thumbnail: value.thumbnail,
            images:value.additionalImages.map((img)=>img.url)
        }
    }

// Form when we need edite a product
export function mapProductToFormValues(product: Product): ProductFormInput {
  return {
    title: product.title,
    description: product.description,
    category: product.category,
    brand: product.brand ?? '',
    price: String(product.price),
    discountPercentage: String(product.discountPercentage),
    stock: String(product.stock),
    sku: product.sku ?? '',
    thumbnail: product.thumbnail,
    additionalImages: product.images.map((url) => ({ url })),
  };
}
