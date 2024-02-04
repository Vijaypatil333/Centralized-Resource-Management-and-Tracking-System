import React, { useState } from "react";
import InputType from "./InputType";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from 'lucide-react'
import { handleLogin, handleRegister } from "../../../services/authservice";

const Form = ({ formType, submitBtn, formTitle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pass, setPass] = useState(true);
  const [name, setName] = useState("");
  const [secretKey, setsecretKey] = useState("");
  const handleEye = () =>{
    setPass(!pass)
  }
  return (
    <div>
      <form
        onSubmit={(e) => {
          // on submitting it will call handle login from authservice and perform task
          if (formType === "login") return handleLogin(e, email, password);
          else if (formType === "register")
            return handleRegister(e, name, email, password, secretKey);
        }}
      >
        <h1 className="text-center">{formTitle}</h1>
        <hr />
        {(() => {
          // used switch case ti show login and register feilds separately
          //eslint-disable-next-line
          switch (true) {
            case formType === "login": {
              return (
                <>
                  <InputType
                    lableText={"Email"}
                    lableFor={"foremail"}
                    inputType={"email"}
                    name={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} //to store input mail
                  />
                  <div className="pass">
                  <InputType
                    lableText={"Password"}
                    lableFor={"forpassword"}
                    inputType={pass ? "password" : "text"}
                    name={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} //to store input password
                  />
                  <span class="eye-login"> {pass ? <Eye onClick={handleEye}/> : <EyeOff onClick={handleEye}/>} </span>
                  </div>
                </>
              );
            }
            case formType === "register": {
              return (
                <>
                  <InputType
                    lableText={"Name"}
                    lableFor={"forname"}
                    inputType={"text"}
                    name={"name"}
                    value={name}
                    onChange={(e) => setName(e.target.value)} //to store input name
                  />
                  <InputType
                    lableText={"Email"}
                    lableFor={"foremail"}
                    inputType={"email"}
                    name={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} //to store input mail
                  />
                  <div className="pass">
                  <InputType
                    lableText={"Password"}
                    lableFor={"forpassword"}
                    inputType={pass ? "password" : "text"}
                    name={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} //to store input password
                  />
                  <span class="eye-login"> {pass ? <Eye onClick={handleEye}/> : <EyeOff onClick={handleEye}/>} </span>
                  </div>
                  <InputType
                    lableText={"SecretKey"}
                    lableFor={"forsecretKey"}
                    inputType={"password"}
                    name={"secretKey"}
                    value={secretKey}
                    onChange={(e) => setsecretKey(e.target.value)} //to store input secretKey
                  />
                </>
              );
            }
          }
        })()}
        
        <div className="justify-content-between">
          {formType === "login" ? (
            <p>
              Not registered yet?
              <Link to="/register"> <b>Register !</b></Link>
            </p>
          ) : (
            <p>
              Already registered? Please
              <Link to="/login"> <b>Login !</b></Link>
            </p>
          )}
          <div className="btn">
            <button className="btn-primary btn" type="submit">
              {submitBtn}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;