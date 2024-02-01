import { toast } from "react-toastify";
import { userLogin, userRegister } from "../redux/features/auth/authActions";
import store from "../redux/store";

// to control actions on submitting login and register button
export const handleLogin = (e, email, password) => {
  e.preventDefault();
  try {
    if (!email || !password) {
      return toast("Please Provide all Credentials"); //if input is empty
    }
    store.dispatch(userLogin({ email, password })); //to store the input email and password
  } catch (error) {
    console.log(error);
  }
};

export const handleRegister = (e, name, email, password, secretKey) => {
  e.preventDefault();
  try {
    if (!name || !email || !password || !secretKey) {
      return toast("Please Provide all Credentials"); //if input is empty
    }
    //secret key if matched then only register
    if (secretKey === '744766'){
      store.dispatch(userRegister({ name, email, password, secretKey}));
    }
    else{
      return toast('Please provide valid SecretKey')
    }
  } catch (error) {
    console.log(error);
  }
};
