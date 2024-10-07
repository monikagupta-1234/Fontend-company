import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleCompanyDetail } from "../../apiservices/companyapi";
import CompanyInfo from "../../Components/Company";
import AddReviewModal from "../../modals/addReview";
import "./Company.css";
function CompanyDetail() {
  const { id } = useParams();
  const [companyInfo, setCompanyInfo] = useState();
  const [ismodalOpen, setModal] = useState(false);

  const getSingleDetails = () => {
    getSingleCompanyDetail(setCompanyInfo, id);
  };
  const modalClose = () => {
    setModal(false);
  };
  const modalTrue = () => {
    setModal(true);
  };
  useEffect(() => {
    getSingleDetails();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <CompanyInfo companyInfo={companyInfo} modalTrue={modalTrue} />
      <AddReviewModal
        isOpen={ismodalOpen}
        onRequestClose={modalClose}
        setCompanyInfo={setCompanyInfo}
      />
    </>
  );
}

export default CompanyDetail;
