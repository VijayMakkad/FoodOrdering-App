import { supabase } from "@/src/lib/supabase"
import { useQuery } from "@tanstack/react-query"

export const useProfile = (id: number) => {
  return useQuery({
    queryKey: ['profiles', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single()
      if (error) {
        throw new Error(error.message)
      }
      return data
    },
  })
}
