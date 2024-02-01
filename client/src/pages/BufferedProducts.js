import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../components/shared/Spinner";
import Layout from "../components/shared/Layout/Layout";
import Modal from "../components/shared/modal/Modal";
import API from "../services/API";
import { toast } from "react-toastify";
import ReactPaginate from "react-js-pagination";

const BufferedProducts = () => {
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
  const getSearchedBufferedProductsRecords = async () => {
    try {
      if (!searchQuery) {
        toast.error("Please provide Search field");
      }
      const { data } = await API.get(
        `/buffered-products/get-buffered-products/${searchQuery}`
      );
      if (data?.success) {
        setData(data?.buffered);
      } else {
        console.error("Failed to get the record");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //delete function
  const deleteBufferedProductRecords = async (_id) => {
    try {
      // Display a confirmation dialog
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this record?"
      );
      if (confirmDelete) {
        const { data } = await API.delete(
          `/buffered-products/delete-buffered-products/${_id}`
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
  const getBufferedProductsRecords = async () => {
    try {
      const { data } = await API.get(
        "/buffered-products/get-buffered-products"
      );
      if (data?.success) {
        setData(data?.buffered);
        //console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //to call the function at initial time
  useEffect(() => {
    getBufferedProductsRecords();
  }, [searchQuery]);

  return (
    <Layout>
      <div className="stat-head">Buffered Products</div>
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="cont">
            <div className="d-flex">
              <div className="searchbox-buffered">
                <input
                  className="box"
                  placeholder="Search Buffered Product"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={getSearchedBufferedProductsRecords}
                >
                  <i class="fa-solid fa-magnifying-glass search"></i>Search
                </button>
              </div>
            </div>
            <table className="table table-hover table-striped">
              <thead>
                <tr>
                  <th class="table-info" scope="col">
                    Date
                  </th>
                  <th class="table-info" scope="col">
                    Product Name
                  </th>
                  <th class="table-info" scope="col">
                    Packing
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems?.map(
                  (
                    record // to map all values from data
                  ) => (
                    <tr key={record._id}>
                      <td>{record.date}</td>
                      <td>{record.productName}</td>
                      <td>{record.packing}</td>
                      <td>
                        {/* Add a delete icon with a click event */}
                        <span
                          role="button"
                          className="delete-icon"
                          onClick={() =>
                            deleteBufferedProductRecords(record._id)
                          }
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

export default BufferedProducts;
