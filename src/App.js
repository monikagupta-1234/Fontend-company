import React from "react";
import "./App.css";
import Header from "./layout/Header";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import CompanyDetail from "./pages/CompanyDetail/CompanyDetail";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify";
function App() {
  return (
    <>
      <ToastContainer />

      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/single-company-detail/:id"
            element={<CompanyDetail />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
