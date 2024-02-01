import React, { useState } from "react";
import InputType from "../forms/InputType";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import API from "../../../services/API";

const AllProductsModal = () => {
  const [productName, setProductName] = useState("");
  const [packing, setPacking] = useState("");
  const [bufferSize, setBufferSize] = useState(0);
  const [manufacturingDays, setManufacturingDays] = useState(0);
  const [packingDays, setPackingDays] = useState(0);
  const [totalDays, setTotalDays] = useState(0);
  const { user } = useSelector((state) => state.auth);

  //handle modal data
  const handleModalSubmit = async () => {
    try {
      if (
        !productName ||
        !packing ||
        !bufferSize ||
        !manufacturingDays ||
        !packingDays ||
        !totalDays
      ) {
        return toast("Please provide all fields");
      }

      const { data } = await API.post("/all-products/create-all-products", {
        email: user?.email,
        productName,
        packing,
        bufferSize,
        manufacturingDays,
        packingDays,
        totalDays,
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
          id="staticBackdropAllProducts"
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
                  Add Product Details
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
                  lableText={"Product Name"}
                  lableFor={"productName"}
                  inputType={"string"}
                  value={productName}
                  onChange={(e) => setProductName(e.target.value.toUpperCase())}
                />
                <InputType
                  lableText={"Packing"}
                  lableFor={"packing"}
                  inputType={"string"}
                  value={packing}
                  onChange={(e) => setPacking(e.target.value.toUpperCase())}
                />
                <InputType
                  lableText={"Buffer Size"}
                  lableFor={"bufferSize"}
                  inputType={"Number"}
                  value={bufferSize}
                  onChange={(e) => setBufferSize(e.target.value)}
                />
                <InputType
                  lableText={"Manufacturing Days"}
                  lableFor={"manufacturingDays"}
                  inputType={"Number"}
                  value={manufacturingDays}
                  onChange={(e) => setManufacturingDays(e.target.value)}
                />
                <InputType
                  lableText={"Packing Days"}
                  lableFor={"packingDays"}
                  inputType={"Number"}
                  value={packingDays}
                  onChange={(e) => setPackingDays(e.target.value)}
                />
                <InputType
                  lableText={"Total Days"}
                  lableFor={"totalDays"}
                  inputType={"Number"}
                  value={totalDays}
                  onChange={(e) => setTotalDays(e.target.value)}
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

export default AllProductsModal;
