import React, { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "./services/useEffect";
import Spinner from "./Spinner";
import PageNotFound from "./PageNotFound";
function Detail({ dispatch }) {
  const { id } = useParams();
  const skuRef = useRef();
  const navigate = useNavigate();
  const { data: product, loading, error } = useFetch(`products/${id}`);
  if (loading) return <Spinner />;
  if (!product) return <PageNotFound />;
  if (error) throw error;

  return (
    <div id="detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p id="price">${product.price}</p>
      <select id="size" ref={skuRef}>
        <option value="">What size?</option>
        {product.skus.map((s) => (
          <option value={s.sku} key={s.sku}>
            {s.size}
          </option>
        ))}
      </select>
      <p>
        <button
          className="btn btn-primary"
          onClick={() => {
            const sku = skuRef.current.value;
            if (!sku) return alert("Select size.");
            dispatch({ type: "add", id, sku: sku });
            navigate("/cart");
          }}
        >
          Add to cart
        </button>
      </p>
      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  );
}

export default Detail;
