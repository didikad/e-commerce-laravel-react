import React, { useState, useEffect } from "react";

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CFormLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CForm,
} from "@coreui/react";

const Category = () => {
  const [tableData, setTableData] = useState([]);
  const [modalData, setModalData] = useState();
  const [validated, setValidated] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [modalCreateOpen, setModalCreateOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/api/category", { method: "GET" })
      .then((response) => response.json())
      .then((data) => setTableData(data.data))
      .catch((error) => console.error(error.message));
  }, []);

  const openModalEdit = (id) => {
    fetch(`http://localhost:8000/api/category/${id}`, { method: "GET" })
      .then((response) => response.json())
      .then((data) => setModalData(data.data), setModalEditOpen(true))
      .catch((error) => console.error(error.message));
  };

  const openModalCreate = () => {
    setModalData({
      name: "",
    });
    setModalCreateOpen(true);
  };

  const handleEdit = (id) => {
    const form = id.currentTarget;
    if (form.checkValidity() === false) {
      id.preventDefault();
      id.stopPropagation();
    }
    setValidated(true);
    if (form.checkValidity() === true) {
      const requestData = {
        name: modalData.name,
      };

      fetch(`http://localhost:8000/api/category/${modalData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then(
          (data) => closeModal()
          // fetch("http://localhost:8000/api/category", { method: "GET" })
          //   .then((response) => response.json())
          //   .then((data) => setTableData(data.data))
          //   .catch((error) => console.error(error.message))
        )
        .catch((error) => console.error(error.message))
        .finally(() => {
          window.location.reload();
        });
    }
  };

  const handleCreate = (id) => {
    const form = id.currentTarget;
    if (form.checkValidity() === false) {
      id.preventDefault();
      id.stopPropagation();
    }
    setValidated(true);
    if (form.checkValidity() === true) {
      const requestData = {
        name: modalData.name,
      };

      fetch(`http://localhost:8000/api/category`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then(
          (data) => closeModal()
          // fetch("http://localhost:8000/api/category", { method: "GET" })
          //   .then((response) => response.json())
          //   .then((data) => setTableData(data.data))
          //   .catch((error) => console.error(error.message))
        )
        .catch((error) => console.error(error.message))
        .finally(() => {
          window.location.reload();
        });
    }
  };

  const handleDelete = (id) => {
    const shoudDelete = window.confirm("Are you sure you want to delete ?");
    console.log(id);
    if (shoudDelete) {
      fetch(`http://localhost:8000/api/category/${id}`, {
        method: "DELETE",
      })
        .then(() =>
          fetch("http://localhost:8000/api/category", { method: "GET" })
            .then((response) => response.json())
            .then((data) => setTableData(data.data))
            .catch((error) => console.error(error.message))
        )
        .catch((error) => console.error(error.message));
    }
  };

  const closeModal = () => {
    setModalData(null);
    setModalCreateOpen(false);
    setModalEditOpen(false);
    setValidated(false);
  };

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader className="d-flex justify-content-between">
              Category{" "}
              <CButton
                onClick={() => {
                  openModalCreate();
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
                    <CTableHeaderCell>ID</CTableHeaderCell>
                    <CTableHeaderCell>Name</CTableHeaderCell>
                    <CTableHeaderCell>Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {tableData.map((item, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell className="text-center">
                        <div>{item.id}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.name}</div>
                      </CTableDataCell>
                      <CTableDataCell>
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

      {/* Mdal Edit */}
      <CModal
        size="lg"
        backdrop="static"
        visible={modalEditOpen}
        onClose={closeModal}
      >
        <CModalHeader>
          <CModalTitle>Update Category</CModalTitle>
        </CModalHeader>
        {/* <CForm
          className="row g-3 needs-validation"
          noValidate
          validated={validated}
          onSubmit={handleEdit}
        > */}
        <CModalBody>
          {modalData && (
            <div>
              <CRow>
                <CFormLabel>Name</CFormLabel>
                <CCol>
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
            </div>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={closeModal}>
            Cancel
          </CButton>
          <CButton color="primary" type="submit" onClick={handleEdit}>
            Save Changes
          </CButton>
        </CModalFooter>
        {/* </CForm> */}
      </CModal>

      {/* Modal Create */}
      <CModal
        size="lg"
        backdrop="static"
        visible={modalCreateOpen}
        onClose={closeModal}
      >
        <CModalHeader>
          <CModalTitle>Update Category</CModalTitle>
        </CModalHeader>
        {/* <CForm
          className="row g-3 needs-validation"
          noValidate
          validated={validated}
          onSubmit={handleCreate}
        > */}
        <CModalBody>
          {modalData && (
            <div>
              <CRow>
                <CFormLabel>Name</CFormLabel>
                <CCol>
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
            </div>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={closeModal}>
            Cancel
          </CButton>
          <CButton color="primary" type="submit" onClick={handleCreate}>
            Save Changes
          </CButton>
        </CModalFooter>
        {/* </CForm> */}
      </CModal>
    </>
  );
};

export default Category;
