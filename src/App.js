import { useEffect, useState } from "react";
import styles from "./App.module.scss";
import axios, { AxiosError } from "axios";
import { Table } from "./component/Table";
import ReactPaginate from "react-paginate";

function App() {
  const [search, setSearch] = useState(null);
  const [data, setData] = useState([]);
  const [click, setClick] = useState(true);
  const [input, setInput] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [totalItems, setTotalItem] = useState(0);

  const getItems = async () => {
    await fetchItems(currentPage + 1, itemsPerPage);
  };

  useEffect(() => {
    if (totalItems && itemsPerPage > 0) {
      setPageCount(Math.ceil(totalItems / itemsPerPage));
    } else {
      setPageCount(1);
    }
  }, [totalItems, itemsPerPage]);

  const handleReset = () => {
    console.log(input);
    if (input === "") {
      setSearch(null);
      setClick((prev) => !prev);
      return;
    }
    setSearch(input);
    setClick((prev) => !prev);
  };

  const Reset = () => {
    setInput("");
    setSearch(null);
    setClick((prev) => !prev);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  async function fetchItems(page, limit) {
    try {
      const response = await axios.get(
        `http://localhost:5000/data/${search}/${limit}/${page}`
      );

      const { result, totalitem } = response.data;

      if (result.length === 0) {
        setData([{ name: "User not found" }]);
        setTotalItem(1);
      } else {
        // console.log(result);
        // console.log("total after res", totalitem[0]["count(*)"]);
        setData(result);
        const total = totalitem[0]["count(*)"];
        setTotalItem(total);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("Axios error message:", error.message);
        console.log("Error status code:", error.response?.status);
      }
    }
  }

  useEffect(() => {
    getItems();
  }, [currentPage, itemsPerPage, click]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <div className={`container ${styles.table}`}>
      <h1>Employees Data</h1>
      <div className={styles.input}>
        <input
          type="text"
          placeholder="search here"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleReset}>Search</button>
        <button onClick={Reset}>clear</button>
        <div>
          <label htmlFor="itemsPerPage">Items per page: </label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            <option value={4}>4</option>
            <option value={6}>6</option>
            <option value={8}>8</option>
            <option value={10}>10</option>
          </select>
        </div>
      </div>

      <Table data={data} />

      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName={styles.pagination} // Use your custom class
        pageClassName={styles["page-item"]} // Custom class for each page
        pageLinkClassName={styles["page-link"]} // Custom class for page link
        previousClassName={styles["previous-item"]} // Custom class for previous button
        previousLinkClassName={styles["previous-link"]} // Custom class for previous link
        nextClassName={styles["next-item"]} // Custom class for next button
        nextLinkClassName={styles["next-link"]} // Custom class for next link
        activeClassName={styles.active} // Class for active page
        disabledClassName={styles.disabled} // Class for disabled button
      />
    </div>
  );
}
export default App;
