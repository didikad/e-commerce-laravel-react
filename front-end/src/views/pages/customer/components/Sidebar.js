import React, { useState, useEffect } from "react";
import {
  CButton,
  CCol,
  CRow,
  CModalBody,
  CModalFooter,
  CFormLabel,
  CFormInput,
  CForm,
  CCard,
  CCardHeader,
  CCardBody,
  CCardTitle,
  CFormSelect,
  CModal,
  CModalHeader,
  CModalTitle,
  CSidebar,
} from "@coreui/react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

import NumberInputWithNumber from "./InputNumber";

const Customer = ({ switchToSales }) => {
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState("");
  const [visible, setVisible] = useState(false);
  const [modalData, setModalData] = useState({
    name: "adi",
    email: "adi@gmail.com",
    address: "jalan xxxx",
    no_wa: "085555",
    city: "kk",
    province: "kk",
    postal_code: "2434",
    username: "adi@",
  });

  const handleclose = () => {
    setVisible(false);
    navigate("/");
    window.location.reload();
  };

  const handleSubmit = (e) => {
    const salesData = JSON.parse(localStorage.getItem("salesData"));

    if (!salesData) {
      console.log("salesData not found");
      return;
    }

    const customerId = salesData.newCustomer.id;
    const newSales = salesData.newSales.no_invoice;
    setInvoice(newSales);

    e.preventDefault();
    const requestData = {
      name: modalData.name,
      email: modalData.email,
      address: modalData.address,
      no_wa: modalData.no_wa,
      city: modalData.city,
      province: modalData.province,
      postal_code: modalData.postal_code,
      username: modalData.username,
      password: "",
    };

    fetch(`http://localhost:8000/api/customer/${customerId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.clear();
      })
      .catch((error) => console.log(error.message));
    setVisible(!visible);
  };

  return (
    <>
      <CForm onSubmit={handleSubmit}>
        <CModalBody>
          <CFormLabel className="form-sidebar">Nama</CFormLabel>
          <CRow className="mb-1">
            <CCol>
              <CFormInput
                id="name"
                type="text"
                value={modalData.name}
                onChange={(e) =>
                  setModalData((prevData) => ({
                    ...prevData,
                    name: e.target.value,
                  }))
                }
                required
              />
            </CCol>
          </CRow>
          <CFormLabel className="form-sidebar">Email</CFormLabel>
          <CRow className="mb-1">
            <CCol>
              <CFormInput
                id="email"
                type="email"
                value={modalData.email}
                onChange={(e) =>
                  setModalData((prevData) => ({
                    ...prevData,
                    email: e.target.value,
                  }))
                }
                required
              />
            </CCol>
          </CRow>
          <CFormLabel className="form-sidebar">Address</CFormLabel>
          <CRow className="mb-1">
            <CCol>
              <CFormInput
                id="address"
                type="text"
                value={modalData.address}
                onChange={(e) =>
                  setModalData((prevData) => ({
                    ...prevData,
                    address: e.target.value,
                  }))
                }
                required
              />
            </CCol>
          </CRow>
          <CFormLabel className="form-sidebar">No WA</CFormLabel>
          <CRow className="mb-1">
            <CCol>
              <CFormInput
                id="no_wa"
                type="text"
                value={modalData.no_wa}
                onChange={(e) =>
                  setModalData((prevData) => ({
                    ...prevData,
                    no_wa: e.target.value,
                  }))
                }
                required
              />
            </CCol>
          </CRow>
          <CFormLabel className="form-sidebar">Kota</CFormLabel>
          <CRow className="mb-1">
            <CCol>
              <CFormInput
                id="city"
                type="text"
                value={modalData.city}
                onChange={(e) =>
                  setModalData((prevData) => ({
                    ...prevData,
                    city: e.target.value,
                  }))
                }
                required
              />
            </CCol>
          </CRow>
          <CFormLabel className="form-sidebar">Provinsi</CFormLabel>
          <CRow className="mb-1">
            <CCol>
              <CFormInput
                id="province"
                type="text"
                value={modalData.province}
                onChange={(e) =>
                  setModalData((prevData) => ({
                    ...prevData,
                    province: e.target.value,
                  }))
                }
                required
              />
            </CCol>
          </CRow>
          <CFormLabel className="form-sidebar">Postal code</CFormLabel>
          <CRow className="mb-1">
            <CCol>
              <CFormInput
                id="postal_code"
                type="text"
                value={modalData.postal_code}
                onChange={(e) =>
                  setModalData((prevData) => ({
                    ...prevData,
                    postal_code: e.target.value,
                  }))
                }
                required
              />
            </CCol>
          </CRow>
          <CFormLabel className="form-sidebar">Username</CFormLabel>
          <CRow className="mb-1">
            <CCol>
              <CFormInput
                id="username"
                type="text"
                value={modalData.username}
                onChange={(e) =>
                  setModalData((prevData) => ({
                    ...prevData,
                    username: e.target.value,
                  }))
                }
                required
              />
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton className="btn-submit-sidebar" type="submit">
            Lanjutkan
          </CButton>
        </CModalFooter>
      </CForm>
      <CModal visible={visible} onClose={handleclose}>
        <CModalHeader>
          <CModalTitle>Bukti invoices</CModalTitle>
        </CModalHeader>
        <CModalBody className="text-center">
          <p>Screenshot dan simpan invoice</p>
          <p>Nomor invoice anda :</p>
          <h2>
            <strong>{invoice}</strong>
          </h2>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={handleclose}>
            close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

const Product = (props) => {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const savedVariants = localStorage.getItem("variants");
    if (savedVariants) {
      const parsedVariant = JSON.parse(savedVariants);

      const fetchProduct = async () => {
        const response = await Promise.all(
          parsedVariant.map((value) =>
            fetch(`http://localhost:8000/api/product/${value}`)
              .then((response) => response.json())
              .catch((error) => console.error(error.message))
          )
        );
        setProduct(response);
      };

      fetchProduct();
    }
  }, []);

  const handleSubmit = () => {
    const jsonData = product.map((product, index) => ({
      id_product: product.data.id,
      id_customer: props.customerID,
      qty: product.number,
      price: product.data.price,
      ket: "",
    }));

    fetch(`http://localhost:8000/api/salesItems`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem("salesData", JSON.stringify(data));
        props.setIdSales(data.newSales);
        props.switchToSales(data);
      })
      .catch((error) => console.log(error.message));

    // console.log(jsonData);
  };

  useEffect(() => {
    const storagedData = localStorage.getItem("salesData");

    if (storagedData) {
      const parsedData = JSON.stringify(storagedData);
      props.setIdSales(parsedData.newSales);
      props.switchToSales(product, parsedData.newSales, parsedData.newCustomer);
    }
  }, []);

  const handleNumberChange = (value, index) => {
    const updateResponse = [...product];
    updateResponse[index].number = value;
    setProduct(updateResponse);
  };

  const handleDeleteVariant = (variantId) => {
    const savedVariants = localStorage.getItem("variants");

    if (savedVariants) {
      const parsedVariant = JSON.parse(savedVariants);

      const elementToDelete = `${variantId}`;

      const elementIndex = parsedVariant.indexOf(elementToDelete);

      if (elementIndex !== -1) {
        parsedVariant.splice(elementIndex, 1);

        localStorage.setItem("variants", JSON.stringify(parsedVariant));

        setProduct((prevProduct) =>
          prevProduct.filter((item) => item.data.id === variantId)
        );
      }
    }
    window.location.reload();
  };

  const formatRupiah = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  return (
    <div>
      {product.map((product, index) => (
        <CCard key={index} className="py-4 mb-2">
          <CButton
            className="btn-close-product-sidebar"
            onClick={() => handleDeleteVariant(product.data.id)}
          >
            <Icon icon="octicon:x-circle-16" width={25} />
          </CButton>
          <CCardBody className="d-flex">
            <div className="col-4">
              <img
                src={`http://localhost:8000/img/` + product.data.img}
                alt="image"
                className="w-100"
              />
            </div>
            <div className="col-8 text-data-product-sidebar">
              <h6>{product.data.name}</h6>
              <p>Price : {formatRupiah(product.data.price)}/pcs</p>
              <p>Variant : {product.data.variant}</p>
            </div>
          </CCardBody>
          <NumberInputWithNumber
            value={product.number}
            onChange={(value) => handleNumberChange(value, index)}
          />
        </CCard>
      ))}
      <CButton className="btn-submit-sidebar" onClick={handleSubmit}>
        Lanjutkan
      </CButton>
    </div>
  );
};

