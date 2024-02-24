import Layout from "../components/shared/Layout/Layout";
import React, { useEffect, useState } from "react";
import API from "../services/API";
import { toast } from "react-toastify";
import ReactPaginate from "react-js-pagination";
import { useSelector } from "react-redux";
import Spinner from "../components/shared/Spinner";
import AllRawMaterialsModal from "../components/shared/modal/AllRawMaterialsModal";

const AllMaterials = () => {
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
  const getSearchedAllRawMaterialsRecords = async () => {
    try {
      if (!searchQuery) {
        toast.error("Please provide Search field");
      }
      const { data } = await API.get(
        `/all-raw-materials/get-all-raw-materials/${searchQuery}`
      );
      if (data?.success) {
        setData(data?.AllRawMaterials);
      } else {
        console.error("Failed to get the record");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //delete function
  const deleteAllRawMaterialsRecords = async (_id) => {
    try {
      // Display a confirmation dialog
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this record?"
      );
      if (confirmDelete) {
        const { data } = await API.delete(
          `/all-raw-materials/delete-all-raw-materials/${_id}`
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
  const getAllRawMaterialsRecords = async () => {
    try {
      const { data } = await API.get(
        "/all-raw-materials/get-all-raw-materials"
      );
      if (data?.success) {
        setData(data?.AllRawMaterials);
        //console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //to call the function at initial time
  useEffect(() => {
    getAllRawMaterialsRecords();
  }, [searchQuery]);

  return (
    <Layout>
      <div className="stat-head">All Raw Materials</div>
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
                data-bs-target="#staticBackdropAllRawMaterials"
                style={{ cursor: "pointer" }}
              >
                <i className="fa-solid fa-plus text-success mx-1 py-1"></i>
                Raw material
              </h5>
              <div className="searchbox-all">
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
                  onClick={getSearchedAllRawMaterialsRecords}
                >
                  <i class="fa-solid fa-magnifying-glass search"></i>Search
                </button>
              </div>
            </div>
            <table className="table table-hover table-striped">
              <thead>
                <tr>
                  <th class="table-info" scope="col">
                    Raw Material
                  </th>
                  <th class="table-info" scope="col">
                    Buffer Size (gm/ml)
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems?.map(
                  (
                    record // to map all values from data
                  ) => (
                    <tr key={record._id}>
                      <td>{record.rawMaterial}</td>
                      <td>{record.bufferSize}</td>
                      <td>
                        {/* Add a delete icon with a click event */}
                        <span
                          role="button"
                          className="delete-icon"
                          onClick={() =>
                            deleteAllRawMaterialsRecords(record._id)
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
            <AllRawMaterialsModal />
          </div>
        </>
      )}
    </Layout>
  );
};

export default AllMaterials;
