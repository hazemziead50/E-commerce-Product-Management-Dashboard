import { useQuery } from "@tanstack/react-query";
import { getProductCategories } from '../api/products.api';
import { productKeys } from './products.keys';

export function useProductCategoriesQuery(){
    return useQuery({
    queryKey: productKeys.categories(),
    queryFn: getProductCategories,
    staleTime: 1000 * 60 * 5, 
  });
}