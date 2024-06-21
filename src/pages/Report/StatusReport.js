
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
const StatusReport = () => {
    const selectOptions = [
        { value: "Product", label: "Product" },
        { value: "Customer", label: "Customer" }
      ];
    const [startDate, setStartDate] = useState(null); // State variable for start date
    const [endDate, setEndDate] = useState(null);
  const [productName, setproductName] = useState("");
  const [changedid,setchangedid]=useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [SpecialityName, setSpecialityName] = useState("");
  const [SpecialityValue, setSpecialityValue] = useState("");
  const [Detail, setDetail] = useState("");
  const [IsActive, setIsActive] = useState(false);

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [filter, setFilter] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);

  const [query, setQuery] = useState("");
  const [query1, setQuery1] = useState("");

  const [_id, set_Id] = useState("");
  const [remove_id, setRemove_id] = useState("");
  const [booking_id, setBooking_id] = useState("");

  const [blogs, setBlogs] = useState([]);
  const [blogs1, setBlogs1] = useState([]);
  const [Name,setName] =useState("");
  const [Phone, setphone] =useState("");
  const [Email,setEmail] =useState("");
  const [BookingDate,setDate] =useState("")
  const [Alloted,setAlloted] =useState(false);
  useEffect(() => {
   
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("no errors");
    }
    
  }, [formErrors, isSubmit]);
  useEffect(() => {
    
      if(SpecialityName==="Product"){
        fetchCategories(startDate,endDate);
      }
      else if(SpecialityName==="Customer"){
        fetchCategories1(startDate,endDate);
      }
      

  
  }, [startDate,endDate]);

  const handleSpecialityChange = (selectedOption) => {
    // Check if the selected option exists in selectOptions
    const isValidOption = selectOptions.some(option => option.value === selectedOption.value);
  
    if (isValidOption) {
        if(selectedOption.value==="Product"){
            console.log("Selected speciality:", selectedOption);
            // Update speciality state with the selected option's value
            setSpecialityName(selectedOption.value);
            setSpecialityValue(selectedOption.label);
          //   console.log(typeof selectedOption.id);
          //   setchangedid(selectedOption.id);
          //   console.log(selectedOption.id);
          fetchCategories(startDate, endDate);
        }
        else{
            console.log("Selected speciality:", selectedOption);
      // Update speciality state with the selected option's value
      setSpecialityName(selectedOption.value);
      setSpecialityValue(selectedOption.label);
    //   console.log(typeof selectedOption.id);
    //   setchangedid(selectedOption.id);
    //   console.log(selectedOption.id);
      fetchCategories1(startDate, endDate);
        }
      
    } else {
      console.error("Selected option is not valid");
      // Handle the case when the selected option is not valid
    }
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
  const [loading1, setLoading1] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [totalRows1, setTotalRows1] = useState(0);
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
  }; const handleSort1 = (column1, sortDirection1) => {
    setcolumn1(column1.sortField);
    setsortDirection1(sortDirection1);
  };

  useEffect(() => {
    
  }, []);
 
  useEffect(() => {
    if(SpecialityName==="Product"){
    fetchCategories(startDate, endDate);
    }

  }, [pageNo, perPage, column, sortDirection, query, filter,startDate,endDate]);
  useEffect(() => {
    if(SpecialityName==="Customer"){
    fetchCategories1(startDate, endDate);
    }

  }, [pageNo1, perPage1, column1, sortDirection1, query1, filter,startDate,endDate]);
  console.log(startDate);

   
  const fetchCategories = async (startDate, endDate) => {
    console.log("inside fetch cat");
    setLoading(true);
    let skip = (pageNo - 1) * perPage;
    if (skip < 0) {
      skip = 0;
    }

     // Convert start date to ISO string


    console.log("date", startDate);
    
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/list-by-params-date/inquiry`,
            {
                
                skip: skip,
                per_page: perPage,
                sorton: column,
                sortdir: sortDirection,
                match: query,
                IsActive: filter,
                createdAt: { $gte: startDate, $lte: endDate }, // Include createdAt filter
            }
        );

        console.log("res:", response);
        if (response.length > 0) {
            console.log("New Response:", response);
            let res = response[0];
            console.log(res);
            setLoading(false);
            setBlogs(res.data);
            console.log("count is",res.count);
            setTotalRows(res.count);
        } else {
            console.log("Hii");
            setBlogs([]);
        }
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
    setLoading(false);
};


const fetchCategories1 = async (startDate, endDate) => {
    console.log("inside fetch cat");
    setLoading1(true);
    let skip = (pageNo1 - 1) * perPage1;
    if (skip < 0) {
      skip = 0;
    }



    console.log(changedid);
    
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/list-by-params-date/contactinquiry`,
            {
              skip: skip,
              per_page: perPage1,
              sorton: column1,
              sortdir: sortDirection1,
              match: query1,
        IsActive: filter,
        createdAt: { $gte: startDate, $lte: endDate },
              
            }
    
            
        )

       .then((response) => {
        console.log("res:", response)
        if (response.length>0) {
          console.log("New Response:",response)
          let res = response[0];
          // console.log(typeof res)
          console.log(res)
          setLoading1(false);
          setBlogs1(res.data);
          console.log(res.count)
          setTotalRows1(res.count);
        } else {
          console.log("Hii")
          setBlogs1([]);
        }
        // console.log(res);
      });
      setLoading1(false);

 
};


  const handlePageChange = (page) => {
    setPageNo(page);
  }; const handlePageChange1 = (page1) => {
    setPageNo1(page1);
  };

  const [photoAdd, setPhotoAdd] = useState();
  const [photoAdd1, setPhotoAdd1] = useState();
  const [checkImagePhoto, setCheckImagePhoto] = useState(false);
  const [checkImagePhoto1, setCheckImagePhoto1] = useState(false);


  const handlePerRowsChange = async (newPerPage, page) => {
    // setPageNo(page);
    setPerPage(newPerPage);
  };  const handlePerRowsChange1 = async (newPerPage1, page1) => {
    // setPageNo(page);
    setPerPage1(newPerPage1);
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
   
  };
  

  const col = [
    {
      name: "Sr No.",
      selector:(row,index)=>index+1,
      
      minWidth: "50px",
    },

    {
      name: "ContactPerson",
      cell: (row) => row.ContactPerson,
      sortable: true,
      sortField: "serialNumber",
      minWidth: "150px",
    },
    
    {
       
      cell: (row) =>row.Country,
      name:"Country",
      
      sortable: true,
      sortField: "serialNumber",
      minWidth: "150px",
    },{
      name: "Mobile",
      cell: (row) => row.Mobile,
      sortable: true,
      sortField: "serialNumber",
      minWidth: "150px",
    },{
      name: "Email",
      cell: (row) => row.Email,
      sortable: true,
      sortField: "serialNumber",
      minWidth: "150px",
    },
  
   
  ];
  const [Selectoptions,setOptions] = useState("")

