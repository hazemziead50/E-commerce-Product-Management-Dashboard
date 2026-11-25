import {z} from 'zod'
 
// validation from HTTP|HTTPS
const httpUrlSchema= z.
    string()
    .trim()
    .min(1,'Image URL is required')
    .refine(
        (value)=>{
            try{
                const parsed = new URL(value)
                return parsed.protocol === 'http:'|| parsed.protocol === 'https:'
            }catch{
           return false     
            }
        }
        ,{message: 'Please enter a valid HTTP or HTTPS URL'}
    )

const requiredNumberString = (requiredMessage: string) =>
  z
    .string()
    .trim()
    .min(1, requiredMessage)
    .refine((val) => !Number.isNaN(Number(val)), {
      message: 'Please enter a valid number',
    })
    .transform((val) => Number(val));
export const productSchema = z.object({
  // 1. Basic Information
    title: z
        .string()
        .trim()
        .min(1, 'Product title is required')
        .min(3, 'Title must be at least 3 characters'),
    description: z
        .string()
        .trim()
        .min(1, 'Product description is required')
        .min(10, 'Description must be at least 10 characters'),
    category: z.string().trim().min(1, 'Please select a category'),
    brand: z.string().trim().min(1, 'Brand is required'),

  // 2. Pricing
    price: requiredNumberString('Price is required').pipe(
        z.number().gt(0, 'Price must be greater than 0')
    ),
    discountPercentage: requiredNumberString('Discount percentage is required').pipe(
        z
        .number()
        .min(0, 'Discount cannot be less than 0%')
        .max(100, 'Discount cannot exceed 100%')
    ),
  // 3. Inventory
    stock: requiredNumberString('Stock quantity is required').pipe(
        z
      .number()
      .int('Stock must be a whole number')
      .min(1, 'Stock cannot be zero or negative')
  ),
    sku: z.string().trim().min(1, 'SKU is required'),
  // 4. Images
    thumbnail: httpUrlSchema,
    additionalImages:z.array(
        z.object({
            url:httpUrlSchema,
        })
    )     
});

export type ProductFormInput = z.input<typeof productSchema>;
export type ProductFormValues = z.output<typeof productSchema>;