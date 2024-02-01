import React, { useState } from "react";
import InputType from "../forms/InputType";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import API from "../../../services/API";

const AllRawMaterialsModal = () => {
  const [rawMaterial, setrawMaterial] = useState("");
  const [bufferSize, setBufferSize] = useState(0);
  const { user } = useSelector((state) => state.auth);

  //handle modal data
  const handleModalSubmit = async () => {
    try {
      if (
        !rawMaterial ||
        !bufferSize
      ) {
        return toast("Please provide all fields");
      }

      const { data } = await API.post("/all-raw-materials/create-all-raw-materials", {
        email: user?.email,
        rawMaterial,
        bufferSize,
      });
      if (data?.success) {
        toast.success(data.message);
        setTimeout(function () {
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      alert(error.response.data.message);
      window.location.reload();
    }
  };

  return (
    <>
      <div>
        {/* Modal */}
        <div
          className="modal fade"
          id="staticBackdropAllRawMaterials"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex={-1}
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Add Raw Material
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <InputType
                  lableText={"Raw Material Name"}
                  lableFor={"rawMaterial"}
                  inputType={"string"}
                  value={rawMaterial}
                  onChange={(e) => setrawMaterial(e.target.value.toUpperCase())}
                />
                <InputType
                  lableText={"Buffer Size"}
                  lableFor={"bufferSize"}
                  inputType={"Number"}
                  value={bufferSize}
                  onChange={(e) => setBufferSize(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleModalSubmit}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllRawMaterialsModal;