//  const  selectDropdown  = async () =>{
//     try {
//       // const response = await listSpecialityManagement()
//       const response = await axios.get(`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/list/supplier`);
//       console.log(response)
//       const names = response.map((item)=>({
//         value:item._id , label :item.SupplierName,id:item._id
        
//       }
//      ));
//      setOptions(names)
//       console.log('Response:', response);
     
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   }
  const [speciality,setSpeciality]=useState([]);
  const [values,setValues]=useState("");

document.title = "Status Report |  Shreeji Pharma";

const handleStartDateChange = (date) => {
    setStartDate(date);
    console.log(date)
  };

  // Handler function for selecting end date
  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  console.log("THe blogs are:",blogs)
  const downloadExcel = async (startDate, endDate) => {
    try {
      let skip = (pageNo - 1) * perPage;
      if (skip < 0) {
        skip = 0;
      }
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/list/downloadexcelstatusreport`,
        {
          skip: skip,
          per_page: perPage,
          sorton: column,
          sortdir: sortDirection,
          match: query,
          IsActive: filter,
          createdAt: { $gte: startDate, $lte: endDate },
        },
        { responseType: "blob" }
      );

      console.log("response", response);

      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "productinquiry.xlsx"); // or any other extension you want
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  }; 
  const downloadExcel1 = async (startDate, endDate) => {
    try {
      let skip = (pageNo1 - 1) * perPage1;
      if (skip < 0) {
        skip = 0;
      }
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/list/downloadexcelstatusreportforcontact`,
        {
          skip: skip,
          per_page: perPage1,
          sorton: column1,
          sortdir: sortDirection1,
          match: query1,
          IsActive: filter,
          createdAt: { $gte: startDate, $lte: endDate },
        },
        { responseType: "blob" }
      );

      console.log("response", response);

      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "contactinquiry.xlsx"); // or any other extension you want
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb maintitle="Status Report " title="Status Report " pageTitle="Report" />

          <Row>
            <Col lg={12}>
              <Card>
              <CardHeader>
                  <Row className="g-4 mb-1">
                    <Col className="col-sm" lg={4} md={6} sm={6}>
                      <h2 className="card-title mb-0 fs-4 mt-2">
