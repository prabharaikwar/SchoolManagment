import { Navigate, useNavigate  } from "react-router-dom";
import { useEffect } from "react";
import { LOGIN} from "../../../helper/PageRoute";

interface ChildComponent {
  children:any
}
 const UserAuth = ({ children }:ChildComponent) => {
    const navigate = useNavigate ();
   
    useEffect(()=>{
      const userAuth = localStorage.getItem('token');        
    if(!userAuth){
        navigate(LOGIN);
    }
    },[navigate]);
  return  <>{children}</>;
}

export default UserAuth;

