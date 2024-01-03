import React from "react";
import CIcon from "@coreui/icons-react";
import { cilDrop, cilPencil, cilSpeedometer } from "@coreui/icons";
import { CNavItem } from "@coreui/react";

const _nav = [
  {
    component: CNavItem,
    name: "Product",
    to: "/admin/dashboard",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Category",
    to: "/admin/Category",
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Status",
    to: "/admin/dashboard",
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Sales",
    to: "/admin/dashboard",
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Sales Items",
    to: "/admin/dashboard",
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
];

export default _nav;
