import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
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
    product: "",
    IsActive: false,
    mobile_no:"",
    Name:"",
    email:""
  };

const Inquiry = () => {
    const [values, setValues] = useState(initialState);
    const { mobile_no, email, Name, IsActive,product } = values;
  const [selectType,setSelectType] = useState([]);
  // const [blogTitle, setblogTitle] = useState("");
  // const [blogDesc, setblogDesc] = useState("");
  // const [blogImage, setblogImage] = useState("");
  // const [types,setTypes] = useState("");
  // const [blogThumnailDesc, setblogThumnailDesc] = useState("");
  // const [views, setViews] = useState(0);

  const [loadingOption, setLoadingOption] = useState(false);

  // const [likes, setlikes] = useState([]);
  // const [comments, setcomments] = useState([]);
  // const [userId, setuserId] = useState(localStorage.getItem("AdminUser"));
//   const [IsActive, setIsActive] = useState(false);

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [filter, setFilter] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);

  const [query, setQuery] = useState("");

  const [_id, set_Id] = useState("");
  const [remove_id, setRemove_id] = useState("");

  const [blogs, setBlogs] = useState([]);

  const getSelectType=()=>{
    axios
      .get(
        `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/list/areatype`)
      .then((response) => {
console.log(response)
        if (response.length > 0) {
          setSelectType(response);
        } else if (response.length === 0) {
          setSelectType([]);
        }
      });
  }

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
//   const uploadImage = async (body) => {
//     return await axios.post(
//       `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/cms-blog/image-upload`,
//       body
//     );
//   };

  // const updateBlogs = async (_id, values) => {
  //   return await axios.put(
  //     `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/update/inquiry/${_id}`,
  //     values
  //   );
  // };
  
  // const getBlogs = async (_id) => {
  //   return await axios.get(
  //     `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/getbyid/inquiry/${_id}`
  //   );
  // };

  //  const removeBlogs = async (_id) => {
  //   return await axios.delete(
  //     `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/remove/inquiry/${_id}`
  //   );
  // };

//   function uploadAdapter(loader) {
//     return {
//       upload: () => {
//         return new Promise((resolve, reject) => {
//           const body = new FormData();
//           loader.file
//             .then((file) => {
//               body.append("uploadImg", file);
//               uploadImage(body)
//                 .then((res) => {
//                   console.log("res", res.url);
//                   resolve({
//                     default: `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/uploads/BlogCKImages/${res.url}`,
//                   });
//                 })
//                 .catch((err) => console.log(err));
//             })
//             .catch((err) => reject(err));
//         });
//       },
//     };
//   }

