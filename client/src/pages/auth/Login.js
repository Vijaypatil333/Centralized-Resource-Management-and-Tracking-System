import React from "react";
import ReuseForm from "../../components/shared/forms/ReuseForm";
import { useSelector } from "react-redux";
import Spinner from "../../components/shared/Spinner";
const Login = () => {
  const { loading, error } = useSelector((state) => state.auth);

  return (
    <>
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <div className="row g-0">
          <div className="col-md-8 form-banner">
            <img src="./banner1.jpg" alt="bannerImg1" />
          </div>
          <div className="col-md-4 login-container">
            <ReuseForm
              submitBtn={"Login"}
              formTitle={"Login Page"}
              formType={"login"}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Login;