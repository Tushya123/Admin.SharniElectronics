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
    { label: "AX", value: "ALAND ISLANDS" },
    { label: "AL", value: "ALBANIA" },
    { label: "DZ", value: "ALGERIA" },
    { label: "AS", value: "AMERICAN SAMOA" },
    { label: "AD", value: "ANDORRA" },
    { label: "AI", value: "ANGUILLA" },
    { label: "AQ", value: "ANTARCTICA" },
    { label: "AG", value: "ANTIGUA AND BARBUDA" },
    { label: "AR", value: "ARGENTINA" },
    { label: "AM", value: "ARMENIA" },
    { label: "AW", value: "ARUBA" },
    { label: "AU", value: "AUSTRALIA" },
    { label: "AT", value: "AUSTRIA" },
    { label: "AZ", value: "AZERBAIJAN" },
    { label: "BS", value: "BAHAMAS" },
    { label: "BH", value: "BAHRAIN" },
    { label: "BD", value: "BANGLADESH" },
    { label: "BB", value: "BARBADOS" },
    { label: "BE", value: "BELGIUM" },
    { label: "BZ", value: "BELIZE" },
    { label: "BJ", value: "BENIN" },
    { label: "BM", value: "BERMUDA" },
    { label: "BT", value: "BHUTAN" },
    { label: "BA", value: "BOSNIA-HERZEGOVINA" },
    { label: "BW", value: "BOTSWANA" },
    { label: "BV", value: "BOUVET ISLAND" },
    { label: "BR", value: "BRAZIL" },
    { label: "BN", value: "BRUNEI DARUSSALAM" },
    { label: "BG", value: "BULGARIA" },
    { label: "BF", value: "BURKINA FASO" },
    { label: "CA", value: "CANADA" },
    { label: "CV", value: "CAPE VERDE" },
    { label: "KY", value: "CAYMAN ISLANDS" },
    { label: "CF", value: "CENTRAL AFRICAN REPUBLIC" },
    { label: "CL", value: "CHILE" },
    { label: "CN", value: "CHINA" },
    { label: "CX", value: "CHRISTMAS ISLAND" },
    { label: "CC", value: "COCOS (KEELING) ISLANDS" },
    { label: "CO", value: "COLOMBIA" },
    { label: "CK", value: "COOK ISLANDS" },
    { label: "CR", value: "COSTA RICA" },
    { label: "CY", value: "CYPRUS" },
    { label: "CZ", value: "CZECH REPUBLIC" },
    { label: "DK", value: "DENMARK" },
    { label: "DJ", value: "DJIBOUTI" },
    { label: "DM", value: "DOMINICA" },
    { label: "DO", value: "DOMINICAN REPUBLIC" },
    { label: "EC", value: "ECUADOR" },
    { label: "EG", value: "EGYPT" },
    { label: "SV", value: "EL SALVADOR" },
    { label: "EE", value: "ESTONIA" },
    { label: "FK", value: "FALKLAND ISLANDS (MALVINAS)" },
    { label: "FO", value: "FAROE ISLANDS" },
    { label: "FJ", value: "FIJI" },
    { label: "FI", value: "FINLAND" },
    { label: "FR", value: "FRANCE" },
    { label: "GF", value: "FRENCH GUIANA" },
    { label: "PF", value: "FRENCH POLYNESIA" },
    { label: "TF", value: "FRENCH SOUTHERN TERRITORIES" },
    { label: "GA", value: "GABON" },
    { label: "GM", value: "GAMBIA" },
    { label: "GE", value: "GEORGIA" },
    { label: "DE", value: "GERMANY" },
    { label: "GH", value: "GHANA" },
    { label: "GI", value: "GIBRALTAR" },
    { label: "GR", value: "GREECE" },
    { label: "GL", value: "GREENLAND" },
    { label: "GD", value: "GRENADA" },
    { label: "GP", value: "GUADELOUPE" },
    { label: "GU", value: "GUAM" },
    { label: "GG", value: "GUERNSEY" },
    { label: "GY", value: "GUYANA" },
    { label: "VA", value: "HOLY SEE (VATICAN CITY STATE)" },
    { label: "HN", value: "HONDURAS" },
    { label: "HK", value: "HONG KONG" },
    { label: "HU", value: "HUNGARY" },
    { label: "IS", value: "ICELAND" },
    { label: "IN", value: "INDIA" },
    { label: "ID", value: "INDONESIA" },
    { label: "IE", value: "IRELAND" },
    { label: "IM", value: "ISLE OF MAN" },
    { label: "IL", value: "ISRAEL" },
    { label: "IT", value: "ITALY" },
    { label: "JM", value: "JAMAICA" },
    { label: "JP", value: "JAPAN" },
    { label: "JE", value: "JERSEY" },
    { label: "JO", value: "JORDAN" },
    { label: "KZ", value: "KAZAKHSTAN" },
    { label: "KI", value: "KIRIBATI" },
    { label: "KR", value: "KOREA, REPUBLIC OF" },
    { label: "KW", value: "KUWAIT" },
    { label: "KG", value: "KYRGYZSTAN" },
    { label: "LV", value: "LATVIA" },
    { label: "LS", value: "LESOTHO" },
    { label: "LI", value: "LIECHTENSTEIN" },
    { label: "LT", value: "LITHUANIA" },
    { label: "LU", value: "LUXEMBOURG" },
    { label: "MO", value: "MACAO" },
    { label: "MK", value: "MACEDONIA" },
    { label: "LI", value: "LIECHTENSTEIN" },
    { label: "LT", value: "LITHUANIA" },
    { label: "LU", value: "LUXEMBOURG" },
    { label: "MO", value: "MACAO" },
    { label: "MK", value: "MACEDONIA" },
    { label: "MG", value: "MADAGASCAR" },
    { label: "MW", value: "MALAWI" },
    { label: "MY", value: "MALAYSIA" },
    { label: "MT", value: "MALTA" },
    { label: "MH", value: "MARSHALL ISLANDS" },
    { label: "MQ", value: "MARTINIQUE" },
    { label: "MR", value: "MAURITANIA" },
    { label: "MU", value: "MAURITIUS" },
    { label: "YT", value: "MAYOTTE" },
    { label: "MX", value: "MEXICO" },
    { label: "MD", value: "MOLDOVA, REPUBLIC OF" },
    { label: "MC", value: "MONACO" },
    { label: "MN", value: "MONGOLIA" },
    { label: "ME", value: "MONTENEGRO" },
    { label: "MS", value: "MONTSERRAT" },
    { label: "MA", value: "MOROCCO" },
    { label: "MZ", value: "MOZAMBIQUE" },
    { label: "NA", value: "NAMIBIA" },
    { label: "NR", value: "NAURU" },
    { label: "NP", value: "NEPAL" },
    { label: "NL", value: "NETHERLANDS" },
    { label: "AN", value: "NETHERLANDS ANTILLES" },
    { label: "NC", value: "NEW CALEDONIA" },
    { label: "NZ", value: "NEW ZEALAND" },
    { label: "NI", value: "NICARAGUA" },
    { label: "NE", value: "NIGER" },
    { label: "NU", value: "NIUE" },
    { label: "NF", value: "NORFOLK ISLAND" },
    { label: "MP", value: "NORTHERN MARIANA ISLANDS" },
    { label: "NO", value: "NORWAY" },
    { label: "OM", value: "OMAN" },
    { label: "PW", value: "PALAU" },
    { label: "PS", value: "PALESTINE" },
    { label: "PA", value: "PANAMA" },
    { label: "PY", value: "PARAGUAY" },
    { label: "PE", value: "PERU" },
    { label: "PH", value: "PHILIPPINES" },
    { label: "PN", value: "PITCAIRN" },
    { label: "PL", value: "POLAND" },
    { label: "PT", value: "PORTUGAL" },
    { label: "PR", value: "PUERTO RICO" },
    { label: "QA", value: "QATAR" },
    { label: "RE", value: "REUNION" },
    { label: "RO", value: "ROMANIA" },
    { label: "RU", value: "RUSSIAN FEDERATION" },
    { label: "RW", value: "RWANDA" },
    { label: "SH", value: "SAINT HELENA" },
    { label: "KN", value: "SAINT KITTS AND NEVIS" },
    { label: "LC", value: "SAINT LUCIA" },
    { label: "PM", value: "SAINT PIERRE AND MIQUELON" },
    { label: "WS", value: "SAMOA" },
    { label: "SM", value: "SAN MARINO" },
    { label: "ST", value: "SAO TOME AND PRINCIPE" },
    { label: "SA", value: "SAUDI ARABIA" },
    { label: "SN", value: "SENEGAL" },
    { label: "RS", value: "SERBIA" },
    { label: "SC", value: "SEYCHELLES" },
    { label: "SG", value: "SINGAPORE" },
    { label: "SK", value: "SLOVAKIA" },
    { label: "SI", value: "SLOVENIA" },
    { label: "SB", value: "SOLOMON ISLANDS" },
    { label: "ZA", value: "SOUTH AFRICA" },
    { label: "ES", value: "SPAIN" },
    { label: "SR", value: "SURINAME" },
    { label: "SJ", value: "SVALBARD AND JAN MAYEN" },
    { label: "SZ", value: "SWAZILAND" },
    { label: "SE", value: "SWEDEN" },
    { label: "CH", value: "SWITZERLAND" },
    { label: "TW", value: "TAIWAN, PROVINCE OF CHINA" },
    { label: "TZ", value: "TANZANIA, UNITED REPUBLIC OF" },
    { label: "TH", value: "THAILAND" },
    { label: "TL", value: "TIMOR-LESTE" },
    { label: "TG", value: "TOGO" },
    { label: "TK", value: "TOKELAU" },
    { label: "TO", value: "TONGA" },
    { label: "TT", value: "TRINIDAD AND TOBAGO" },
    { label: "TN", value: "TUNISIA" },
    { label: "TR", value: "TURKEY" },
    { label: "TM", value: "TURKMENISTAN" },
    { label: "TC", value: "TURKS AND CAICOS ISLANDS" },
    { label: "TV", value: "TUVALU" },
    { label: "UG", value: "UGANDA" },
    { label: "UA", value: "UKRAINE" },
    { label: "AE", value: "UNITED ARAB EMIRATES" },
    { label: "GB", value: "UNITED KINGDOM" },
    { label: "US", value: "UNITED STATES" },
    { label: "UM", value: "URUGUAY" },
    { label: "UZ", value: "UZBEKISTAN" },
    { label: "VU", value: "VANUATU" },
    { label: "VE", value: "VENEZUELA" },
    { label: "VN", value: "VIET NAM" },
    { label: "VG", value: "VIRGIN ISLANDS, BRITISH" },
    { label: "VI", value: "VIRGIN ISLANDS, U.S." },
    { label: "WF", value: "WALLIS AND FUTUNA" },
    { label: "EH", value: "WESTERN SAHARA" },
    { label: "ZM", value: "ZAMBIA" },
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
    // setLoading(false);
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

  document.title = "Customer List Country Wise | Shreeji Pharma"

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            maintitle="Customer List Country Wise"
            title="Customer List Country Wise"
            pageTitle="Customer List Country Wise"
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
                    <Col lg={4} md={6} sm={6} className="d-flex justify-content-end">
                      <Button variant="primary" onClick={downloadExcel}>
                        Export to Excel
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
