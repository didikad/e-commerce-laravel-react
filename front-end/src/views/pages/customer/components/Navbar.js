import React, { useState, useEffect } from "react";
import {
  CNavbar,
  CContainer,
  CNavbarBrand,
  CNavbarToggler,
  CCollapse,
  CNavbarNav,
  CNavItem,
  CNavLink,
  CButton,
  CBadge,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";
import { cilCart } from "@coreui/icons";
import Sidebar from "./Sidebar";

const Navbar = ({ variant }) => {
  const [visible, setVisible] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [dataCount, setDataCount] = useState(0);

  useEffect(() => {
    const savedData = localStorage.getItem("variants");

    // localStorage.removeItem("variants");
    // localStorage.removeItem("salesData");
    const dataArray = JSON.parse(savedData);

    const count = dataArray ? dataArray.length : 0;

    setDataCount(count);
  }, []);
  const visibleSide = () => {
    setSidebarVisible(!sidebarVisible);
  };
  return (
    <CNavbar
      expand="lg"
      colorScheme="light"
      className="bg-light navbar-customer"
      placement="fixed-top"
    >
      <CContainer>
        <div className="d-flex justify-content-center align-aitems-center">
          <CNavbarToggler
            aria-label="Toggle Navigation"
            aria-expanded={visible}
            onClick={() => setVisible(!visible)}
          />
        </div>
        <CNavbarBrand href="#">Logo</CNavbarBrand>
        <CCollapse
          className="navbar-collapse justify-content-center"
          visible={visible}
        >
          <CNavbarNav className="gap-3">
            <CNavItem>
              <CNavLink href="/" active className="text-center">
                Home
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="/product" active className="text-center">
                Product
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="/about" active className="text-center">
                About
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="/tracking" active className="text-center">
                Tracking
              </CNavLink>
            </CNavItem>
          </CNavbarNav>
        </CCollapse>
        <Sidebar visible={sidebarVisible} variant={variant} />
        <CButton
          className="position-relative"
          onClick={visibleSide}
          style={{
            backgroundColor: "transparent",
            border: "none",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "lightgray")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
        >
          <CIcon icon={cilCart} height={24} style={{ color: "black" }} />
          {dataCount > 0 && (
            <CBadge
              color="danger"
              position="top-end"
              shape="rounded-pill"
              className="mt-1"
            >
              {dataCount}
            </CBadge>
          )}
        </CButton>
      </CContainer>
    </CNavbar>
  );
};

export default Navbar;
