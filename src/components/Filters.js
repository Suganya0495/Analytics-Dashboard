function Filters({ setSearch, setCategory, setMinAmount }) {
  return (
    <div className="row mb-3">
      <div className="col">
        <input
          className="form-control"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="col">
        <select
          className="form-control"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Footwear">Footwear</option>
          <option value="Accessories">Accessories</option>
        </select>
      </div>

      {/* ✅ NEW FILTER */}
      <div className="col">
        <input
          type="number"
          className="form-control"
          placeholder="Min Amount"
          onChange={(e) => setMinAmount(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Filters;