import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productKeys } from './products.keys';
import { createProduct } from '../api/products.api';

export function useCreateProductMutation(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:createProduct,
        onSuccess: async ()=>{
            // Cash updates product lists immediately upon successful addition.
            await queryClient.invalidateQueries({
                queryKey:productKeys.lists()
            })
        }
    })
}
