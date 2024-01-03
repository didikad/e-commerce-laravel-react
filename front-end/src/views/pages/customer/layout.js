import React, { Suspense, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { CSpinner } from "@coreui/react";
import DashboardCustomer from "./Dashboard";
import Navbar from "./components/Navbar";
import Product_Detail from "./components/Product-detail";
import Footer from "./components/Footer";

const DefaultLayout = () => {
  const routes = [
    { path: "/", exact: true, name: "home", element: DashboardCustomer },
    {
      path: "/product-detail",
      exact: true,
      name: "home",
      element: Product_Detail,
    },
  ];

  const [variant, setVariant] = useState([]);
  const dataVariant = (dataVariant) => {
    setVariant(dataVariant);
  };
  return (
    <div>
      <Navbar visible={true} variant={variant} />
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, index) => {
            return (
              route.element && (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element dataVariant={dataVariant} />}
                />
              )
            );
          })}
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
