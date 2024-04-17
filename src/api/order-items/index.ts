import { supabase } from '@/src/lib/supabase'
import {  useMutation } from '@tanstack/react-query'
import { InsertTables } from '@/src/types'

export const useInsertOrderItems = () => {

  return useMutation({
    async mutationFn(items: InsertTables<'orders_item'>[]) {
      const { error, data: newProduct } = await supabase
        .from('orders_item')
        .insert(items)
        .select()

      if (error) {
        throw new Error(error.message)
      }
      return newProduct
    }
  })
}