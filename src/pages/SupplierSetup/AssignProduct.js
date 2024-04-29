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

  const [_id, set_Id] = useState("");
  const [remove_id, setRemove_id] = useState("");

  const [blogs, setBlogs] = useState([]);
  const [blogs2, setBlogs2] = useState([]);

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
    let skip = (pageNo - 1) * perPage;
    if (skip < 0) {
      skip = 0;
    }
    axios
    .post(`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/listprojectdetailbyparam`, {
      skip: skip,
      per_page: perPage,
      sorton: column,
      sortdir: sortDirection,
      match: query,
      IsActive: filter,
    })
      .then((response) => {
        if (response.length > 0) {
          console.log(response[0].data);
          setProduct(response);
          setBlogs2(response[0].data);
          setTotalRows2(response.count);
          setLoading(false);
        } 
        else if (response.length === 0) {
          setBlogs2([]);
          setProduct([])
        }
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        // Handle error appropriately
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
    getSelectType();
    setIsSubmit(false);
    setUpdateForm(true);
    set_Id(_id);
    // setTypes(row.ProductDetail);
    setblogTitle(row.Description);
    // setblogThumnailDesc(row.subtitle);
    setblogDesc(row.Detail);
    // setPhotoAdd(`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/${row.imageURL}`);
    setIsActive(row.IsActive);
    setBP(row.BP);
    setEP(row.EP);
    setUSP(row.USP);
    setOther(row.Other);
   
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
      // formdata.append("Detail", blogDesc);
      // formdata.append("IsActive", IsActive);
      // formdata.append("Other", Other);
      // formdata.append("BP", BP);
      // formdata.append("EP", EP);
      // formdata.append("USP", USP);
      // formdata.append("subtitle", blogThumnailDesc);


      axios.post(`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/create/AssignProduct`,formdata)
        .then((res) => {
          console.log(res);
          setSelectType([])
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
    let erros = validate(blogTitle,types);
    setFormErrors(erros);
    setIsSubmit(true);
    const likesString = JSON.stringify(likes);
    const commentString = JSON.stringify(comments);

    if (Object.keys(erros).length === 0) {
      setLoadingOption(true);
      const formdata = new FormData();

      // formdata.append("newImage", blogImage);
      formdata.append("ProductDetail",types);
      formdata.append("Description", blogTitle);
      // formdata.append("Detail", blogDesc);
      formdata.append("IsActive", IsActive);
      formdata.append("Other", Other);
      formdata.append("BP", BP);
      formdata.append("EP", EP);
      formdata.append("USP", USP);
      // formdata.append("subtitle", blogThumnailDesc);

      axios.put(`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/update/projectdetail/${_id}`,formdata)
        .then((res) => {
          // setmodal_edit(!modal_edit);
          setSelectType([])
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
      .post(`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/listAssignProductbyparam`, {
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
  };
  const handleFilter = (e) => {
    setFilter(e.target.checked);
  };

  const handleAddCancel = (e) => {
    e.preventDefault();
    setIsSubmit(false);
    setPhotoAdd("");
    setCheckImagePhoto(false);
    setShowForm(false);
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
<label
  className="btn btn-sm edit-item-btn"
  htmlFor={`checkbox-${row._id}`}
  data-bs-toggle="modal"
  data-bs-target="#showModal"
  onClick={() => handleTog_edit(row, row._id)}
>
  {/* Add any content inside the label that you want to display */}
</label>

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
                                    Asign Product
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
                                Assign Products{" "}
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
                                   {/* <Col lg={12}>
                                    <Label>
                                      Select Product
                                    </Label>
                                    {product.map((item, index)=>{
                                        return(
                                          <div className="form-check" key={index}>
                                          <Input className="form-check-input" type="checkbox" id={index}  />                                                           /
                                          <Label className="form-check-label" htmlFor="formCheck2">
                                             {item.Description}
                                          </Label>
                                      </div>
                                        )
                                    }
                                    
                                     )}
                                  
                                    </Col> */}
 
                                    {/* <div className="mt-5">
                                    <Col lg={2}>
                                      <div className="form-check mb-2">
                                        <Input
                                          key={"IsActive_" + _id}
                                          type="checkbox"
                                          name="IsActive"
                                          value={IsActive}
                                          // onChange={handleCheck}
                                          onChange={(e) => {
                                            setIsActive(e.target.checked);
                                          }}
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
                                  </div> */}
                                  <Col>
                                  </Col>
                                  <CardBody>
                                    
                    <div>
                      <div className="table-responsive table-card mt-1 mb-1 text-right">
                        <DataTable
                          columns={col2}
                          data={blogs2}
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
                                Assign Products{" "}
                                        <span className="text-danger">*</span>
                                      </Label>
                                    <Input name="Type" id="" type="select" value={types} onChange={(e) => {
                                          setTypes(e.target.value); 
                                        }}>
                                        {selectType && selectType.map((item,index)=>
                                        <option key={index} value={item._id}>{item.ProductGroup}</option>
                                        )}
                                    </Input>
                                    {isSubmit && (
                                      <p className="text-danger">
                                        {formErrors.types}
                                      </p>
                                    )}
                                  </Col>
                                  <Col lg={6}>
                                    <div className="form-floating mb-3">
                                      <Input
                                        key={"blogTitle_" + _id}
                                        type="text"
                                        className={validClassBT}
                                        placeholder="Enter blog title"
                                        required
                                        name="blogTitle"
                                        value={blogTitle}
                                        onChange={(e) => {
                                          setblogTitle(e.target.value);
                                        }}
                                      />
                                      <Label>
                                        Title{" "}
                                        <span className="text-danger">*</span>
                                      </Label>
                                      {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.blogTitle}
                                        </p>
                                      )}
                                    </div>
                                  </Col>

                                 
                                    <Col lg={6} style={{marginTop:"35px"}}>
                                      <Row>
                                      <Col lg={2}>
                                      <div className="form-check mb-2">
                                        <Input
                                          key={"BP_" + _id}
                                          type="checkbox"
                                          name="BP"
                                          value={BP}
                                          // onChange={handleCheck}
                                          onChange={(e) => {
                                            setBP(e.target.checked);
                                          }}
                                          checked={BP}
                                        />
                                        <Label
                                          className="form-check-label"
                                          htmlFor="activeCheckBox"
                                        >
                                          BP
                                        </Label>
                                      </div>
                                    </Col>
                                    <Col lg={2}>
                                      <div className="form-check mb-2">
                                        <Input
                                          key={"USP_" + _id}
                                          type="checkbox"
                                          name="USP"
                                          value={USP}
                                          // onChange={handleCheck}
                                          onChange={(e) => {
                                            setUSP(e.target.checked);
                                          }}
                                          checked={USP}
                                        />
                                        <Label
                                          className="form-check-label"
                                          htmlFor="activeCheckBox"
                                        >
                                          USP
                                        </Label>
                                      </div>
                                    </Col>
                                    <Col lg={2}>
                                      <div className="form-check mb-2">
                                        <Input
                                          key={"EP_" + _id}
                                          type="checkbox"
                                          name="EP"
                                          value={EP}
                                          // onChange={handleCheck}
                                          onChange={(e) => {
                                            setEP(e.target.checked);
                                          }}
                                          checked={EP}
                                        />
                                        <Label
                                          className="form-check-label"
                                          htmlFor="activeCheckBox"
                                        >
                                          EP
                                        </Label>
                                      </div>
                                    </Col>
                                    <Col lg={2}>
                                      <div className="form-check mb-2">
                                        <Input
                                          key={"Other_" + _id}
                                          type="checkbox"
                                          name="Other"
                                          value={Other}
                                          // onChange={handleCheck}
                                          onChange={(e) => {
                                            setOther(e.target.checked);
                                          }}
                                          checked={Other}
                                        />
                                        <Label
                                          className="form-check-label"
                                          htmlFor="activeCheckBox"
                                        >
                                          Other
                                        </Label>
                                      </div>
                                    </Col>
                                      </Row>
                                    </Col>

                                  {/* <div className="mt-5">
                                    <Col lg={6}>
                                      <div className="form-check mb-2">
                                        <Input
                                          key={"IsActive_" + _id}
                                          type="checkbox"
                                          name="IsActive"
                                          value={IsActive}
                                          onChange={(e) => {
                                            setIsActive(e.target.checked);
                                          }}
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
                                  </div> */}

                                  <div className="mt-5">
                                    <Col lg={2}>
                                      <div className="form-check mb-2">
                                        <Input
                                          key={"IsActive_" + _id}
                                          type="checkbox"
                                          name="IsActive"
                                          value={IsActive}
                                          // onChange={handleCheck}
                                          onChange={(e) => {
                                            setIsActive(e.target.checked);
                                          }}
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
                                  </div><Col>

                                
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
                                    <div className="text-end">
                                      <button
                                        type="submit"
                                        className=" btn btn-success m-1"
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

export default AssignProduct;