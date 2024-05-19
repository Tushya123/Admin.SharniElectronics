import React, { useState, useEffect } from "react";
import Select from 'react-select'
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
const AssignProduct = () => {
  
  const [SupplierName, setSupplierName] = useState("");
  const [selectType,setSelectType] = useState([]);
  const [blogTitle, setblogTitle] = useState("");
  const [blogDesc, setblogDesc] = useState("");
  const [blogImage, setblogImage] = useState("");
  const [types,setTypes] = useState("");
  const [blogThumnailDesc, setblogThumnailDesc] = useState("");
  const [views, setViews] = useState(0);

  const [loadingOption, setLoadingOption] = useState(false);

  const [likes, setlikes] = useState([]);
  const [comments, setcomments] = useState([]);
  const [userId, setuserId] = useState(localStorage.getItem("AdminUser"));
  const [IsActive, setIsActive] = useState(false);
  const [Other, setOther] = useState(false);
  const [EP, setEP] = useState(false);
  const [USP, setUSP] = useState(false);
  const [BP, setBP] = useState(false);
 

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [filter, setFilter] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);

  const [query, setQuery] = useState("");
  const [query1, setQuery1] = useState("");

  const [_id, set_Id] = useState("");
  const [remove_id, setRemove_id] = useState("");

  const [blogs, setBlogs] = useState([]);
  const [blogs2, setBlogs2] = useState([]);
  const [blogs3, setBlogs3] = useState([]);

  const getSelectType=()=>{
    axios
      .get(
        `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/list/supplier`)
      .then((response) => {
        if (response.length > 0) {
          console.log(response)
          const names = response.map((item)=>({
            value:item._id , label :item.SupplierName,
          }
         ));
          
          setSelectType(names);
        } else if (response.length === 0) {
          setSelectType([]);
        }
      });
  }
  const [product, setProduct]= useState([])
  const getProductDetails = () => {
    setLoading(true);
    let skip = (pageNo1 - 1) * perPage1;
    if (skip < 0) {
      skip = 0;
    }
    axios
    .post(`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/listprojectdetailbyparam`, {
      skip: skip,
      per_page: perPage1,
      sorton: column1,
      sortdir: sortDirection1,
      match: query1,
      IsActive: filter,
    })
      .then((response) => {
        if (response.length > 0) {
          console.log("xyx",response[0]);
          setProduct(response);
          setBlogs2(response[0].data);
          setBlogs3(response[0].data);
          setTotalRows2(response[0].count);

          setLoading(false);
        } 
        else if (response.length === 0) {
          setBlogs2([]);
          setProduct([])
        }
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  };
  
  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("no errors");
    }
  }, [formErrors, isSubmit]);


  const uploadImage = async (body) => {
    return await axios.post(
      `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/cms-blog/image-upload`,
      body
    );
  };

  const updateBlogs = async (_id, values) => {
    return await axios.put(
      `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/update/blogs/${_id}`,
      values
    );
  };
  
  const getBlogs = async (_id) => {
    return await axios.get(
      `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/get/blogs/${_id}`
    );
  };

   const removeBlogs = async (_id) => {
    return await axios.delete(
      `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/remove/AssignProduct/${_id}`
    );
  };

  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file
            .then((file) => {
              body.append("uploadImg", file);
              uploadImage(body)
                .then((res) => {
                  console.log("res", res.url);
                  resolve({
                    default: `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/uploads/BlogCKImages/${res.url}`,
                  });
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => reject(err));
        });
      },
    };
  }

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }

  const [modal_delete, setmodal_delete] = useState(false);
  const tog_delete = (_id) => {
    setmodal_delete(!modal_delete);
    setRemove_id(_id);
  };

  const [modal_edit, setmodal_edit] = useState(false);
  const handleTog_edit = (row,_id) => {
   
    // setmodal_edit(!modal_edit);
    console.log("The row is",row.ProductDetail);
    getSelectType();
    setIsSubmit(false);
    setUpdateForm(true);
    set_Id(_id);
    setProductDetail(row.ProductDetail)
    console.log("Idsss",_id)
    
    // setTypes(row.ProductDetail);
   setSupplierName(row.SupplierName);
   setSupplierNamePlaceholder(row.SupplierDetailTypes[0].SupplierName)
   
   
    setCheckImagePhoto(true);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setFormErrors({});
    let errors = validate(ProductDetail,SupplierName);
    setFormErrors(errors);
    setIsSubmit(true);

    if (Object.keys(errors).length === 0) {
      setLoadingOption(true);
      const formdata = new FormData();
      console.log("ProductDetail",ProductDetail,"SupplierName",SupplierName)
      // formdata.append("newImage", blogImage);
      formdata.append("ProductDetail",ProductDetail);
      formdata.append("SupplierName", SupplierName);
     


      axios.post(`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/create/AssignProduct`,formdata)
        .then((res) => {
          console.log(res);
          setSelectType([])
          setProductDetail([])
          setSupplierNamePlaceholder("")
          setSupplierName("");
          // setmodal_list(!modal_list);
          setShowForm(false);
          setLoadingOption(false);
          // setValues(initialState);
        
          setIsActive(false);
      
          setFormErrors({});
          fetchCategories();
          setTypes("");
          setSelectType("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();

    axios
      .delete(
        `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/remove/AssignProduct/${remove_id}`)
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
    setFormErrors({});
    let errors = validate(ProductDetail,SupplierName);
    setFormErrors(errors);
    setIsSubmit(true);

    if (Object.keys(errors).length === 0) {
      setLoadingOption(true);
      const formdata = new FormData();
      console.log("ProductDetail",ProductDetail,"SupplierName",SupplierName)
      // formdata.append("newImage", blogImage);
      formdata.append("ProductDetail",ProductDetail);
      formdata.append("SupplierName", SupplierName);
     
console.log("Idsss",_id)

      axios.put(`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/update/AssignProduct/${_id}`,formdata)
        .then((res) => {
          console.log(res);
          setIsSubmit(false);
          setUpdateForm(false);
          setShowForm(false);
          setSelectType([])
          setSelectType([])
          setProductDetail([])
          setSupplierNamePlaceholder("")
          setSupplierName("");
          setProductDetail("")
          setSupplierNamePlaceholder("")
          // setmodal_list(!modal_list);
          setShowForm(false);
          setLoadingOption(false);
          // setValues(initialState);
        
          setIsActive(false);
      
          setFormErrors({});
          fetchCategories();
          setTypes("");
          setSelectType("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const [errBT, setErrBT] = useState(false);
  const [errBD, setErrBD] = useState(false);
  const [errBTD, setErrBTD] = useState(false);
  const [errBI, setErrBI] = useState(false);
  const [errSN,setErrSN]=useState(false);

  const validate = (
    // blogDesc,
    SupplierName,ProductDetail) => {
    const errors = {};
    // if (types === "") {
    //   errors.types = "Product Group is required!";
    //   setErrSN(true);
    // }
    // else{
    //   setErrSN(false);
    // }

    // if (blogTitle === "") {
    //   errors.blogTitle = "Title is required!";
    //   setErrBT(true);
    // }
    // if (blogTitle !== "") {
    //   setErrBT(false);
    // }

    // if (blogDesc === "") {
    //   errors.blogDesc = "Blog Description is required!";
    //   setErrBD(true);
    // }
    // if (blogDesc !== "") {
    //   setErrBD(false);
    // }
    // if (blogThumnailDesc === "") {
    //   errors.blogThumnailDesc = "Blog Thumbnail Description is required!";
    //   setErrBTD(true);
    // }
    // if (blogThumnailDesc !== "") {
    //   setErrBTD(false);
    // }

    // if (blogImage === "") {
    //   errors.blogImage = "Blog Image is required!";
    //   setErrBI(true);
    // }
    // if (blogImage !== "") {
    //   setErrBI(false);
    // }

    return errors;
  };

  const validClassBT =
    errBT && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassBD =
    errBD && isSubmit ? "form-control is-invalid" : "form-control";
  const validClassBTD =
    errBTD && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassBI =
    errBI && isSubmit ? "form-control is-invalid" : "form-control";
  const validClassSN =
    errSN && isSubmit ? "form-control is-invalid" : "form-control";

  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [totalRows2, setTotalRows2] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [perPage1, setPerPage1] = useState(10);
  const [pageNo, setPageNo] = useState(0);
  const [pageNo1, setPageNo1] = useState(0);
  const [column, setcolumn] = useState();
  const [column1, setcolumn1] = useState();
  const [sortDirection, setsortDirection] = useState();
  const [sortDirection1, setsortDirection1] = useState();

  const handleSort = (column, sortDirection) => {
    setcolumn(column.sortField);
    setsortDirection(sortDirection);
  };  const handleSort1 = (column1, sortDirection1) => {
    setcolumn1(column1.sortField);
    setsortDirection1(sortDirection1);
  };

  useEffect(() => {
    // fetchUsers(1); // fetch page 1 of users
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [pageNo, perPage, column, sortDirection, query, filter]);
  useEffect(() => {
    getProductDetails();
  }, [pageNo1, perPage1, column1, sortDirection1, query1, filter]);

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
      .post(`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/list/AssignProductByParams`, {
        skip: skip,
        per_page: perPage,
        sorton: column,
        sortdir: sortDirection,
        match: query,
        isActive: filter,
      })
      .then((response) => {
        console.log(response.length)
        if (response.length > 0) {
          let res = response[0];
          console.log("Hii",res.data)
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
  };const handlePageChange1 = (page1) => {
    setPageNo1(page1);
  };

  const [photoAdd, setPhotoAdd] = useState();
  const [checkImagePhoto, setCheckImagePhoto] = useState(false);

  const PhotoUpload = (e) => {
    if (e.target.files.length > 0) {
      const image = new Image();

      let imageurl = URL.createObjectURL(e.target.files[0]);
      console.log("img", e.target.files[0]);

      setPhotoAdd(imageurl);
      // setValues({ ...values, blogImage: e.target.files[0] });
      setblogImage(e.target.files[0]);
      setCheckImagePhoto(true);
    }
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    // setPageNo(page);
    setPerPage(newPerPage);
  }; const handlePerRowsChange1 = async (newPerPage1, page1) => {
    // setPageNo(page);
    setPerPage1(newPerPage1);
  };
  const handleFilter = (e) => {
    setFilter(e.target.checked);
  };

  const handleAddCancel = (e) => {
    e.preventDefault();
    setSelectType([])
    setProductDetail([])
    setSupplierNamePlaceholder("")
    setSupplierName("");
    setIsSubmit(false);
    setPhotoAdd("");
    setCheckImagePhoto(false);
    setShowForm(false);
    setPageNo1(0);
    setPerPage1(10);
    setcolumn();
    setsortDirection()
    setUpdateForm(false);
    // setblogThumnailDesc("");
    setViews(0);
    // setValues(initialState);
    setblogDesc("");
    setIsActive(false);
          setErrBD(false);
          setOther(false);
          setEP(false)
          setBP(false);
          setUSP(false);
    setblogTitle("");
    setlikes([]);
    setcomments([]);
    setuserId("");
    setIsActive(false);
    setblogImage("");
    setTypes("");
    setSelectType("");
    setTypes("");
  };

  const handleUpdateCancel = (e) => {
    e.preventDefault();
    setSelectType([])
    setProductDetail([])
    setSupplierNamePlaceholder("")
    setSupplierName("");
    setIsSubmit(false);
    setPhotoAdd("");
    setUpdateForm(false);
    setShowForm(false);
    // setblogThumnailDesc("");
    setViews(0);
    setCheckImagePhoto(false);
    setIsActive(false);
          setErrBD(false);
          setEP(false)
          setOther(false);
          setBP(false);
          setUSP(false);
    // setValues(initialState);
    setblogDesc("");
    setblogTitle("");
    setlikes([]);
    setcomments([]);
    setuserId("");
    setIsActive(false);
    setblogImage("");
    setSelectType("");
    setTypes("");
  };
  const [SupplierNamePlaceholder, setSupplierNamePlaceholder] = useState("")
  const handleSelectSingle =(selectedOption)=>{
    console.log("Selected Specilty:", selectedOption);
    // Update speciality state with the selected option's value
    setSupplierName(selectedOption.value)
    console.log(selectedOption.value)
    setSupplierNamePlaceholder(selectedOption.label)
  }
 
  const [ProductDetail, setProductDetail] = useState([]);

  const handleCheckboxChange = (rowId) => {
    console.log(rowId)
    console.log("THis is:",ProductDetail)
    // Check if the checkbox is already checked
    if (ProductDetail.includes(rowId)) {
      // If checked, remove it from the array
      setProductDetail(ProductDetail.filter((id) => id !== rowId));
    } else {
      // If not checked, add it to the array
      setProductDetail([...ProductDetail, rowId]);
    }
  };
  const handleCheckboxChange1 = (rowId) => {
    console.log("THis is it",rowId)
    // Check if the checkbox is already checked
    
    if (ProductDetail.includes(rowId)) {
      // If checked, remove it from the array
      setProductDetail(ProductDetail.filter((id) => id !== rowId));
    } else {
      // If not checked, add it to the array
      setProductDetail([...ProductDetail, rowId]);
    }
  };
  
  console.log(ProductDetail)

  const col2 = [
    {
        name: "Sr No",
        selector: (row,index) => index+1,
        sortable: true,
        sortField: "srno",
        minWidth: "150px",
      },
  
    {
      name: "Product Group",
      cell: (row) => row.ProductDetailTypes[0].ProductGroup,
      sortable: true,
      sortField: "blogTitle",
      minWidth: "150px",
    },
    {
      name: "Product Detail",
      cell: (row) => row.Description,
      sortable: true,
      sortField: "blogTitle",
      minWidth: "150px",
    },
   
    {
      name: "Action",
      selector: (row) => {
        return (
          <React.Fragment>
            <div className="d-flex gap-2">
              <div className="edit">
              <input
  type="checkbox"
  className="form-check-input"
  id={`checkbox-${row._id}`}
   
  onClick={() => handleCheckboxChange(row._id)}
/>


              </div>

               
            </div>
          </React.Fragment>
        );
      },
      sortable: false,
      minWidth: "180px",
    },
  ];  
  const col3 = [


    {
        name: "Sr No",
        selector: (row,index) => index+1,
        sortable: true,
        sortField: "srno",
        minWidth: "150px",
      },


  
    {
      name: "Group name",
      cell: (row) => row.ProductDetailTypes[0].ProductGroup,
      sortable: true,
      sortField: "blogTitle",
      minWidth: "150px",
    },
    {
      name: "SupplierName",
      cell: (row) => row.Description,
      sortable: true,
      sortField: "blogTitle",
      minWidth: "150px",
    },
   
    {
      name: "Action",
      selector: (row) => {
        console.log(row)
        let isChecked=false;
        for(let i=0;i<ProductDetail.length;i++){
          if(row._id === ProductDetail[i]){
            isChecked=true;
            break;
          }
        }
        
        console.log("New",row.ProductDetailTypes[0]._id)
        console.log("New1",ProductDetail)
        console.log("isChecked:", isChecked);
        return (
          <React.Fragment>
            <div className="d-flex gap-2">
              <div className="edit">
              <input
  type="checkbox"
  checked={isChecked}
  className="form-check-input"
  id={`checkbox-${row._id}`}
   
  onClick={() => handleCheckboxChange1(row._id)}
/>


              </div>

               
            </div>
          </React.Fragment>
        );
      },
      sortable: false,
      minWidth: "180px",
    },
  ];
  const col = [
    {
        name: "Sr No",
        selector: (row,index) => index+1,
        sortable: true,
        sortField: "srno",
        minWidth: "150px",
      },
    {
      name: "SupplierName",
      cell: (row) => row.SupplierDetailTypes[0].SupplierName,
      sortable: true,
      sortField: "blogTitle",
      minWidth: "150px",
    },
   
    {
      name: "Status",
      selector: (row) => {
        return <p>{row.isActive ? "Active" : "InActive"}</p>;
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
  className="btn btn-sm btn-success edit-item-btn"
  data-bs-toggle="modal"
  data-bs-target="#showModal"
  onClick={() => {
    handleTog_edit(row, row._id);
    getProductDetails(); // Call getProductDetails() here
  }}
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

  document.title = "Assign Product|Shreeji Pharma";

  return (
    
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb  title="Assign Product"  />

          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <Row className="g-4 mb-1">
                    <Col className="col-sm" lg={4} md={6} sm={6}>
                      <h2 className="card-title mb-0 fs-4 mt-2">Assign Products</h2>
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
                                      getProductDetails()
                                      setShowForm(!showForm);
                                      // setValues(initialState);
                                      setblogDesc("");
                                      setblogTitle("");
                                      setlikes([]);
                                      setcomments([]);
                                      setuserId("");
                                      setIsActive(false);
                                      setIsActive(false);
          setErrBD(false);
          setOther(false);
          setBP(false);
          setUSP(false);
                                      setblogImage("");
                                      // setFileId(Math.random() * 100000);
                                    }}
                                    // onClick={() => tog_list()}
                                    // id="create-btn"
                                  >
                                    <i className="ri-add-line align-bottom me-1"></i>
                                    Assign Product
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
                                    setblogDesc("");
                                    setblogTitle("");
                                    setlikes([]);
                                    setcomments([]);
                                    setuserId("");
                                    setIsActive(false);
                                    setIsActive(false);
          setErrBD(false);
          setOther(false);
          setBP(false);
          setUSP(false);
                                    setblogImage("");
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
                               
                                      
                                      <Col lg={6} md={6}>
                                                    <div className="mb-3">
                                                    <Label>
                                Select Supplier{" "}
                                        <span className="text-danger">*</span>
                                      </Label>
                                       <Select
                                       placeholder={SupplierNamePlaceholder}
                                                            value={SupplierName}
                                                            onChange={handleSelectSingle}
                                                            options={selectType}
                                                        />
                                                    </div>
                                                </Col>
                                   
                                  </Col>
                                   
                                  <Col lg={3}>
  <div
    style={{
      display: showForm && !updateForm ? "flex" : "none",
      alignItems: "center"
    }}
  >
    <input
      className="form-control search"
      placeholder="Search..."
      onChange={(e) => setQuery1(e.target.value)}
      style={{ flex: 1 }}
    />
    <i className="search-icon" style={{ marginLeft: '8px' }}></i>
  </div>
</Col>


                      
                                  <CardBody>
                                    
                    <div>
                      <div className="table-responsive table-card mt-1 mb-1 text-right">
                        <DataTable
                          columns={col2}
                          data={blogs2}
                          progressPending={loading}
                          sortServer
                          onSort={(column1, sortDirection1, sortedRows1) => {
                            handleSort1(column1, sortDirection1);
                          }}
                          pagination
                          paginationServer
                          paginationTotalRows={totalRows2}
                          paginationRowsPerPageOptions={[
                            10,
                            50,
                            100,
                            totalRows2,
                          ]}
                          onChangeRowsPerPage={handlePerRowsChange1}
                          onChangePage={handlePageChange1}
                        />
                      </div>
                    </div>
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
                          {/* <PreviewCardHeader title="Billing Product Form" /> */}
                          <CardBody>
                            <div className="live-preview">
                              <Form>
                                <Row>
                                <Col lg={6}>
                               
                                      
                                      <Col lg={6} md={6}>
                                                    <div className="mb-3">
                                                    <Label>
                                Select Supplier{" "}
                                        <span className="text-danger">*</span>
                                      </Label>
                                       <Select
                                       isDisabled={true}
                                       placeholder={SupplierNamePlaceholder}
                                                            value={SupplierName}
                                                            onChange={handleSelectSingle}
                                                            options={selectType}
                                                        />
                                                    </div>
                                                </Col>
                                   
                                  </Col>
                                   
                                  <Col>
                                  </Col>
                                  <Col lg={3}>
  <div
    style={{
      display: !showForm && updateForm  ? "flex" : "none",
      alignItems: "center"
    }}
  >
    <input
      className="form-control search"
      placeholder="Search..."
      onChange={(e) => setQuery1(e.target.value)}
      style={{ flex: 1 }}
    />
    <i className=" search-icon" style={{ marginLeft: '8px' }}></i>
  </div>
</Col>
                                  <CardBody>
                                    
                    <div>
                      <div className="table-responsive table-card mt-1 mb-1 text-right">
                        <DataTable
                          columns={col3}
                          data={blogs3}
                          progressPending={loading}
                          sortServer
                          onSort={(column1, sortDirection1, sortedRows1) => {
                            handleSort1(column1, sortDirection1);
                          }}
                          pagination
                          paginationServer
                          paginationTotalRows={totalRows2}
                          paginationRowsPerPageOptions={[
                            10,
                            50,
                            100,
                            totalRows2,
                          ]}
                          onChangeRowsPerPage={handlePerRowsChange1}
                          onChangePage={handlePageChange1}
                        />
                      </div>
                    </div>
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
                          </CardBody>{" "}
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
          setblogDesc("");
          setblogTitle("");
          setlikes([]);
          setcomments([]);
          setuserId("");
          setIsActive(false);
          setblogImage("");
        }}
        centered
      >
        <ModalHeader
          className="bg-light p-3"
          toggle={() => {
            setmodal_delete(!modal_delete);
          }}
        >
          <span style={{ marginRight: "210px" }}>Remove Assign Product</span>
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

export default AssignProduct;