import {timedateFormatter} from "../utils/commonfunction";
import Rating from "react-rating-stars-component";

const CompanyInfo = ({companyInfo, modalTrue}) => {
  return (
    <>
      <br />
      <br />
      <div className="container">
        <div className="company-info">
          <div className="company-details">
            <h2>{companyInfo?.companyName ? companyInfo?.companyName : ""}</h2>
            <p>{companyInfo?.location ? companyInfo?.location : ""}</p>
            <p>
              Founded on{" "}
              {companyInfo?.founded
                ? timedateFormatter(companyInfo?.founded)
                : ""}
            </p>
          </div>
          <button
            className="add-review-btn"
            onClick={() => {
              modalTrue();
            }}
          >
            + Add Review
          </button>{" "}
          {/* Moved button here */}
        </div>
        <div className="rating-summary">
          <div className="rating-value">
            <span>{Math.round((companyInfo?.averageRating || 0) * 2) / 2}</span>
            <div className="stars">
              {companyInfo?.averageRating && (
                <Rating
                  className="mb-3.5"
                  value={
                    Math.round((companyInfo?.averageRating || 0) * 2) / 2 || 0
                  }
                  edit={false}
                  size={30}
                  activeColor="#ffd700"
                  isHalf={true}
                />
              )}
            </div>
          </div>
          <p>
            {companyInfo?.ratings?.length > 0
              ? companyInfo?.ratings?.length
              : 0}{" "}
            Reviews
          </p>
        </div>

        <div className="reviews">
          <ul>
            {companyInfo?.ratings?.length > 0 ? (
              companyInfo?.ratings?.map((ratings) => {
                return (
                  <li>
                    <div className="review-content">
                      <div className="review-header">
                        <h4>{ratings?.fullName}</h4>

                        <div className="review-rating">
                          <Rating
                            className="mb-3.5"
                            value={ratings?.rating}
                            edit={false}
                            size={30}
                            activeColor="#ffd700"
                            isHalf={true}
                          />
                        </div>
                      </div>
                      <p>Subject- {ratings?.subject}</p>
                      <p>Review Text-{ratings?.reviewText}</p>
                    </div>
                  </li>
                );
              })
            ) : (
              <p>no review found</p>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};
export default CompanyInfo;
