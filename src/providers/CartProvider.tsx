import { PropsWithChildren, createContext , useContext,useState} from 'react'
import { CartItem, Tables } from '../types';
import {randomUUID} from 'expo-crypto'
import { useRouter } from 'expo-router';
import { useInsertOrder } from '../api/orders';
import { useInsertOrderItems } from '../api/order-items';
type Product=Tables<'products'>

type CartType={
    items:CartItem[];
    addItem:(product:Product,size:CartItem['size'])=>void;
    updateQuantity:(id:string,amount:-1 | 1)=>void;
    total:number;
    checkout:()=>void;
}
export const CartContext = createContext<CartType>({
    items: [],
    addItem: () => {},  
    updateQuantity: () => {},
    total:0,
    checkout:()=>{},
});

const CartProvider = ({ children }:PropsWithChildren) => {
  const [items,setItems]=useState<CartItem[]>([])
  const router=useRouter() 
  const {mutate:insertOrder}=useInsertOrder()
  const { mutate: insertOrderItems } = useInsertOrderItems()

    const addItem=(product:Product,size:CartItem['size'])=>{

        const existingItem=items.find((item)=>item.product_id===product.id && item.size===size)

        if(existingItem){
          updateQuantity(existingItem.id,1)
          return;
        }

        const newCartItem: CartItem = {
          id: randomUUID(),
          product,
          product_id: product.id,
          size,
          quantity: 1,
        } 
        setItems([newCartItem,...items])
    }

    

    const updateQuantity=(itemId:string,amount:-1 | 1)=>{
       setItems(
         items.map((item) =>
           item.id !== itemId
             ? item
             : { ...item, quantity: item.quantity + amount }
         ).filter((item)=>item.quantity>0)
        )
    };
    const total = items.reduce(
      (sum, item) => sum+=item.product.price * item.quantity,
      0
    )

    const clearItems=()=>{
      setItems([])
    }

    const checkout = () => {
      // console.warn('checkout', items)
      insertOrder({total},{
        onSuccess:(data)=>{
          saveOrderItems(data)
        }
    });
    }

    const saveOrderItems=(order:Tables<'orders'>)=>{
      const orderItems=items.map((cartItems)=>({
        order_id:order.id,
        product_id:cartItems.product_id,
        size:cartItems.size,
        quantity:cartItems.quantity,
      }))

      insertOrderItems(
        orderItems
        ,{onSuccess:()=>{
      clearItems()
      router.push(`/(user)/orders/${order.id}`)
      }

    })
  }

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity,total,checkout,}}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider

export const useCart=()=>useContext(CartContext)