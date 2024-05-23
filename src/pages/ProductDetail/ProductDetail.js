import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Form,
  Input,
  Label,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import UiContent from "../../Components/Common/UiContent";
import { Table } from "antd";
import DataTable from "react-data-table-component";
import $ from "jquery";





import axios from "axios";
import { createProductDetail, getProductDetail, removeProductDetail, updateProductDetail } from "../../functions/ProductDetail/ProductDetail";

const initialState = {
  ProductDetail: "",
  Description: "",
 

  
  ProductDetailDescription: [
    {
      ProductKey: "",
      ProductValue: "",
   
    },
  ],
  ProductImage: "",
 
  IsActive: false,
  
};

const ProductDetail = () => {
  const [formErrors, setFormErrors] = useState({});
  const [formErrorsArr, setFormErrorsArr] = useState([]);
  const [selectType,setSelectType] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [filter, setFilter] = useState(true);
  const [_id, set_Id] = useState("");
  const [remove_id, setRemove_id] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);
  const [layout, setlayout] = useState([]);

  const [tableData, setTableData] = useState([]);

  const [loadingTable, setLoadingTable] = useState(false);

  const [values, setvalues] = useState(initialState);

  const {
    ProductDetail,
    Description,
    ProductImage,
   
  
   
    ProductDetailDescription,
    IsActive,
  
  } = values;

  // PHOTO
  const [photoAdd, setPhotoAdd] = useState();
  const [checkImagePhoto, setCheckImagePhoto] = useState(false);
  const [cvAdd, setCVAdd] = useState();
  const [checkImageCV, setCheckImageCV] = useState(false);
  const PhotoUpload = (e) => {
    if (e.target.files.length > 0) {
      console.log(e.target.files);
      const image = new Image();

      let imageurl = URL.createObjectURL(e.target.files[0]);
      console.log("img", e.target.files[0]);

      image.onload = () => {
        const width = image.width;
        const height = image.height;

        // Now, you have the image width and height available.
        // You can use this information when sending the image to the backend.
      };
      console.log("width", image.width);

      setPhotoAdd(imageurl);
      setvalues({ ...values, ProductImage: e.target.files[0] });
      setCheckImagePhoto(true);
    }
  };

  const CVUpload = (e) => {
    if (e.target.files.length > 0) {
      console.log(e.target.files);
      const image = new Image();

      let imageurl = URL.createObjectURL(e.target.files[0]);
      console.log("img", e.target.files[0]);

      image.onload = () => {
        const width = image.width;
        const height = image.height;
      };
      console.log("width", image.width);

      setCVAdd(imageurl);
      setvalues({ ...values, ProductHoverImage: e.target.files[0] });
      setCheckImageCV(true);
    }
  };

  const [modal_delete, setmodal_delete] = useState(false);

  const tog_delete = (_id) => {
    setmodal_delete(!modal_delete);
    setRemove_id(_id);
  };
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/list/areatype`);
        console.log("ressssssss",response)
        setSelectType(response);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, []);

  const handleTog_edit = (_id) => {
    setUpdateForm(true);
    setIsSubmit(false);
    set_Id(_id);

    getProductDetail(_id)
      .then((res) => {
        console.log("get", res);

        setvalues({
          ...values,
          Description: res.Description,
          ProductImage: res.ImageUrl,
         
         
         
          ProductDetail: res.ProductDetail,
          IsActive: res.IsActive,
      
        });

        const targetArray = [];

        // Loop through the original array and push each object into the target array
        for (const obj of res.ProductDetailDescription) {
          targetArray.push([obj]);
        }

        setCoordinatesArr(targetArray);
        setTableData(targetArray);
      })

      .catch((err) => {
        console.log("edit error", err);
      });
  };
  const [Cate, setcate] = useState([]);

  // validate
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("no errors");
    }
  }, [formErrors, isSubmit]);

  // useEffect(() => {
  //   loadCategories();
  // }, []);

  // const loadCategories = () => {
  //   listCategory().then((res) => setcate(res));
  // };

  const handleChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };

  const handleUpdateCancel = (e) => {
    e.preventDefault();
    setShowForm(false);
    setTableData([]);
    setUpdateForm(false);
    setIsSubmit(false);
    setvalues(initialState);
    setPhotoAdd("");
    setCVAdd("");
    setCoordinatesArr([]);
    setEditMode(false);
    setFormErrors({});
    setFormErrorsArr({});

    // const newMetalDetails = {
    //   ProductKey: "",
    //   ProductValue: "",
      
    // };

    // setvalues({
    //   ...values,
    //   ProductDetailDescription: [newMetalDetails], // Add a new empty component
    // });

    setTableData([]);
  };

  const handleAddCancel = (e) => {
    
    e.preventDefault();
   
    
    setShowForm(false);
    setIsSubmit(false);
    setUpdateForm(false);
    setvalues(initialState);
    setTableData([]);
    
    setCoordinatesArr([]);
    setCheckImagePhoto(false);
    setCheckImageCV(false);
    setFormErrors({});
    setFormErrorsArr({});
    setCVAdd("");
    setPhotoAdd("");

    setvalues(initialState);
    const newMetalDetails = {
      ProductKey: "",
      ProductValue: "",
      
    };

    setvalues({
      ...values,
      ProductDetailDescription: [newMetalDetails], // Add a new empty component
    });

    setTableData([]);
   
    

      handleCoordinatesChange(
        0,
        "ProductKey",
        ""
      )
      handleCoordinatesChange(
        0,
        "ProductValue",
        ""
      )

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let erros = validate(values);
    console.log("valus", values);
    console.log("Eee", erros);
    setFormErrors(erros);
    setIsSubmit(true);

    if (Object.keys(erros).length == 0) {
      const formdata = new FormData();

      const serializedMetals = JSON.stringify(CoordinatesArr);

      formdata.append("ProductDetail", ProductDetail);
      formdata.append("Description", Description);
      
      

      formdata.append("ProductImage", ProductImage);
     
      formdata.append("ProductDetailDescription", serializedMetals);
      formdata.append("IsActive", IsActive);
     

      

      console.log("formdara", formdata);
      createProductDetail(formdata)
        .then((res) => {
          console.log(res);

          setFormErrorsArr({});
          setCoordinatesArr([]);
          setTableData([]);
          setEditMode(false);
          setFormErrors({});
          setPhotoAdd("");
          setCVAdd("");
          setShowForm(false);
          setTableData([]);
          setCheckImagePhoto(false);
          setCheckImageCV(false);

          fetchlayouts();
          setvalues(initialState)
          
          
      handleCoordinatesChange(
        0,
        "ProductKey",
        ""
      )
      handleCoordinatesChange(
        0,
        "ProductValue",
        ""
      )
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    let erros = validate(values);
    setFormErrors(erros);
    setIsSubmit(true);
    if (Object.keys(formErrors).length === 0) {
      const formdata = new FormData();

      const serializedMetals = JSON.stringify(CoordinatesArr);
      formdata.append("ProductDetail", ProductDetail);
      formdata.append("Description", Description);
    
     

     

      formdata.append("ProductImage", ProductImage);
   

      formdata.append("ProductDetailDescription", serializedMetals);
      formdata.append("IsActive", IsActive);
    


      updateProductDetail(_id, formdata)
        .then((res) => {
          console.log(isSubmit);
          setUpdateForm(false);
          // loadlayout();
          setvalues(initialState);
          setCheckImagePhoto(false);
          setCheckImageCV(false);
          setCoordinatesArr([]);
          setFormErrors({});
          setTableData([]);
          setFormErrorsArr({});
          setPhotoAdd("");
          setCVAdd("");
          fetchlayouts();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    removeProductDetail(remove_id)
      .then((res) => {
        console.log("deleted", res);
        setmodal_delete(!modal_delete);
        fetchlayouts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChecklayout = (e) => {
    console.log(e.target.checked);
    setvalues({ ...values, IsActive: e.target.checked });
  };

  const handleCheckPartner = (e) => {
    console.log(e.target.checked);
    setvalues({ ...values, isPartner: e.target.checked });
  };

  const handleCheckPublic = (e) => {
    console.log(e.target.checked);
    setvalues({ ...values, isPublic: e.target.checked });
  };

  const handleCheckOutofStock = (e) => {
    console.log(e.target.checked);
    setvalues({ ...values, isOutOfStock: e.target.checked });
  };

  const handleCheckTP = (e) => {
    console.log(e.target.checked);
    setvalues({ ...values, IsTopProduct: e.target.checked });
    // if (e.target.checked) {
    //   setvalues({
    //     ...values,
    //     ProductDetail: "Select Product Group",
    //     IsTopProduct: e.target.checked,
    //   });
    //   console.log("vvv", values);
    // } else {
    //   setvalues({ ...values, IsTopProduct: e.target.checked });
    // }
  };

  //search and pagination state

  const [query, setQuery] = useState("");

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [errPN, setErrPN] = useState(false);
  const [errPD, setErrPD] = useState(false);
  const [errPW, setErrPW] = useState(false);
  const [errPP, setErrPP] = useState(false);

  const [errPI, setErrPI] = useState(false);
  const [errHI, setErrHI] = useState(false);
  const [errHoverImage, setErrHoverImage] = useState(false);

  const validate = (values) => {
    const errors = {};
    if (values.Description === "") {
      errors.Description = "Product Name is required";
      setErrPN(true);
    }

    if (values.Description !== "") {
      setErrPN(false);
    }
    if (values.ProductDescription === "") {
      errors.ProductDescription = "Product Description  is required";
      setErrPD(true);
    }

    if (values.ProductDescription !== "") {
      setErrPD(false);
    }
    if (values.ProductPrice === "") {
      errors.ProductPrice = "Product Price is required";
      setErrPP(true);
    }

    if (values.ProductPrice !== "") {
      setErrPP(false);
    }
    // if (values.Detail === "") {
    //   errors.Detail = "Product Weight is required";
    //   setErrPW(true);
    // }

    // if (values.Detail !== "") {
    //   setErrPW(false);
    // }
    if (values.ProductImage === "") {
      errors.ProductImage = "Product Image is required";
      setErrPI(true);
    }

    if (values.ProductImage !== "") {
      setErrPI(false);
    }

    if (
      values.IsTopProduct &&
      values.ProductHoverImage === "" &&
      values.ProductHoverImage === null &&
      values.ProductHoverImage === "null"
    ) {
      errors.ProductHoverImage = "Product Hover Image is required";
      setErrHoverImage(true);
    }

    if (values.IsTopProduct && values.ProductHoverImage !== "") {
      setErrHoverImage(false);
    }

    if (values.ProductDetail === "") {
      errors.ProductDetail = "Product Group is required";
      setErrHI(true);
    } else if (values.ProductDetail === "Select Product Group") {
      errors.ProductDetail = "Product Group is required";
      setErrHI(true);
    }

    if (values.ProductDetail !== "") {
      setErrHI(false);
    }

    return errors;
  };
  const validClassProductName =
    errPN && isSubmit ? "form-control is-invalid" : "form-control";
  const validClassProductD =
    errPD && isSubmit ? "form-control is-invalid" : "form-control";
  const validClassProductWt =
    errPW && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassProductPr =
    errPP && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassPI =
    errPI && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassHoverImage =
    errHoverImage && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassHI =
    errHI && isSubmit ? "form-control is-invalid" : "form-control";

    const DescriptionCell = styled.div`
  white-space: normal;
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
  padding: 10px;
  height: auto;
  line-height: 1.5;
