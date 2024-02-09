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
          <div className="banner">
            <img src="./banner1.jpg" alt="bannerImg1" />
            <div className="overlay">
              <ReuseForm
                submitBtn={"Login"}
                formTitle={"Login Page"}
                formType={"login"}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
