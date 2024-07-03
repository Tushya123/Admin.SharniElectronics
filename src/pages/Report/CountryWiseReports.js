import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import { Link } from "react-router-dom";
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
import Flatpickr from "react-flatpickr";
import {
  getProductDetails,
  listProductDetails,
} from "../../functions/SupplierSetup/SupplierSetup";
import { closingDeals } from "../../common/data";
const CountryWiseReport = () => {
  const countriesArray = [
    { label: "DZ", value: "ALGERIA" },
    { label: "AR", value: "ARGENTINA" },
    { label: "AU", value: "AUSTRALIA" },
    { label: "BD", value: "BANGLADESH" },
    { label: "BE", value: "BELGIUM" },
    { label: "BR", value: "BRAZIL" },
    { label: "CA", value: "CANADA" },
    { label: "CN", value: "CHINA" },
    { label: "EG", value: "EGYPT" },
    { label: "FR", value: "FRANCE" },
    { label: "DE", value: "GERMANY" },
    { label: "IN", value: "INDIA" },
    { label: "IL", value: "ISRAEL" },
    { label: "IT", value: "ITALY" },
    { label: "JP", value: "JAPAN" },
    { label: "MY", value: "MALAYSIA" },
    { label: "MX", value: "MEXICO" },
    ,
    { label: "NP", value: "NEPAL" },
    { label: "NL", value: "NETHERLANDS" },
    { label: "NZ", value: "NEW ZEALAND" },
    { label: "PH", value: "PHILIPPINES" },
    { label: "PT", value: "PORTUGAL" },
    { label: "QA", value: "QATAR" },
    { label: "ZA", value: "SOUTH AFRICA" },
    { label: "ES", value: "SPAIN" },
    { label: "SE", value: "SWEDEN" },
    { label: "CH", value: "SWITZERLAND" },
    { label: "TR", value: "TURKEY" },
    { label: "UA", value: "UKRAINE" },
    { label: "AE", value: "UNITED ARAB EMIRATES" },
    { label: "GB", value: "UNITED KINGDOM" },
    { label: "US", value: "UNITED STATES" },
  ];

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
  const [Name, setName] = useState("");
  const [Phone, setphone] = useState("");
  const [Email, setEmail] = useState("");
  const [BookingDate, setDate] = useState("");
  const [Alloted, setAlloted] = useState(false);

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("no errors");
    }
  }, [formErrors, isSubmit]);

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

  useEffect(() => {}, []);

  useEffect(() => {
    selectDropdown();
  }, [pageNo, perPage, column, sortDirection, query, filter]);
  console.log();

  const [selectedCountry, setSelectedCountry] = useState(null);

  const fetchCategories = async () => {
    console.log("inside fetch cat");
    setLoading(true);
    let skip = (pageNo - 1) * perPage;
    if (skip < 0) {
      skip = 0;
    }

    await axios
      .post(
        `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/list/Countryinquiry/${selectedCountry}`, // use selectedCountry here
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
        console.log("hiiiiii", response);
        if (response.length > 0) {
          let res = response[0];
          setLoading(false);
          setCategories(res.data);
          setTotalRows(res.count);
        } else if (response.length === 0) {
          setCategories([]);
        }
      });
    setLoading(false);
  };

  const downloadExcel = async () => {
    try {
      let skip = (pageNo - 1) * perPage;
      if (skip < 0) {
        skip = 0;
      }
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/list/downloadexcel/${selectedCountry}`,
        {
          skip: skip,
          per_page: perPage,
          sorton: column,
          sortdir: sortDirection,
          match: query,
          IsActive: filter,
        },
        { responseType: "blob" }
      );

      console.log("response", response);

      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "report.xlsx"); // or any other extension you want
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };

  useEffect(() => {
    if (selectedCountry) {
      console.log("selected", selectedCountry);
      fetchCategories();
    }
  }, [selectedCountry]);

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
    setAlloted(false);
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
    setAlloted(false);

    // setUploadHomeIcon("");
    // setUploadIcon("");
  };

  const col = [
    {
      name: "Sr No.",
      selector: (row, index) => index + 1,

      minWidth: "50px",
    },

    {
      name: "Conatct Name",
      cell: (row) => row.ContactPerson,
      sortable: true,
      sortField: "serialNumber",
      minWidth: "150px",
    },

    {
      name: "Conatct Email",
      cell: (row) => row.Email,
      sortable: true,
      sortField: "serialNumber",
      minWidth: "150px",
    },

    {
      name: "Contact Mobile",
      cell: (row) => row.Mobile,
      sortable: true,
      sortField: "serialNumber",
      minWidth: "150px",
    },
  ];
  const [Selectoptions, setOptions] = useState("");

  const selectDropdown = async () => {
    try {
      // const response = await listSpecialityManagement()
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/list/supplier`
      );
      console.log(response);
      const names = response.map((item) => ({
        value: item._id,
        label: item.SupplierName,
        id: item._id,
      }));
      setOptions(names);
      console.log("Response:", response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [speciality, setSpeciality] = useState([]);
  const [values, setValues] = useState("");

  document.title = "Customer List Country Wise | Shreeji Pharma";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            maintitle="Customer List Country Wise"
            title="Customer List Country Wise"
            pageTitle="Reports "
          />

          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <Row className="g-4 mb-1">
                    <Col className="col-sm" lg={4} md={6} sm={6}>
                      <h2 className="card-title mb-0 fs-4 mt-2">
                        Customer List Country Wise
                      </h2>
                    </Col>
                    <Col className="text-end">
                      <Button
                        color="primary"
                        className="btn-rounded waves-effect waves-light"
                        onClick={downloadExcel}
                      >
                        Generate Excel Sheet
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>

                <Row>
                  <Col lg={6}>
                    <div style={{ padding: "10px 0 0 10px" }}>
                      <label>
                        Select Customer Country{" "}
                        <span class="text-danger">*</span>
                      </label>
                      <Select
                        options={countriesArray.map((country, index) => ({
                          value: country.label, // use country.label as value
                          label: country.value, // use country.value as label
                        }))}
                        onChange={(selectedOption) => {
                          console.log(selectedOption);
                          setSelectedCountry(selectedOption.label); // update selectedCountry
                        }}
                      />
                    </div>
                  </Col>
                </Row>

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
                                <Col lg={6}>
                                  <Select
                                    options={countriesArray}
                                    onChange={(selectedOption) => {
                                      console.log(selectedOption);
                                      // You can add your logic here to handle the selected country
                                    }}
                                  />
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
                                  <Col lg={6}>
                                    <Select
                                      options={countriesArray}
                                      onChange={(selectedOption) => {
                                        console.log(selectedOption);
                                        // You can add your logic here to handle the selected country
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
                    <Row></Row>

                    <div>
                      {console.log("Blogs:", blogs)}
                      {console.log("Col:", col)}
                      <div className="table-responsive table-card mt-1 mb-1 text-right">
                        <DataTable
                          columns={col}
                          data={categories}
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
    </React.Fragment>
  );
};

export default CountryWiseReport;
