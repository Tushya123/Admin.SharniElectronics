
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
import Select from "react-select";
import { ToastContainer, toast } from 'react-toastify';
// import {
//   createNewProject, uploadproductImage,
// } from "../../functions/NewProject/Projectfunc";
// import {
//     createSpecialityManagement,removeSpecialityManagement,listSpecialityManagement,updateSpecialityManagement,getSpecialityManagement,getNewSpecialityByParam
// } from "../../functions/SpecialityManagement/SpecialityManagement"

import {
  getCmsContactUsDetailById,getCmsAboutUsById,editCmsContactUsDetailContent,editCmsAboutUsContent,uploadproductImageAboutUs
} from "../../functions/CMSshreeji/cms"
const Cms = () => {
  const [serialNumber, setserialNumber] = useState("");
  const [code, setcode] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const [productName, setproductName] = useState("");

  const [solarrooftype, setsolarrooftype] = useState("");
  // const [capacity,setcapacity]=useState("");

  const [productImage, setproductImage] = useState("");
  const [productImage1, setproductImage1] = useState("");
  const [productPDF, setProductPDF] = useState("");
  const [description, setdescription] = useState("");
//   const [description, setdescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [SpecialityName, setSpecialityName] = useState("");
  const [UploadIcon,setUploadIcon]=useState("");
  const [UploadHomeIcon,setUploadHomeIcon]=useState("");
  const [Detail, setDetail] = useState("");
//   const [shortDescription, setShortDescription] = useState("");
//   const [shortDescription, setShortDescription] = useState("");
  const [blogThumnailDesc, setblogThumnailDesc] = useState("");
  const [views, setViews] = useState(0);

  const [likes, setlikes] = useState([]);
  const [comments, setcomments] = useState([]);
  const [userId, setuserId] = useState(localStorage.getItem("RCCoffeeAdmin"));
  const [IsActive, setIsActive] = useState(false);

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [filter, setFilter] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);

  const [query, setQuery] = useState("");

  const [_id, set_Id] = useState("");
  const [remove_id, setRemove_id] = useState("");

  const [blogs, setBlogs] = useState([]);
  const handleChangeSpecilityName = (e) => {
    setSpecialityName(e.target.value);
  };
  const handleChangeDetail = (e) => {
    setDetail(e.target.value);
  };
  
  const handleImageChangeproductImage =(e)=>{
    setproductImage(e.target.files[0]);
  } 
  const handleImageChangeproductImage1 =(e)=>{
    setproductImage1(e.target.files[0]);
  }

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("no errors");
    }
  }, [formErrors, isSubmit]);

  function uploadAdapter(loader) {
    return {
      upload: () => {
        return loader.file.then((file) => {
          const body = new FormData();
          body.append("uploadImage", file);

          // Using uploadImage function that uses Axios for the HTTP request
          return uploadproductImageAboutUs(body)
            .then((response) => {
              console.log("response123456789", response);
              // Accessing the 'url' property from the response's 'data'
              const Url = response.url; // Adjusted to access 'data.url'
              console.log("Upload response URL:", Url);

              return {
                default: `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/uploads/AboutUS/${Url}`,
              };
            })
            .catch((err) => {
              console.error("Upload error:", err);
              throw err; // Reject the promise to signal an upload error
            });
        });
      },
    };
  }

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }

  const [categories, setCategories] = useState([]);

  //   useEffect(() => {
  //     const fetchCategories = async () => {
  //       try {
  //         const result = await getallcategory();

  //         setCategories(result);
  //       } catch (error) {
  //         console.error("Error fetching categories:", error);
  //         // Optionally, set categories to an empty array in case of error
  //         setCategories([]);
  //       }
  //     };

  //     fetchCategories();
  //   }, []);

  const [modal_delete, setmodal_delete] = useState(false);
  const tog_delete = (_id) => {
    setmodal_delete(!modal_delete);
    setRemove_id(_id);
  };

  const [modal_edit, setmodal_edit] = useState(false);
    const handleTog_edit = (_id) => {
      setmodal_edit(!modal_edit);
      setIsSubmit(false);
      setUpdateForm(true);

      setIsSubmit(false);
      set_Id(_id);
    //   getSpecialityManagement(_id)
    //     .then((res) => {
    //       console.log("res", res);
    //       setSpecialityName(res.data.SpecialityName)
    //       console.log()
    //       // setserialNumber(res.data.serialNumber);
    //       // setcode(res.data.code);
    //       // setproductName(res.data.productName);
    //       // setCategoryID(res.data.categoryID);
    //       // setproductImage(res.data.productImage);
    //       // setProductPDF(res.data.productPDF);

    //       // setdescription(res.data.description);
    //       // setShortDescription(res.data.shortDescription);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    };

//   const handleClick = (e) => {
//     e.preventDefault();
//     setFormErrors({});
//     // let errors = validate(
//     //   serialNumber,
//     //   categoryID,
//     //   productImage,
//     //   productPDF,
//     //   productName,
//     //   code
//     // );
//     // setFormErrors(errors);
//     setIsSubmit(true);

//     // if (Object.keys(errors).length === 0) {
//     const formdata = new FormData();

//     formdata.append("SpecialityName", SpecialityName);

//     formdata.append("Detail", Detail);
//     // formdata.append("capacity",setcapacity)
//     console.log(productImage)
//     console.log(productImage1)
//     formdata.append("UploadHomeIcon", productImage1);
//     formdata.append("UploadIcon", productImage);



//     console.log("append", formdata);
//     createSpecialityManagement(formdata)
//       .then((res) => {
//         console.log(res);
//         // setmodal_list(!modal_list);
//         setShowForm(false);
//         // setValues(initialState);
//         setCategoryID("");
//         setserialNumber("");
//         setsolarrooftype("");
    
//         // setcapacity("");
//         // setServiceName("");
//         setSpecialityName("");
//         setDetail("");
//         setproductImage("");
//         setproductImage1("");
//         setCheckImagePhoto(false);
//         setCheckImagePhoto1(false);
//         setPhotoAdd("");
//         setPhotoAdd1("");
//         setcode("");
//         setproductName("");
//         setShortDescription("");
//         setlikes([]);
//         setcomments([]);
//         setuserId("");
//         setIsActive(false);
      
//         setProductPDF("");
//         setblogThumnailDesc("");
//         setdescription("");
//         setViews(0);
//         setIsSubmit(false);
     
//         setFormErrors({});
//         fetchCategories();
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//     // }
//   };
  useEffect(() => {
   
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("no errors");
    }
    
  }, [formErrors, isSubmit]);

    const handleDelete = (e) => {
    //   e.preventDefault();
    //   removeSpecialityManagement(remove_id)
    //     .then((res) => {
    //       setmodal_delete(!modal_delete);
    //       fetchCategories();
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    };

    const handleUpdate = (e) => {
      e.preventDefault();
    
      setIsSubmit(true);
      const likesString = JSON.stringify(likes);
      const commentString = JSON.stringify(comments);
    
      const formdata = new FormData();
      console.log("logging ",SpecialityName,Detail,productImage1,productImage)
      formdata.append("SpecialityName", SpecialityName);
      formdata.append("Detail", Detail);
      formdata.append("UploadHomeIcon", productImage1);
      formdata.append("UploadIcon", productImage);
    
    //   updateSpecialityManagement(_id, formdata)
    //     .then((res) => {
    //       setmodal_edit(!modal_edit);
    //       setPhotoAdd("");
    //       setCheckImagePhoto(false);
    //       setCategoryID("");
    //       setserialNumber("");
    //       setcode("");
    //       setproductName("");
    //       setShortDescription("");
    //       setlikes([]);
    //       setcomments([]);
    //       setuserId("");
    //       setIsActive(false);
    //       setblogThumnailDesc("");
    //       setdescription("");
    //       setViews(0);
    //       setproductImage("");
    //       setProductPDF("");
    //       setSpecialityName(""); // Reset SpecialityName after update
    //       fetchCategories();
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    };
    
    

  const [errBT, setErrBT] = useState(false);
  const [errBD, setErrBD] = useState(false);
  const [errBTD, setErrBTD] = useState(false);
  const [errBI, setErrBI] = useState(false);

 

  const validClassBT =
    errBT && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassBD =
    errBD && isSubmit ? "form-control is-invalid" : "form-control";
  const validClassBTD =
    errBTD && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassBI =
    errBI && isSubmit ? "form-control is-invalid" : "form-control";

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

  const fetchCategories = async () => {
    setLoading(true);
    let skip = (pageNo - 1) * perPage;
    if (skip < 0) {
      skip = 0;
    }

    await axios
      .post(
        `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/list-by-params/specialitymanagement`,
        {
          skip: skip,
          per_page: perPage,
          sorton: column,
          sortdir: sortDirection,
          match: query,
        }
      )
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
  const [photoAdd1, setPhotoAdd1] = useState();
  const [checkImagePhoto, setCheckImagePhoto] = useState(false);
  const [checkImagePhoto1, setCheckImagePhoto1] = useState(false);

  const PhotoUpload = (e) => {
    if (e.target.files.length > 0) {
      const image = new Image();

      let imageurl = URL.createObjectURL(e.target.files[0]);
      console.log("img", e.target.files[0]);
console.log(imageurl);
      setPhotoAdd(imageurl);
      // setValues({ ...values, blogImage: e.target.files[0] });
      setproductImage(e.target.files[0]);
      setCheckImagePhoto(true);
    }
  };
  const PhotoUpload1 = (e) => {
    if (e.target.files.length > 0) {
      const image = new Image();

      let imageurl = URL.createObjectURL(e.target.files[0]);
      console.log("img", e.target.files[0]);

      setPhotoAdd1(imageurl);
      // setValues({ ...values, blogImage: e.target.files[0] });
      setproductImage1(e.target.files[0]);
      setCheckImagePhoto1(true);
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
    setblogThumnailDesc("");
    setdescription("");
    setViews(0);
    // setValues(initialState);
    setCategoryID("");
    setserialNumber("");
    setcode("");
    setproductName("");
    setShortDescription("");
    setlikes([]);
    setcomments([]);
    setuserId("");
    setIsActive(false);
    setproductImage("");
    setproductImage1("");
    setProductPDF("");
  };

  const handleUpdateCancel = (e) => {
    e.preventDefault();
    setIsSubmit(false);
    setPhotoAdd("");
    setUpdateForm(false);
    setShowForm(false);
    setblogThumnailDesc("");
    setdescription("");
    setViews(0);
    setCheckImagePhoto(false);
    // setValues(initialState);
    setCategoryID("");
    setserialNumber("");
    setcode("");
    setproductName("");
    setShortDescription("");
    setlikes([]);
    setcomments([]);
    setuserId("");
    setIsActive(false);
    setproductImage("");
    setProductPDF("");
  };
  const renderImage = (uploadimage) => {
    const imageUrl = `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/${uploadimage}`;

    return (
      <img
        src={imageUrl}
        alt="Image"
        style={{ width: "75px", height: "75px", padding: "5px" }}
      />
    );
  };

  const col = [
    {
      name: "Sr No.",
      selector:(row,index)=>index+1,
      
      minWidth: "150px",
    },
    {
      name: "Speciality Name",
      cell: (row) => row.SpecialityName,
      sortable: true,
      sortField: "serialNumber",
      minWidth: "150px",
    },

    {
      name: "Home Icon",
      cell: (row) => renderImage(row.UploadHomeIcon),
      sortable: true,
      sortField: "serialNumber",
      minWidth: "150px",
    },
    {
      name: "Icon",
      cell: (row) => renderImage(row.UploadIcon),
      sortable: true,
      sortField: "serialNumber",
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

  // const handleServiceChange = (selectedOption) => {
  //   console.log("Selected service:", selectedOption.name);
  //   // Do something with the selected service name
  //   setValues({ ...values, ServiceName: selectedOption.name });
  // };
  const [errSP, setErrSP] = useState(false); // Initialize as false instead of a string
  const validClassSP = errSP && isSubmit ? "form-control is-invalid p-0" : "form-control";
  
const handleSubmitCms = async () => {
  const errors = {};
  console.log(speciality.value)
  if (!Detail) {
    console.log("empty");
    toast.error("Please Select CMS from dropdown!");
    // setErrSP(true); // Set to true when there is an error
    // errors.speciality = "Booking Date is required";
  } else {
    setErrSP(false); // Reset to false when there is no error
  }
  setFormErrors(errors);

  try {

    console.log(speciality.value)
    
      // Call editCmsAboutUsContent API
      const response = await editCmsAboutUsContent({
        _id: speciality.value, // Replace with the appropriate ID
        cmsDesc: Detail // Assuming Detail contains the data from CKEditor
      });
      if (response) {
        toast.success('Content content updated successfully!');
      }  
      else{
        toast.error("oops something went wrong");
      }
      console.log('Response:', response);
   
    // else if (speciality.value === 'ContactUs') {
    //   // Call editCmsContactUsDetailContent API
    //   const response = await editCmsContactUsDetailContent({
    //     _id: '65f131a0028849922f0512ab', // Replace with the appropriate ID
    //     ContactUsDetail: Detail // Assuming Detail contains the data from CKEditor
    //   });if (response) {
    //     alert('Contact Us content updated successfully!');
    //   } else {
    //     alert('Failed to update Contact Us content.');
    //   }
    //   console.log('Response:', response);
    //   // Handle success or show a success message
    // }
  } catch (error) {
    console.error('Error:', error);
    // Handle error or show an error message
  } return errors;
};
  const [speciality,setSpeciality]=useState([]);
  const [values,setValues]=useState("")
  const options = [
 
    { value: '663c967330ee58405d1a37a5', label: 'About Us' },
    { value: '663ca6df30ee58405d1a37ab', label: 'Terms and condition' },
    { value: '663c960130ee58405d1a37a0', label: 'Home About Us' },
    
  ];
  const[showButton, SetButton] = useState(true);
  const handleSpecialityChange = (selectedOption) => {
    console.log("Selected speciality:", selectedOption);
    // setSpeciality(speciality);
     setSpeciality(selectedOption); // Update speciality state
     if(selectedOption.value === '')
        {
            setDetail("")
            SetButton(false)
        }
   
      // Fetch About Us data
      getCmsAboutUsById(selectedOption.value).then((res) => {
        console.log("get", res);
        SetButton(true)
        setDetail(res.cmsDesc)
         
        
      })
  
    // else if (selectedOption.value === 'ContactUs') {
    //   // Fetch Contact Us data
    //   getCmsContactUsDetailById("65f131a0028849922f0512ab").then((res) => {
    //     console.log("get", res);
    //     setDetail(res.cmsContactUsDetailContent.ContactUsDetail)
        
        
    //   })
    // }
    // Update values object with new speciality
    setValues({
        ...values,
        speciality: selectedOption.label // Assuming label is the property holding the speciality value
    });
   
}; 
  document.title = "Contact To Owner| CMS";

  return (
    <React.Fragment>
               <ToastContainer />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb maintitle="CMS" title="CMS" pageTitle="CMS" />

          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <Row className="g-4 mb-1">
                    <Col className="col-sm" lg={4} md={6} sm={6}>
                      <h2 className="card-title mb-0 fs-4 mt-2">CMS</h2>
                    </Col>
                    
                    <Row>
                      <Col lg={12}>
                      <label>
                                      CMS{" "}
                                      <span class="text-danger">*</span>
                              
                                    </label>
                                    <div className="form-floating mb-3">
                                    <Select
                placeholder="-Select-"
                name="speciality"
                id="Speciality"
                value={speciality}
                // className={validClassSP}
                options={options}
                onChange={handleSpecialityChange}
              /> 

               {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.speciality}
                                        </p>
                                      )}
                                    </div>
                      </Col>
                    </Row>
                   <Row>
                   <Col lg={12}>
                                   
                                      <Label>
                                        Detail
                                        <span className="text-danger">*</span>
                                      </Label>
                                      <CardBody   className="zIndex">
                                        {/* <Form method="post"> */}
                                        <CKEditor
                                       
                                          key={"description_" + _id} // Ensures the component reinitializes with new data when _id changes
                                          editor={ClassicEditor} // Specifies the editor build to use
                                          data={Detail} // Loads the initial content into the editor from the description state
                                          config={{
                                            extraPlugins: [uploadPlugin], // Integrates the custom uploadPlugin for handling image uploads
                                          }}
                                          onChange={(event, editor) => {
                                            const data = editor.getData(); // Retrieves the current content from the editor
                                            setDetail(data); // Updates the description state with the new content
                                            console.log(
                                              "jvjfvjjv",
                                              Detail
                                            ); // Logs the current state (might log the previous state due to setState's asynchronous nature)
                                          }}
                                        />

                                        {/* {isSubmit && (
                                          <p className="text-danger">
                                            {formErrors.description}
                                          </p>
                                        )} */}
                                      </CardBody>
                                    
                                  </Col>
                                  {
                                    showButton?( <Col lg={12}>
                                    <div className="hstack gap-2 justify-content-end">
                                      <button
                                        type="submit"
                                        className="btn btn-success  m-1"
                                        id="add-btn"
                                        onClick={handleSubmitCms}
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
                                  </Col>):null
                                  }
                     
                   </Row>
                 
                    
                  </Row>
                </CardHeader>

                {/* ADD FORM  */}
              

                {/* UPDATE FORM  */}

                {/* list */}
               
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      
  {/*Edit Modal*/}
  <Modal
        isOpen={modal_edit}
        toggle={() => {
          handleTog_edit();
        }}
        centered
      >
        <ModalHeader
          className="bg-light p-3"
          toggle={() => {
            setmodal_edit(false);
          }}
        >
          Edit Services
        </ModalHeader>
        <form>
        <ModalBody>
          
        <div className="mb-3 form-floating ">
              <input
                type="text"
                // className={validClassEditServiceName}
                placeholder="Enter Billing Service"
                required
                name="SpecialityName"
                value={SpecialityName}
                onChange={handleChangeSpecilityName}
              />
              {isSubmit && <p className="text-danger">{formErrors.ServiceName}</p>}
              <label htmlFor="role-field" className="form-label">
              Process Name
                <span className="text-danger">*</span>
              </label>
            </div>
            <div className="mb-3 form-floating">
    <textarea
      // className={validClassEditServiceDescription}
      placeholder="Enter Description"
      required
      name="Detail"
      value={Detail}
      onChange={handleChangeDetail}
    />
    {/* {isSubmit && <p className="text-danger">{formErrors.Desc}</p>} */}
    <label htmlFor="desc-field" className="form-label">
    Detail
      <span className="text-danger">*</span>
    </label>
  </div>


  <div className="mb-3 form-floating">
    <input
    type="file"
      // className={validClassEditImage}
      // placeholder="Enter Image URL"
      // className="form-control"
      
      name="productImage"
      id="productImage"
      // value={Image}
      onChange={handleImageChangeproductImage}
      
    />{productImage && (
      <img src={productImage} alt="Uploaded" style={{ maxWidth: "100px" }} />
    )}
    
  </div>
  <div className="mb-3 form-floating">
    <input
    type="file"
      // className={validClassEditImage}
      // placeholder="Enter Image URL"
      // className="form-control"
      
      name="productImage1"
      id="productImage1"
      // value={Image}
      onChange={handleImageChangeproductImage1}
      
    />{productImage1 && (
      <img src={productImage1} alt="Uploaded" style={{ maxWidth: "100px" }} />
    )}
    
  </div>
</ModalBody>

          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
              <button
                type="submit"
                className="btn btn-success m-1"
                id="add-btn"
                onClick={handleUpdate}
              >
                Update
              </button>
              <button
                type="button"
                className="btn btn-outline-danger m-1"
                onClick={() => setmodal_edit(false)}
              >
                Cancel
              </button>
            </div>
          </ModalFooter>
        </form>
      </Modal>

      {/* {/Remove Modal/} */}
     <Modal
        isOpen={modal_delete}
        toggle={() => {
          tog_delete();
          // setValues([]);
          setCategoryID("");
          setserialNumber("");
          setcode("");
          setproductName("");
          setlikes([]);
          setcomments([]);
          setuserId("");
          setIsActive(false);
          setproductImage("");
        }}
        centered
      >
        <ModalHeader
          className="bg-light p-3"
          toggle={() => {
            setmodal_delete(!modal_delete);
          }}
        >
          <span style={{ marginRight: "210px" }}>Remove CMS</span>
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

export default Cms;
