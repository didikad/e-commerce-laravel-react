import React, { useEffect, useState } from "react";

import {
  CAvatar,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CForm,
  CModalBody,
  CModalFooter,
  CFormLabel,
  CFormInput,
  CFormSelect,
  CFormCheck,
} from "@coreui/react";

const Dashboard = () => {
  const [tableData, setTableData] = useState([]);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [validated, setValidated] = useState();
  const [categoryData, setCategoryData] = useState([]);
  const [parentData, setParentData] = useState([]);
  console.log(tableData);
  useEffect(() => {
    fetch(`http://localhost:8000/api/productAll`, { method: "GET" })
      .then((response) => response.json())
      .then((response) => setTableData(response.data))
      .catch((error) => console.log("error: " + error.message));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8000/api/category`, { method: "GET" })
      .then((response) => response.json())
      .then((response) => setCategoryData(response.data))
      .catch((error) => console.log("error: " + error.message));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8000/api/product`, { method: "GET" })
      .then((response) => response.json())
      .then((response) => {
        setParentData(response);
        // console.log("success: " + response);
      })
      .catch((error) => console.log("error: " + error.message));
  }, []);

  //Open Modal Detail
  const OpenModal = (id) => {
    fetch(`http://localhost:8000/api/product/${id}`, { method: "GET" })
      .then((response) => response.json())
      .then((response) => {
        setModalData(response.data);
        setModalOpen(true);
      })
      .catch((error) => console.log("error: " + error.message));
  };

  //Open Modal Create
  const OpenModalCreate = () => {
    setModalData({
      name: "",
      description: "",
      id_category: "",
      weight: "",
      stock: "",
      price: "",
      price_discount: "",
      id_parent: "0",
      type: "parent",
      status: "active",
      variant: "",
      category: {
        name: "",
      },
    });
    setModalCreateOpen(true);
  };

  //Open Modal Edit
  const openModalEdit = (id) => {
    fetch(`http://localhost:8000/api/product/${id}`, { method: "GET" })
      .then((response) => response.json())
      .then((response) => {
        setModalData(response.data);
        setModalEditOpen(true);
      })
      .catch((error) => console.log("error: " + error.message));
  };

  //Handle Create
  const handleCreate = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    if (form.checkValidity() === true) {
      const formData = new FormData();
      formData.append("name", modalData.name);
      formData.append("id_category", modalData.id_category);
      formData.append("weight", modalData.weight);
      formData.append("stock", modalData.stock);
      formData.append("price", modalData.price);
      formData.append("price_discount", modalData.price_discount);
      formData.append("id_parent", modalData.id_parent);
      formData.append("type", modalData.type);
      formData.append("status", modalData.status);
      formData.append("variant", modalData.variant);
      formData.append("description", modalData.description);
      if (photoFile) {
        formData.append("img", photoFile);
      }
      fetch(`http://localhost:8000/api/product`, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          closeModal();
          fetch(`http://localhost:8000/api/productAll`, { method: "GET" })
            .then((response) => response.json())
            .then((response) => setTableData(response.data))
            .catch((error) => console.log("error: " + error.message));
        })
        .catch((error) => console.log("error: " + error.message));
    }
  };

  //Handle Edit
  const handleEdit = (id) => {
    const form = id.currentTarget;
    if (form.checkValidity() === false) {
      id.preventDefault();
      id.stopPropagation();
    }
    setValidated(true);
    if (form.checkValidity() === true) {
      const formData = new FormData();
      formData.append("name", modalData.name);
      formData.append("id_category", modalData.id_category);
      formData.append("weight", modalData.weight);
      formData.append("stock", modalData.stock);
      formData.append("price", modalData.price);
      formData.append("price_discount", modalData.price_discount);
      formData.append("id_parent", modalData.id_parent);
      formData.append("type", modalData.type);
      formData.append("status", modalData.status);
      formData.append("variant", modalData.variant);
      formData.append("description", modalData.description);
      if (photoFile) {
        formData.append("img", photoFile);
      }

      // console.log(formData);

      fetch(`http://localhost:8000/api/product/${modalData.id}`, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          return response.json();
          // console.log(response);
        })
        .then((response) => {
          closeModal();
          // console.log(response);
          fetch(`http://localhost:8000/api/productAll`, { method: "GET" })
            .then((response) => response.json())
            .then((response) => setTableData(response.data))
            .catch((error) => console.log("error: " + error.message));
        })
        .catch((error) => console.log("error: " + error.message));
    }
  };

  const handleDelete = (id) => {
    const shoudDelete = window.confirm("Are you sure you want to delete ?");
    console.log(id);
    if (shoudDelete) {
      fetch(`http://localhost:8000/api/product/${id}`, {
        method: "DELETE",
      })
        .then(() =>
          fetch("http://localhost:8000/api/productAll", { method: "GET" })
            .then((response) => response.json())
            .then((data) => setTableData(data.data))
            .catch((error) => console.error(error.message))
        )
        .catch((error) => console.error(error.message));
    }
  };

  const closeModal = () => {
    setModalData(null);
    setModalOpen(false);
    setModalEditOpen(false);
    setModalCreateOpen(false);
    setValidated(false);
  };

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader className="d-flex justify-content-between">
              Product
              <CButton
                onClick={() => {
                  OpenModalCreate();
                }}
                color="success"
                size="sm"
                className="text-white"
              >
                Create
              </CButton>
            </CCardHeader>
            <CCardBody>
              <br />

              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>Nama</CTableHeaderCell>
                    <CTableHeaderCell>Stock</CTableHeaderCell>
                    <CTableHeaderCell>Code</CTableHeaderCell>
                    <CTableHeaderCell>Type</CTableHeaderCell>
                    <CTableHeaderCell>Kategori</CTableHeaderCell>
                    <CTableHeaderCell>Price</CTableHeaderCell>
                    <CTableHeaderCell>Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {tableData.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell>{item.name}</CTableDataCell>
                      <CTableDataCell>{item.stock}</CTableDataCell>
                      <CTableDataCell>{item.code}</CTableDataCell>
                      <CTableDataCell>{item.type}</CTableDataCell>
                      <CTableDataCell>{item.category.name}</CTableDataCell>
                      <CTableDataCell>{item.price}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          onClick={() => {
                            OpenModal(item.id);
                          }}
                          color="primary"
                          size="sm"
                          className="text-white"
                        >
                          Detail
                        </CButton>
                        <CButton
                          onClick={() => {
                            openModalEdit(item.id);
                          }}
                          color="warning"
                          size="sm"
                          className="text-white"
                        >
                          Edit
                        </CButton>
                        <CButton
                          onClick={() => {
                            handleDelete(item.id);
                          }}
                          color="danger"
                          size="sm"
                          className="text-white"
                        >
                          Delete
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Create Product */}
      <CModal
        size="lg"
        backdrop="static"
        visible={modalCreateOpen}
        onClose={closeModal}
      >
        <CModalHeader>
          <CModalTitle>Create Product</CModalTitle>
        </CModalHeader>
        <CForm
          className="row g-3 needs-validation"
          noValidate
          validated={validated}
          onSubmit={handleCreate}
        >
          <CModalBody>
            {modalData && (
              <div>
                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label">
                    Name
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      id="name"
                      type="text"
                      value={modalData.name}
                      onChange={(e) => {
                        setModalData((prevData) => ({
                          ...prevData,
                          name: e.target.value,
                        }));
                      }}
                      required
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label">
                    Description
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      id="description"
                      type="text"
                      value={modalData.description}
                      onChange={(e) => {
                        setModalData((prevData) => ({
                          ...prevData,
                          description: e.target.value,
                        }));
                      }}
                      required
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label">
                    id_category
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormSelect
                      id="categorySelect"
                      value={modalData.id_category}
                      onChange={(e) => {
                        setModalData((prevData) => ({
                          ...prevData,
                          id_category: e.target.value,
                        }));
                      }}
                      required
                    >
                      <option value="">Select Category</option>
                      {categoryData.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </CFormSelect>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label">
                    Weight
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      id="weight"
                      type="text"
                      value={modalData.weight}
                      onChange={(e) => {
                        setModalData((prevData) => ({
                          ...prevData,
                          weight: e.target.value,
                        }));
                      }}
                      required
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label">
                    Stock
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      id="stock"
                      type="text"
                      value={modalData.stock}
                      onChange={(e) => {
                        setModalData((prevData) => ({
                          ...prevData,
                          stock: e.target.value,
                        }));
                      }}
                      required
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label">
                    Price
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      id="price"
                      type="text"
                      value={modalData.price}
                      onChange={(e) => {
                        setModalData((prevData) => ({
                          ...prevData,
                          price: e.target.value,
                        }));
                      }}
                      required
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label">
                    Price Discount
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      id="price_discount"
                      type="text"
                      value={modalData.price_discount}
                      onChange={(e) => {
                        setModalData((prevData) => ({
                          ...prevData,
                          price_discount: e.target.value,
                        }));
                      }}
                      required
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label">
                    Id_Parent
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormSelect
                      id="id_parent"
                      value={modalData.id_parent}
                      onChange={(e) => {
                        setModalData((prevData) => ({
                          ...prevData,
                          id_parent: e.target.value,
                        }));
                      }}
                      required
                    >
                      <option value="0">Select Parent</option>
                      {parentData.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </CFormSelect>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label">
                    Type
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormCheck
                      id="type"
                      type="radio"
                      value="parent"
                      label="Parent"
                      checked={modalData.type === "parent"}
                      onChange={(e) => {
                        setModalData((prevData) => ({
                          ...prevData,
                          type: "parent",
                        }));
                      }}
                    />
                    <CFormCheck
                      id="type"
                      type="radio"
                      value="child"
                      label="child"
                      checked={modalData.type === "child"}
                      onChange={(e) => {
                        setModalData((prevData) => ({
                          ...prevData,
                          type: "child",
                        }));
                      }}
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label">
                    Status
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormCheck
                      id="status"
                      type="radio"
                      value="active"
                      label="active"
                      checked={modalData.status === "active"}
                      onChange={(e) => {
                        setModalData((prevData) => ({
                          ...prevData,
                          status: "active",
                        }));
                      }}
                    />
                    <CFormCheck
                      id="status"
                      type="radio"
                      value="inactive"
                      label="inactive"
                      checked={modalData.status === "inactive"}
                      onChange={(e) => {
                        setModalData((prevData) => ({
                          ...prevData,
                          status: "inactive",
                        }));
                      }}
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label">
                    Variant
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      id="variant"
                      type="text"
                      value={modalData.variant}
                      onChange={(e) => {
                        setModalData((prevData) => ({
                          ...prevData,
                          variant: e.target.value,
                        }));
                      }}
                      required
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label">
                    Image
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      id="img"
                      type="file"
                      value={modalData.img}
                      onChange={(e) => setPhotoFile(e.target.files[0])}
                      required
                    />
                  </CCol>
                </CRow>
              </div>
            )}
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={closeModal}>
              Cancel
            </CButton>
            <CButton color="primary" type="submit">
              Save Changes
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>

      {/* Update Product */}
      <CModal
        size="lg"
        backdrop="static"
        visible={modalEditOpen}
        onClose={closeModal}
      >
        <CModalHeader>
          <CModalTitle>Create Product</CModalTitle>
        </CModalHeader>
        <CForm
          className="row g-3 needs-validation"
          noValidate
          validated={validated}
          onSubmit={handleEdit}
        >
          <CModalBody>
            {modalData && (
              <div>
                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label">
                    Name
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      id="name"
                      type="text"
                      value={modalData.name}
                      onChange={(e) => {
                        setModalData((prevData) => ({
                          ...prevData,
                          name: e.target.value,
                        }));
                      }}
                      required
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label">
                    Description
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      id="description"
                      type="text"
                      value={modalData.description}
                      onChange={(e) => {
                        setModalData((prevData) => ({
                          ...prevData,
                          description: e.target.value,
                        }));
                      }}
                      required
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label">
                    id_category
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormSelect
                      id="categorySelect"
                      value={modalData.id_category}
                      onChange={(e) => {
                        setModalData((prevData) => ({
                          ...prevData,
                          id_category: e.target.value,
                        }));
                      }}
                      required
                    >
                      <option value="">Select Category</option>
                      {categoryData.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </CFormSelect>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label">
                    Weight
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      id="weight"
                      type="text"
                      value={modalData.weight}
                      onChange={(e) => {
                        setModalData((prevData) => ({
                          ...prevData,
                          weight: e.target.value,
                        }));
                      }}
                      required
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label">
                    Stock
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      id="stock"
                      type="text"
                      value={modalData.stock}
                      onChange={(e) => {
                        setModalData((prevData) => ({
                          ...prevData,
                          stock: e.target.value,
                        }));
                      }}
                      required
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label">
                    Price
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      id="price"
                      type="text"
                      value={modalData.price}
                      onChange={(e) => {
                        setModalData((prevData) => ({
                          ...prevData,
                          price: e.target.value,
                        }));
                      }}
                      required
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label">
                    Price Discount
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      id="price_discount"
                      type="text"
                      value={modalData.price_discount}
                      onChange={(e) => {
                        setModalData((prevData) => ({
                          ...prevData,
                          price_discount: e.target.value,
                        }));
                      }}
                      required
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label">
                    Id_Parent
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormSelect
                      id="id_parent"
                      value={modalData.id_parent}
                      onChange={(e) => {
                        setModalData((prevData) => ({
                          ...prevData,
                          id_parent: e.target.value,
                        }));
                      }}
                      required
                    >
                      <option value="0">Select Parent</option>
                      {parentData.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </CFormSelect>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label">
                    Type
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormCheck
                      id="type"
                      type="radio"
                      value="parent"
                      label="Parent"
                      checked={modalData.type === "parent"}
                      onChange={(e) => {
                        setModalData((prevData) => ({
                          ...prevData,
                          type: "parent",
                        }));
                      }}
                    />
                    <CFormCheck
                      id="type"
                      type="radio"
                      value="child"
                      label="child"
                      checked={modalData.type === "child"}
                      onChange={(e) => {
                        setModalData((prevData) => ({
                          ...prevData,
                          type: "child",
                        }));
                      }}
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label">
                    Status
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormCheck
                      id="status"
                      type="radio"
                      value="active"
                      label="active"
                      checked={modalData.status === "active"}
                      onChange={(e) => {
                        setModalData((prevData) => ({
                          ...prevData,
                          status: "active",
                        }));
                      }}
                    />
                    <CFormCheck
                      id="status"
                      type="radio"
                      value="inactive"
                      label="inactive"
                      checked={modalData.status === "inactive"}
                      onChange={(e) => {
                        setModalData((prevData) => ({
                          ...prevData,
                          status: "inactive",
                        }));
                      }}
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label">
                    Variant
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      id="variant"
                      type="text"
                      value={modalData.variant}
                      onChange={(e) => {
                        setModalData((prevData) => ({
                          ...prevData,
                          variant: e.target.value,
                        }));
                      }}
                      required
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label">
                    Image
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      id="img"
                      type="file"
                      // value={modalData.img}
                      onChange={(e) => setPhotoFile(e.target.files[0])}
                    />
                    {modalData.img && (
                      <img
                        src={"http://localhost:8000/img/" + modalData.img}
                        className="w-25"
                        style={{ border: "1px solid red", margin: "10px" }}
                        alt="Product"
                      />
                    )}
                  </CCol>
                </CRow>
              </div>
            )}
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={closeModal}>
              Cancel
            </CButton>
            <CButton color="primary" type="submit">
              Save Changes
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>

      {/* Detail Product */}
      <CModal
        size="lg"
        backdrop="static"
        visible={modalOpen}
        onClose={closeModal}
      >
        <CModalHeader>
          <CModalTitle>Create Product</CModalTitle>
        </CModalHeader>
        <CForm
          className="row g-3 needs-validation"
          noValidate
          validated={validated}
        >
          <CModalBody>
            {modalData && (
              <div>
                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label">
                    Name
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      id="name"
                      type="text"
                      value={modalData.name}
                      onChange={(e) => {
                        setModalData((prevData) => ({
                          ...prevData,
                          name: e.target.value,
                        }));
                      }}
                      required
                      readOnly
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label">
                    Description
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      id="description"
                      type="text"
                      value={modalData.description}
                      onChange={(e) => {
                        setModalData((prevData) => ({
                          ...prevData,
                          description: e.target.value,
                        }));
                      }}
                      required
                      readOnly
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label">
                    id_category
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      id="category"
                      type="text"
                      value={modalData.category.name}
                      required
                      readOnly
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label">
                    Weight
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      id="weight"
                      type="text"
                      value={modalData.weight}
                      onChange={(e) => {
                        setModalData((prevData) => ({
                          ...prevData,
                          weight: e.target.value,
                        }));
                      }}
                      required
                      readOnly
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label">
                    Stock
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      id="stock"
                      type="text"
                      value={modalData.stock}
                      onChange={(e) => {
                        setModalData((prevData) => ({
                          ...prevData,
                          stock: e.target.value,
                        }));
                      }}
                      required
                      readOnly
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label">
                    Price
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      id="price"
                      type="text"
                      value={modalData.price}
                      onChange={(e) => {
                        setModalData((prevData) => ({
                          ...prevData,
                          price: e.target.value,
                        }));
                      }}
                      required
                      readOnly
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label">
                    Price Discount
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      id="price_discount"
                      type="text"
                      value={modalData.price_discount}
                      onChange={(e) => {
                        setModalData((prevData) => ({
                          ...prevData,
                          price_discount: e.target.value,
                        }));
                      }}
                      required
                      readOnly
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label">
                    Id_Parent
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      id="category"
                      type="text"
                      value={modalData.id_parent}
                      required
                      readOnly
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label">
                    Type
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      id="type"
                      type="text"
                      value={modalData.type}
                      required
                      readOnly
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label">
                    Status
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      id="type"
                      type="text"
                      value={modalData.status}
                      required
                      readOnly
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label">
                    Variant
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      id="variant"
                      type="text"
                      value={modalData.variant}
                      onChange={(e) => {
                        setModalData((prevData) => ({
                          ...prevData,
                          variant: e.target.value,
                        }));
                      }}
                      required
                      readOnly
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel className="col-sm-2 col-form-label">
                    Image
                  </CFormLabel>
                  <CCol sm={10}>
                    {modalData.img && (
                      <img
                        src={"http://localhost:8000/img/" + modalData.img}
                        className="w-25"
                        style={{ border: "1px solid red", margin: "10px" }}
                        alt="Product"
                      />
                    )}
                  </CCol>
                </CRow>
              </div>
            )}
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={closeModal}>
              Cancel
            </CButton>
            <CButton color="primary" type="submit">
              Save Changes
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </>
  );
};

export default Dashboard;
