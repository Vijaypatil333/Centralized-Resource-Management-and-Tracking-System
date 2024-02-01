import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../components/shared/Spinner";
import Layout from "../components/shared/Layout/Layout";
import API from "../services/API";
import RawMaterialModal from "../components/shared/modal/RawMaterialModal";
import { toast } from "react-toastify";
import ReactPaginate from "react-js-pagination";

const RawMaterial = () => {
  const { loading, error } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [avaiQuant, setAvaiQuant] = useState("");
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 15;

  //calculate and slice the data according to the items per page
  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  //get active page data only
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  //search function
  const getSearchedRawMaterialRecords = async () => {
    try {
      if (!searchQuery) {
        toast.error("Please provide Search field");
      }
      const { data } = await API.get(
        `/raw-material/get-raw-material/${searchQuery}`
      );
      if (data?.success) {
        setData(data?.RawMaterial);
        setAvaiQuant(data?.availableQuantity);
      } else {
        console.error("Failed to get the record");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //delete function
  const deleteRawMaterialRecords = async (_id) => {
    try {
      // Display a confirmation dialog
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this record?"
      );
      if (confirmDelete) {
        const { data } = await API.delete(
          `/raw-material/delete-raw-material/${_id}`
        );
        if (data?.success) {
          alert(data.message);
          window.location.reload();
        } else {
          console.error("Failed to delete the record");
        }
      } else {
        console.error("Deletion Process canceled");
      }
    } catch (error) {
      console.error("Error occurred while deleting the record", error);
    }
  };

  //get function
  const getRawMaterialRecords = async () => {
    try {
      const { data } = await API.get("/raw-material/get-raw-material");
      if (data?.success) {
        setData(data?.RawMaterial);
        //console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //to call the function at initial time
  useEffect(() => {
    getRawMaterialRecords();
  }, [searchQuery]);

  return (
    <Layout>
      <div className="stat-head">Raw Materials</div>
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="cont">
            <div className="d-flex">
              <h5
                className="add"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdropRaw"
                style={{ cursor: "pointer" }}
              >
                <i className="fa-solid fa-plus text-success mx-1 py-1"></i>
                Raw Material
              </h5>
              <div className="availQuant">
                Available = <b>{avaiQuant ? avaiQuant : "Quantity"}</b>
              </div>
              <div className="searchbox">
                <input
                  className="box"
                  placeholder="Search Raw Material"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={getSearchedRawMaterialRecords}
                >
                  <i class="fa-solid fa-magnifying-glass search"></i>Search
                </button>
              </div>
            </div>
            <table className="table table-hover table-striped">
              <thead>
                <tr>
                  <th class="table-info" scope="col">
                    Inventory Type
                  </th>
                  <th class="table-info" scope="col">
                    Date
                  </th>
                  <th class="table-info" scope="col">
                    Raw Material
                  </th>
                  <th class="table-info" scope="col">
                    Purchased From
                  </th>
                  <th class="table-info" scope="col">
                    Bill No
                  </th>
                  <th class="table-info" scope="col">
                    Rate
                  </th>
                  <th class="table-info" scope="col">
                    Used For
                  </th>
                  <th class="table-info" scope="col">
                    Batch No
                  </th>
                  <th class="table-info" scope="col">
                    Batch size
                  </th>
                  <th class="table-info" scope="col">
                    Quantity(gm/ml)
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems?.map(
                  (
                    record // to map all values from data
                  ) => (
                    <tr key={record._id}>
                      <td>{record.inventoryType}</td>
                      <td>{record.date}</td>
                      <td>{record.rawMaterial}</td>
                      <td>{record.purchasedFrom}</td>
                      <td>{record.billNo}</td>
                      <td>{record.rate}</td>
                      <td>{record.usedFor}</td>
                      <td>{record.batchNo}</td>
                      <td>{record.batchSize}</td>
                      <td>{record.quantity}</td>
                      <td>
                        {/* Add a delete icon with a click event */}
                        <span
                          role="button"
                          className="delete-icon"
                          onClick={() => deleteRawMaterialRecords(record._id)}
                        >
                          <i class="fa-solid fa-trash-can"></i>
                        </span>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
            <ReactPaginate
              activePage={activePage}
              itemsCountPerPage={itemsPerPage}
              totalItemsCount={data.length}
              pageRangeDisplayed={5}
              onChange={handlePageChange}
              itemClass="page-item"
              linkClass="page-link"
              // Basic styling for pagination
              innerClass="pagination justify-content-center"
              activeLinkClass="active-page"
              activeClass="active-page"
            />
            <RawMaterialModal />
          </div>
        </>
      )}
    </Layout>
  );
};

export default RawMaterial;
