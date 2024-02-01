import React, { useState } from "react";
import InputType from "../forms/InputType";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import API from "../../../services/API";
import moment from "moment"; // to format the date and time

const Modal = () => {
  const [inventoryType, setInventoryType] = useState("IN");
  const [date, setDate] = useState("");
  const [productName, setProductName] = useState("");
  const [consumer, setConsumer] = useState("");
  const [batchSize, setBatchSize] = useState("");
  const [batchNo, setBatchNo] = useState("");
  const [packing, setPacking] = useState("");
  const [quantity, setQuantity] = useState(0);
  const { user } = useSelector((state) => state.auth);

  //handle modal data
  const handleModalSubmit = async () => {
    try {
      if (
        !inventoryType ||
        !date ||
        !productName ||
        !consumer ||
        !batchSize ||
        !batchNo ||
        !packing ||
        !quantity
      ) {
        return toast("Please provide all fields");
      }

      //get bufferd size
      const da = await API.get("/all-products/get-buffered-products", {
        params: { productName, packing },
      });
      const buffer = da.data.buffer;

      const { data } = await API.post("/inventory/create-inventory", {
        inventoryType,
        email: user?.email,
        date,
        productName,
        consumer,
        batchSize,
        batchNo,
        packing,
        quantity,
        buffer,
      });

      if (inventoryType === "OUT") {
        if (data?.success) {
          alert(data.message);

          if (data.isbufferedproduct === true) {
            const d = await API.post(
              "/buffered-products/create-buffered-products",
              {
                email: user?.email,
                date,
                productName,
                packing,
              }
            );
            //console.log(d)
            if (d?.data.success) {
              alert(d.data.message);
            }
          }
          window.location.reload();
        }
      } else {
        if (data?.success) {
          alert(data.message);
          if (data.notBufferedProduct === true) {
            const dx = await API.delete(
              "/buffered-products/delete-buffered-products",
              {
                params: { productName, packing },
              }
            );
            //console.log(dx);
            if (dx?.data.success) {
              alert(dx.data.message);
            }
          }
          window.location.reload();
        }
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
          id="staticBackdrop"
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
                <div className="d-flex mb-2">
                  Inventory Type :
                  <div className="form-check ms-2">
                    <input
                      type="radio"
                      name="inradio"
                      defaultChecked
                      className="form-check-input"
                      value={"IN"}
                      onChange={(e) => setInventoryType(e.target.value)}
                    />
                    <lable htmlFor="IN" className="form-check-lable">
                      IN
                    </lable>
                  </div>
                  <div className="form-check ms-2">
                    <input
                      type="radio"
                      name="inradio"
                      className="form-check-input"
                      value={"OUT"}
                      onChange={(e) => setInventoryType(e.target.value)}
                    />
                    <lable htmlFor="OUT" className="form-check-lable">
                      OUT
                    </lable>
                  </div>
                </div>
                <InputType
                  lableText={"Date"}
                  lableFor={"date"}
                  inputType={"string"}
                  value={date}
                  onChange={(e) =>
                    setDate(
                      e.target.value === "-"
                        ? moment().format("DD/MM/YYYY")
                        : e.target.value
                    )
                  }
                />
                <InputType
                  lableText={"Product Name"}
                  lableFor={"productName"}
                  inputType={"string"}
                  value={productName}
                  onChange={(e) => setProductName(e.target.value.toUpperCase())}
                />
                <InputType
                  lableText={"Consumer"}
                  lableFor={"consumer"}
                  inputType={"string"}
                  value={consumer}
                  onChange={(e) => setConsumer(e.target.value.toUpperCase())}
                />
                <InputType
                  lableText={"Batch No"}
                  lableFor={"batchNo"}
                  inputType={"string"}
                  value={batchNo}
                  onChange={(e) => setBatchNo(e.target.value.toUpperCase())}
                />
                <InputType
                  lableText={"Batch Size"}
                  lableFor={"batchSize"}
                  inputType={"string"}
                  value={batchSize}
                  onChange={(e) => setBatchSize(e.target.value.toUpperCase())}
                />
                <InputType
                  lableText={"Packing"}
                  lableFor={"packing"}
                  inputType={"string"}
                  value={packing}
                  onChange={(e) => setPacking(e.target.value.toUpperCase())}
                />
                <InputType
                  lableText={"Product Quantity"}
                  lableFor={"quantity"}
                  inputType={"Number"}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
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
                  {inventoryType === "OUT" && <>Remove</>}
                  {inventoryType === "IN" && <>Add</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
