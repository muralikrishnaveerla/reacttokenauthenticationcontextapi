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

const ProductList: React.FC = () => {
  const axiosInstance = useAxios();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get(
          "https://api.escuelajs.co/api/v1/products"
        );
        setProducts(response.data.slice(0, 44));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container">
      <div className="row">
        {products.map((product) => (
          <div
            className="col-12 col-sm-6 col-md-4 col-lg-4 mb-4"
            key={product.id}
          >
            <div className="card h-100">
              <img
                src={product.images[0]}
                className="card-img-top"
                alt={product.title}
                style={{ objectFit: "cover", height: "200px" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="fw-bold">{product.title.slice(0, 50)}...</h5>{" "}
                <p className="card-text">
                  {product.description.slice(0, 50)}...
                </p>
                <p className="card-text">
                  <strong>Price: ${product.price.toFixed(2)}</strong>{" "}
                </p>
                <a href="#" className="btn btn-primary mt-auto">
                  View Product
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
