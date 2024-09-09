import { create } from 'zustand'
import { Iproduct, IProductsStore } from '../types/types'

export const useProductsStore = create<IProductsStore>((set) => ({
  products: [],
  addProduct: (product:Iproduct) =>{
    set( state => ({products: [...state.products, product]}))
  },
  removeProduct: (id:number)=>{
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    }))
  }
}))
