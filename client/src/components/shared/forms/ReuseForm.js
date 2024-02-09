import React, { useState } from "react";
import InputType from "./InputType";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import {
  handleLogin,
  handleRegister,
  handleResetPassword,
} from "../../../services/authservice";

const Form = ({ formType, submitBtn, formTitle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pass, setPass] = useState(true);
  const [name, setName] = useState("");
  const [secretKey, setsecretKey] = useState("");
  const handleEye = () => {
    setPass(!pass);
  };
  return (
    <div>
      <form
        onSubmit={(e) => {
          // on submitting it will call handle login from authservice and perform task
          if (formType === "login") return handleLogin(e, email, password);
          else if (formType === "register")
            return handleRegister(e, name, email, password, secretKey);
          else {
            handleResetPassword(e, email, password, secretKey);
          }
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
                    <span class="eye-login">
                      {" "}
                      {pass ? (
                        <Eye onClick={handleEye} />
                      ) : (
                        <EyeOff onClick={handleEye} />
                      )}{" "}
                    </span>
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
                    <span class="eye-login">
                      {" "}
                      {pass ? (
                        <Eye onClick={handleEye} />
                      ) : (
                        <EyeOff onClick={handleEye} />
                      )}{" "}
                    </span>
                  </div>
                  <InputType
                    lableText={"Secret Key"}
                    lableFor={"forsecretKey"}
                    inputType={"password"}
                    name={"secretKey"}
                    value={secretKey}
                    onChange={(e) => setsecretKey(e.target.value)} //to store input secretKey
                  />
                </>
              );
            }
            case formType === "resetPassword": {
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
                      lableText={"New Password"}
                      lableFor={"forpassword"}
                      inputType={pass ? "password" : "text"}
                      name={"password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} //to store input password
                    />
                    <span class="eye-login">
                      {" "}
                      {pass ? (
                        <Eye onClick={handleEye} />
                      ) : (
                        <EyeOff onClick={handleEye} />
                      )}{" "}
                    </span>
                  </div>
                  <InputType
                    lableText={"Secret Key"}
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
              <p>
                <Link to="/resetPassword">
                  {" "}
                  <b>Forgot passward ?</b>
                </Link>
              </p>
              <b>Not registered yet?</b>
              <Link to="/register">
                {" "}
                <b>Register !</b>
              </Link>
            </p>
          ) : (
            <p>
              <b>Already registered? Please</b>
              <Link to="/login">
                {" "}
                <b>Login !</b>
              </Link>
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
