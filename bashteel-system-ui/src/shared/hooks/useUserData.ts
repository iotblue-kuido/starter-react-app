import { useState, useEffect } from "react";
import { User, UserDataHook } from "./types";
import keycloak from "../../components/auth/keycloak";

function useUserData(): UserDataHook {
const [user, setUser] = useState<User>()
useEffect(() => {
  
  keycloak?.loadUserInfo().then(userInfo =>
    setUser(userInfo as User))

  return () => {
    
  }
}, [keycloak])

  return{
user
  }
}

export default useUserData;