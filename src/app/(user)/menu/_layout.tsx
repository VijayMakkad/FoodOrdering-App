import { Stack } from "expo-router";
import { Link } from "expo-router";
import { Pressable } from "react-native";
import { supabase } from "@/src/lib/supabase";
import Colors from "@/src/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { useAuth } from "@/src/providers/AuthProvider";
export default function MenuStack(){
  const {isAdmin}=useAuth() 
    return (
      <Stack
        screenOptions={{
          headerRight: () => (
            <Link href="/cart" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="shopping-cart"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
  //         headerLeft:()=>(
  //           isAdmin ? (
  //   <Link href="/"  asChild>
  //     <Pressable>
  //       {({ pressed }) => (
  //         <FontAwesome
  //           name="sign-out"
  //           size={25}
  //           color={Colors.light.tint}
  //           style={{ marginLeft: 15, opacity: pressed ? 0.5 : 1 }}
  //         />
  //       )}
  //     </Pressable>
  //   </Link>
  // ) :(
  //           <Pressable onPress={()=>supabase.auth.signOut()}>
  //             {({pressed})=>(
  //               <FontAwesome
  //               name="sign-out"
  //               size={25}
  //               color={Colors.light.tint}
  //               style={{marginLeft:15,opacity:pressed?0.5:1}}
  //               />
  //             )}
  //           </Pressable>
  //         )
  //       ),
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Menu' }} />
      </Stack>
    )
}