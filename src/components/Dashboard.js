import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "./DataTable";
import Filters from "./Filters";
import ChartComponent from "./ChartComponent";

function Dashboard() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minAmount, setMinAmount] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ PAGINATION STATES
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
  `https://Suganya1.pythonanywhere.com/api/data?search=${search}&category=${category}&minAmount=${minAmount}&page=${currentPage}&per_page=5`
);
  

      setData(res.data.data);;
      setLoading(false);
    } catch (err) {
      setError("Error fetching data");
      setLoading(false);
    }
  };

  useEffect(() => {
  fetchData();
}, [search, category, minAmount, currentPage]);

  
  const total = data.reduce((sum, item) => sum + item.amount, 0);

  return (
  <div className="container mt-4">
    
    <div className="card shadow p-4">
      
      <h2 className="text-primary fw-bold mb-4 text-center">
        📊 Analytics Dashboard
      </h2>

      {/* Filters */}
      <Filters
        setSearch={setSearch}
        setCategory={setCategory}
        setMinAmount={setMinAmount}
      />

      {/* Loading & Error */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      {/* Summary Cards */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card p-3 text-center bg-light shadow-sm">
            <h6>Total Records</h6>
            <h4>{data.length}</h4>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card p-3 text-center bg-light shadow-sm">
            <h6>Total Sales</h6>
            <h4>₹{total}</h4>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="mb-4">
        <ChartComponent data={data} />
      </div>

      {/* Table */}
      <DataTable data={data} />

      {/* Pagination */}
      <div className="mt-4 text-center">
        <button
          className="btn btn-primary me-2"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </button>

        <button
          className="btn btn-success"
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>

      {/* Extra line for impression */}
      <p className="text-success mt-3 text-center">
        Data fetched dynamically from API ✅
      </p>

    </div>
  </div>
);}

export default Dashboard;