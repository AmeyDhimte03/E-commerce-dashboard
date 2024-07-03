import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWrench, faTrashCan } from "@fortawesome/free-solid-svg-icons";
const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch(
      `http://localhost:5000/products?userId=${userId}`,
      {
        // When you construct the URL in your fetch request, you include parameters that are relevant to the data you want to fetch
        // let result = await fetch(`http://localhost:5000/products`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    result = await result.json();
    setProducts(result);
  };

  const deleteProduct = async (id) => {
    // console.warn(id);
    if (window.confirm("Are you sure you want to delete this product?")) {
      let result = await fetch(`http://localhost:5000/product/${id}`, {
        method: "Delete",
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      if (result) {
        getProducts();
      }
    }
  };

  const searchHandle = async (event) => {
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let key = event.target.value;
    if (key) {
      let result = await fetch(
        `http://localhost:5000/search/${key}?userId=${userId}`,
        {
          headers: {
            authorization: `bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      // if nothing is provided in the search box then call the getProducts(), i.e. get all the available products
      getProducts();
    }
  };

  return (
    <div className="product-list">
      <h1>Product List</h1>
      <input
        type=""
        className="search-product-box"
        placeholder="Search Product"
        onChange={searchHandle}
      />
      <ul>
        <li>
          <b>S. No.</b>
        </li>
        <li>
          <b>Name</b>
        </li>
        <li>
          <b>Price</b>
        </li>
        <li>
          <b>Category</b>
        </li>
        <li>
          <b>Company</b>
        </li>
        <li>
          <b>Update / Delete</b>
        </li>
      </ul>
      {products.length > 0 ? (
        products.map((item, index) => (
          <ul key={item._id}>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>{item.price}</li>
            <li>{item.company}</li>
            <li>{item.category}</li>
            <li>
              <Link className="update-button" to={"/update/" + item._id}>
                <FontAwesomeIcon icon={faWrench} />
              </Link>
              <p> / </p>
              <button
                className="delete-button"
                onClick={() => deleteProduct(item._id)}
              >
                {" "}
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            </li>
          </ul>
        ))
      ) : (
        <h1>No Result Found</h1>
      )}
    </div>
  );
};

export default ProductList;
