import React, { useEffect, useState } from "react";
import { Crow, CFormLabel, CButton, CCard, CRow } from "@coreui/react";
import { useLocation } from "react-router-dom";

const Product_Detail = ({ dataVariant }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const [data, setData] = useState({});
  const [selectedVariant, setSelectedVariant] = useState("");
  const [variant, setVariant] = useState([]);
  //   console.log(variant);
  useEffect(() => {
    fetch(`http://localhost:8000/api/product-parent/${id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log("error: " + error.message));
  }, [id]);

  useEffect(() => {
    const savedVariants = localStorage.getItem("variants");
    if (savedVariants) {
      const parsedVariant = JSON.parse(savedVariants);
      setVariant(parsedVariant);
    }
  }, []);

  const handleVariantChange = (event) => {
    setSelectedVariant(event.target.value);
  };

  const handleSubmit = () => {
    if (variant.indexOf(selectedVariant) === -1) {
      setVariant([...variant, selectedVariant]);
      // dataVariant([...variant, selectedVariant]);

      localStorage.setItem(
        "variants",
        JSON.stringify([...variant, selectedVariant])
      );

      window.location.reload();
    }
  };

  return (
    <CCard className="container p-4" style={{ marginTop: "100px" }}>
      <CRow>
        <div className="col-4">
          <img
            src={`http://localhost:8000/img/` + data.img}
            className="w-100 h-100"
            alt="foto"
          />
        </div>
        <div className="col-8">
          <h2 style={{ fontWeight: "bold" }}>{data.name}</h2>
          <p className="my-3">{data.description}</p>
          <div>
            <div className="variant">
              <CFormLabel
                className={`radio-button ${
                  selectedVariant == data.id ? "checked" : ""
                }`}
              >
                <input
                  type="radio"
                  name="variant"
                  value={data.id}
                  checked={selectedVariant === data.id}
                  onChange={handleVariantChange}
                  className="radio-check visually-hidden"
                />
                {data.variant}
              </CFormLabel>
            </div>
            {data.children &&
              data.children.map((item, index) => (
                <div key={index} className="variant">
                  <CFormLabel
                    className={`radio-button ${
                      selectedVariant == item.id ? "checked" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="variant"
                      value={item.id}
                      checked={selectedVariant === item.id}
                      onChange={handleVariantChange}
                      className="radio-check visually-hidden"
                    />
                    {item.variant}
                  </CFormLabel>
                </div>
              ))}
          </div>
          <div className="mt-4">
            <CButton className="btn-submit-order" onClick={handleSubmit}>
              Submit
            </CButton>
          </div>
        </div>
      </CRow>
    </CCard>
  );
};

export default Product_Detail;