Status Report
                      </h2>
                    </Col>
                    <Col className="text-end">
                    
                    {SpecialityValue === 'Product' ? (
    <Button color="primary" className="btn-rounded waves-effect waves-light" onClick={() => downloadExcel(startDate, endDate)}>
        Generate Product Inquiry Sheet
    </Button>
) : SpecialityValue === 'Customer' ? (
    <Button color="primary" className="btn-rounded waves-effect waves-light" onClick={() => downloadExcel1(startDate, endDate)}>
        Generate Contact Inquiry Sheet
    </Button>
) : null}

                    </Col>
                  </Row>
                </CardHeader>
                
                <div>
                  <Row>
                    <Col lg={4} className="px-4 mt-4">
                      <Label for="startDate">Start Date:</Label>
                      <Flatpickr
                        id="startDate"
                        className="form-control"
                        value={startDate}
                        onChange={handleStartDateChange}
                        options={{
                          dateFormat: "d-m-Y", // Change date format if needed
                        }}
                      />
                    </Col>
                    <Col lg={4} className="px-4  mt-4">
                      <Label for="endDate">End Date:</Label>
                      <Flatpickr
                        id="endDate"
                        className="form-control"
                        value={endDate}
                        onChange={handleEndDateChange}
                        options={{
                          dateFormat: "d-m-Y", // Change date format if needed
                        }}
                      />
                    </Col>
                  </Row>
                </div>

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
                                Select Inquiry{" "}
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

                        
                                      {/* {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.errspeciality}
                                        </p>
                                      )} */}
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
                                Select Type:{" "}
                                      <span class="text-danger">*</span>
                              
                                    </label>
                                    <div className="form-floating mb-3">
                                    <Select
                        id="specialityDropdown"
                        placeholder={SpecialityValue}
                        value={SpecialityName}
                        options={selectOptions}
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
                    {SpecialityName === "Product" ? (
  <div className="table-responsive table-card mt-1 mb-1 text-right">
    <DataTable
      columns={col}
      progressPending={loading}
      data={blogs}
      sortServer
      onSort={(column, sortDirection, sortedRows) => {
        handleSort(column, sortDirection);
      }}
      paginationTotalRows={totalRows}
      paginationRowsPerPageOptions={[
        10,
        50,
        100,
        totalRows,
      ]}
      onChangeRowsPerPage={handlePerRowsChange}
      onChangePage={handlePageChange}
      pagination
      paginationServer
    />
  </div>
) : SpecialityName === "Customer" ? (
  <div className="table-responsive table-card mt-1 mb-1 text-right">
    <DataTable
      columns={col}
      progressPending={loading1}
      data={blogs1}
      sortServer1
      onSort={(column1, sortDirection1, sortedRows1) => {
        handleSort1(column1, sortDirection1);
      }}
      paginationTotalRows={totalRows1}
      paginationRowsPerPageOptions={[
        10,
        50,
        100,
        totalRows1,
      ]}
      onChangeRowsPerPage={handlePerRowsChange1}
      onChangePage={handlePageChange1}
      pagination
      paginationServer
    />
  </div>
) : (
  <div>
  </div>
)}

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

export default StatusReport;
