import React from "react";
import ReuseForm from "../../components/shared/forms/ReuseForm";
import { useSelector } from "react-redux";
import Spinner from "../../components/shared/Spinner";

const Register = () => {
  const { loading, error } = useSelector((state) => state.auth);
  return (
    <>
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <div className="row g-0">
          <div className="banner">
            <img src="./banner2.jpg" alt="bannerImg2" />
            <div className="overlay">
              <ReuseForm
                submitBtn={"Register"}
                formTitle={"Registration Page"}
                formType={"register"}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
