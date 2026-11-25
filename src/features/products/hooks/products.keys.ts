import {type GetProductsParams } from '../api/products.api.types';

export const productKeys = {

    all:['products'] as const ,
    lists: ()=> [...productKeys.all,'list'] as const,
    list :(params:GetProductsParams)=> [...productKeys.lists(),params] as const,
    details: ()=> [...productKeys.all,'details'] as const,
    detail: (id:number)=>[...productKeys.details(),id] as const,
    categories: () => [...productKeys.all, 'categories'] as const,
} as const