const Order = (props) => {
  const pengiriman = [
    {
      nama: "pengirim 1",
      price: 30000,
    },
    {
      nama: "pengirim 2",
      price: 35000,
    },
    {
      nama: "pengirim 3",
      price: 36000,
    },
  ];

  const [totalBiaya, setTotalBiaya] = useState(0);
  // const [invoices, setInvoices] = useState({ data: { no_invoice: "" } });
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const [pengirim, setPengirim] = useState(pengiriman[0].price);
  const [selectedPengirimName, setSelectedPengirimName] = useState(
    pengiriman[0].nama
  );
  // console.log(invoices);
  const handleclose = () => {
    setVisible(false);
    navigate("/");
    window.location.reload();
  };

  const formatRupiah = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  console.log(props);

  useEffect(() => {
    setTotalBiaya(parseInt(pengirim) + parseInt(props.idSales.price));
  }, [pengirim]);

  const handleSubmit = () => {
    const totalBiaya = parseInt(pengirim) + parseInt(props.idSales.price);

    try {
      fetch(`http://localhost:8000/api/sales/${props.idSales.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          total_pay: totalBiaya,
          delivery_cost: pengirim,
          delivery_name: selectedPengirimName,
        }),
      })
        .then((response) => response.json())
        .then((response) => props.switchToSubmitOrder(response));
    } catch (error) {
      console.log(error);
    }
    setTotalBiaya(totalBiaya);
    setVisible(!visible);
  };

  return (
    <>
      <CCard>
        <CCardBody>
          <CCardTitle className="text-center">Data pengiriman</CCardTitle>
          <CFormSelect
            size="sm"
            className="mb-1"
            onChange={(e) => {
              setPengirim(e.target.value);
              setSelectedPengirimName(
                e.target.options[e.target.selectedIndex].text
              );
            }}
            value={pengirim}
          >
            {pengiriman.map((data, index) => (
              <option value={data.price} key={index}>
                {data.nama} - {formatRupiah(data.price)}
              </option>
            ))}
          </CFormSelect>
          <p style={{ fontSize: "12px" }}>Subtotal Product</p>
          <p className="text-end">{formatRupiah(props.idSales.price)}</p>
          <p style={{ fontSize: "12px" }}>Biaya Pengiriman</p>
          <p className="text-end">{formatRupiah(pengirim)}</p>
          <h5>Total :</h5>
          <h5 className="text-end" style={{ color: "red" }}>
            {formatRupiah(totalBiaya)}
          </h5>
          <button className="btn-submit-sidebar" onClick={handleSubmit}>
            Lanjutkan
          </button>
        </CCardBody>
      </CCard>
    </>
  );
};

const Sidebar = (props) => {
  const [showSales, setShowSales] = useState(1);
  const [idSales, setIdSales] = useState(null);

  const switchToSales = (id) => {
    setShowSales(2);
    // setCustomerId(id);
  };

  const switchToSubmitOrder = (response) => {
    setShowSales(3);
  };

  return (
    <CSidebar className="sidebar-customer overflow-auto" hidden={props.visible}>
      {showSales === 1 ? (
        <Product
          setIdSales={setIdSales}
          switchToSales={(id) => switchToSales(id)}
        />
      ) : showSales === 2 ? (
        <Order idSales={idSales} switchToSubmitOrder={switchToSubmitOrder} />
      ) : (
        <Customer />
      )}
    </CSidebar>
  );
};

export default Sidebar;
