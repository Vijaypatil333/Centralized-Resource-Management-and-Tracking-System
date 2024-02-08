import React from 'react'
import ReuseForm from "../../components/shared/forms/ReuseForm";
import { useSelector } from "react-redux";
import Spinner from "../../components/shared/Spinner";

const ResetPassword = () => {
    const { loading, error } = useSelector((state) => state.auth);
  return (
    <>
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <div className="row g-0">
          <div className="col-md-8 form-banner-reset">
            <img src="./banner3.jpg" alt="bannerImg2" />
          </div>
          <div className="col-md-4 login-container">
            <ReuseForm
              submitBtn={"Reset"}
              formTitle={"Reset Password"}
              formType={"resetPassword"}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default ResetPassword
