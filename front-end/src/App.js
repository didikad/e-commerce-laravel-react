import React, { Component, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./scss/style.scss";
import "./index.css";
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/pages/register/Register"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));
const Layout = React.lazy(() => import("./views/pages/customer/layout"));
const PrivateRoute = React.lazy(() =>
  import("./views/pages/login/PrivateRoute")
);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/admin" name="Login Page" element={<Login />} />
            <Route
              exact
              path="/register"
              name="Register Page"
              element={<Register />}
            />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/*" name="Page 500" element={<Layout />} />
            <Route path="/admin/*" name="Home" element={<PrivateRoute />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
