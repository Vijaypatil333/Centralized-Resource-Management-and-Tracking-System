import React, { useEffect, useState } from "react";
import Layout from "../components/shared/Layout/Layout";
import { useSelector } from "react-redux";
import Spinner from "../components/shared/Spinner";
import Chart from "react-apexcharts";
import API from "../services/API";

const Statistics = () => {
  const { loading, error } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);

  // Fetch data only once when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await API.get("/inventory/statistics");
        console.log(data);
        if (data?.success) {
          setData(data?.statistics);
        }
      } catch (error) {
        console.error("Error occurred while fetching statistics", error);
      }
    };

    fetchData();
  }, []);

  const chartOptions = {
    chart: {
      type: "bar",
    },
    xaxis: {
      categories: data?.map((item) => item.productName) || [],
    },
    yaxis: {
      title: {
        text: "Quantity",
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
  };

  const chartSeries = [
    {
      name: "Manufactured",
      data: data?.map((item) => item.produced) || [],
    },
    {
      name: "Sold",
      data: data?.map((item) => item.sold) || [],
    },
  ];

  return (
    <Layout>
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="stat-head">Product Statistics</div>
          <div>
            <Chart options={chartOptions} series={chartSeries} type="bar" />
          </div>
        </>
      )}
    </Layout>
  );
};

export default Statistics;
