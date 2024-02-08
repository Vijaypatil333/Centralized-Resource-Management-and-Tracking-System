import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/API";
import { toast } from "react-toastify";

export const userLogin = createAsyncThunk(
  //checking user whether it is auth or not
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/auth/login", { email, password });
      //store token
      if (data.success) {
        localStorage.setItem("token", data.token);
        
        toast.success(data.message); //toasing(poping) the message that login successfull
        setTimeout(function () {
          window.location.replace("/"); //to redirect to the home pg after successfull login
        }, 500);
      }
      return data; 
    } catch (error) {
      if (error.response && error.response.data.message) {
        //toasingthe message that invalid credentials
        return toast.error(error.response.data.message); //to print the set data message error
      } else {
        return rejectWithValue(error.message); //or else the system error
      }
    }
  }
);

//register
export const userRegister = createAsyncThunk(
  "auth/register",
  async ({ name, email, password, secretKey }, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/auth/register", {
        name,
        email,
        password,
        secretKey,
      });
      if (data.success) {
        //alert("User Registered Successfully!!!");
        toast.success(data.message); //toast the message
        setTimeout(function () {
          window.location.replace("/login"); //to redirect to the login pg after successfull register
        }, 500);
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.message) {
        //toasting the message that invalid credentials
        return toast.error(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

//reset password
export const userResetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ email, password, secretKey }, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/auth/resetPassword", {
        email,
        password,
        secretKey,
      });
      if (data.success) {
        //alert("User Registered Successfully!!!");
        toast.success(data.message); //toast the message
        setTimeout(function () {
          window.location.replace("/login"); //to redirect to the login pg after successfull register
        }, 500);
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.message) {
        //toasting the message that invalid credentials
        return toast.error(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

//current user
export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async ({ rejectWithValue }) => {
    try {
      const res = await API.get("/auth/current-user");
      if (res?.data) {
        return res?.data;
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return toast.error(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