//   function uploadPlugin(editor) {
//     editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
//       return uploadAdapter(loader);
//     };
//   }

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
   
    getSelectType();
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

  const handleClick = (e) => {
    e.preventDefault();
    setFormErrors({});
    let errors = validate(values);
    setFormErrors(errors);
    setIsSubmit(true);

    if (Object.keys(errors).length === 0) {
      setLoadingOption(true);
    //   const formdata = new FormData();

    //   formdata.append("newImage", blogImage);
    //   formdata.append("ServiceName",types);
    //   formdata.append("Description", blogTitle);
    //   // formdata.append("Detail", blogDesc);
    //   formdata.append("IsActive", IsActive);
      // formdata.append("subtitle", blogThumnailDesc);


      axios.post(`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/create/inquiry`,values)
        .then((res) => {
          console.log(res);
          // setmodal_list(!modal_list);
          setShowForm(false);
          setLoadingOption(false);
          // setValues(initialState);
          // setblogDesc("");
          // setblogTitle("");
          // setlikes([]);
          // setcomments([]);
          // setuserId("");
        //   setIsActive(false);
          // setblogImage("");
          // setblogThumnailDesc("");
          // setViews(0);
          setIsSubmit(false);
          // setCheckImagePhoto(false);
          // setPhotoAdd("");
          setFormErrors({});
          fetchCategories();
          // setTypes("");
          setSelectType("");
        })
        .catch((err) => {
          console.log(err);
        });
        tog_list();
    }
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
    e.preventDefault();
    let erros = validate(values);
    setFormErrors(erros);
    setIsSubmit(true);
    // const likesString = JSON.stringify(likes);
    // const commentString = JSON.stringify(comments);

    if (Object.keys(erros).length === 0) {
      setLoadingOption(true);
    //   const formdata = new FormData();

    //   formdata.append("newImage", blogImage);
    //   formdata.append("ServiceName",types);
    //   formdata.append("Description", blogTitle);
    //   // formdata.append("Detail", blogDesc);
    //   formdata.append("IsActive", IsActive);
    //   // formdata.append("subtitle", blogThumnailDesc);
    console.log("the values",values);

      axios.put(`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/update/inquiry/${_id}`,values)
        .then((res) => {
          // setmodal_edit(!modal_edit);
        //   setPhotoAdd("");
        //   setUpdateForm(false);
        //   setLoadingOption(false);

        //   setCheckImagePhoto(false);
        //   // setValues(initialState);
        //   setblogDesc("");
        //   setblogTitle("");
        //   setlikes([]);
        //   setcomments([]);
        //   setuserId("");
        // //   setIsActive(false);
        //   // setblogThumnailDesc("");
        //   setViews(0);
        //   setblogImage("");
        //   fetchCategories();
        //   setSelectType("");
        //   setTypes("");
        console.log(res);
          // setmodal_list(!modal_list);
          setShowForm(false);
          setLoadingOption(false);
          // setValues(initialState);
          // setblogDesc("");
          // setblogTitle("");
          // setlikes([]);
          // setcomments([]);
          // setuserId("");
        //   setIsActive(false);
          // setblogImage("");
          // setblogThumnailDesc("");
          // setViews(0);
          setIsSubmit(false);
          // setCheckImagePhoto(false);
          // setPhotoAdd("");
          setFormErrors({});
          fetchCategories();
          // setTypes("");
          setSelectType("");
          setUpdateForm(false);
          setShowForm(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const [errEM, setErrEM] = useState(false);
  const [errNA, setErrNA] = useState(false);
  const [errMN, setErrMN] = useState(false);
  const [errPR, setErrPR] = useState(false);
  // const handlePhoneNumberChange = (e) => {
  //   const value = e.target.value;
  //   // Check if the input only contains digits
  //   if (/^[0-9]*$/.test(value)) {
  //     setPhoneNumber(value);
  //     setIsValid(true);
  //   } else {
  //     setIsValid(false);
  //   }
  // };

  const validate = (values) => {
    const errors = {};
    // if (types === "") {
    //   errors.types = "Service Name is required!";
    //   setErrSN(true);
    // }
    // else{
    //   setErrSN(false);
    // }

    if (values.Name === "") {
      errors.Name = "Name is Required!";
      setErrNA(true);
    }
    if (values.Name !== "") {
      setErrNA(false);
    }

    if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email address is invalid";
      // Assuming you have a setter function for the error state of Email field
      setErrEM(true);
    }
    else{
      setErrEM(false)
    }

   if(values.product===""){
    errors.product="Please Select a Product";
    setErrPR(true)
   }
   else{
    setErrPR(false);
   }

   if(values.mobile_no.length===10){
    setErrMN(false);
   }
   else{
    errors.mobile_no="Please Enter a Correct Mobile Number";
    setErrMN(true);
   }
   

   

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
  }, [pageNo, perPage, column, sortDirection, query, filter]);

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
      .post(`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/list-by-params/inquiry`, {
        skip: skip,
        per_page: perPage,
        sorton: column,
        sortdir: sortDirection,
        match: query,
        IsActive: filter,
      })
      .then((response) => {
        if (response.length > 0) {
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

  // const PhotoUpload = (e) => {
  //   if (e.target.files.length > 0) {
  //     const image = new Image();

  //     let imageurl = URL.createObjectURL(e.target.files[0]);
  //     console.log("img", e.target.files[0]);

  //     setPhotoAdd(imageurl);
  //     // setValues({ ...values, blogImage: e.target.files[0] });
  //     // setblogImage(e.target.files[0]);
  //     setCheckImagePhoto(true);
  //   }
  // };

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
    // setPhotoAdd("");
    // setCheckImagePhoto(false);
    setShowForm(false);
    setUpdateForm(false);
    // setblogThumnailDesc("");
    // setViews(0);
    // setValues(initialState);
    // setblogDesc("");
    // setblogTitle("");
    // setlikes([]);
    // setcomments([]);
    // setuserId("");
    // // setIsActive(false);
    // setblogImage("");
    // setTypes("");
    setSelectType("");
    // setTypes("");
    setValues(initialState)
  };

  const handleUpdateCancel = (e) => {
    e.preventDefault();
    setoldname("");
    setIsSubmit(false);
    setPhotoAdd("");
    setUpdateForm(false);
    setShowForm(false);
    // setblogThumnailDesc("");
    // setViews(0);
    // setCheckImagePhoto(false);
    // // setValues(initialState);
    // setblogDesc("");
    // setblogTitle("");
    // setlikes([]);
    // setcomments([]);
    // setuserId("");
    // // setIsActive(false);
    // setblogImage("");
    setSelectType("");
    // setTypes("");
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
      name: "Service Name",
      cell: (row) => row.serviceTypeDetails[0].ServiceName,
      sortable: true,
      sortField: "blogTitle",
      minWidth: "150px",
    },
    {
        name: "Name",
        cell: (row) => row.Name,
        sortable: true,
        sortField: "blogTitle",
        minWidth: "150px",
      }, {
        name: "email",
        cell: (row) => row.email,
        sortable: true,
        sortField: "blogTitle",
        minWidth: "150px",
      },{
        name: "Mobile Number",
        cell: (row) => row.mobile_no,
        sortable: true,
        sortField: "blogTitle",
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
                  onClick={() => handleTog_edit(row,row._id)}
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

  document.title = "Service Detail|Shreeji Pharma";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb  title="Service Detail"  />

          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <Row className="g-4 mb-1">
                    <Col className="col-sm" lg={4} md={6} sm={6}>
                      <h2 className="card-title mb-0 fs-4 mt-2">Service Detail</h2>
                    </Col>
                    <Col lg={4} md={6} sm={6}>
                      <div
                        style={{
                          display: showForm || updateForm ? "none" : "",
                        }}
                      >
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
                                      getSelectType();
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
                                <Col lg={6}>
                                <Label>
                                        Service Name{" "}
                                        <span className="text-danger">*</span>
                                      </Label>
                                    <Input name="product" id="" type="select" onChange={handleChange} className={validClassProduct} style={{height:"55px"}}>
                                        <option>Select Type</option> {console.log(selectType)}
                                        {selectType && selectType.map((item,index)=>
                                        <option key={index} value={item._id
}>{item
.ServiceName}</option>
                                        )}
                                    </Input>
                                    {isSubmit && (
                                      <p className="text-danger">
                                     
                                        {formErrors.product}
                                      </p>
                                    )}
                                   
                                  </Col>
                                  <Col lg={6}>
                                    <div className="form-floating mb-3">
                                      <Input
                                        key={"blogTitle_" + _id}
                                        type="text"
                                        className={validClassName}
                                        placeholder="Enter blog title"
                                        required
                                        name="Name"
                                        value={Name}
                                        onChange={handleChange}
                                      />
                                      <Label>
                                        Name{" "}
                                        <span className="text-danger">*</span>
                                      </Label>
                                      {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.Name}
                                        </p>
                                      )}
                                    </div>
                                  </Col>     
                                  <Col lg={6}>
                                    <div className="form-floating mt-3  ">
                                      <Input
                                        key={"blogTitle_" + _id}
                                        type="text"
                                        className={validClassEmail}
                                        placeholder="Enter blog title"
                                        required
                                        name="email"
                                        value={email}
                                        onChange={handleChange}
                                      />
                                      <Label>
                                        Email{" "}
                                        <span className="text-danger">*</span>
                                      </Label>
                                      {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.email}
                                        </p>
                                      )}
                                    </div>
                                  </Col>
                                  <Col lg={6}>
                                    <div className="form-floating mb-3">
                                      <Input
                                        key={"blogTitle_" + _id}
                                        type="text"
                                        className={validClassMobileNumber}
                                        placeholder="Enter blog title"
                                        required
                                        name="mobile_no"
                                        value={mobile_no}
                                        onChange={handleChange}
                                      />
                                      <Label>
                                      Mobile Number{" "}
                                        <span className="text-danger">*</span>
                                      </Label>
                                      {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.mobile_no}
                                        </p>
                                      )}
                                    </div>
                                  </Col>
                               

                                  {/* <Col lg={6}>
                                    <div className="form-floating mb-3">
                                      <Input
                                        type="textarea"
                                        className={validClassBTD}
                                        style={{ height: "100px" }}
                                        placeholder="Remarks..."
                                        name="blogThumnailDesc"
                                        value={blogThumnailDesc}
                                        onChange={(e) => {
                                          setblogThumnailDesc(e.target.value);
                                        }}
                                      />
                                      <Label className="form-label">
                                        Sub Title
                                      </Label>
                                      {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.blogThumnailDesc}
                                        </p>
                                      )}
                                    </div>
                                  </Col> */}
{/* 
                                  <Col lg={12}>
                                    <Card>
                                      <Label>
                                        Description
                                        <span className="text-danger">*</span>
                                      </Label>
                                      <CardBody>

                                        <CKEditor
                                          key={"blogDesc_" + _id}
                                          editor={ClassicEditor}
                                          data={blogDesc}
                                          config={{
                                            extraPlugins: [uploadPlugin],
                                          }}
                                          onChange={(event, editor) => {
                                            const data = editor.getData();

                                            setblogDesc(data);
                                            console.log(blogDesc);
                                          }}
                                        />
                                        {isSubmit && (
                                          <p className="text-danger">
                                            {formErrors.blogDesc}
                                          </p>
                                        )}
                                      </CardBody>
                                    </Card>
                                  </Col> */}

                                  {/* <Col lg={6}>
                                    <label>
                                      Image{" "}
                                      <span className="text-danger">*</span>
                                    </label>

                                    <Input
                                      key={"blogImage_" + _id}
                                      type="file"
                                      name="blogImage"
                                      className={validClassBI}
                                      // accept="images/*"
                                      accept=".jpg, .jpeg, .png"
                                      onChange={PhotoUpload}
                                    />
                                    {isSubmit && (
                                      <p className="text-danger">
                                        {formErrors.blogImage}
                                      </p>
                                    )}
                                    {checkImagePhoto ? (
                                      <img
                                        //   src={image ?? myImage}
                                        className="m-2"
                                        src={photoAdd}
                                        alt="Profile"
                                        width="180"
                                        height="200"
                                      />
                                    ) : null}
                                  </Col> */}

                                  <div className="mt-5">
                                    <Col lg={6}>
                                      <div className="form-check mb-2">
                                        <Input
                                          key={"IsActive_" + _id}
                                          type="checkbox"
                                          name="IsActive"
                                          value={IsActive}
                                          onChange={handleCheck}
                                      
                                          checked={IsActive}
                                        />
                                        <Label
                                          className="form-check-label"
                                          htmlFor="activeCheckBox"
                                        >
                                          Is Active
                                        </Label>
                                      </div>
                                    </Col>
                                  </div>

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
                <div
                  style={{
                    display: !showForm && updateForm ? "block" : "none",
                  }}
                >
                  <CardBody>
                    <React.Fragment>
                      <Col xxl={12}>
                        <Card className="">
                          <CardBody>
                            <div className="live-preview">
                              <Form>
                              <Row>
                                <Col lg={6}>
                                <Label>
                                        Service Name{" "}
                                        <span className="text-danger">*</span>
                                      </Label>
                                    <Input name="product" id="" type="select" onChange={handleChange} className={validClassProduct}>

                                         {/* {console.log(selectType)} */}
                                         {/* <option>{newname}</option> */}
                                        {selectType && selectType.map((item,index)=>
                                        <option key={index} value={item._id} selected={item._id === product}>{item
.ServiceName}</option>
                                        )}
                                    </Input>
                                    {isSubmit && (
                                      <p className="text-danger">
                                      
                                        {formErrors.product}
                                      </p>
                                    )}
                                   
                                  </Col>
                                  <Col lg={6}>
                                    <div className="form-floating mb-3">
                                      <Input
                                        key={"blogTitle_" + _id}
                                        type="text"
                                        className={validClassName}
                                        placeholder="Enter blog title"
                                        required
                                        name="Name"
                                        value={Name}
                                        onChange={handleChange}
                                      />
                                      <Label>
                                        Name{" "}
                                        <span className="text-danger">*</span>
                                      </Label>
                                      {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.Name}
                                        </p>
                                      )}
                                    </div>
                                  </Col>     
                                  <Col lg={6}>
                                    <div className="form-floating mt-3  ">
                                      <Input
                                        key={"blogTitle_" + _id}
                                        type="text"
                                        className={validClassEmail}
                                        placeholder="Enter blog title"
                                        required
                                        name="email"
                                        value={email}
                                        onChange={handleChange}
                                      />
                                      <Label>
                                        Email{" "}
                                        <span className="text-danger">*</span>
                                      </Label>
                                      {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.email}
                                        </p>
                                      )}
                                    </div>
                                  </Col>
                                  <Col lg={6}>
                                    <div className="form-floating mb-3">
                                      <Input
                                        key={"blogTitle_" + _id}
                                        type="text"
                                        className={validClassMobileNumber}
                                        placeholder="Enter blog title"
                                        required
                                        name="mobile_no"
                                        value={mobile_no}
                                        onChange={handleChange}
                                      />
                                      <Label>
                                      Mobile Number{" "}
                                        <span className="text-danger">*</span>
                                      </Label>
                                      {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.mobile_no}
                                        </p>
                                      )}
                                    </div>
                                  </Col>
                               

                                  {/* <Col lg={6}>
                                    <div className="form-floating mb-3">
                                      <Input
                                        type="textarea"
                                        className={validClassBTD}
                                        style={{ height: "100px" }}
                                        placeholder="Remarks..."
                                        name="blogThumnailDesc"
                                        value={blogThumnailDesc}
                                        onChange={(e) => {
                                          setblogThumnailDesc(e.target.value);
                                        }}
                                      />
                                      <Label className="form-label">
                                        Sub Title
                                      </Label>
                                      {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.blogThumnailDesc}
                                        </p>
                                      )}
                                    </div>
                                  </Col> */}
{/* 
                                  <Col lg={12}>
                                    <Card>
                                      <Label>
                                        Description
                                        <span className="text-danger">*</span>
                                      </Label>
                                      <CardBody>

                                        <CKEditor
                                          key={"blogDesc_" + _id}
                                          editor={ClassicEditor}
                                          data={blogDesc}
                                          config={{
                                            extraPlugins: [uploadPlugin],
                                          }}
                                          onChange={(event, editor) => {
                                            const data = editor.getData();

                                            setblogDesc(data);
                                            console.log(blogDesc);
                                          }}
                                        />
                                        {isSubmit && (
                                          <p className="text-danger">
                                            {formErrors.blogDesc}
                                          </p>
                                        )}
                                      </CardBody>
                                    </Card>
                                  </Col> */}

                                  {/* <Col lg={6}>
                                    <label>
                                      Image{" "}
                                      <span className="text-danger">*</span>
                                    </label>

                                    <Input
                                      key={"blogImage_" + _id}
                                      type="file"
                                      name="blogImage"
                                      className={validClassBI}
                                      // accept="images/*"
                                      accept=".jpg, .jpeg, .png"
                                      onChange={PhotoUpload}
                                    />
                                    {isSubmit && (
                                      <p className="text-danger">
                                        {formErrors.blogImage}
                                      </p>
                                    )}
                                    {checkImagePhoto ? (
                                      <img
                                        //   src={image ?? myImage}
                                        className="m-2"
                                        src={photoAdd}
                                        alt="Profile"
                                        width="180"
                                        height="200"
                                      />
                                    ) : null}
                                  </Col> */}

                                  <div className="mt-5">
                                    <Col lg={6}>
                                      <div className="form-check mb-2">
                                        <Input
                                          key={"IsActive_" + _id}
                                          type="checkbox"
                                          name="IsActive"
                                          value={IsActive}
                                          onChange={handleCheck}
                                      
                                          checked={IsActive}
                                        />
                                        <Label
                                          className="form-check-label"
                                          htmlFor="activeCheckBox"
                                        >
                                          Is Active
                                        </Label>
                                      </div>
                                    </Col>
                                  </div>

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
                                        onClick={handleUpdate}
                                      >
                                        Update
                                      </button>
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
                        </Card>
                      </Col>
                    </React.Fragment>
                  </CardBody>
                </div>

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
    </React.Fragment>
  );
};

export default Inquiry;