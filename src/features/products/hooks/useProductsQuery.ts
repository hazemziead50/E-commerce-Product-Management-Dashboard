import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getProducts } from '../api/products.api';
import type { GetProductsParams } from '../api/products.api.types';
import { productKeys } from './products.keys';

export function useProductsQuery(params:GetProductsParams){
   return useQuery({
    queryKey:productKeys.list(params),
    queryFn:()=> getProducts(params),
    placeholderData:keepPreviousData,
   })
}