import {Link, useNavigate} from "react-router-dom";
import Rating from "react-rating-stars-component";
import {timedateFormatter} from "../utils/commonfunction";

const Home = ({setSearch, setSort, companyList, modalTrue, sortname}) => {
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="search-section">
        <div className="select-city">
          <label for="city">Select City:</label>
          <input
            type="text"
            id="city"
            placeholder="Indore"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="find-company-btn">Find Company</button>
        </div>
        <div className="add-company">
          <button
            className="add-company-btn"
            onClick={() => {
              modalTrue();
            }}
          >
            + Add Company{" "}
          </button>
          <div className="sort-dropdown gap">
            <button className="sort-btn">
              Sort By {sortname ? sortname : "Company Name"}
            </button>
            <div className="dropdown-content" id="sortOptions">
              <Link to="#" onClick={() => setSort("a-z")}>
                {" "}
                a-z
              </Link>
              <Link to="#" onClick={() => setSort("z-a")}>
                z-a
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="result-section">
        {companyList && companyList?.length > 0 ? (
          companyList?.map((company) => {
            return (
              <div className="company-list">
                <div className="company-card">
                  <div className="company-logo">
                    {company?.logo ? (
                      <img
                        src={`${API_URL}/public/uploads/${company?.logo}`}
                        alt="Company Logo"
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="company-info">
                    <h3 className="company-name">
                      {company?.companyName ? company?.companyName : ""}
                    </h3>
                    <p className="company-address">
                      {company?.location ? company?.location : ""}
                    </p>
                    <div className="rating-section">
                      <span className="rating">
                        {company?.averageRating
                          ? Math.round((company?.averageRating || 0) * 2) / 2 ||
                            0
                          : 0}
                      </span>

                      <Rating
                        className="mb-3.5"
                        value={
                          Math.round((company?.averageRating || 0) * 2) / 2 || 0
                        }
                        edit={false}
                        size={30}
                        activeColor="#ffd700"
                        isHalf={true}
                      />
                      <span className="reviews">
                        {" "}
                        {company?.ratings?.length
                          ? company?.ratings?.length
                          : 0}{" "}
                        Reviews
                      </span>
                    </div>
                  </div>
                  <div className="company-actions">
                    <span className="founded-date">
                      Founded on{" "}
                      {company?.founded
                        ? timedateFormatter(company?.founded)
                        : ""}
                    </span>
                    <button
                      className="detail-review-btn"
                      onClick={() => {
                        navigate(`/single-company-detail/${company?._id}`);
                      }}
                    >
                      Detail Review
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>No company found</p>
        )}
      </div>
    </div>
  );
};

export default Home;
