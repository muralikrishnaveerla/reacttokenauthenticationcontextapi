import React, { useEffect, useState } from "react";
import useAxios from "../../AxiosInstance";
import "./product.css";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
  };
  images: string[];
}

const ProductsTable: React.FC = () => {
  const axiosInstance = useAxios();
  const [products, setProducts] = useState<Product[]>([]);
  const [offsetPage, setOffsetPage] = useState(0);
  const [totalProducts, setTotalProducts] = useState<Product[]>([]);
  const [inputval, seInputval] = useState<string>();
  const fetchTotalProducts = async () => {
    try {
      const response = await axiosInstance.get(`products`);
      setTotalProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get(
        `products?offset=${offsetPage * 10}&limit=10`
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchTotalProducts();
    fetchProducts();
  }, [offsetPage]);

  const handlePageClick = (val: number) => {
    setOffsetPage(val);
  };

  const handleNextPage = () => {
    setOffsetPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    setOffsetPage((prev) => (prev > 0 ? prev - 1 : prev));
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val: any = e.target.value;
    let resp = totalProducts.filter(
      (p) =>
        p.title.toLowerCase().includes(val.toLowerCase()) ||
        p.description.toLowerCase().includes(val.toLowerCase()) ||
        p.price.toString().includes(val)
    );
    setProducts(resp);
  };
  return (
    <div className="container">
      <div className="row">
        <div className="d-flex justify-content-between mt-4">
          <div>
            <div className="input-group flex-nowrap">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                aria-describedby="addon-wrapping"
                onChange={handleSearch}
              />
              <span className="input-group-text" id="addon-wrapping">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="feather feather-search"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </span>
            </div>
          </div>
          <div>
            <nav aria-label="Page navigation example" className="mb-4">
              <ul className="pagination ">
                {offsetPage > 0 && (
                  <li className="page-item m-0">
                    <button className="page-link" onClick={handlePreviousPage}>
                      Previous
                    </button>
                  </li>
                )}
                {Array.from(
                  { length: Math.ceil(totalProducts.length / 10) },
                  (_, i) => (
                    <li className="page-item m-0" key={i}>
                      <button
                        className={`page-link ${
                          offsetPage === i ? "active" : ""
                        }`}
                        onClick={() => handlePageClick(i)}
                      >
                        {i + 1}
                      </button>
                    </li>
                  )
                )}
                {products.length === 10 && (
                  <li className="page-item m-0">
                    <button className="page-link" onClick={handleNextPage}>
                      Next
                    </button>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td>{product.title.slice(0, 50)}...</td>
                <td>{product.description.slice(0, 50)}...</td>
                <td>${product.price.toFixed(2)}</td>
                <td>
                  <a href="#" className="btn btn-primary">
                    View Product
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsTable;
