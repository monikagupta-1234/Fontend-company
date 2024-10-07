import React, {useState, useEffect} from "react";
import Modal from "react-modal";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {addCompanyDetails} from "../apiservices/companyapi";
import {toast} from "react-toastify";

const validationSchema = yup.object().shape({
  companyName: yup
    .string()
    .min(4, "Minimum 4 characters required")
    .required("Company name is required"),
  foundedOn: yup
    .date()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .required("Founded date is required"),
  location: yup
    .string()
    .min(4, "Minimum 4 characters required")
    .required("Location is required"),
  city: yup
    .string()
    .min(4, "Minimum 4 characters required")
    .required("City is required"),
});

const AddModal = ({isOpen, onRequestClose, setCompanyInfo}) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const [logo, setLogo] = useState(null);
  const onSubmit = (data) => {
    if (logo) {
      const payload = {
        companyName: data.companyName,
        location: data.location,
        founded: data.foundedOn,
        city: data.city,
        image: logo,
      };

      addCompanyDetails(payload, setCompanyInfo, onRequestClose);
    } else {
      toast.error("Please add logo ");
    }
  };

  useEffect(() => {
    reset();
    setValue("companyName", "");
    setValue("foundedOn", "");
    setValue("location", "");
    setValue("city", "");
    setLogo(null);
    // eslint-disable-next-line
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Company"
      className="modal"
      overlayClassName="overlay"
    >
      <h2 className="modal-title">Add Company</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="modal-form">
        <div className="form-group">
          <label>Company Name</label>
          <input type="text" {...register("companyName")} />
          {errors.companyName && (
            <p className="error-message">{errors.companyName.message}</p>
          )}
        </div>

        <div className="form-group">
          <label>Company Logo</label>
          <input
            type="file"
            onChange={(e) => {
              setLogo(e.target.files[0]);
            }}
          />

          {errors.companyLogo && (
            <p className="error-message">{errors.companyLogo.message}</p>
          )}
        </div>

        <div className="form-group">
          <label>Founded On</label>
          <input type="date" {...register("foundedOn")} />
          {errors.foundedOn && (
            <p className="error-message">{errors.foundedOn.message}</p>
          )}
        </div>

        <div className="form-group">
          <label>Location</label>
          <input type="text" {...register("location")} />
          {errors.location && (
            <p className="error-message">{errors.location.message}</p>
          )}
        </div>

        <div className="form-group">
          <label>City</label>
          <input type="text" {...register("city")} />
          {errors.city && (
            <p className="error-message">{errors.city.message}</p>
          )}
        </div>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </Modal>
  );
};

export default AddModal;
