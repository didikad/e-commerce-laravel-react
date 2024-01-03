import React, { useEffect, useState } from "react";
import {
  CCard,
  CCardImage,
  CCardBody,
  CCardTitle,
  CCardText,
  CButton,
} from "@coreui/react";
import { useNavigate } from "react-router-dom";

const Product = (props) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      `http://localhost:8000/api/product-parent?query=${props.SearchValue}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.log("error: " + error.message));
  }, [props.SearchValue]);

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(angka);
  };

  const handleDetailProduct = (id) => {
    navigate(`/product-detail?id=${id}`);
  };

  return (
    <div className="d-flex flex-wrap gap-4 p-2 justify-content-center">
      {data.map((item, index) => (
        <CCard key={index} className="card-product">
          <CCardImage
            orientation="top"
            src={`http://localhost:8000/img/${item.img}`}
            className="img-fluid"
            alt="image"
            style={{ height: "294px" }}
          />
          <CCardBody className="text-center">
            <CCardTitle className="title-product">
              <strong>{item.name}</strong>
            </CCardTitle>
            <CCardText className="price-product">
              {formatRupiah(item.price)}
            </CCardText>
            <div className="text-center mt-3">
              <CButton
                style={{ backgroundColor: "black" }}
                onClick={() => handleDetailProduct(item.id)}
              >
                Lihat Detail
              </CButton>
            </div>
          </CCardBody>
        </CCard>
      ))}
    </div>
  );
};

export default Product;
