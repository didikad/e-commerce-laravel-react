import React, { useState } from "react";

import { CForm, CFormInput, CFormLabel } from "@coreui/react";
import Carousel from "./components/Carousel";
import Product from "./components/Product";
import { Icon } from "@iconify/react";
import carousel1 from "../../../assets/images/carousel_1.png";
import carousel2 from "../../../assets/images/carousel_2.png";

const DashboardCustomer = () => {
  const [searchValue, setSearchValue] = useState("");
  const images = [carousel1, carousel2];
  return (
    <>
      <Carousel images={images} interval={8} />
      <div className="container mt-3">
        <div className="d-flex justify-content-around flex-wrap">
          <div className="card card-adv mb-2">
            <div className="text-card-adv">
              <h4>New Arrival</h4>
              <h2 style={{ fontWeight: "bold" }}>SUPER SALE</h2>
              <p>Pashmina Ceruty Babydoll</p>
            </div>
            <div className="text-card-adv d-flex justify-content-end mt-2">
              <h1
                style={{
                  color: "#fc6a6a",
                  fontWeight: "bold",
                }}
              >
                70%
              </h1>
              <h5>Discount</h5>
            </div>
          </div>
          <div className="card card-adv mb-2">
            <div className="text-card-adv">
              <h4>New Arrival</h4>
              <h2 style={{ fontWeight: "bold" }}>SUPER SALE</h2>
              <p>Pashmina Ceruty Babydoll</p>
            </div>
            <div className="text-card-adv d-flex justify-content-end mt-2">
              <h1
                style={{
                  color: "#fc6a6a",
                  fontWeight: "bold",
                }}
              >
                70%
              </h1>
              <h5>Discount</h5>
            </div>
          </div>
          <div className="card card-adv mb-2">
            <div className="text-card-adv">
              <h4>New Arrival</h4>
              <h2 style={{ fontWeight: "bold" }}>SUPER SALE</h2>
              <p>Pashmina Ceruty Babydoll</p>
            </div>
            <div className="text-card-adv d-flex justify-content-end mt-2">
              <h1
                style={{
                  color: "#fc6a6a",
                  fontWeight: "bold",
                }}
              >
                70%
              </h1>
              <h5>Discount</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="container text-center mt-5 text">
        <h1>OUR PRODUCT</h1>
        <p>get our best products at fantastic prices</p>
      </div>
      <CForm className="d-flex justify-content-center p-5">
        <CFormLabel>
          <Icon icon="subway:search" width={27} className="icon-search" />
        </CFormLabel>
        <CFormInput
          type="text"
          id="search"
          placeholder="search"
          className="w-75 search-input"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
      </CForm>
      <Product SearchValue={searchValue} />
    </>
  );
};

export default DashboardCustomer;
