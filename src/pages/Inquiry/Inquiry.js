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

import {getinquiry,updateinquiry,createinquiry,listinquiry,removeinquiry} from "../../functions/Inquiry/Inquiry"
import { listState, listCountry } from "../../functions/Location/Location";
import {getInquiryProduct} from "../../functions/Inquiry/InquiryProduct"

const initialState = {
  ProductDetail :"",
  InquiryNo:"",
  ContactPerson:"",
  CompanyName:"",
 
  Country:"",
  
  Mobile:"",
  Email:"",
  Comments:"",
  IsActive:true,
};

const initialState2={
  ProductDetail2 :"",

  Quantity:"" ,
  IsActive:true,
  SupplierName:[],
   ProductDetailLabel:"",
   BasePrice:"",
   Group:"",
   RFQ_Status2:false, 
   RFQ_Date:""
}

const Inquiry = () => {


  
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [filter, setFilter] = useState(true);
  const [query, setQuery] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [selectsupplier,setsupplierdetail] = useState([]);
  const [selectnewdetail,setselectnewdetail]=useState([]);
 
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
  
 
    Country,
 
    Mobile,
    Email,
    Comments,
    IsActive,
 
  } = values;

  const{
    ProductDetail2 ,
  
    Quantity 
    , ProductDetailLabel,BasePrice,Group,RFQ_Status2, RFQ_Date,SupplierName
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
  const getallAssignProduct=()=>{
    axios
      .get(
        `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/list/AssignProduct`)
      .then((response) => {
        if (response.length > 0) {

console.log(response)
      
        console.log("AssignProduct",response)
          const names = response.map((item)=>({
            value:item.ProductDetail.map((detail=>detail._id)) , label :item.ProductDetail.map((detail=>detail.Description)),toshow:false,SupplierName:item.SupplierName.SupplierName,default_id:item.SupplierName._id
          }
         ));
         console.log(names)
          
         setsupplierdetail(names);
        } else if(response.length===0){
          setsupplierdetail([]);
        }
      });
  }
  useEffect(()=>{
    getallProductDetail()
    getallAssignProduct()
    },[])

  const [modal_edit, setmodal_edit] = useState(false);
  const [rfqForm, setRfqForm] = useState(false)
  
  const [data, Setdata] = useState([])
  const [rfq, setrfq] = useState("")

  const handleTog_RFQ = (_id) => {
    console.log(_id)
    setRfqForm(true)
    setUpdateForm(false)
    setIsSubmit(false);
    setShowForm(false)
    setrfq(_id);
    getInquiryProduct(_id).then((res)=>{
      console.log(res)
      let count =0;
    // Update speciality state with the selected option's value
    selectsupplier.forEach(item => {
      item.toshow = false;
    });
    console.log(res.ProductDetail)
    for (let i = 0; i < selectsupplier.length; i++) {
      if (selectsupplier[i].value.some(item => item === res.ProductDetail)) {
        selectsupplier[i].toshow = true;
        count++;
       
      }
    }
    console.log(res.ProductDetail)
    console.log(selectsupplier)
    console.log("This is Count",count);
   const temp= selectsupplier.filter((item)=>item.toshow)
     Setdata(temp)

    console.log("THis is the Id", res.ProductDetail)
    console.log("THis is the Supplier",selectsupplier)
    

      setValues2({
        ...values2,
        ProductDetailLabel :res.ProductDetailLabel,
        ProductDetail2:res.ProductDetail,
   
        Group:res.Group,
        Quantity:res.Quantity,
        RFQ_Date:res.RFQ_Date,
        RFQ_Status2:res.RFQ_Status2,
        BasePrice:res.BasePrice,
        IsActive:res.IsActive,
        
       
        
      });
      


    }
  )
  };
  console.log("Nice",ProductDetail2)

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
          
          Country:res.Country,
         
          Mobile:res.Mobile,
          Email:res.Email,
          Comments:res.Comments,
          IsActive:res.IsActive,
         
          
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
    setFormErrors(validate(values));
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
  const handleSubmitRFQ = (e) => {
    e.preventDefault();
    setFormErrors(validate(values));
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
    setSupplierNamePlaceholder("");
    setAllProductDetail([]);
    setAllProductId([])
    setShowForm(false);
    setUpdateForm(false);
    setValues(initialState);
    setValues2(initialState2)
    setIsSubmit(false);
  };
  const handleRFQCancel = (e) => {
    e.preventDefault();
    setSupplierNamePlaceholder("");
    setAllProductDetail([]);
    setAllProductId([])
    setUpdateForm(true);
    setShowForm(false);
    setValues2(initialState2)
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
    setValues2(initialState2)
    setSupplierNamePlaceholder("");
    setAllProductDetail([]);
    setAllProductId([])
    setRfqForm(false)
    setShowForm(false);
    setUpdateForm(false)
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
    errAddress1 && isSubmit ? "form-control is-invalid" : "form-control";
    const validClassAddress2 =
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

 


const [allProductDetail, setAllProductDetail]= useState([])
const [allProductId, setAllProductId]= useState([])
const handleUpdateInquiry = () => {
 
 const currentData=new Date();
console.log(values2)
values2.RFQ_Date=currentData;
console.log(currentData)
values2.RFQ_Status2=true
    axios.put(`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/update/InquiryProduct/${rfq}`, values2)
  .then((res) => {
    setUpdateForm(true);
    setShowForm(false);
    console.log(res);
    setSupplierNamePlaceholder("");
    // setAllProductDetail(allProductDetail);
    // Spread operator is not necessary here, use push to add the new id to the array
    // setAllProductId(prevState => [...prevState, res.data._id]); // Assuming _id is in res.data
    // setAllProductDetail(prevState => [...prevState, res.data]);
    setLoadingOption(false);
    setValues2(initialState2);
     

  })
  .catch((err) => {
    console.log(err);
  });

      
  }
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
  console.log("This is it",allProductDetail,allProductId)
  const[tempArray, setTempArray] = useState([])
const handleCheckboxChange=(itemKey, default_id)=>{
  console.log(default_id)
  console.log(tempArray.length)
 
    if(tempArray.includes(default_id))
    {
      setTempArray(tempArray.filter((id)=>id !== default_id))
      console.log(tempArray)
    }
    else{
      setTempArray([...tempArray,default_id])
    }
 
  
}
console.log(tempArray)
values2.SupplierName=tempArray
console.log(values)

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
                                  {console.log("Product is",allProductDetail)}
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
{console.log("lol",ProductDetail)}
  {ProductDetail ? (
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Group</th>
          <th scope="col">ProductName</th>
      
          <th scope="col">Quantity</th>
          
          {/* <th scope="col">Generate RFQ</th> */}
        </tr>
      </thead>
      <tbody>
        {ProductDetail.map((items, index) => (
          <tr key={index}>
            
            <td>{items.Group}</td>
            <td>{items.ProductDetailLabel}</td>
          
            <td>{items.Quantity}</td>
           
          
          <React.Fragment>
              <div className="edit">
        
      
      </div>
            </React.Fragment>
        
            
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
                                      {/* <button
                                        type="submit"
                                        className="btn btn-success  m-1"
                                        id="add-btn"
                                        onClick={handleSubmit}
                                      >
                                        Submit
                                      </button> */}
                                      <button
                                        type="button"
                                        className="btn btn-outline-danger m-1"
                                        onClick={handleUpdateCancel}
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
    <Col lg={6}>
                                  {data.map((items,index)=>{
                                    return(
                                      <Row className="px-5" key={index}>
                                        <Col lg={12}>
                                       <Input 
                                       defaultChecked={false}
                                        type="checkbox"
                                        onClick={()=>handleCheckboxChange(index,items.default_id)}
                                       />
                                       <Label className="ms-3">{items.SupplierName}</Label>
                                        </Col>
                                      </Row>
                                    )
                                  })}
                                 </Col>
                                 <Col lg={12}>
                                    <div className="hstack gap-2 justify-content-end">
                                      <button
                                        type="submit"
                                        className="btn btn-success  m-1"
                                        id="add-btn"
                                        onClick={handleUpdateInquiry}
                                      >
                                        Update
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-outline-danger m-1"
                                        onClick={handleRFQCancel}
                                      >
                                        Cancel
                                      </button>
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
