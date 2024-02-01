import Layout from "../components/shared/Layout/Layout";
import React, { useEffect, useState } from "react";
import API from "../services/API";
import { toast } from "react-toastify";
import ReactPaginate from "react-js-pagination";
import { useSelector } from "react-redux";
import Spinner from "../components/shared/Spinner";
import AllProductsModal from "../components/shared/modal/AllProductsModal";

const AllProducts = () => {
  const { loading, error } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
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
  const getSearchedAllProductsRecords = async () => {
    try {
      if (!searchQuery) {
        toast.error("Please provide Search field");
      }
      const { data } = await API.get(
        `/all-products/get-all-products/${searchQuery}`
      );
      if (data?.success) {
        setData(data?.AllProducts);
      } else {
        console.error("Failed to get the record");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //delete function
  const deleteAllProductsRecords = async (_id) => {
    try {
      // Display a confirmation dialog
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this record?"
      );
      if (confirmDelete) {
        const { data } = await API.delete(
          `/all-products/delete-all-products/${_id}`
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
  const getAllProductsRecords = async () => {
    try {
      const { data } = await API.get("/all-products/get-all-products");
      if (data?.success) {
        setData(data?.AllProducts);
        //console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //to call the function at initial time
  useEffect(() => {
    getAllProductsRecords();
  }, [searchQuery]);

  return (
    <Layout>
      <div className="stat-head">All Products and It's Timeline</div>
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="cont">
            <div className="d-flex">
              <h5
                className="add-all"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdropAllProducts"
                style={{ cursor: "pointer" }}
              >
                <i className="fa-solid fa-plus text-success mx-1 py-1"></i>
                Add Product
              </h5>
              <div className="searchbox-all">
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
                  onClick={getSearchedAllProductsRecords}
                >
                  <i class="fa-solid fa-magnifying-glass search"></i>Search
                </button>
              </div>
            </div>
            <table className="table table-hover table-striped">
              <thead>
                <tr>
                  <th class="table-info" scope="col">
                    Product Name
                  </th>
                  <th class="table-info" scope="col">
                    Packing
                  </th>
                  <th class="table-info" scope="col">
                    Buffer Size
                  </th>
                  <th class="table-info" scope="col">
                    Manufacturing Days
                  </th>
                  <th class="table-info" scope="col">
                    Packing Days
                  </th>
                  <th class="table-info" scope="col">
                    Total Days
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems?.map(
                  (
                    record // to map all values from data
                  ) => (
                    <tr key={record._id}>
                      <td>{record.productName}</td>
                      <td>{record.packing}</td>
                      <td>{record.bufferSize}</td>
                      <td>{record.manufacturingDays}</td>
                      <td>{record.packingDays}</td>
                      <td>{record.totalDays}</td>
                      <td>
                        {/* Add a delete icon with a click event */}
                        <span
                          role="button"
                          className="delete-icon"
                          onClick={() => deleteAllProductsRecords(record._id)}
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
            <AllProductsModal />
          </div>
        </>
      )}
    </Layout>
  );
};

export default AllProducts;
