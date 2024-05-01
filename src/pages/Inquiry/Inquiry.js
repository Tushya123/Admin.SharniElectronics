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
import  Select  from "react-select";
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
import {getinquiry,updateinquiry,createinquiry,listinquiry,removeinquiry} from "../../functions/Inquiry/Inquiry"
import { listState, listCountry } from "../../functions/Location/Location";
import {getInquiryProduct} from "../../functions/Inquiry/InquiryProduct"

const initialState = {
  ProductDetail :"",
  InquiryNo:"",
  ContactPerson:"",
  CompanyName:"",
  Reference:"",
  Address:"",
  Country:"",
  Phone:"",
  Fax:"",
  Mobile:"",
  Email:"",
  Comments:"",
  IsActive:true,
  RFQ_Status:false,
  Status:false
};

const initialState2={
  ProductDetail2 :"",
  Grade :"",
  Quantity:"" ,
  IsActive:true,
   ProductDetailLabel:"",
   BasePrice:"",
   Group:"",
   RFQ_Status2:false, RFQ_Date:""
}

const Inquiry = () => {
  
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
  const [values2, setValues2] = useState(initialState2);
  const {
    ProductDetail ,
    
    ContactPerson,
    CompanyName,
    Reference,
    Address,
    Country,
    Phone,
    Fax,
    Mobile,
    Email,
    Comments,
    IsActive,
    RFQ_Status,
    Status
  } = values;

  const{
    ProductDetail2 ,
    Grade ,
    Quantity 
    , ProductDetailLabel,BasePrice,Group,RFQ_Status2, RFQ_Date
  }= values2

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
  const [rfqForm, setRfqForm] = useState(false)

  const handleTog_RFQ = (_id) => {
    console.log(_id)
    setRfqForm(true)
    setUpdateForm(false)
    setIsSubmit(false);
    setShowForm(false)
    getInquiryProduct(_id).then((res)=>{
      console.log(res)
      setValues2({
        ...values,
        ProductDetailLabel :res.ProductDetailLabel,
        
        Grade:res.Grade,
        Group:res.Group,
        Quantity:res.Quantity,
        RFQ_Date:res.RFQ_Date,
        RFQ_Status2:res.RFQ_Status2,
        BasePrice:res.BasePrice,
        IsActive:res.IsActive,
       
        
      });
    })
  };

  const handleTog_edit = (_id) => {
    // setmodal_edit(!modal_edit);
    setUpdateForm(true);
    setIsSubmit(false);
    set_Id(_id);
    getinquiry(_id)
      .then((res) => {
        console.log(res);
        setValues({
          ...values,
          ProductDetail :res.ProductDetail,
          
          ContactPerson:res.ContactPerson,
          CompanyName:res.CompanyName,
          Reference:res.Reference,
          Address:res.Address,
          Country:res.Country,
          Phone:res.Phone,
          Fax:res.Fax,
          Mobile:res.Mobile,
          Email:res.Email,
          Comments:res.Comments,
          IsActive:res.IsActive,
          RFQ_Status:res.RFQ_Status,
          Status:res.Status
          
        });
        initialState.InquiryNo= res._id
        setAllProductDetail(res.ProductDetail)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(values)

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
      .post(`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/list-by-params/inquiry`, {
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

  const handleChange2 = (e) => {
    setValues2({ ...values2, [e.target.name]: e.target.value });
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
    values.ProductDetail=allProductId
    console.log(values)
if(Object.keys(errors).length===0){


    createinquiry(values)
      .then((res) => {
        setValues(initialState);
        setShowForm(false);
        setUpdateForm(false);
        fetchCategories();
        setAllProductId([]); // Assuming _id is in res.data
    setAllProductDetail([]);
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
        `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/remove/inquiry/${remove_id}`)
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
      updateinquiry(_id, values)
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
  const validClassAddress1 =
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
      name: "ContactPerson",
      cell: (row) => row.ContactPerson,
      sortable: true,
      sortField: "ContactPerson",
      minWidth: "150px",
    },
    {
      name: "Email",
      cell: (row) => row.Email,
      sortable: true,
      sortField: "Email",
      minWidth: "150px",
    },
    {
      name: "Inquiry No",
      cell: (row) => row._id,
      sortable: true,
      sortField: "_id",
      minWidth: "150px",
    },
    {
      name: "Inquiry Date",
      cell: (row) => row.createdAt.split("T")[0],
      sortable: true,
      sortField: "createdAt",
      minWidth: "150px",
    },
  
     
    {
      name: "Status",
      selector: (row) => {
        return <p>{row.Status ? "Done" : "InProcess"}</p>;
      },
      sortable: false,
      sortField: "Status",
    },
    {
      name: "RFQ_Status",
      selector: (row) => {
        return <p>{row.Status ? "Generated" : "Not Generated"}</p>;
      },
      sortable: false,
      sortField: "RFQ_Status",
    },
    {
      name: "Quote",
      selector: (row) => {
        return (
          <React.Fragment>
              <div className="edit">
        <button
          className="btn btn-sm btn-warning edit-item-btn "
          data-bs-toggle="modal"
          data-bs-target="#showModal"
          onClick={() => handleTog_edit(row._id)}
        >
          Quote
        </button>
      </div>
            </React.Fragment>
        )
      
      },
      
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
                  List
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
  const [selectProductDetail,setproductdetail] = useState([]);
  const [prod, setprod] = useState("")
  const getallProductDetail=()=>{
    axios
      .get(
        `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/list/projectdetail`)
      .then((response) => {
        if (response.length > 0) {

console.log(response)
        // if (response.length > 0) {
        //   setproductdetail(response);
        // } else if (response.length === 0) {
        //   setproductdetail([]);
        // }
        console.log(response)
          const names = response.map((item)=>({
            value:item._id , label :item.Description,group:item.ProductDetail.ProductGroup
          }
         ));
          
         setproductdetail(names);
        } else if(response.length===0){
            setproductdetail([]);
        }
      });
  }
  const [SupplierNamePlaceholder, setSupplierNamePlaceholder] = useState("")
  const handleSelectSingle =(selectedOption)=>{
    console.log("Selected Specilty:", selectedOption);
    // Update speciality state with the selected option's value
    setprod(selectedOption.label)
    console.log(selectedOption.value)
    setSupplierNamePlaceholder(selectedOption.label)
    values2.ProductDetail2 =selectedOption.value
    values2.ProductDetailLabel=selectedOption.label
    values2.Group=selectedOption.group
}
const gradearray=[
  {label:"BP",value:"BP"},
  {label:"USP",value:"USP"},
  {label:"EP",value:"EP"},
  {label:"Other",value:"Other"}
]
 
const handleSelect=(selectoptions) =>{
  console.log(selectoptions)
   setValues2({...values2,Grade:selectoptions.value})
}

const [allProductDetail, setAllProductDetail]= useState([])
const [allProductId, setAllProductId]= useState([])
const handleAddInquiry = (e) => {
  e.preventDefault();
  setFormErrors({});
 


    axios.post(`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/create/InquiryProduct`, values2)
  .then((res) => {
    console.log(res);
    setSupplierNamePlaceholder("");
    // Spread operator is not necessary here, use push to add the new id to the array
    setAllProductId(prevState => [...prevState, res.data._id]); // Assuming _id is in res.data
    setAllProductDetail(prevState => [...prevState, res.data]);
    setLoadingOption(false);
    setValues2(initialState2);
     

  })
  .catch((err) => {
    console.log(err);
  });

      
  }
  console.log(allProductDetail,allProductId)
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
                            display: showForm || updateForm || rfqForm ? "none" : "",
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
                                      getallProductDetail();
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
                            display: showForm || updateForm ||rfqForm ? "" : "none",
                          }}
                        >
                          <Row>
                            <Col lg={12}>
                              <div className="text-end">
                                <button
                                  className="btn bg-success text-light mb-3 "
                                  onClick={() => {
                                    // setValues(initialState);
                                    setRfqForm(false)
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
                            display: showForm || updateForm || rfqForm ? "none" : "",
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
                  <CardBody>
                    <React.Fragment>
                      <Col xxl={12}>
                        <Card className="">
                          {/* <PreviewCardHeader title="Billing Product Form" /> */}
                          <CardBody>
                            <div className="live-preview">
                              <Form>
                                <Row>
                                <Col lg={4} md={6}>
                                                    <div className="mb-3">
                                                    <Label>
                                Select Product: {" "}
                                        <span className="text-danger">*</span>
                                      </Label>
                                       <Select
                                       placeholder={SupplierNamePlaceholder}
                                                            value={prod}
                                                            onChange={handleSelectSingle}
                                                            options={selectProductDetail}
                                                        />
                                                    </div>
                                    </Col>
                                    <Col md={3}>
                                  <Label>
                                      Grade
                                      <span className="text-danger">*</span>
                                    </Label>
                                  <div className="form-floating mb-3">
                                    <Select
                                    //   className={validClassCountry}
                                      name={Grade}
                                      value={Grade}
                                      data-choices
                                      data-choices-sorting="true"
                                      onChange={handleSelect}
                                      options={gradearray}
                                      placeholder={Grade}
                                    >
                                     

                                     
                                    </Select>
                                   
                                    {/* {isSubmit && (
                                      <p className="text-danger">
                                        {formErrors.Country}
                                      </p>
                                    )} */}
                                  </div>
                                </Col>
                                <Col lg={3}>
                                <Label>
                                        Quantity{" "}
                                        <span className="text-danger">*</span>
                                      </Label>
                                    <div className="form-floating  ">
                                      
                                      <Input
                                        key={"blogTitle_" + _id}
                                        type="text"
                                      
                                        placeholder="Enter blog title"
                                        required
                                        name="Quantity"
                                        value={Quantity}
                                        onChange={handleChange2}
                                      />
                                      
                                      {/* {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.email}
                                        </p>
                                      )} */}
                                    </div>
                                  </Col>
                                  <Col lg={2}>
                                  <div className="hstack gap-2 justify-content-end">
                                      <button
                                       
                                        type="submit"
                                        className="btn btn-success mt-4  m-1"
                                        id="add-btn"
                                        onClick={ handleAddInquiry}
                                      >
                                        Submit
                                      </button>
                                      
                                    </div>
                                  </Col>
                                  {allProductDetail ? (
                                        <div>
                                            <Row>
                                              {allProductDetail.map((item,index)=>(
                                                <tr key={index}>
                                                  <td>
                                                    {item.Group}
                                                  </td>
                                                  <td>
                                                    {item.ProductDetailLabel}
                                                  </td>
                                                  <td>
                                                    {item.Quantity}
                                                  </td>
                                                  <td>
                                                    {item.Grade}
                                                  </td>
                                                </tr>
                                              ))}
                                            </Row>
                                        </div>
                                    ) : null}
                                 <Row>
                                 <Col lg={3}>
    <Label>
        Contact Person <span className="text-danger">*</span>
    </Label>
    <div className="form-floating">
        <Input
            key={"contactPerson"}
            type="text"
            placeholder="Enter contact person"
            required
            name="ContactPerson"
            value={ContactPerson}
            onChange={handleChange}
        />
    </div>
</Col>

<Col lg={3}>
    <Label>
        Company Name <span className="text-danger">*</span>
    </Label>
    <div className="form-floating">
        <Input
            key={"companyName"}
            type="text"
            placeholder="Enter company name"
            required
            name="CompanyName"
            value={CompanyName}
            onChange={handleChange}
        />
    </div>
</Col>

<Col lg={3}>
    <Label>
        Reference
    </Label>
    <div className="form-floating">
        <Input
            key={"reference"}
            type="text"
            placeholder="Enter reference"
            name="Reference"
            value={Reference}
            onChange={handleChange}
        />
    </div>
</Col>
<Col lg={3}>
    <Label>
        Address <span className="text-danger">*</span>
    </Label>
    <div className="form-floating">
        <Input
            key={"address"}
            type="text"
            placeholder="Enter address"
            required
            name="Address"
            value={Address}
            onChange={handleChange}
        />
    </div>
</Col>

<Col lg={3}>
    <Label>
        Country <span className="text-danger">*</span>
    </Label>
    <div className="form-floating">
        <Input
            key={"country"}
            type="text"
            placeholder="Enter country"
            required
            name="Country"
            value={Country}
            onChange={handleChange}
        />
    </div>
</Col>

<Col lg={3}>
    <Label>
        Phone <span className="text-danger">*</span>
    </Label>
    <div className="form-floating">
        <Input
            key={"phone"}
            type="tel"
            placeholder="Enter phone number"
            required
            name="Phone"
            value={Phone}
            onChange={handleChange}
        />
    </div>
</Col>

<Col lg={3}>
    <Label>
        Fax
    </Label>
    <div className="form-floating">
        <Input
            key={"fax"}
            type="tel"
            placeholder="Enter fax number"
            name="Fax"
            value={Fax}
            onChange={handleChange}
        />
    </div>
</Col>

<Col lg={3}>
    <Label>
        Mobile <span className="text-danger">*</span>
    </Label>
    <div className="form-floating">
        <Input
            key={"mobile"}
            type="tel"
            placeholder="Enter mobile number"
            required
            name="Mobile"
            value={Mobile}
            onChange={handleChange}
        />
    </div>
</Col>

<Col lg={3}>
    <Label>
        Email <span className="text-danger">*</span>
    </Label>
    <div className="form-floating">
        <Input
            key={"email"}
            type="email"
            placeholder="Enter email"
            required
            name="Email"
            value={Email}
            onChange={handleChange}
        />
    </div>
</Col>

<Col lg={3}>
    <Label>
        Comments
    </Label>
    <div className="form-floating">
        <Input
            key={"comments"}
            type="textarea"
            placeholder="Enter comments"
            name="Comments"
            value={Comments}
            onChange={handleChange}
        />
    </div>
</Col>


                                 </Row>
                                  <CardBody>
                                    
                    
                  </CardBody>

                                  {loadingOption && (
                                    <div className="d-flex justify-content-center">
                                      <div
                                        className="spinner-border"
                                        role="status"
                                      >
                                        <span className="sr-only">
                                          Loading...
                                        </span>
                                      </div>
                                      <h6 className="p-2">
                                        Wait for a few seconds.This process
                                        might take some time.
                                      </h6>
                                    </div>
                                  )}

                                  <Col lg={12}>
                                    <div className="hstack gap-2 justify-content-end">
                                      <button
                                        type="submit"
                                        className="btn btn-success  m-1"
                                        id="add-btn"
                                        onClick={handleSubmit}
                                      >
                                        Submit
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-outline-danger m-1"
                                        onClick={handleAddCancel}
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </Col>
                                </Row>
                              </Form>
                            </div>
                          </CardBody>{" "}
                        </Card>
                      </Col>
                    </React.Fragment>
                  </CardBody>
                </div>
                

                {/* update form */}
                <div
                  style={{
                    display: !showForm && updateForm ? "block" : "none",
                  }}
                >
                  <CardBody>
                            <div className="live-preview">
                              <Form>
                                <Row>
                               
                                  {allProductDetail ? (
                                        <div>
                                            <Row>
                                              {allProductDetail.map((item,index)=>(
                                                <tr key={index}>
                                                  <td>
                                                    {item.Group}
                                                  </td>
                                                  <td>
                                                    {item.ProductDetailLabel}
                                                  </td>
                                                  <td>
                                                    {item.Quantity}
                                                  </td>
                                                  <td>
                                                    {item.Grade}
                                                  </td>
                                                </tr>
                                              ))}
                                            </Row>
                                        </div>
                                    ) : null}
                                 <Row>
                                 <Col lg={3}>
        <Label>
           Inquiry Number: <span className="text-danger">*</span>
        </Label>
        <div className="form-floating">
            <Input
                key={"contactPerson"}
                type="text"
                placeholder="Enter contact person"
                required
                name="ContactPerson"
                value={initialState.InquiryNo}
                onChange={handleChange}
                disabled // Added disabled attribute
            />
        </div>
    </Col>
    <Col lg={3}>
        <Label>
            Contact Person <span className="text-danger">*</span>
        </Label>
        <div className="form-floating">
            <Input
                key={"contactPerson"}
                type="text"
                placeholder="Enter contact person"
                required
                name="ContactPerson"
                value={ContactPerson}
                onChange={handleChange}
                disabled // Added disabled attribute
            />
        </div>
    </Col>

    <Col lg={3}>
        <Label>
            Company Name <span className="text-danger">*</span>
        </Label>
        <div className="form-floating">
            <Input
                key={"companyName"}
                type="text"
                placeholder="Enter company name"
                required
                name="CompanyName"
                value={CompanyName}
                onChange={handleChange}
                disabled // Added disabled attribute
            />
        </div>
    </Col>

    <Col lg={3}>
        <Label>
            Reference
        </Label>
        <div className="form-floating">
            <Input
                key={"reference"}
                type="text"
                placeholder="Enter reference"
                name="Reference"
                value={Reference}
                onChange={handleChange}
                disabled // Added disabled attribute
            />
        </div>
    </Col>

    <Col lg={3}>
        <Label>
            Address <span className="text-danger">*</span>
        </Label>
        <div className="form-floating">
            <Input
                key={"address"}
                type="text"
                placeholder="Enter address"
                required
                name="Address"
                value={Address}
                onChange={handleChange}
                disabled // Added disabled attribute
            />
        </div>
    </Col>

    <Col lg={3}>
        <Label>
            Country <span className="text-danger">*</span>
        </Label>
        <div className="form-floating">
            <Input
                key={"country"}
                type="text"
                placeholder="Enter country"
                required
                name="Country"
                value={Country}
                onChange={handleChange}
                disabled // Added disabled attribute
            />
        </div>
    </Col>

    <Col lg={3}>
        <Label>
            Phone <span className="text-danger">*</span>
        </Label>
        <div className="form-floating">
            <Input
                key={"phone"}
                type="tel"
                placeholder="Enter phone number"
                required
                name="Phone"
                value={Phone}
                onChange={handleChange}
                disabled // Added disabled attribute
            />
        </div>
    </Col>

    <Col lg={3}>
        <Label>
            Fax
        </Label>
        <div className="form-floating">
            <Input
                key={"fax"}
                type="tel"
                placeholder="Enter fax number"
                name="Fax"
                value={Fax}
                onChange={handleChange}
                disabled // Added disabled attribute
            />
        </div>
    </Col>

    <Col lg={3}>
        <Label>
            Mobile <span className="text-danger">*</span>
        </Label>
        <div className="form-floating">
            <Input
                key={"mobile"}
                type="tel"
                placeholder="Enter mobile number"
                required
                name="Mobile"
                value={Mobile}
                onChange={handleChange}
                disabled // Added disabled attribute
            />
        </div>
    </Col>

    <Col lg={3}>
        <Label>
            Email <span className="text-danger">*</span>
        </Label>
        <div className="form-floating">
            <Input
                key={"email"}
                type="email"
                placeholder="Enter email"
                required
                name="Email"
                value={Email}
                onChange={handleChange}
                disabled // Added disabled attribute
            />
        </div>
    </Col>

    <Col lg={3}>
        <Label>
            Comments
        </Label>
        <div className="form-floating">
            <Input
                key={"comments"}
                type="textarea"
                placeholder="Enter comments"
                name="Comments"
                value={Comments}
                onChange={handleChange}
                disabled // Added disabled attribute
            />
        </div>
    </Col>
</Row>
<Row>
  {ProductDetail ? (
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Group</th>
          <th scope="col">ProductName</th>
          <th scope="col">Grade</th>
          <th scope="col">Quantity</th>
          <th scope="col">RFQ Date</th>
          <th scope="col">Generate RFQ</th>
        </tr>
      </thead>
      <tbody>
        {ProductDetail.map((items, index) => (
          <tr key={index}>
            
            <td>{items.Group}</td>
            <td>{items.ProductDetailLabel}</td>
            <td>{items.Grade}</td>
            <td>{items.Quantity}</td>
            <td>{items.RFQ_Date === "" ? "Not Generated" : items.RFQ_Date}</td>

            <td>
          
          <React.Fragment>
              <div className="edit">
        <button
          className="btn btn-sm btn-warning edit-item-btn "
       
      
          onClick={(e) => {
            e.preventDefault(); // Prevent default behavior
            handleTog_RFQ(items._id);
          }}
        >
         
          Generate FRQ
        </button>
      </div>
            </React.Fragment>
        
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : null}
</Row>


                              

                                  {loadingOption && (
                                    <div className="d-flex justify-content-center">
                                      <div
                                        className="spinner-border"
                                        role="status"
                                      >
                                        <span className="sr-only">
                                          Loading...
                                        </span>
                                      </div>
                                      <h6 className="p-2">
                                        Wait for a few seconds.This process
                                        might take some time.
                                      </h6>
                                    </div>
                                  )}

                                  <Col lg={12}>
                                    <div className="hstack gap-2 justify-content-end">
                                      <button
                                        type="submit"
                                        className="btn btn-success  m-1"
                                        id="add-btn"
                                        onClick={handleSubmit}
                                      >
                                        Submit
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-outline-danger m-1"
                                        onClick={handleAddCancel}
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </Col>
                                </Row>
                              </Form>
                            </div>
                          </CardBody>
                </div>

                  {/* rfq Form */}
                  <div
  style={{
    display: !updateForm && rfqForm ? "block" : "none",
  }}
>{
  console.log(showForm)
}
  <CardBody>
    <Row>
    <Col lg={4}>
        <Label>
        Product Detail  <span className="text-danger">*</span>
        </Label>
        <div className="form-floating">
            <Input
                key={"ProductDetailLabel"}
                type="text"
                placeholder="Enter contact person"
                required
                name="ProductDetailLabel"
                value={values2.ProductDetailLabel}
                onChange={handleChange2}
                disabled // Added disabled attribute
            />
        </div>
    </Col>
   
    <Col lg={4}>
        <Label>
        Grade <span className="text-danger">*</span>
        </Label>
        <div className="form-floating">
            <Input
                key={"Grade"}
                type="text"
                placeholder="Enter contact person"
                required
                name="Grade"
                value={values2.Grade}
                onChange={handleChange2}
                disabled // Added disabled attribute
            />
        </div>
    </Col>
    <Col lg={4}>
        <Label>
        Quantity <span className="text-danger">*</span>
        </Label>
        <div className="form-floating">
            <Input
                key={"Quantity"}
                type="text"
                placeholder="Enter contact person"
                required
                name="Quantity"
                value={values2.Quantity}
                onChange={handleChange2}
                 // Added disabled attribute
            />
        </div>
    </Col>
    </Row>
  </CardBody>
</div>


                {/* list  */}
                <div
                  style={{ display: showForm || updateForm || rfqForm ? "none" : "block"  }}
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

export default Inquiry;
