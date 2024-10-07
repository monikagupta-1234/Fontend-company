import {useEffect, useState} from "react";
import {getAllCompany} from "../apiservices/companyapi";
import Home from "../Components/Home";
import AddModal from "../modals/addCompany";

function HomePage() {
  const [companyList, setCompanyInfo] = useState([]);
  const [search, setSearch] = useState("");
  const [sortname, setSort] = useState("");
  const [ismodalOpen, setModal] = useState(false);
 

  const getCompanies = () => {
    getAllCompany(setCompanyInfo, search, sortname);
  };
  // eslint-disable-next-line
  const modalClose = () => {
    setModal(false);
  };
  const modalTrue = () => {
    setModal(true);
  };

  useEffect(() => {
    getCompanies();
    // eslint-disable-next-line
  }, [sortname, search]);
  return (
    <>
      <Home
        setSearch={setSearch}
        setSort={setSort}
        companyList={companyList}
        modalTrue={modalTrue}
        sortname={sortname}
      
      />
      <AddModal
        isOpen={ismodalOpen}
        onRequestClose={modalClose}
        setCompanyInfo={setCompanyInfo}
       
      />
    </>
  );
}
export default HomePage;
