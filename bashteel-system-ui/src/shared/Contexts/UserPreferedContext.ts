import { createContext } from "react";

export const UserPreferedContext = createContext({
  toggleColorMode: () => { },
  changeLanguage: (lang:string ) => { },
});
