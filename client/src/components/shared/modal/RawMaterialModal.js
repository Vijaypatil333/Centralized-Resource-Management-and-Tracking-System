import React, { useState } from "react";
import InputType from "../forms/InputType";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import API from "../../../services/API";
import moment from "moment"; // to format the date and time

const RawMaterialModal = () => {
  const [inventoryType, setInventoryType] = useState("IN");
  const [date, setDate] = useState("");
  const [rawMaterial, setRawMaterial] = useState("");
  const [purchasedFrom, setPurchasedFrom] = useState("");
  const [billNo, setBillNo] = useState("");
  const [rate, setRate] = useState("");
  const [usedFor, setUsedFor] = useState("");
  const [batchNo, setBatchNo] = useState("");
  const [batchSize, setBatchSize] = useState("");
  const [quantity, setQuantity] = useState(0);
  const { user } = useSelector((state) => state.auth);

  //handle modal data
  const handleModalSubmit = async () => {
    try {
      if (
        !inventoryType ||
        !date ||
        !rawMaterial ||
        !purchasedFrom ||
        !billNo ||
        !rate ||
        !usedFor ||
        !batchNo ||
        !batchSize ||
        !quantity
      ) {
        return toast("Please provide all fields");
      }

      //get bufferd size
      const da = await API.get("/all-raw-materials/get-buffered-raw-materials", {
        params: { rawMaterial},
      });
      const buffer = da.data.buffer;

      const { data } = await API.post("/raw-material/create-raw-material", {
        inventoryType,
        email: user?.email,
        date,
        rawMaterial,
        purchasedFrom,
        billNo,
        rate,
        usedFor,
        batchNo,
        batchSize,
        quantity,
        buffer,
      });
      if (inventoryType === "OUT") {
        if (data?.success) {
          alert(data.message);

          if (data.isbufferedMaterial === true) {
            const d = await API.post(
              "/buffered-materials/create-buffered-materials",
              {
                email: user?.email,
                date,
                rawMaterial,
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
          if (data.notBufferedMaterial === true) {
            const dx = await API.delete(
              "/buffered-materials/delete-buffered-materials",
              {
                params: { rawMaterial},
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
        {/* Raw Material Modal */}
        <div
          className="modal fade"
          id="staticBackdropRaw"
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
                  Add Raw Material Details
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
                  lableText={"Raw Material"}
                  lableFor={"rawMaterial"}
                  inputType={"string"}
                  value={rawMaterial}
                  onChange={(e) => setRawMaterial(e.target.value.toUpperCase())}
                />
                <InputType
                  lableText={"Purchased From"}
                  lableFor={"purchasedFrom"}
                  inputType={"string"}
                  value={purchasedFrom}
                  onChange={(e) =>
                    setPurchasedFrom(e.target.value.toUpperCase())
                  }
                />
                <InputType
                  lableText={"Bill No"}
                  lableFor={"billNo"}
                  inputType={"string"}
                  value={billNo}
                  onChange={(e) => setBillNo(e.target.value.toUpperCase())}
                />
                <InputType
                  lableText={"Rate"}
                  lableFor={"rate"}
                  inputType={"Number"}
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                />
                <InputType
                  lableText={"Used For"}
                  lableFor={"usedFor"}
                  inputType={"string"}
                  value={usedFor}
                  onChange={(e) => setUsedFor(e.target.value.toUpperCase())}
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
                  lableText={"Product Quantity (gm / ml)"}
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

export default RawMaterialModal;
