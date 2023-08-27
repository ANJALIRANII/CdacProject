import React, { useState } from "react";
import axios from "axios";
import useAxiosInstance from "../../redux/axiosInstance";

function Payment(){
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalIncome, setTotalIncome] = useState(null);
  const { instance }= useAxiosInstance();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await instance.get(
        `/vendor/totalincome?startDate=${startDate}&endDate=${endDate}`);
      setTotalIncome(response.data[0].total_income);
    } catch (error) {
      console.error(error);
    }
  };

  // set default values to start and end date
  const defaultStartDate = new Date();
  defaultStartDate.setDate(1); // set the default start date to the first day of the current month
  const defaultEndDate = new Date();
  defaultEndDate.setDate(0); // set the default end date to the last day of the previous month

  return (
    <div className="container mt-5" style={{backgroundColor:"silver"}}>
      <h2 className="mb-4">Payment Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <label htmlFor="startDate" className="col-sm-2 col-form-label">
            Start Date
          </label>
          <div className="col-sm-10">
            <input
              type="date"
              className="form-control"
              id="startDate"
              name="startDate"
              value={startDate || defaultStartDate.toISOString().slice(0, 10)} // use the selected start date, or the default start date
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="endDate" className="col-sm-2 col-form-label">
            End Date
          </label>
          <div className="col-sm-10">
            <input
              type="date"
              className="form-control"
              id="endDate"
              name="endDate"
              value={endDate || defaultEndDate.toISOString().slice(0, 10)} // use the selected end date, or the default end date
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
      {totalIncome != null && (
        <div className="mt-5">
          <h4>Total Income:</h4>
          <p>{Number(totalIncome).toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default Payment;
