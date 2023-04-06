// import { ref } from "vue";
import { supabase } from "@/api/supabase";
import { ref } from "vue";
// user is set outside of the useAuthUser function
// so that it will act as global state and always refer to a single user
const user = ref("")
export default function useAuthUser() {
  const login = async (email:string,password:string) => {
    return await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    }).then(res=>{
      console.log(res)
      if (res.data.user != null){
        console.log(res.data.user)
        user.value = res.data.user.email!
      }
    })
  };
  /**
   * Logout
   */
  const logout = async () => {
    return await supabase.auth.signOut()
  };
  /**
   * Check if the user is logged in or not
   */

  return {
    user,
    login,
    logout,
  };
}