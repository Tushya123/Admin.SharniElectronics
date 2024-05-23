import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import Select from "react-select"
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Form,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Label,
  Input,
  Row,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import axios from "axios";
import DataTable from "react-data-table-component";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const initialState = {
    ProductDetail: "",
  
    Quantity:"",
    SupplierName:[],
  };

const SupplierQuote = () => {
    const [values, setValues] = useState(initialState);
    const { SupplierName, Quantity, ProductDetail} = values;
    const [constraint,setconstraint]=useState(false);
  const [selectProductDetail,setproductdetail] = useState([]);
  const [selectsupplier,setsupplierdetail] = useState([]);
  const [loadingOption, setLoadingOption] = useState(false);
  const [selectnewdetail,setselectnewdetail]=useState([]);
  const [supplierdetailsforemail,setsupplierdetailsforemail]=useState([]);

  const [EmailID_Office,setem]=useState([]);


  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [filter, setFilter] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);

  const [query, setQuery] = useState("");

  const [_id, set_Id] = useState("");
  const [remove_id, setRemove_id] = useState("");

  const [blogs, setBlogs] = useState([]);

const getallsupplierdetails=()=>{
  axios.get(`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/list/supplier`)
  .then((response)=>{
    if(response.length>0){
      console.log("rrr",response);
      const names =response.map((item)=>({
        label:item.EmailID_Office,value:item._id
      }))
      setsupplierdetailsforemail(names)
    }
    else if(response.length===0){
      setsupplierdetailsforemail([]);
    }
  })
}
  const getallProductDetail=()=>{
    axios
      .get(
        `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/list/projectdetail`)
      .then((response) => {
        if (response.length > 0) {

console.log(response)
        console.log(response)
          const names = response.map((item)=>({
            value:item._id , label :item.Description,
          }
         ));
          
         setproductdetail(names);
        } else if(response.length===0){
            setproductdetail([]);
        }
      });
  }
  useEffect(()=>{
getallAssignProduct()
getallProductDetail()
getallsupplierdetails()
},[])
console.log(selectsupplier.length);
  const getallAssignProduct=()=>{
    axios
      .get(
        `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/list/AssignProduct`)
      .then((response) => {
        if (response.length > 0) {

console.log(response)
        // if (response.length > 0) {
        //   setproductdetail(response);
        // } else if (response.length === 0) {
        //   setproductdetail([]);
        // }
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
console.log("This is it",selectsupplier)

  const [SupplierNamePlaceholder, setSupplierNamePlaceholder] = useState("")
  const [prod, setprod] = useState("")
  const [data, Setdata] = useState([])
  const handleSelectSingle =(selectedOption)=>{
    let count =0;
    console.log("Selected Specilty:", selectedOption);
    // Update speciality state with the selected option's value
    selectsupplier.forEach(item => {
      item.toshow = false;
    });
    for (let i = 0; i < selectsupplier.length; i++) {
      if (selectsupplier[i].value.some(item => item === selectedOption.value)) {
        selectsupplier[i].toshow = true;
        count++;
       
      }
    }
    console.log("This is Count",count);
   const temp= selectsupplier.filter((item)=>item.toshow)
     Setdata(temp)

    console.log("THis is the Id",selectedOption.value)
    console.log("THis is the Supplier",selectsupplier)
    
    setprod(selectedOption.value)
values.ProductDetail=selectedOption.value
    
    
    setSupplierNamePlaceholder(selectedOption.label)
    
}
console.log(data)



  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("no errors");
    }
  }, [formErrors, isSubmit]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
 

  const handleCheck = (e) => {
    setValues({ ...values, IsActive: e.target.checked });
  };
  


  const [modal_delete, setmodal_delete] = useState(false);
  const tog_delete = (_id) => {
    setmodal_delete(!modal_delete);
    setRemove_id(_id);
  };
  const [newname,setoldname]=useState("");

  const [modal_edit, setmodal_edit] = useState(false);
  const handleTog_edit = (row,_id) => {
    // setmodal_edit(!modal_edit);
    // if(row.product===row.serviceTypeDetails[0]._id){
        setoldname(row.serviceTypeDetails[0].ServiceName);
    // }
   
    getallProductDetail();
    getallProductDetail();
    setIsSubmit(false);
    setUpdateForm(true);
    set_Id(_id);
    
   console.log('THis is it',row)
    // setblogTitle(row.Description);
    // setblogThumnailDesc(row.subtitle);
    // setblogDesc(row.Detail);
    // setPhotoAdd(`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/${row.imageURL}`);
    // setIsActive(row.IsActive);
    // setCheckImagePhoto(true);
    setmodal_edit(!modal_edit);
    setIsSubmit(false);
    // set_Id(row._id);
    setValues(row);
  };
  const [modal_list, setmodal_list] = useState(false);
  const tog_list = () => {
    setmodal_list(!modal_list);
    setValues(initialState);
    setIsSubmit(false);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setFormErrors({});
    let errors = validate(values);
    setFormErrors(errors);
    setIsSubmit(true);

    // if (Object.keys(errors).length === 0) {
      setLoadingOption(true);
    //   const formdata = new FormData();

    //   formdata.append("newImage", blogImage);
    //   formdata.append("ServiceName",types);
    //   formdata.append("Description", blogTitle);
    //   // formdata.append("Detail", blogDesc);
    //   formdata.append("IsActive", IsActive);
      // formdata.append("subtitle", blogThumnailDesc);
      const response1 = await fetch(
        `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/forget-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ EmailID_Office }),
      });


      axios.post(`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/create/supplierquote`,values)
        .then((res) => {
          console.log(res);
          setValues(initialState);
          setTempArray([])
          // setem("");
          values.SupplierName=[]
          // setmodal_list(!modal_list);
          setShowForm(false);
          setSupplierNamePlaceholder("")
          setprod("");
          setsupplierdetailsforemail([]);
          setselectnewdetail([]);
          setsupplierdetail([]);
          setproductdetail([]);
          
          Setdata([])
          setLoadingOption(false);
         
          setIsSubmit(false);
          // setCheckImagePhoto(false);
          // setPhotoAdd("");
          setFormErrors({});
         

          fetchCategories();
          // setTypes("");
        //   setproductdetail("");
        })
        .catch((err) => {
          console.log(err);
        });
        tog_list();
    }
//   };

  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(
        `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/remove/supplierquote/${remove_id}`)
      .then((res) => {
        setmodal_delete(!modal_delete);
        fetchCategories();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [errEM, setErrEM] = useState(false);
  const [errNA, setErrNA] = useState(false);
  const [errMN, setErrMN] = useState(false);
  const [errPR, setErrPR] = useState(false);


  const validate = (values) => {
    const errors = {};
    // if (types === "") {
    //   errors.types = "Service Name is required!";
    //   setErrSN(true);
    // }
    // else{
    //   setErrSN(false);
    // }

    if (values.ProductDetail === "") {
      errors.ProductDetail = "Product Detail is Required!";
      setErrNA(true);
    }
    if (values.ProductDetail !== "") {
      setErrNA(false);
    }

//     if (!/\S+@\S+\.\S+/.test(values.email)) {
//       errors.email = "Email address is invalid";
//       // Assuming you have a setter function for the error state of Email field
//       setErrEM(true);
//     }
//     else{
//       setErrEM(false)
//     }

//    if(values.product===""){
//     errors.product="Please Select a Product";
//     setErrPR(true)
//    }
//    else{
//     setErrPR(false);
//    }

//    if(values.mobile_no.length===10){
//     setErrMN(false);
//    }
//    else{
//     errors.mobile_no="Please Enter a Correct Mobile Number";
//     setErrMN(true);
//    }
   

   

    return errors;
  };

  const validClassName =
errNA && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassEmail =
    errEM && isSubmit ? "form-control is-invalid" : "form-control";
  const validClassMobileNumber =
    errMN && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassProduct =
    errPR && isSubmit ? "form-control is-invalid" : "form-control";
  


  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(0);
  const [column, setcolumn] = useState();
  const [sortDirection, setsortDirection] = useState();

  const handleSort = (column, sortDirection) => {
    setcolumn(column.sortField);
    setsortDirection(sortDirection);
  };

  useEffect(() => {
    // fetchUsers(1); // fetch page 1 of users
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [pageNo, perPage, column, sortDirection, query]);

  // const fetchCategories = async () => {
  //   setLoading(true);

  //   await axios
  //     .get(
  //       `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/listprojectdetailbyparam`)
  //     .then((response) => {
  //       if (response.length > 0) {
  //         setLoading(false);
  //         console.log(response)
  //         setBlogs(response);
  //       } else if (response.length === 0) {
  //         setBlogs([]);
  //       }
  //     });

  //   setLoading(false);
  // };
  const fetchCategories = async () => {
    setLoading(true);
    let skip = (pageNo - 1) * perPage;
    if (skip < 0) {
      skip = 0;
    }

    await axios
      .post(`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/list-by-params/supplierquote`, {
        skip: skip,
        per_page: perPage,
        sorton: column,
        sortdir: sortDirection,
        match: query,
      })
      .then((response) => {
        if (response.length > 0) {
          console.log(response);
          let res = response[0];
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

  const [photoAdd, setPhotoAdd] = useState();
  const [checkImagePhoto, setCheckImagePhoto] = useState(false);


  const handlePerRowsChange = async (newPerPage, page) => {
    // setPageNo(page);
    setPerPage(newPerPage);
  };
  const handleFilter = (e) => {
    setFilter(e.target.checked);
  };

  const handleAddCancel = (e) => {
    e.preventDefault();
    setIsSubmit(false);
   
    setShowForm(false);
    setUpdateForm(false);
    
    
    setValues(initialState)
          setTempArray([])
          // setem("");
          // setmodal_list(!modal_list);
          setShowForm(false);
          setSupplierNamePlaceholder("")
          setprod("");
         
          
          Setdata([])
  };

  const handleUpdateCancel = (e) => {
    e.preventDefault();
    setoldname("");
    setIsSubmit(false);
    setPhotoAdd("");
    setUpdateForm(false);
    setShowForm(false);
    setValues(initialState);
          setTempArray([])
          // setem("");
          values.SupplierName=[]
          // setmodal_list(!modal_list);
          setShowForm(false);
          setSupplierNamePlaceholder("")
          setprod("");
          setsupplierdetailsforemail([]);
          setselectnewdetail([]);
          setsupplierdetail([]);
          setproductdetail([]);
          
          Setdata([])
  
    
    setproductdetail("");
   
  };

  const col = [
    {
        name: "Sr No",
        selector: (row,index) => index+1,
        sortable: true,
        sortField: "srno",
        minWidth: "150px",
      },
    {
      name: "Product",
      cell: (row) => row.ProductDetailTypes[0].Description,
      sortable: true,
      sortField: "blogTitle",
      minWidth: "150px",
    },
    {
        name: "Quantity",
        cell: (row) => row.Quantity,
        sortable: true,
        sortField: "blogTitle",
        minWidth: "150px",
      },{
        name: "Supplier Name",
        cell: (row) => {
          return (
            <div>
              {row.SupplierDetailTypes.map((item, index) => (
                <tr key={index}>
              <td >{item.SupplierName}</td>
            </tr>
              ))}
            </div>
          );
        },
        sortable: true,
        sortField: "blogTitle",
        minWidth: "150px",
      },
    // {
    //   name: "Status",
    //   selector: (row) => {
    //     return <p>{row.IsActive ? "Active" : "InActive"}</p>;
    //   },
    //   sortable: false,
    //   sortField: "Status",
    // },
    {
      name: "Action",
      selector: (row) => {
        return (
          <React.Fragment>
            <div className="d-flex gap-2">
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
const[tempArray, setTempArray] = useState([])
const [emailArray, setEmailArray]= useState([])
 
const handleCheckboxChange = (itemKey, default_id) => {
  console.log(default_id)
  for (let i = 0; i < supplierdetailsforemail.length; i++) {
    if (default_id === supplierdetailsforemail[i].value) {
      console.log(supplierdetailsforemail[i].label)
      console.log(EmailID_Office)
      if (EmailID_Office.includes(supplierdetailsforemail[i].label)) {
        console.log(EmailID_Office)
        setem(EmailID_Office.filter((id) => id !== supplierdetailsforemail[i].label))
        console.log(tempArray)
      } else {
        console.log("new", supplierdetailsforemail[i].label)
        setem([...EmailID_Office, supplierdetailsforemail[i].label]);

      }
    }
  }

  console.log(tempArray)

  if (tempArray.includes(default_id)) {
    setTempArray(tempArray.filter((id) => id !== default_id))
    setem([]);
    console.log(tempArray)
  } else {
    setTempArray([...tempArray, default_id])
  }
}

console.log(EmailID_Office)
console.log("THis is the email", EmailID_Office)
console.log(tempArray)
values.SupplierName = tempArray
console.log(values)


  document.title = "Supplier Quote|Shreeji Pharma";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb  title="Supplier Quote"  />

          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <Row className="g-4 mb-1">
                    <Col className="col-sm" lg={4} md={6} sm={6}>
                      <h2 className="card-title mb-0 fs-4 mt-2">Supplier Quote</h2>
                    </Col>
                    <Col lg={4} md={6} sm={6}>
                      <div
                        style={{
                          display: showForm || updateForm ? "none" : "",
                        }}
                      >
                        <div className="text-end mt-1" style={{visibility:"hidden"}}>
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
                                      getallProductDetail();
                                      getallProductDetail();
                                      setShowForm(!showForm);
                                      // setValues(initialState);
                                      // setblogDesc("");
                                      // setblogTitle("");
                                      // setlikes([]);
                                      // setcomments([]);
                                      // setuserId("");
                                    //   setIsActive(false);
                                      // setblogImage("");
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
                                    // setblogDesc("");
                                    // setblogTitle("");
                                    // setlikes([]);
                                    // setcomments([]);
                                    // setuserId("");
                                    // // setIsActive(false);
                                    // setblogImage("");
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

                {/* ADD FORM  */}
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
                                <Col lg={6} md={6}>
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
                               
                               
                                  <Col lg={4}>
                                    <div className="form-floating mt-3  ">
                                      <Input
                                        key={"blogTitle_" + _id}
                                        type="number"
                                        // className={validClassEmail}
                                        placeholder="Enter blog title"
                                        required
                                        name="Quantity"
                                        value={Quantity}
                                        onChange={handleChange}
                                      />
                                      <Label>
                                      Quantity{" "}
                                        <span className="text-danger">*</span>
                                      </Label>
                                      {/* {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.email}
                                        </p>
                                      )} */}
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
                                        onClick={handleClick}
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

                {/* UPDATE FORM  */}
               
                {/* list */}
                <div
                  style={{
                    display: showForm || updateForm ? "none" : "block",
                  }}
                >
                  <CardBody>
                    <div>
                      <div className="table-responsive table-card mt-1 mb-1 text-right">
                        <DataTable
                          columns={col}
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

      {/*Remove Modal*/}
      <Modal
        isOpen={modal_delete}
        toggle={() => {
          tog_delete();
          // setValues([]);
        //   setblogDesc("");
        //   setblogTitle("");
        //   setlikes([]);
        //   setcomments([]);
        //   setuserId("");
        // //   setIsActive(false);
        //   setblogImage("");
        }}
        centered
      >
        <ModalHeader
          className="bg-light p-3"
          toggle={() => {
            setmodal_delete(!modal_delete);
          }}
        >
          <span style={{ marginRight: "210px" }}>Remove Supplier Quote</span>
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
    </React.Fragment>
  );
};

export default SupplierQuote;