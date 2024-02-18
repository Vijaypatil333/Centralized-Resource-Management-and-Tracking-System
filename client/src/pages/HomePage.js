/* eslint-disable jsx-a11y/no-distracting-elements */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../components/shared/Spinner";
import Layout from "../components/shared/Layout/Layout";
import Modal from "../components/shared/modal/Modal";
import API from "../services/API";
import { toast } from "react-toastify";
import ReactPaginate from "react-js-pagination";
import moment from "moment"; // to format the date and time

const HomePage = () => {
  const { loading, error } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [avaiQuant, setAvaiQuant] = useState("");
  const [predProduct, setpredProduct] = useState("");
  const [season, setSeason] = useState("");
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
  const getSearchedInventoryRecords = async () => {
    try {
      if (!searchQuery) {
        toast.error("Please provide Search field");
      }
      const { data } = await API.get(`/inventory/get-inventory/${searchQuery}`);
      if (data?.success) {
        setData(data?.inventory);
        setAvaiQuant(data?.availableQuantity);
      } else {
        console.error("Failed to get the record");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //delete function
  const deleteInventoryRecords = async (_id) => {
    try {
      // Display a confirmation dialog
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this record?"
      );
      if (confirmDelete) {
        const { data } = await API.delete(`/inventory/delete-inventory/${_id}`);
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

  //get prediction
  const getPredictionRecords = async () => {
    try {
      const date = moment().format("DD/MM/YYYY"); //"01/07/2024"
      const predMonth =
        Number(date.slice(3, 5)) + 4 <= 12
          ? Number(date.slice(3, 5)) + 4
          : Number(date.slice(3, 5)) + 4 - 12;

      let currentSeason;
      if (3 <= predMonth && predMonth <= 6) {
        currentSeason = "Summer";
      } else if (7 <= predMonth && predMonth <= 10) {
        currentSeason = "Monsoon";
      } else {
        currentSeason = "Winter";
      }

      setSeason(currentSeason);
      //const month = predMonth < 10 ? "0"+ predMonth.toString() : predMonth.toString()
      const { data } = await API.get(
        `/inventory/get-pred-inventory/${currentSeason}`
      );
      if (data?.success) {
        if (data?.prediction[0]) {
          setpredProduct(data?.prediction[0]._id);
        } else {
          setpredProduct("NO RECORD FOUND");
        }
        //console.log(data?.prediction);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //get function
  const getInventoryRecords = async () => {
    try {
      const { data } = await API.get("/inventory/get-inventory");
      if (data?.success) {
        setData(data?.inventory);
        //console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //to call the function at initial time
  useEffect(() => {
    getInventoryRecords();
    getPredictionRecords();
  }, [searchQuery]);

  return (
    <Layout>
      <div className="stat-head">Product Inventory</div>
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div
            class="alert alert-warning alert-dismissible fade show"
            role="alert"
          >
            <marquee>
              <i class="fa-solid fa-triangle-exclamation"></i>
              <strong> Warning !!</strong> Prepare <strong> {predProduct}</strong>{" "}
              for upcoming <strong> {season} </strong> Season
            </marquee>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
          <div className="cont">
            <div className="cont-add">
              <h5
                className="add"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                style={{ cursor: "pointer" }}
              >
                <i className="fa-solid fa-plus text-success mx-1 py-1"></i>Add
                Product
              </h5>
              <div className="availQuant">
                Available = <b>{avaiQuant ? avaiQuant : "Quantity"}</b>
              </div>
              <div className="searchbox">
                <input
                  className="box"
                  placeholder="Search Product"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={getSearchedInventoryRecords}
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
                    Product Name
                  </th>
                  <th class="table-info" scope="col">
                    Consumer
                  </th>
                  <th class="table-info" scope="col">
                    Batch No
                  </th>
                  <th class="table-info" scope="col">
                    Batch size
                  </th>
                  <th class="table-info" scope="col">
                    Packing
                  </th>
                  <th class="table-info" scope="col">
                    Quantity
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
                      <td>{record.productName}</td>
                      <td>{record.consumer}</td>
                      <td>{record.batchNo}</td>
                      <td>{record.batchSize}</td>
                      <td>{record.packing}</td>
                      <td>{record.quantity}</td>
                      <td>
                        {/* Add a delete icon with a click event */}
                        <span
                          role="button"
                          className="delete-icon"
                          onClick={() => deleteInventoryRecords(record._id)}
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
            <Modal />
          </div>
        </>
      )}
    </Layout>
  );
};

export default HomePage;
