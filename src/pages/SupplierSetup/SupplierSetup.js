import React, { useState, useEffect } from "react";
import axios from 'axios'
import {
  Button,
  Form,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Label,
  Input,
  FormFeedback,
  FormGroup,Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";

import UiContent from "../../Components/Common/UiContent";
import DataTable from "react-data-table-component";

import myImage from "../../assets/images/logo/Image_not_available.png";

import {
  createCompanyDetails,
  listCompanynDetails,
  updateDetails,
  getDetail,
  CompanyFileUpload,
} from "../../functions/Setup/CompanyDetails";
import {getProductDetails,updateProductDetails,createProductDetails,listProductDetails,removeProductDetails} from "../../functions/SupplierSetup/SupplierSetup"
import { listState, listCountry } from "../../functions/Location/Location";

const initialState = {
  SupplierName: "",
  CompanyName: "",
  ContactNo_Office: "",

  EmailID_Office: "",
  
  Country:"",
  

  IsActive: true,
};

const Supplier = () => {
  const countriesArray = [
    { label: "AX", value : "ALAND ISLANDS" },
    { label: "AL", value : "ALBANIA" },
    { label: "DZ", value : "ALGERIA" },
    { label: "AS", value : "AMERICAN SAMOA" },
    { label: "AD", value : "ANDORRA" },
    { label: "AI", value : "ANGUILLA" },
    { label: "AQ", value : "ANTARCTICA" },
    { label: "AG", value : "ANTIGUA AND BARBUDA" },
    { label: "AR", value : "ARGENTINA" },
    { label: "AM", value : "ARMENIA" },
    { label: "AW", value : "ARUBA" },
    { label: "AU", value : "AUSTRALIA" },
    { label: "AT", value : "AUSTRIA" },
    { label: "AZ", value : "AZERBAIJAN" },
    { label: "BS", value : "BAHAMAS" },
    { label: "BH", value : "BAHRAIN" },
    { label: "BD", value : "BANGLADESH" },
    { label: "BB", value : "BARBADOS" },
    { label: "BE", value : "BELGIUM" },
    { label: "BZ", value : "BELIZE" },
    { label: "BJ", value : "BENIN" },
    { label: "BM", value : "BERMUDA" },
    { label: "BT", value : "BHUTAN" },
    { label: "BA", value : "BOSNIA-HERZEGOVINA" },
    { label: "BW", value : "BOTSWANA" },
    { label: "BV", value : "BOUVET ISLAND" },
    { label: "BR", value : "BRAZIL" },
    { label: "BN", value : "BRUNEI DARUSSALAM" },
    { label: "BG", value : "BULGARIA" },
    { label: "BF", value : "BURKINA FASO" },
    { label: "CA", value : "CANADA" },
    { label: "CV", value : "CAPE VERDE" },
    { label: "KY", value : "CAYMAN ISLANDS" },
    { label: "CF", value : "CENTRAL AFRICAN REPUBLIC" },
    { label: "CL", value : "CHILE" },
    { label: "CN", value : "CHINA" },
    { label: "CX", value : "CHRISTMAS ISLAND" },
    { label: "CC", value : "COCOS (KEELING) ISLANDS" },
    { label: "CO", value : "COLOMBIA" },
    { label: "CK", value : "COOK ISLANDS" },
    { label: "CR", value : "COSTA RICA" },
    { label: "CY", value : "CYPRUS" },
    { label: "CZ", value : "CZECH REPUBLIC" },
    { label: "DK", value : "DENMARK" },
    { label: "DJ", value : "DJIBOUTI" },
    { label: "DM", value : "DOMINICA" },
    { label: "DO", value : "DOMINICAN REPUBLIC" },
    { label: "EC", value : "ECUADOR" },
    { label: "EG", value : "EGYPT" },
    { label: "SV", value : "EL SALVADOR" },
    { label: "EE", value : "ESTONIA" },
    { label: "FK", value : "FALKLAND ISLANDS (MALVINAS)" },
    { label: "FO", value : "FAROE ISLANDS" },
    { label: "FJ", value : "FIJI" },
    { label: "FI", value : "FINLAND" },
    { label: "FR", value : "FRANCE" },
    { label: "GF", value : "FRENCH GUIANA" },
    { label: "PF", value : "FRENCH POLYNESIA" },
    { label: "TF", value : "FRENCH SOUTHERN TERRITORIES" },
    { label: "GA", value : "GABON" },
    { label: "GM", value : "GAMBIA" },
    { label: "GE", value : "GEORGIA" },
    { label: "DE", value : "GERMANY" },
    { label: "GH", value : "GHANA" },
    { label: "GI", value : "GIBRALTAR" },
    { label: "GR", value : "GREECE" },
    { label: "GL", value : "GREENLAND" },
    { label: "GD", value : "GRENADA" },
    { label: "GP", value : "GUADELOUPE" },
    { label: "GU", value : "GUAM" },
    { label: "GG", value : "GUERNSEY" },
    { label: "GY", value : "GUYANA" },
    { label: "VA", value : "HOLY SEE (VATICAN CITY STATE)" },
    { label: "HN", value : "HONDURAS" },
    { label: "HK", value : "HONG KONG" },
    { label: "HU", value : "HUNGARY" },
    { label: "IS", value : "ICELAND" },
    { label: "IN", value : "INDIA" },
    { label: "ID", value : "INDONESIA" },
    { label: "IE", value : "IRELAND" },
    { label: "IM", value : "ISLE OF MAN" },
    { label: "IL", value : "ISRAEL" },
    { label: "IT", value : "ITALY" },
    { label: "JM", value : "JAMAICA" },
    { label: "JP", value : "JAPAN" },
    { label: "JE", value : "JERSEY" },
    { label: "JO", value : "JORDAN" },
    { label: "KZ", value : "KAZAKHSTAN" },
    { label: "KI", value : "KIRIBATI" },
    { label: "KR", value : "KOREA, REPUBLIC OF" },
    { label: "KW", value : "KUWAIT" },
    { label: "KG", value : "KYRGYZSTAN" },
    { label: "LV", value : "LATVIA" },
    { label: "LS", value : "LESOTHO" },
    { label: "LI", value : "LIECHTENSTEIN" },
    { label: "LT", value : "LITHUANIA" },
    { label: "LU", value : "LUXEMBOURG" },
    { label: "MO", value : "MACAO" },
    { label: "MK", value : "MACEDONIA" },
    { label: "LI", value : "LIECHTENSTEIN" },
    { label: "LT", value : "LITHUANIA" },
    { label: "LU", value : "LUXEMBOURG" },
    { label: "MO", value : "MACAO" },
    { label: "MK", value : "MACEDONIA" },
    { label: "MG", value : "MADAGASCAR" },
    { label: "MW", value : "MALAWI" },
    { label: "MY", value : "MALAYSIA" },
    { label: "MT", value : "MALTA" },
    { label: "MH", value : "MARSHALL ISLANDS" },
    { label: "MQ", value : "MARTINIQUE" },
    { label: "MR", value : "MAURITANIA" },
    { label: "MU", value : "MAURITIUS" },
    { label: "YT", value : "MAYOTTE" },
    { label: "MX", value : "MEXICO" },
    { label: "MD", value : "MOLDOVA, REPUBLIC OF" },
    { label: "MC", value : "MONACO" },
    { label: "MN", value : "MONGOLIA" },
    { label: "ME", value : "MONTENEGRO" },
    { label: "MS", value : "MONTSERRAT" },
    { label: "MA", value : "MOROCCO" },
    { label: "MZ", value : "MOZAMBIQUE" },
    { label: "NA", value : "NAMIBIA" },
    { label: "NR", value : "NAURU" },
    { label: "NP", value : "NEPAL" },
    { label: "NL", value : "NETHERLANDS" },
    { label: "AN", value : "NETHERLANDS ANTILLES" },
    { label: "NC", value : "NEW CALEDONIA" },
    { label: "NZ", value : "NEW ZEALAND" },
    { label: "NI", value : "NICARAGUA" },
    { label: "NE", value : "NIGER" },
    { label: "NU", value : "NIUE" },
    { label: "NF", value : "NORFOLK ISLAND" },
    { label: "MP", value : "NORTHERN MARIANA ISLANDS" },
    { label: "NO", value : "NORWAY" },
    { label: "OM", value : "OMAN" },
    { label: "PW", value : "PALAU" },
    { label: "PS", value : "PALESTINE" },
    { label: "PA", value : "PANAMA" },
    { label: "PY", value : "PARAGUAY" },
    { label: "PE", value : "PERU" },
    { label: "PH", value : "PHILIPPINES" },
    { label: "PN", value : "PITCAIRN" },
    { label: "PL", value : "POLAND" },
    { label: "PT", value : "PORTUGAL" },
    { label: "PR", value : "PUERTO RICO" },
    { label: "QA", value : "QATAR" },
    { label: "RE", value : "REUNION" },
    { label: "RO", value : "ROMANIA" },
    { label: "RU", value : "RUSSIAN FEDERATION" },
    { label: "RW", value : "RWANDA" },
    { label: "SH", value : "SAINT HELENA" },
    { label: "KN", value : "SAINT KITTS AND NEVIS" },
    { label: "LC", value : "SAINT LUCIA" },
    { label: "PM", value : "SAINT PIERRE AND MIQUELON" },
    { label: "WS", value : "SAMOA" },
    { label: "SM", value : "SAN MARINO" },
    { label: "ST", value : "SAO TOME AND PRINCIPE" },
    { label: "SA", value : "SAUDI ARABIA" },
    { label: "SN", value : "SENEGAL" },
    { label: "RS", value : "SERBIA" },
    { label: "SC", value : "SEYCHELLES" },
    { label: "SG", value : "SINGAPORE" },
    { label: "SK", value : "SLOVAKIA" },
    { label: "SI", value : "SLOVENIA" },
    { label: "SB", value : "SOLOMON ISLANDS" },
    { label: "ZA", value : "SOUTH AFRICA" },
    { label: "ES", value : "SPAIN" },
    { label: "SR", value : "SURINAME" },
    { label: "SJ", value : "SVALBARD AND JAN MAYEN" },
    { label: "SZ", value : "SWAZILAND" },
    { label: "SE", value : "SWEDEN" },
    { label: "CH", value : "SWITZERLAND" },
    { label: "TW", value : "TAIWAN, PROVINCE OF CHINA" },
    { label: "TZ", value : "TANZANIA, UNITED REPUBLIC OF" },
    { label: "TH", value : "THAILAND" },
    { label: "TL", value : "TIMOR-LESTE" },
    { label: "TG", value : "TOGO" },
    { label: "TK", value : "TOKELAU" },
    { label: "TO", value : "TONGA" },
    { label: "TT", value : "TRINIDAD AND TOBAGO" },
    { label: "TN", value : "TUNISIA" },
    { label: "TR", value : "TURKEY" },
    { label: "TM", value : "TURKMENISTAN" },
    { label: "TC", value : "TURKS AND CAICOS ISLANDS" },
    { label: "TV", value : "TUVALU" },
    { label: "UG", value : "UGANDA" },
    { label: "UA", value : "UKRAINE" },
    { label: "AE", value : "UNITED ARAB EMIRATES" },
    { label: "GB", value : "UNITED KINGDOM" },
    { label: "US", value : "UNITED STATES" },
    { label: "UM", value : "URUGUAY" },
    { label: "UZ", value : "UZBEKISTAN" },
    { label: "VU", value : "VANUATU" },
    { label: "VE", value : "VENEZUELA" },
    { label: "VN", value : "VIET NAM" },
    { label: "VG", value : "VIRGIN ISLANDS, BRITISH" },
    { label: "VI", value : "VIRGIN ISLANDS, U.S." },
    { label: "WF", value : "WALLIS AND FUTUNA" },
    { label: "EH", value : "WESTERN SAHARA" },
    { label: "ZM", value : "ZAMBIA" }
  ];
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [filter, setFilter] = useState(true);
  const [query, setQuery] = useState("");
  const [blogs, setBlogs] = useState([]);
 
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(0);
  const [column, setcolumn] = useState();
  const [sortDirection, setsortDirection] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingOption, setLoadingOption] = useState(false);
  //validation
  const [errSN, setErrSN] = useState(false);
  // const [errCPN, setErrCPN] = useState(false);
  const [errCountry, setErrCountry] = useState(false);
  const [errState, setErrState] = useState(false);
  const [errCity, setErrCity] = useState(false);
  const [companyname, setCompanyName] = useState(false);
  const [errPincode, setErrPincode] = useState(false);
  const [errAddress1, setErrAddress1] = useState(false);
  const [errAddress2, setErrAddress2] = useState(false);
  const [errCNOffice, setErrCNOffice] = useState(false);
  const [errCNSupport, setErrCNSupport] = useState(false);
  const [errCNSales, setErrCNSales] = useState(false);
  const [errEmailOffice, setErrEmailOffice] = useState(false);
  const [errEmailSales, setErrEmailSales] = useState(false);
  const [errEmailSupport, setErrEmailSupport] = useState(false);
  const [errGST, setErrGST] = useState(false);
  const [errWeb1, setErrWeb1] = useState(false);

  const [_id, set_Id] = useState("");
  const [remove_id, setRemove_id] = useState("");

  const [values, setValues] = useState(initialState);
  const {
    SupplierName,
  Website1,
  ContactNo_Office,
  CompanyName,
  EmailID_Office,
  
  Country,
  
  IsActive,
  } = values;

  const [showForm, setShowForm] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);

  const [details, setDetails] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  const [modal_list, setmodal_list] = useState(false);
  const tog_list = () => {
    setmodal_list(!modal_list);
    setIsSubmit(false);
    setValues([]);
  };

  const [modal_delete, setmodal_delete] = useState(false);
  const tog_delete = (_id) => {
    setmodal_delete(!modal_delete);
    setRemove_id(_id);
  };

  const [modal_edit, setmodal_edit] = useState(false);
  const handleTog_edit = (_id) => {
    // setmodal_edit(!modal_edit);
    setUpdateForm(true);
    setIsSubmit(false);
    set_Id(_id);
    getProductDetails(_id)
      .then((res) => {
        console.log(res);
        setValues({
          ...values,
          
          SupplierName: res.SupplierName,
          
         
          Country: res.Country,
          ContactNo_Office: res.ContactNo_Office,
          EmailID_Office: res.EmailID_Office,
          
          CompanyName: res.CompanyName,
          IsActive: res.IsActive,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchCategories();
    loadCountries();
    loadStates();
  }, []);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("no errors");
    }
  }, [formErrors, isSubmit]);

  // const fetchCategories = () => {
  //   listCompanynDetails().then((res) => {
  //     setDetails(res);
  //     console.log(details);
  //   });
  // };
  const handleSort = (column, sortDirection) => {
    setcolumn(column.sortField);
    setsortDirection(sortDirection);
  };
  useEffect(() => {
    fetchCategories();
  }, [pageNo, perPage, column, sortDirection, query, filter]);
  const fetchCategories = async () => {
    setLoading(true);
    let skip = (pageNo - 1) * perPage;
    if (skip < 0) {
      skip = 0;
    }

    await axios
      .post(`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/list-by-params/supplier`, {
        skip: skip,
        per_page: perPage,
        sorton: column,
        sortdir: sortDirection,
        match: query,
        IsActive: filter,
      })
      .then((response) => {
        console.log(response.length)
        if (response.length > 0) {
          let res = response[0];
          console.log("Response:",res.data)
          setLoading(false);
          setBlogs(res.data);
          setTotalRows(res.count);
        } else if (response.length === 0) {
          setBlogs([]);
        }
        // console.log(res);
      });
    setLoading(false);
  };
  const handlePageChange = (page) => {
    setPageNo(page);
  };
  const handlePerRowsChange = async (newPerPage, page) => {
    // setPageNo(page);
    setPerPage(newPerPage);
  };
  const handleFilter = (e) => {
    setFilter(e.target.checked);
    console.log("lol",e.target.value)
  };
  const loadCountries = () => {
    listCountry().then((res) => setCountries(res));
  };

  const loadStates = () => {
    listState().then((res) => {
      setStates(res);
      console.log(res);
    });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setFormErrors(validate(values));
    let errors = validate(values);
    setFormErrors(errors);
    setIsSubmit(true);
if(Object.keys(errors).length===0){


    createProductDetails(values)
      .then((res) => {
        setValues(initialState);
        setShowForm(false);
        setUpdateForm(false);
        fetchCategories();
      })
      .catch((err) => {
        console.log(err);
      });
    }
  };

  const handleAddCancel = (e) => {
    e.preventDefault();
    setShowForm(false);
    setUpdateForm(false);
    setValues(initialState);
    setIsSubmit(false);
  };
  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(
        `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/delete/supplier/${remove_id}`)
      .then((res) => {
        setmodal_delete(!modal_delete);
        fetchCategories();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdate = (e) => {
    // debugger;
    e.preventDefault();
    let errors = validate(values);
    setFormErrors(errors);
    console.log("errors", errors);
    setIsSubmit(true);
    if (Object.keys(errors).length === 0) {
      updateProductDetails(_id, values)
        .then((res) => {
          setUpdateForm(false);
          setShowForm(false);
          setValues(initialState);
          fetchCategories();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleUpdateCancel = (e) => {
    e.preventDefault();
    setShowForm(false);
    setUpdateForm(false);
    setIsSubmit(false);
    setValues(initialState);
  };

  const handleCheck = (e) => {
    setValues({ ...values, IsActive: e.target.checked });
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    //const phone = /^\d{10}$/;
    const phone =
/^(?!.*(\d)(-?\1){4})(?!0123456789|1234567890|2345678901|3456789012|4567890123|5678901234|6789012345|7890123456|8901234567|9012345678)\d{10}$/;
    if (!values.SupplierName) {
      errors.SupplierName = "Supplier Name is required!";
      setErrSN(true);
    } else {
      setErrSN(false);
    }
   
    if (!values.Country) {
      errors.Country = "Country Name is required!";
      setErrCountry(true);
    } else {
      setErrCountry(false);
    }
    
    if (!values.CompanyName) {
      errors.CompanyName = "Company Name is required!";
      setErrAddress1(true);
    } else {
      setErrAddress1(false);
    } 
    if (!values.EmailID_Office) {
      errors.EmailID_Office = "Email is required!";
      setErrEmailOffice(true);
    } else if (!regex.test(values.EmailID_Office)) {
      errors.EmailID_Office = "This is not a valid email format!";
      setErrEmailOffice(true);
    } else {
      setErrEmailOffice(false);
    }
    if (!values.ContactNo_Office) {
      errors.ContactNo_Office = "Contact No. is required";
      setErrCNOffice(true);
    } else if (!phone.test(values.ContactNo_Office)) {
      errors.ContactNo_Office = "This is not a valid Contact Number";
      setErrCNOffice(true);
    } else {
      setErrCNOffice(false);
    }
    

    return errors;
  };

  const validClassSN =
    errSN && isSubmit ? "form-control is-invalid" : "form-control";
  
  const validClassCountry =
    errCountry && isSubmit ? "form-control is-invalid" : "form-control";
  const validClassState =
    errState && isSubmit ? "form-control is-invalid" : "form-control";
  const validClassCity =
    errCity && isSubmit ? "form-control is-invalid" : "form-control";
  const validClassCompanyName =
    errAddress1 && isSubmit ? "form-control is-invalid" : "form-control";const validClassAddress2 =
    errAddress2 && isSubmit ? "form-control is-invalid" : "form-control";
  const validClassPincode =
    errPincode && isSubmit ? "form-control is-invalid" : "form-control";
  const validClassCNOffice =
    errCNOffice && isSubmit ? "form-control is-invalid" : "form-control";
  const validClassCNSales =
    errCNSales && isSubmit ? "form-control is-invalid" : "form-control";
  const validClassCNSupport =
    errCNSupport && isSubmit ? "form-control is-invalid" : "form-control";
  const validClassEmailOffice =
    errEmailOffice && isSubmit ? "form-control is-invalid" : "form-control";
  // const validClassEmailSales =
  //   errEmailSales && isSubmit ? "form-control is-invalid" : "form-control";
  // const validClassEmailSupport =
  //   errEmailSupport && isSubmit ? "form-control is-invalid" : "form-control";
  const validClassWeb1 =
    errWeb1 && isSubmit ? "form-control is-invalid" : "form-control";
  // const validClassGST =
  //   errGST && isSubmit ? "form-control is-invalid" : "form-control";

  const columns = [
    {
      name: "Sr No",
      selector: (row,index) => index+1,
      sortable: true,
      sortField: "srno",
      minWidth: "150px",
    },
    {
      name: "SupplierName",
      cell: (row) => row.SupplierName,
      sortable: true,
      sortField: "SupplierName",
      minWidth: "150px",
    },

    // {
    //   name: "Country",
    //   selector: (row) => {
    //     for (let i = 0; i < countriesArray.length; i++) {
    //       if (countriesArray[i].value === row.Country) {
    //         return countriesArray[i].label; // Return the label when a match is found
    //       }
    //     }
    //     return row.Country; // Return the original value if no match is found
    //   },
    //   minWidth: "180px",
    // }
    {
      name: "Country",
      cell: (row) => row.Country,
      sortable: true,
      sortField: "SupplierName",
      minWidth: "150px",
    },
    {
      name: "Office Contact No.",
      cell: (row) => row.ContactNo_Office,
      sortable: true,
      sortField: "ContactNo_Office",
      minWidth: "150px",
    },
    {
      name: "Office Email",
      cell: (row) => row.EmailID_Office,
      sortable: true,
      sortField: "EmailID_Office",
      minWidth: "150px",
    },
    {
      name: "Status",
      selector: (row) => {
        return <p>{row.IsActive ? "Active" : "InActive"}</p>;
      },
      sortable: false,
      sortField: "Status",
    },
    {
      name: "Action",
      selector: (row) => {
        return (
          <React.Fragment>
            <div className="d-flex gap-2">
              <div className="edit">
                <button
                  className="btn btn-sm btn-success edit-item-btn "
                  data-bs-toggle="modal"
                  data-bs-target="#showModal"
                  onClick={() => handleTog_edit(row._id)}
                >
                  Edit
                </button>
              </div>

              <div className="remove">
                <button
                  className="btn btn-sm btn-danger remove-item-btn"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteRecordModal"
                  onClick={() => tog_delete(row._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </React.Fragment>
        );
      },
      sortable: false,
      minWidth: "180px",
    },
  ];
  document.title = "Company Details | Shreeji Pharma";

  return (
    <>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            
            title="Company Details"
          
          />

          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <Row className="g-4 mb-1">
                    <Col className="col-sm"  lg={4} md={6} sm={6}>
                      <h2 className="card-title mb-0 fs-4 mt-2">
                        Company Details
                      </h2>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      
                        
                          <div
                            style={{
                              display: !showForm || updateForm ? "" : "none",
                            }}
                          >{console.log(showForm)}
                      {console.log(updateForm)}
                           <div className="text-end mt-1">
                          <Input
                            type="checkbox"
                            className="form-check-input"
                            name="filter"
                            value={filter}
                            defaultChecked={true}
                            onChange={handleFilter}
                          />
                          <Label className="form-check-label ms-2">
                            Active
                          </Label>
                        </div>
                        </div>
                        </Col>
                            {/* <Row>
                              <Col lg={12}>
                                <div className="text-end">
                                  <button
                                    className="btn bg-success text-light mb-3 "
                                    onClick={() => {
                                      setValues(initialState);
                                      setShowForm(false);
                                      setUpdateForm(false);
                                    }}
                                  >
                                    <i class="ri-list-check align-bottom me-1"></i>{" "}
                                    List
                                  </button>
                                </div>
                              </Col>
                            </Row> */}
                            <Col className="col-sm-auto" lg={4} md={12} sm={12}>
                      <div className="d-flex justify-content-sm-end">
                        {/* add btn */}

                        <div
                          style={{
                            display: showForm || updateForm ? "none" : "",
                          }}
                        >
                          <Row>
                            <Col lg={12}>
                              <div className="d-flex justify-content-sm-end">
                                <div>
                                  <Button
                                    color="success"
                                    className="add-btn me-1"
                                    onClick={() => {
                                      setValues(initialState);
                                      setShowForm(!showForm);
                                      setUpdateForm(false);
                                      // setFileId(Math.random() * 100000);
                                    }}
                                    // onClick={() => tog_list()}
                                    // id="create-btn"
                                  >
                                    <i className="ri-add-line align-bottom me-1"></i>
                                    Add
                                  </Button>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </div>

                        {/* update list btn */}
                       
                        <div
                          style={{
                            display: showForm || updateForm ? "" : "none",
                          }}
                        >
                          <Row>
                            <Col lg={12}>
                              <div className="text-end">
                                <button
                                  className="btn bg-success text-light mb-3 "
                                  onClick={() => {
                                    // setValues(initialState);
                                    setValues(initialState);
                                      setShowForm(false);
                                      setUpdateForm(false);
                                      
                                    // setFileId(Math.random() * 100000);
                                  }}
                                >
                                  <i class="ri-list-check align-bottom me-1"></i>{" "}
                                  List
                                </button>
                              </div>
                            </Col>
                          </Row>
                          {/* </div> */}
                        </div>

                        {/* search */}
                        <div
                          className="search-box ms-2"
                          style={{
                            display: showForm || updateForm ? "none" : "",
                          }}
                        >
                          <input
                            className="form-control search"
                            placeholder="Search..."
                            onChange={(e) => setQuery(e.target.value)}
                          />
                          <i className="ri-search-line search-icon "></i>
                        </div>
                      </div>
                    </Col>
                        
                        
                    
                  
                  </Row>
                </CardHeader>
                
                <div
                  style={{
                    display: showForm && !updateForm ? "block" : "none",
                  }}
                >
                  <Row>
                    <Col>
                      <Card>
                        <CardBody>
                          <div className="live-preview">
                            <Form>
                              <Row>
                                <Col lg={6}>
                                  <FormGroup className="mb-3">
                                    <div className="form-floating mb-3">
                                      <Input
                                        type="text"
                                        className={validClassSN}
                                        placeholder="Enter Supplier"
                                        name="SupplierName"
                                        value={SupplierName}
                                        onChange={handleChange}
                                      />
                                      <Label>
                                        Supplier Name
                                        <span className="text-danger">
                                          *
                                        </span>{" "}
                                      </Label>
                                      {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.SupplierName}
                                        </p>
                                      )}
                                    </div>
                                  </FormGroup>
                                </Col>
                                {/* <Col lg={6}>
                                  <div className="form-floating mb-3">
                                    <Input
                                      type="text"
                                      className={validClassCPN}
                                      placeholder="Enter contact person name"
                                      name="ContactPersonName"
                                      value={ContactPersonName}
                                      onChange={handleChange}
                                    />
                                    <Label>
                                      Contact Person Name
                                      <span className="text-danger">*</span>
                                    </Label>
                                    {isSubmit && (
                                      <p className="text-danger">
                                        {formErrors.ContactPersonName}
                                      </p>
                                    )}
                                  </div>
                                </Col> */}

                                <Col md={3}>
                                  <div className="form-floating mb-3">
                                    <select
                                      className={validClassCountry}
                                      name="Country"
                                      value={Country}
                                      data-choices
                                      data-choices-sorting="true"
                                      onChange={handleChange}
                                    >
                                      <option>Select Country</option>

                                      {countriesArray.map((c,index) => {
                                        return (
                                          <React.Fragment key={index}>
                                            
                                              <option value={c.value}>
                                                {c.value}
                                              </option>
                                            
                                          </React.Fragment>
                                        );
                                      })}
                                    </select>
                                    <Label>
                                      Country
                                      <span className="text-danger">*</span>
                                    </Label>
                                    {isSubmit && (
                                      <p className="text-danger">
                                        {formErrors.Country}
                                      </p>
                                    )}
                                  </div>
                                </Col>
                               
                                <Col md={3}>
                                  <div className="form-floating mb-3">
                                    <Input
                                      type="text"
                                      className={validClassCompanyName}
                                      placeholder="Enter address"
                                   
                                      name="CompanyName"
                                      value={CompanyName}
                                      onChange={handleChange}
                                    />
                                    <Label>
                                      Company Name
                                      <span className="text-danger">*</span>
                                    </Label>
                                    {isSubmit && (
                                      <p className="text-danger">
                                        {formErrors.CompanyName}
                                      </p>
                                    )}
                                  </div>
                                </Col>
                                

                                <Col md={4}>
                                  <div className="form-floating mb-3">
                                    <Input
                                      type="tel"
                                      className={validClassCNOffice}
                                      placeholder="Enter contact no. of office"
                                      name="ContactNo_Office"
                                      value={ContactNo_Office}
                                      onChange={handleChange}
                                    />
                                    <Label>
                                      Office ContactNo
                                      <span className="text-danger">*</span>
                                    </Label>
                                    {isSubmit && (
                                      <p className="text-danger">
                                        {formErrors.ContactNo_Office}
                                      </p>
                                    )}
                                  </div>
                                </Col>
                                
                                <Col md={4}>
                                  <div className="form-floating mb-3">
                                    <Input
                                      type="email"
                                      className={validClassEmailOffice}
                                      placeholder="example@gmail.com"
                                      id="emailidInput"
                                      name="EmailID_Office"
                                      value={EmailID_Office}
                                      onChange={handleChange}
                                    />
                                    <Label>
                                      Office EmailID
                                      <span className="text-danger">*</span>
                                    </Label>
                                    {isSubmit && (
                                      <p className="text-danger">
                                        {formErrors.EmailID_Office}
                                      </p>
                                    )}
                                  </div>
                                </Col>
                                

                                <Row>
                                  <Col lg={6}>
                                    <div className="mb-3">
                                      <Input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="IsActive"
                                        value={IsActive}
                                        checked={IsActive}
                                        onChange={handleCheck}
                                      />
                                      <Label className="form-check-label ms-1">
                                        &nbsp;Is Active
                                      </Label>
                                    </div>
                                  </Col>
                                  <Col lg={6}>
                                    <div className=" text-end">
                                      <button
                                        type="submit"
                                        className="btn btn-success  m-1"
                                        onClick={handleSubmit}
                                      >
                                        Submit
                                      </button>
                                      <button
                                        type="submit"
                                        className="btn btn-outline-danger m-1"
                                        onClick={handleAddCancel}
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </Col>
                                </Row>
                              </Row>
                            </Form>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </div>
                

                {/* update form */}
                <div
                  style={{
                    display: !showForm && updateForm ? "block" : "none",
                  }}
                >
                  <Row>
                    <Col>
                      <Card>
                        <CardBody>
                          <div className="live-preview">
                            <Form>
                              <Row>
                                <Col lg={6}>
                                  <FormGroup className="mb-3">
                                    <div className="form-floating mb-3">
                                      <Input
                                        type="text"
                                        className={validClassSN}
                                        placeholder="Enter company name"
                                        name="SupplierName"
                                        value={SupplierName}
                                        onChange={handleChange}
                                      />
                                      <Label>
                                        Supplier Name
                                        <span className="text-danger">
                                          *
                                        </span>{" "}
                                      </Label>
                                      {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.SupplierName}
                                        </p>
                                      )}
                                    </div>
                                  </FormGroup>
                                </Col>
                                
                                <Col md={3}>
                                  <div className="form-floating mb-3">
                                    <select
                                      className={validClassCountry}
                                      name="Country"
                                      value={Country}
                                      data-choices
                                      data-choices-sorting="true"
                                      onChange={handleChange}
                                    >
                                      <option>Select Country</option>

                                      {countriesArray.map((c,index) => {
                                        return (
                                          <React.Fragment key={index}>
                                          
                                              <option value={c.value}>
                                                {c.value}
                                              </option>
                                            
                                          </React.Fragment>
                                        );
                                      })}
                                    </select>
                                    <Label>
                                      Country
                                      <span className="text-danger">*</span>
                                    </Label>
                                    {isSubmit && (
                                      <p className="text-danger">
                                        {formErrors.Country}
                                      </p>
                                    )}
                                  </div>
                                </Col>
                                
                                <Col md={3}>
                                  <div className="form-floating mb-3">
                                    <Input
                                      type="text"
                                      className={validClassCompanyName}
                                      placeholder="Enter address"
                                      
                                      name="CompanyName"
                                      value={CompanyName}
                                      onChange={handleChange} 
                                    />
                                    <Label>
                                    CompanyName
                                      <span className="text-danger">*</span>
                                    </Label>
                                    {isSubmit && (
                                      <p className="text-danger">
                                        {formErrors.CompanyName}
                                      </p>
                                    )}
                                  </div>
                                </Col>
                               

                                <Col md={4}>
                                  <div className="form-floating mb-3">
                                    <Input
                                      type="tel"
                                      className={validClassCNOffice}
                                      placeholder="Enter contact no. of office"
                                      name="ContactNo_Office"
                                      value={ContactNo_Office}
                                      onChange={handleChange}
                                    />
                                    <Label>
                                      Office ContactNo
                                      <span className="text-danger">*</span>
                                    </Label>
                                    {isSubmit && (
                                      <p className="text-danger">
                                        {formErrors.ContactNo_Office}
                                      </p>
                                    )}
                                  </div>
                                </Col>
                               
                                <Col md={4}>
                                  <div className="form-floating mb-3">
                                    <Input
                                      type="email"
                                      className={validClassEmailOffice}
                                      placeholder="example@gmail.com"
                                      id="emailidInput"
                                      name="EmailID_Office"
                                      value={EmailID_Office}
                                      onChange={handleChange}
                                    />
                                    <Label>
                                      Office EmailID
                                      <span className="text-danger">*</span>
                                    </Label>
                                    {isSubmit && (
                                      <p className="text-danger">
                                        {formErrors.EmailID_Office}
                                      </p>
                                    )}
                                  </div>
                                </Col>
                                
                                
                               
                                <Row>
                                  <Col lg={6}>
                                    <div className="mb-3">
                                      <Input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="IsActive"
                                        value={IsActive}
                                        checked={IsActive}
                                        onChange={handleCheck}
                                      />
                                      <Label className="form-check-label ms-1">
                                        &nbsp;Is Active
                                      </Label>
                                    </div>
                                  </Col>
                                  <Col lg={6}>
                                    <div className=" text-end">
                                      <button
                                        type="submit"
                                        className="btn btn-success  m-1"
                                        onClick={handleUpdate}
                                      >
                                        Update
                                      </button>
                                      <button
                                        type="submit"
                                        className="btn btn-outline-danger m-1"
                                        onClick={handleUpdateCancel}
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </Col>
                                </Row>
                              </Row>
                            </Form>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </div>

                {/* list  */}
                <div
                  style={{ display: showForm || updateForm ? "none" : "block" }}
                >
                  <CardBody>
                    <div>
                      <div className="table-responsive table-card mt-1 mb-1 text-right">
                        {/* <Table columns={col} dataSource={details}></Table> */}
                        <DataTable
                          columns={columns}
                          data={blogs}
                          progressPending={loading}
                          sortServer
                          onSort={(column, sortDirection, sortedRows) => {
                            handleSort(column, sortDirection);
                          }}
                          pagination
                          paginationServer
                          paginationTotalRows={totalRows}
                          paginationRowsPerPageOptions={[
                            10,
                            50,
                            100,
                            totalRows,
                          ]}
                          onChangeRowsPerPage={handlePerRowsChange}
                          onChangePage={handlePageChange}
                        />
                      </div>
                    </div>
                  </CardBody>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <Modal
        isOpen={modal_delete}
        toggle={() => {
          tog_delete();
          setValues([]);
        }}
        centered
      >
        <ModalHeader
          className="bg-light p-3"
          toggle={() => {
            setmodal_delete(!modal_delete);
          }}
        >
          <span style={{ marginRight: "210px" }}>Remove Service Detail</span>
        </ModalHeader>

        <form>
          <ModalBody>
            <div className="mt-2 text-center">
              <lord-icon
                src="https://cdn.lordicon.com/gsqxdxog.json"
                trigger="loop"
                colors="primary:#f7b84b,secondary:#f06548"
                style={{ width: "100px", height: "100px" }}
              ></lord-icon>
              <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                <h4>Are you sure ?</h4>
                <p className="text-muted mx-4 mb-0">
                  Are you Sure You want to Remove this Record ?
                </p>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
              <button
                type="submit"
                className="btn btn-danger"
                id="add-btn"
                onClick={handleDelete}
              >
                Remove
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => setmodal_delete(false)}
              >
                Close
              </button>
            </div>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
};

export default Supplier;
