import axios from "axios";
import { toast } from "react-toastify";
import { getSingleCompanyDetail } from "./companyapi";

const API_URL = process.env.REACT_APP_API_URL;

export const addReview = async (payload, setCompanyInfo, onRequestClose) => {
  try {
    await axios.post(`${API_URL}/review`, payload);
    await getSingleCompanyDetail(setCompanyInfo, payload?.id);

    onRequestClose();
    toast.success("Review added successfully");
  } catch (err) {
    if (err?.response?.message) {
      toast.error(err?.response?.message);
    }
  }
};
