import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addReview } from "../apiservices/reviewapi";
import Rating from "react-rating-stars-component";
import { useParams } from "react-router-dom";

const validationSchema = yup.object().shape({
  subject: yup
    .string()
    .min(4, "Minimum 4 characters required")
    .required("Company name is required"),
  reviewText: yup
    .string()
    .min(4, "Minimum 4 characters required")
    .required("reviewText is required"),
  fullName: yup
    .string()
    .min(4, "Minimum 4 characters required")
    .required("fullName is required"),
});

const AddReviewModal = ({ isOpen, onRequestClose, setCompanyInfo }) => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const [rating, setRating] = useState(0);
  const ratingChanged = (newRating) => {
    setRating(newRating);
  };
  const onSubmit = (data) => {
    const payload = {
      subject: data.subject,
      reviewText: data.reviewText,
      fullName: data.fullName,
      rating: String(rating),
      id: id,
    };

    addReview(payload, setCompanyInfo, onRequestClose);
  };

  useEffect(() => {
    setRating(0);
    reset();
    setValue("subject", "");
    setValue("reviewText", "");
    setValue("fullName", "");

    // eslint-disable-next-line
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Company"
      className="modal"
      overlayClassName="overlay">
      <h2 className="modal-title">Add Review</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="modal-form">
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" {...register("fullName")} />
          {errors.fullName && (
            <p className="error-message">{errors.fullName.message}</p>
          )}
        </div>

        <div className="form-group">
          <label>Rating</label>
          <Rating
            className="mb-3.5"
            style={{ display: "inline-block !important" }}
            value={rating}
            edit={true}
            size={30}
            activeColor="#e7bb5f"
            onChange={ratingChanged}
          />
        </div>

        <div className="form-group">
          <label>Subject</label>
          <input type="text" {...register("subject")} />
          {errors.subject && (
            <p className="error-message">{errors.subject.message}</p>
          )}
        </div>

        <div className="form-group">
          <label>Review Text</label>
          <input type="text" {...register("reviewText")} />
          {errors.reviewText && (
            <p className="error-message">{errors.reviewText.message}</p>
          )}
        </div>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </Modal>
  );
};

export default AddReviewModal;
