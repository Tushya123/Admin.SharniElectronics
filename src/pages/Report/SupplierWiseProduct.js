
import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import { Link } from "react-router-dom";
import { saveAs } from "file-saver";
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
import Select from 'react-select';
import Flatpickr from "react-flatpickr";
import {getProductDetails,listProductDetails} from "../../functions/SupplierSetup/SupplierSetup"
import { closingDeals } from "../../common/data";
const SupplierWiseProductReport = () => {
  const [productName, setproductName] = useState("");
  const [changedid,setchangedid]=useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [SpecialityName, setSpecialityName] = useState("");
  const [SpecialityValue, setSpecialityValue] = useState("");
  const [Detail, setDetail] = useState("");
  const [isActive, setisActive] = useState(false);

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [filter, setFilter] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);

  const [query, setQuery] = useState("");

  const [_id, set_Id] = useState("");
  const [remove_id, setRemove_id] = useState("");
  const [booking_id, setBooking_id] = useState("");

  const [blogs, setBlogs] = useState([]);
  const [Name,setName] =useState("");
  const [Phone, setphone] =useState("");
  const [Email,setEmail] =useState("");
  const [BookingDate,setDate] =useState("")
  const [Alloted,setAlloted] =useState(false)

  useEffect(() => {
   
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("no errors");
    }
    
  }, [formErrors, isSubmit]);


  const handleSpecialityChange = (selectedOption) => {
    console.log("Selected speciality:", selectedOption);
    // Update speciality state with the selected option's value
    setSpecialityName(selectedOption.value);
    setSpecialityValue(selectedOption.label);
    console.log(typeof selectedOption.id);
    setchangedid(selectedOption.id);
    console.log(selectedOption.id);
    fetchCategories(selectedOption.id);

};
useEffect(() => {
  // You can access setchangedid here if you need to perform any side effects
  console.log("changedid outside handleSpecialityChange:", changedid);
}, [changedid]);

  const [categories, setCategories] = useState([]);
  const [modal_delete, setmodal_delete] = useState(false);
  const tog_delete = (_id) => {
    setmodal_delete(!modal_delete);
    setRemove_id(_id);
  };
  const [modal_Booking, setmodal_Booking] = useState(false);
  const [modal_edit, setmodal_edit] = useState(false);
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
    
  }, []);

  useEffect(() => {
    fetchCategories(changedid);
    selectDropdown();
  }, [pageNo, perPage, column, sortDirection, query, filter]);
  console.log();

   
  const fetchCategories = async (changedid) => {
    console.log("inside fetch cat");
    setLoading(true);
    let skip = (pageNo - 1) * perPage;
    if (skip < 0) {
      skip = 0;
    }



    // if (!changedid) {
    //     setLoading(false); // Exit early if changedid is not defined
    //     return;
    // }
    // console.log(changedid);
    
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/listAssignProductbyparam`,
            {
              skip: skip,
          per_page: perPage,
         
          match: query,
          isActive: filter,
              
            }
    
            
        )
      

       .then((response) => {
        console.log("this is",response)
        if (response) {
          console.log("New Response:",response)
          let res = response[0];
          // console.log(typeof res)
          console.log(res)
          setLoading(false);
          setBlogs(res.data);
          console.log(res)
          setTotalRows(res.count);
        } else {
          console.log("Hii")
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
    setCheckImagePhoto1(false);
    setShowForm(false);
    setUpdateForm(false);
    setName("");
    setEmail("");
    setphone("");
    setDate("");  
    setAlloted(false)
    setSpecialityName("");
  };

  const handleUpdateCancel = (e) => {
    e.preventDefault();
    setIsSubmit(false);
    
    setUpdateForm(false);
    setShowForm(false);
    setName("");
    setEmail("");
    setphone("");
    setDate("");  
    setAlloted(false)
    setSpecialityName("");
    
    // setUploadHomeIcon("");
    // setUploadIcon("");
  };

  const col = [
    {
      name: "Sr No.",
      selector:(row,index)=>index+1,
      
      minWidth: "50px",
    },

    {
      name: "Product Name",
      cell: (row) => row.ProductDetailTypes[0].Description,
      sortable: true,
      sortField: "serialNumber",
      minWidth: "150px",
    },
    
    {
      name: "Product Group",
      cell: (row) => row.ProductGroupTypes[0].ProductGroup,
      sortable: true,
      sortField: "serialNumber",
      minWidth: "150px",
    },
    // {
    //   name: "Allotment Details",
    //   cell: (row) => (
    //     <div>
    //       <div>DocName: <b>{row.DoctorName || "-"}</b></div>
    //       <div>Date: <b>{row.AllotmentDate?row.AllotmentDate.split('T')[0]: "-"}</b></div>
    //       <div>Time: <b>{row.AllotmentTime || "-"}</b></div> {/* Display dash if AllotmentTime is falsy */}
    //     </div>
    //   ),
    //   sortable: false,
    //   minWidth: "150px",
    // },
    // {
    //   name: "Patient Details",
    //   cell: (row) => (
    //     <div>
    //     <div>Name: <b>{row.Name}</b></div>
    //     <div>Email: <b>{row.Email}</b> </div>
    //     <div>Phone: <b>{row.Phone}</b> </div>
    //   </div>
    //   ),
    //   sortable: false, // Assuming you don't want to sort by this column
    //   minWidth: "300px", // Adjust width as needed
    // },
   
  ];
  const [Selectoptions,setOptions] = useState("")

 const  selectDropdown  = async () =>{
    try {
      // const response = await listSpecialityManagement()
      const response = await axios.get(`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/list/supplier`);
      console.log(response)
      const names = response.map((item)=>({
        value:item._id , label :item.SupplierName,id:item._id
        
      }
     ));
     setOptions(names)
      console.log('Response:', response);
     
    } catch (error) {
      console.error('Error:', error);
    }
  }

  
  const [speciality,setSpeciality]=useState([]);
  const [values,setValues]=useState("");

document.title = "Supplier Wise Product |  Shreeji Pharma";
console.log("changedid",changedid);

const filteredTypes = blogs.filter(type => type.SupplierName === changedid);
// setTotalRows(filteredTypes.length)

// console.log("bbblogs",filteredTypes)
// for(let i=0;i<filteredTypes.ProductDetailTypes.length;i++){
  
// }


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb maintitle="Supplier Wise Product " title="Supplier Wise Product " pageTitle="Supplier Wise Product " />

          <Row>
            <Col lg={12}>
              <Card>
              <CardHeader>
  <Row className="g-4 mb-1">
    <Col className="col-sm" lg={4} md={6} sm={6}>
      <h2 className="card-title mb-0 fs-4 mt-2">Supplier Wise Product </h2>
    </Col>
    <Col lg={4} md={6} sm={6}></Col>
    <Col className="text-end">
    {blogs ? (
      <Button
  color="primary"
  className="btn-rounded waves-effect waves-light"
  onClick={() => {
    const endpoint = `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/get/generateSupplierWiseProductReportExcel/${changedid}`;
    axios
      .get(endpoint, { responseType: "blob" })
      .then((response) => {
        const blob = new Blob([response]);
        saveAs(blob, "SupplierWiseProductReport.xlsx");
        console.log("Excel sheet generated successfully");
      })
      .catch((error) => {
        console.error("Error generating Excel sheet", error);
      });
  }}
>
  Generate Excel Sheet
</Button>
) : null}
    

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
                              
                              <Row>
                              <Col lg={5}>
                                <label>
                                SpecialityName{" "}
                                      <span class="text-danger">*</span>
                              
                                    </label>
                                    <div className="form-floating mb-3">
                                    <Select
                                          placeholder={SpecialityValue}
                                          name="SpecialityName"
                                          id="SpecialityName"
                                          value={SpecialityName}
                                          options={Selectoptions}
                                          onChange={handleSpecialityChange}
                                        />

                        
                                      {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.errspeciality}
                                        </p>
                                      )}
                                    </div>
                                  </Col>
                              </Row>   
                            </div>
                          </CardBody> 
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
                                <Col lg={4}>
                                <label>
                                SpecialityName{" "}
                                      <span class="text-danger">*</span>
                              
                                    </label>
                                    <div className="form-floating mb-3">
                                    <Select
                                          placeholder={SpecialityValue}
                                          name="SpecialityName"
                                          id="SpecialityName"
                                          value={SpecialityName}
                                          options={Selectoptions}
                                          onChange={handleSpecialityChange}
                                        />

                        
                                      {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.errspeciality}
                                        </p>
                                      )}
                                    </div>
                                  </Col>
                                  <Col lg={4}>
                                    
                                    <Label>
                                        Phone
                                        <span className="text-danger">*</span>
                                      </Label>
                                      <Input
                                        type="number"
                                        className={validClassBT}
                                        placeholder="Enter Phone"
                                        required
                                        name="Phone"
                                        value={Phone}
                                        onChange={(e) => {
                                          setphone(e.target.value);
                                        }}
                                      />
                                      
                                      {/* {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.serialNumber}
                                        </p>
                                      )} */} 
                                  </Col>
                                  
                                  <Col lg={4}>
                                    
                                    <Label>
                                        Name 
                                        <span className="text-danger">*</span>
                                      </Label>
                                      <Input
                                        type="text"
                                        className={validClassBT}
                                        placeholder="Enter  Name"
                                        required
                                        name="Name"
                                        value={Name}
                                        onChange={(e) => {
                                          setName(e.target.value);
                                        }}
                                      />
                                      
                                      {/* {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.serialNumber}
                                        </p>
                                      )} */} 
                                  </Col>
                                  <Col lg={4}>
                                    
                                    <Label>
                                        Email 
                                        <span className="text-danger">*</span>
                                      </Label>
                                      <Input
                                        type="email"
                                        className={validClassBT}
                                        placeholder="Enter Email"
                                        required
                                        name="Email"
                                        value={Email}
                                        onChange={(e) => {
                                          setEmail(e.target.value);
                                        }}
                                      />
                                      
                                      {/* {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.serialNumber}
                                        </p>
                                      )} */} 
                                  </Col>
                                  <Col lg={4}>
                      
                          <Label > Date</Label>
                          <Flatpickr 
    // placeholder="Select Date" // Remove placeholder
    value={BookingDate} // Use value prop to display selected date
    className="form-control"
    options={{
        altInput: true,
        altFormat: "F j, Y",
        dateFormat: "Y-m-d",
    }}
    onChange={(selectedDates) => {
        setDate(selectedDates[0]); // Assuming you want to set a single date
    }}
/>

                        
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
                  <Row>
                              <Col lg={5}>
                                <label>
                                Select Supplier:{" "}
                                      <span class="text-danger">*</span>
                              
                                    </label>
                                    <div className="form-floating mb-3">
                                    <Select
                                          placeholder={SpecialityValue}
                                          name="SpecialityName"
                                          id="SpecialityName"
                                          value={SpecialityName}
                                          options={Selectoptions}
                                          onChange={handleSpecialityChange}
                                        />

                        
                                      {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.errspeciality}
                                        </p>
                                      )}
                                    </div>
                                  </Col>
                              </Row>   
                              
                    <div>
                  
                    {console.log("Blogs:",blogs)}
                    {console.log("Col:",col)}
                      <div className="table-responsive table-card mt-1 mb-1 text-right">
                        <DataTable
                          columns={col}
                          
                          data={filteredTypes}
                          paginationTotalRows={totalRows}
                          paginationRowsPerPageOptions={[
                            10,
                            50,
                            100,
                            totalRows,
                          ]}
                          progressPending={loading}
                          sortServer
                          onSort={(column, sortDirection, sortedRows) => {
                            handleSort(column, sortDirection);
                          }}
                          pagination
                          paginationServer
                        //   paginationTotalRows={totalRows}
                        //   paginationRowsPerPageOptions={[
                        //     10,
                        //     50,
                        //     100,
                        //     totalRows,
                        //   ]}
                        //   onChangeRowsPerPage={handlePerRowsChange}
                        //   onChangePage={handlePageChange}
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
      

     
    </React.Fragment>
  );
};

export default SupplierWiseProductReport;
