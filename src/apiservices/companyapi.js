import axios from "axios";
import {toast} from "react-toastify";

const API_URL = process.env.REACT_APP_API_URL;
export const getAllCompany = async (setCompanyInfo, search, sortname) => {
  try {
    let url;
    if (!search && !sortname) {
      url = `${API_URL}/company`;
    } else {
      url = `${API_URL}/company?asc=${sortname}&city=${search}`;
    }
    const companyList = await axios.get(url);
    setCompanyInfo(companyList?.data?.companyList);
  } catch (err) {
    if (err?.response?.message) {
      toast.error(err?.response?.message);
    }
  }
};

export const getSingleCompanyDetail = async (setCompanyInfo, id) => {
  try {
    const companyList = await axios.get(
      `${API_URL}/company/single-company/${id}`
    );

    setCompanyInfo(companyList?.data?.singleCompany);
  } catch (err) {
    if (err?.response?.message) {
      toast.error(err?.response?.message);
    }
  }
};

export const addCompanyDetails = async (
  payload,
  setCompanyInfo,
  onRequestClose
) => {
  try {
    const formdata = new FormData();
    formdata.append("companyName", payload.companyName);
    formdata.append("location", payload.location);
    formdata.append("founded", payload.founded);
    formdata.append("city", payload.city);
    formdata.append("image", payload.image);

    await axios.post(`${API_URL}/company`, formdata);
    getAllCompany(setCompanyInfo);
    onRequestClose();
    toast.success("Company added successfully");
  } catch (err) {
    if (err?.response?.message) {
      toast.error(err?.response?.message);
    }
  }
};