`;

  const columns = [
    {
      name: "Sr No",
      selector: (row,index) => index+1,
      sortable: true,
      sortField: "srno",
      minWidth: "150px",
    },
    {
      name: "Product Group",
      selector: (row) => row.ProductDetailTypes[0].ProductGroup
      ,
      sortable: true,
      sortField: "categ",
      minWidth: "150px",
    },
    {
      name: "Product",
      selector: (row) => row.Description,
      sortable: true,
      sortField: "categ",
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

  const compareObjects = (obj1, obj2) => {
    return (
      obj1.ProductKey === obj2.ProductKey &&
      obj1.ProductValue === obj2.ProductValue
    );
  };

  const handleRemoveItem = (items) => {
    const filteredArray = CoordinatesArr.filter(
      (arr1) => !items.some((arr2) => compareObjects(arr1[0], arr2))
    );

    setTableData(filteredArray);
    setCoordinatesArr(filteredArray);
  };

  const [editMode, setEditMode] = useState(false);
  const [editRow, setEditRow] = useState();

  const handleEditItem = (row) => {
    setEditMode(true);
    setEditRow(row[0]);

    setvalues((prevValues) => ({
      ...prevValues,
      ProductDetailDescription: [
        {
          ProductKey: row[0].ProductKey,
          ProductValue: row[0].ProductValue,
         
        },
      ],
    }));
  };

  const validateMetalDetails = (metals) => {
    return metals.map((metal) => {
      const MetalError = {
        ProductKey: "",
        ProductValue: "",
      
      };

      // Validate the category for the device
      if (metal.ProductKey === "") {
        MetalError.ProductKey = "Key is required!";
      }
      if (metal.ProductValue === "") {
        MetalError.ProductValue = "Metal Description is required!";
      }
      

      return MetalError;
    });
  };

  const handleUpdateNew = (index, Metaldetail) => {
    console.log("device com", Metaldetail);

    // const errors = validateMetalDetails(cooridnates);

    // setFormErrorsArr(errors);
    // console.log("form IN update", formErrorsArr);

    // if (
    //   errors[0].DivisionName === "" &&
    //   errors[0].point_a_x === "" &&
    //   errors[0].point_a_y === "" &&
    //   errors[0].point_b_x === "" &&
    //   errors[0].point_b_y === ""
    // ) {
    const updatedCoordArray = [...CoordinatesArr];

    console.log("cc", updatedCoordArray);
    console.log("ROEM", editRow);

    // Find the index of the matching object
    const indexToUpdate = updatedCoordArray.findIndex((item) => {
      console.log("add", item);

      return (
        item[0].ProductKey === editRow.ProductKey &&
        item[0].ProductValue === editRow.ProductValue
    
      );
    });
    console.log("indexToUpdate", indexToUpdate);

    updatedCoordArray[indexToUpdate] = [Metaldetail];

    setCoordinatesArr(updatedCoordArray);

    const updatedTableData = [...tableData];
    updatedTableData[indexToUpdate] = [Metaldetail];

    setTableData(updatedTableData);

    console.log("changed arr", CoordinatesArr);
    console.log("changed table", tableData);
    console.log("tb", updatedTableData);

    setEditMode(false);
    setEditRow(null);

    const newDetails = {
      ProductKey: "",
      ProductValue: "",
      
    };

    setvalues({
      ...values,
      ProductDetailDescription: [newDetails], // Add a new empty component
    });
    // }
  };

  const columns2 = [
    {
      name: "Key",
      selector: (row) => {
        const newArray = row.map((r) => r.ProductKey);
        return newArray;
      },
      sortable: false,
    },

    {
  name: "Description",
  selector: (row) => {
    const newArrayMD = row.map((r) => r.ProductValue).join(", ");
    return newArrayMD;
  },
  sortable: false,
  cell: (row) => (
    <DescriptionCell>
      {row.map((r) => (
        <div key={r.ProductKey}>{r.ProductValue}</div>
      ))}
    </DescriptionCell>
  ),
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
                  onClick={() => handleEditItem(row)}
                  type="button"
                >
                  Edit
                </button>
              </div>

              <div className="remove">
                <button
                  className="btn btn-sm btn-danger remove-item-btn"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteRecordModal"
                  onClick={() => handleRemoveItem(row)}
                  type="button"
                >
                  Remove
                </button>
              </div>
            </div>
          </React.Fragment>
        );
      },
      sortable: false,
      minWidth: "250px",
    },
  ];
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
    fetchlayouts();
  }, [pageNo, perPage, column, sortDirection, query, filter]);

  const fetchlayouts = async () => {
    setLoading(true);
    let skip = (pageNo - 1) * perPage;
    if (skip < 0) {
      skip = 0;
    }

    await axios
      .post(
        `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/listprojectdetailbyparam`,
        {
          skip: skip,
          per_page: perPage,
          sorton: column,
          sortdir: sortDirection,
          match: query,
          IsActive: filter,
        }
      )
      .then((response) => {
        if (response.length > 0) {
          let res = response[0];
          setLoading(false);
          setlayout(res.data);
          setTotalRows(res.count);
        } else if (response.length === 0) {
          setlayout([]);
        }
      });

    setLoading(false);
  };

  const handleCoordinatesChange = (index, subfield, value) => {
    const updatedDetails = [...ProductDetailDescription];
    console.log("clg",updatedDetails)
    updatedDetails[index][subfield] = value;

    setvalues({
      ...values,
      ProductDetailDescription: updatedDetails,
    });
  };

  const [CoordinatesArr, setCoordinatesArr] = useState([]);

  const handleAddCoordinate = () => {
    const errors = validateMetalDetails(ProductDetailDescription);
    setFormErrorsArr(errors);

    if (
      errors[0].ProductKey === "" &&
      errors[0].ProductValue === "" 
     
    ) {
      const newDetails = {
        ProductKey: "",
        ProductValue: "",
       
      };

      setvalues({
        ...values,
        ProductDetailDescription: [...ProductDetailDescription, newDetails],
      });
      setCoordinatesArr((prevCoordinatesArr) => [
        ...prevCoordinatesArr,
        ProductDetailDescription,
      ]);

      setTableData((prevTableData) => [...prevTableData, ProductDetailDescription]);

      setvalues({
        ...values,
        ProductDetailDescription: [newDetails], // Add a new empty component
      });
    }

    // }
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
  };
  document.title = "Product Details | Shreeji Pharma";

  return (
    <React.Fragment>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            maintitle="Product Details"
            title="Products Detail"
            pageTitle="Product Setup"
          />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <Row className="g-4 mb-1">
                    <Col className="col-sm">
                      <h2 className="card-title mb-0 fs-4 mt-2">
                        Product Details
                      </h2>
                    </Col>
                    <Col>
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

                    <Col className="col-sm-auto">
                      <div className="d-flex justify-content-sm-end">
                        {/* <div> */}
                        <div
                          style={{
                            display: showForm || updateForm ? "none" : "",
                          }}
                        >
                          <div className="ms-2">
                            <Button
                              color="success"
                              className="add-btn me-1"
                              onClick={() => {
                                setShowForm(!showForm);
                                setvalues(initialState);
                              }}
                            >
                              <i className="ri-add-line align-bottom me-1"></i>
                              Add
                            </Button>
                          </div>
                        </div>

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
                                    setvalues(initialState);
                                    setShowForm(false);
                                    setUpdateForm(false);
                                  }}
                                >
                                  <i class="ri-list-check align-bottom me-1"></i>{" "}
                                  List
                                </button>
                              </div>
                            </Col>
                          </Row>
                        </div>
                        {/* </div> */}

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

                {/* add form */}

                <div
                  style={{
                    display: showForm && !updateForm ? "block" : "none",
                  }}
                >
                  <CardBody>
                    <React.Fragment>
                      <Col xxl={12}>
                        <div className="position-relative mx-n4 mt-n4">
                          <div className="overlay-content">
                            <div className="text-end p-3">
                              <div className="p-0 ms-auto rounded-circle profile-photo-edit"></div>
                            </div>
                          </div>
                        </div>

                        <Card>
                          <CardBody>
                            <div className="live-preview">
                              <Form enctype="multipart/form-data">
                                <Row>
                                 

                                <Col md={6}>
      <div className="form-floating mb-3">
        <select
          className={validClassHI}
          name="ProductDetail"
          value={ProductDetail}
          onChange={handleChange}
        >
          <option>Select Product Group</option>
          {selectType.map((detail, index) => (
            <option key={index} value={detail._id}>
              {detail.ProductGroup}
            </option>
          ))}
        </select>
        <label>
          Product Group <span className="text-danger">*</span>
        </label>
        {isSubmit && formErrors.ProductDetail && (
          <p className="text-danger">{formErrors.ProductDetail}</p>
        )}
      </div>
    </Col>
                                  <Col md={6}>
                                    <div className="form-floating mb-3">
                                      <input
                                        type="text"
                                        className={validClassProductName}
                                        placeholder="Device Component Name"
                                        id="rolefloatingInput"
                                        required
                                        name="Description"
                                        value={Description}
                                        onChange={handleChange}
                                      />
                                      {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.Description}
                                        </p>
                                      )}

                                      <label
                                        htmlFor="role-field"
                                        className="form-label"
                                      >
                                        Product Name
                                        <span className="text-danger">*</span>
                                      </label>
                                    </div>
                                  </Col>

                                  {/* <Col md={6}>
                                    <div className="form-floating mb-3">
                                      <input
                                        type="number"
                                        className={validClassProductPr}
                                        placeholder="Device Component Name"
                                        id="rolefloatingInput"
                                        required
                                        name="ProductPrice"
                                        value={ProductPrice}
                                        onChange={handleChange}
                                      />
                                      {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.ProductPrice}
                                        </p>
                                      )}

                                      <label
                                        htmlFor="role-field"
                                        className="form-label"
                                      >
                                        Product Price
                                        <span className="text-danger">*</span>
                                      </label>
                                    </div>
                                  </Col> */}
                                
                                  {/* DIV */}
                                  <Card>
                                    <CardHeader>
                                      <h2>Add Product Details</h2>
                                    </CardHeader>
                                    <CardBody>
                                      {Array.isArray(ProductDetailDescription) &&
                                        ProductDetailDescription.map(
                                          (Metaldetail, index) => (
                                            <Row key={index}>
                                              <Col md={6}>
                                                <div className="form-floating mb-3">
                                                  <Input
                                                    type="text"
                                                    name={`ProductDetailDescription[${index}].ProductKey`}
                                                    className={`form-control ${
                                                      formErrorsArr[index]
                                                        ?.ProductKey
                                                        ? "is-invalid"
                                                        : ""
                                                    }`}
                                                    placeholder="Metal Name"
                                                    value={
                                                      Metaldetail.ProductKey
                                                    }
                                                    onChange={(e) =>
                                                      handleCoordinatesChange(
                                                        index,
                                                        "ProductKey",
                                                        e.target.value
                                                      )
                                                    }
                                                  />
                                                  <Label>
                                                    Key{" "}
                                                    {/* <span className="text-danger">
                                                      *
                                                    </span> */}
                                                  </Label>
                                                  {formErrorsArr[index]
                                                    ?.ProductKey && (
                                                    <div className="text-danger">
                                                      {
                                                        formErrorsArr[index]
                                                          .ProductKey
                                                      }
                                                    </div>
                                                  )}
                                                </div>
                                              </Col>
                                             
                                              <Row>
                                                <Col lg={12}>
                                                  <div className="form-floating mb-3">
                                                    <textarea
                                                      style={{
                                                        height: "100px",
                                                      }}
                                                      type="text"
                                                      // className="form-control"
                                                      id="rolefloatingInput"
                                                      placeholder="metal Description"
                                                      name={`ProductDetailDescription[${index}].ProductValue`}
                                                      className={`form-control ${
                                                        formErrorsArr[index]
                                                          ?.ProductValue
                                                          ? "is-invalid"
                                                          : ""
                                                      }`}
                                                      value={
                                                        Metaldetail.ProductValue
                                                      }
                                                      onChange={(e) =>
                                                        handleCoordinatesChange(
                                                          index,
                                                          "ProductValue",
                                                          e.target.value
                                                        )
                                                      }
                                                    />
                                                    {formErrorsArr[index]
                                                      ?.ProductValue && (
                                                      <div className="text-danger">
                                                        {
                                                          formErrorsArr[index]
                                                            .ProductValue
                                                        }
                                                      </div>
                                                    )}
                                                    <label
                                                      htmlFor="role-field"
                                                      className="form-label"
                                                    >
                                                      Description
                                                      {/* <span className="text-danger">
                                                        *
                                                      </span> */}
                                                    </label>
                                                  </div>
                                                </Col>
                                              </Row>
                                              {editMode ? (
                                                <Col>
                                                  <div className="text-end">
                                                    <div>
                                                      <Button
                                                        color="success"
                                                        className="add-btn btn-lg btn-block me-3"
                                                        onClick={() =>
                                                          handleUpdateNew(
                                                            index,
                                                            Metaldetail
                                                          )
                                                        }
                                                      >
                                                        Update
                                                      </Button>
                                                    </div>
                                                  </div>
                                                </Col>
                                              ) : (
                                                <Col>
                                                  <div className="text-end">
                                                    <div>
                                                      <Button
                                                        color="success"
                                                        // className="add-btn me-3"
                                                        className="add-btn btn-lg btn-block me-3"
                                                        onClick={
                                                          handleAddCoordinate
                                                        }
                                                      >
                                                        Add
                                                      </Button>
                                                    </div>
                                                  </div>
                                                </Col>
                                              )}
                                            </Row>
                                          )
                                        )}
                                    </CardBody>
                                    <Card>
                                      <CardBody>
                                        <div>
                                          <div className="table-responsive table-card mt-1 mb-1 text-right">
                                            <DataTable
                                              columns={columns2}
                                              data={tableData}
                                              progressPending={loading}
                                              sortServer
                                              onSort={(
                                                column,
                                                sortDirection,
                                                sortedRows
                                              ) => {
                                                handleSort(
                                                  column,
                                                  sortDirection
                                                );
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
                                              onChangeRowsPerPage={
                                                handlePerRowsChange
                                              }
                                              onChangePage={handlePageChange}
                                            />
                                          </div>
                                        </div>
                                      </CardBody>
                                    </Card>
                                  </Card>

                                  <Col lg={6}>
                                    <label>
                                      Product Image{" "}
                                      <span className="text-danger">*</span>
                                    </label>

                                    <input
                                      type="file"
                                      name="ProductImage"
                                      className={validClassPI}
                                      // accept="images/*"
                                      accept=".jpg, .jpeg, .png"
                                      onChange={PhotoUpload}
                                    />
                                    {isSubmit && (
                                      <p className="text-danger">
                                        {formErrors.ProductImage}
                                      </p>
                                    )}
                                    {checkImagePhoto ? (
                                      <img
                                        src={photoAdd}
                                        alt="Profile"
                                        width="200"
                                        height="160"
                                      />
                                    ) : null}
                                  </Col>

                                  

                                  <Row>
                                    <Col md={6}>
                                      <Col md={12}>
                                        <div
                                          className="form-check mb-3 mt-5"
                                          style={{ marginLeft: "2rem" }}
                                        >
                                          <Input
                                            key={"IsActive" + _id}
                                            // className={validClassActive}
                                            type="checkbox"
                                            name="IsActive"
                                            value={IsActive}
                                            onChange={handleChecklayout}
                                          />
                                          <Label
                                            className="form-check-label"
                                            htmlFor="activeCheckBox"
                                          >
                                            Is Active
                                          </Label>
                                        </div>
                                      </Col>

                                      {/*  */}
                                  

                                      {/*  */}
                                     
                                      
                                    </Col>
                                   
                                  </Row>

                                  <Col lg={12}>
                                    <div className="text-end">
                                      <button
                                        onClick={handleSubmit}
                                        className="btn btn-success  m-1"
                                      >
                                        Submit
                                      </button>
                                      <button
                                        className="btn btn-outline-danger m-1"
                                        onClick={handleAddCancel
                                        
                                        }
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

                {/* update form */}

                <div
                  style={{
                    display: !showForm && updateForm ? "block" : "none",
                  }}
                >
                  <CardBody>
                    <React.Fragment>
                      <Col xxl={12} lg={12}>
                        <Card>
                          <CardBody>
                            <div className="live-preview">
                              <Form>
                                <Row>
                                 
                                  
                                <Col md={6}>
      <div className="form-floating mb-3">
        <select
          className={validClassHI}
          name="ProductDetail"
          value={ProductDetail}
          onChange={handleChange}
        >
          <option>Select Product GroupGroup</option>
          {selectType.map((detail, index) => (
            <option key={index} value={detail._id}>
              {detail.ProductGroup}
            </option>
          ))}
        </select>
        <label>
          Product Group <span className="text-danger">*</span>
        </label>
        {isSubmit && formErrors.ProductDetail && (
          <p className="text-danger">{formErrors.ProductDetail}</p>
        )}
      </div>
    </Col>
                                  <Col md={6}>
                                    <div className="form-floating mb-3">
                                      <input
                                        type="text"
                                        className={validClassProductName}
                                        placeholder="Device Component Name"
                                        id="rolefloatingInput"
                                        required
                                        name="Description"
                                        value={Description}
                                        onChange={handleChange}
                                      />
                                      {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.Description}
                                        </p>
                                      )}

                                      <label
                                        htmlFor="role-field"
                                        className="form-label"
                                      >
                                        Product Name
                                        <span className="text-danger">*</span>
                                      </label>
                                    </div>
                                  </Col>

                                

                               
                                  <Card>
                                    <CardHeader>
                                      <h2>Edit Product Details</h2>
                                    </CardHeader>
                                    <CardBody>
                                      {Array.isArray(ProductDetailDescription) &&
                                        ProductDetailDescription.map(
                                          (Metaldetail, index) => (
                                            <Row key={index}>
                                              <Col md={6}>
                                                <div className="form-floating mb-3">
                                                  <Input
                                                    type="text"
                                                    name={`ProductDetailDescription[${index}].ProductKey`}
                                                    className={`form-control ${
                                                      formErrorsArr[index]
                                                        ?.ProductKey
                                                        ? "is-invalid"
                                                        : ""
                                                    }`}
                                                    placeholder="Metal Name"
                                                    value={
                                                      Metaldetail.ProductKey
                                                    }
                                                    onChange={(e) =>
                                                      handleCoordinatesChange(
                                                        index,
                                                        "ProductKey",
                                                        e.target.value
                                                      )
                                                    }
                                                  />
                                                  <Label>
                                                    Key{" "}
                                                    {/* <span className="text-danger">
                                                      *
                                                    </span> */}
                                                  </Label>
                                                  {formErrorsArr[index]
                                                    ?.ProductKey && (
                                                    <div className="text-danger">
                                                      {
                                                        formErrorsArr[index]
                                                          .ProductKey
                                                      }
                                                    </div>
                                                  )}
                                                </div>
                                              </Col>
                                             

                                              <Col lg={12}>
                                                <div className="form-floating mb-3">
                                                  <textarea
                                                    style={{ height: "100px" }}
                                                    type="text"
                                                    // className={validClassAddProductDesc}
                                                    // className="form-control"
                                                    className={`form-control ${
                                                      formErrorsArr[index]
                                                        ?.ProductValue
                                                        ? "is-invalid"
                                                        : ""
                                                    }`}
                                                    placeholder="metal Description"
                                                    name={`ProductDetailDescription[${index}].ProductValue`}
                                                    value={
                                                      Metaldetail.ProductValue
                                                    }
                                                    onChange={(e) =>
                                                      handleCoordinatesChange(
                                                        index,
                                                        "ProductValue",
                                                        e.target.value
                                                      )
                                                    }
                                                  />
                                                  {formErrorsArr[index]
                                                    ?.ProductValue && (
                                                    <div className="text-danger">
                                                      {
                                                        formErrorsArr[index]
                                                          .ProductValue
                                                      }
                                                    </div>
                                                  )}
                                                  <label
                                                    htmlFor="role-field"
                                                    className="form-label"
                                                  >
                                                    Description
                                                    {/* <span className="text-danger">
                                                      *
                                                    </span> */}
                                                  </label>
                                                </div>
                                              </Col>

                                              {editMode ? (
                                                <Col>
                                                  <div className="text-end">
                                                    <div>
                                                      <Button
                                                        color="success"
                                                        className="add-btn btn-lg btn-block me-3"
                                                        onClick={() =>
                                                          handleUpdateNew(
                                                            index,
                                                            Metaldetail
                                                          )
                                                        }
                                                      >
                                                        Update
                                                      </Button>
                                                    </div>
                                                  </div>
                                                </Col>
                                              ) : (
                                                <Col>
                                                  <div className="text-end">
                                                    <div>
                                                      <Button
                                                        color="success"
                                                        // className="add-btn me-3"
                                                        className="add-btn btn-lg btn-block me-3"
                                                        onClick={
                                                          handleAddCoordinate
                                                        }
                                                      >
                                                        Add
                                                      </Button>
                                                    </div>
                                                  </div>
                                                </Col>
                                              )}
                                            </Row>
                                          )
                                        )}
                                    </CardBody>
                                    <Card>
                                      <CardBody>
                                        <div>
                                          <div className="table-responsive table-card mt-1 mb-1 text-right">
                                            <DataTable
                                              columns={columns2}
                                              data={tableData}
                                              progressPending={loading}
                                              sortServer
                                              onSort={(
                                                column,
                                                sortDirection,
                                                sortedRows
                                              ) => {
                                                handleSort(
                                                  column,
                                                  sortDirection
                                                );
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
                                              onChangeRowsPerPage={
                                                handlePerRowsChange
                                              }
                                              onChangePage={handlePageChange}
                                            />
                                          </div>
                                        </div>
                                      </CardBody>
                                    </Card>
                                  </Card>

                                  <Col lg={6}>
                                    <label>
                                      Product Image{" "}
                                      <span className="text-danger">*</span>
                                    </label>
                                    <input
                                      key={"ProductImage" + _id}
                                      type="file"
                                      name="ProductImage"
                                      className={validClassPI}
                                      // accept="images/*"
                                      accept=".jpg, .jpeg, .png"
                                      onChange={PhotoUpload}
                                    />
                                    {isSubmit && (
                                      <p className="text-danger">
                                        {formErrors.ProductImage}
                                      </p>
                                    )}

                                    {values.ProductImage || photoAdd ? (
                                      <img
                                        src={
                                          checkImagePhoto
                                            ? photoAdd
                                            : `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/${values.ProductImage}`
                                        }
                                        width="180"
                                        height="180"
                                      />
                                    ) : null}
                                  </Col>

                                

                                  <Row>
                                    <Col md={6}>
                                      <Col md={12}>
                                        <div
                                          className="form-check mb-3 mt-5"
                                          style={{ marginLeft: "2rem" }}
                                        >
                                          <Input
                                            key={"IsActive" + _id}
                                            // className={validClassActive}
                                            type="checkbox"
                                            name="IsActive"
                                            value={IsActive}
                                            checked={IsActive}
                                            onChange={handleChecklayout}
                                          />
                                          <Label
                                            className="form-check-label"
                                            htmlFor="activeCheckBox"
                                          >
                                            Is Active
                                          </Label>
                                        </div>
                                      </Col>

                                      {/*  */}
                                     

                                      {/*  */}
                                      
                                     
                                    </Col>
                                   
                                  </Row>

                                  <Col lg={12}>
                                    <div className=" text-end">
                                      <button
                                        type="submit"
                                        className="btn btn-success  m-1"
                                        onClick={handleUpdate}
                                      >
                                        Update
                                      </button>
                                      <button
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
                        {/*  */}
                      </Col>
                    </React.Fragment>
                  </CardBody>
                </div>

                {/* new list */}
                <div
                  style={{ display: showForm || updateForm ? "none" : "block" }}
                >
                  <CardBody>
                    <div>
                      <div className="table-responsive table-card mt-1 mb-1 text-right">
                        <DataTable
                          columns={columns}
                          data={layout}
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

      {/* Remove Modal */}
      <Modal
        isOpen={modal_delete}
        toggle={() => {
          tog_delete();
        }}
        centered
      >
        <ModalHeader
          className="bg-light p-3"
          toggle={() => {
            setmodal_delete(false);
          }}
        >
          Remove Master Layout
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

export default ProductDetail;
