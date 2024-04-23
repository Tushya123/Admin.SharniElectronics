import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
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

// import {
//   createCategory,
//   getCategory,
//   removeCategory,
//   updateCategory,
// } from "../../functions/Category/CategoryMaster";
import {getSpecificGetInTouch,updateGetInTouch,listgetinTouch,removeGetinTouch,createGetInTouch} from "../../functions/GetInTouch/getintouch"

const initialState = {
  name: "",
  address: "",
  subject: "",
  message: "",
  phoneno: "",
  IsActive: false,
};

const GetInTouch = () => {

  const [values, setValues] = useState(initialState);
  const { categoryName, IsActive } = values;
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [filter, setFilter] = useState(true);



  const [query, setQuery] = useState("");

  const [_id, set_Id] = useState("");
  const [remove_id, setRemove_id] = useState("");

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("no errors");
    }
  }, [formErrors, isSubmit]);

  const [modal_list, setmodal_list] = useState(false);
  const tog_list = () => {
    setmodal_list(!modal_list);
    setValues(initialState);
    setIsSubmit(false);
  };

  const [modal_delete, setmodal_delete] = useState(false);
    const tog_delete = (_id) => {
      setmodal_delete(!modal_delete);
      setRemove_id(_id);
    };

  const [modal_edit, setmodal_edit] = useState(false);
    const handleTog_edit = (_id) => {
      setmodal_edit(!modal_edit);
      setIsSubmit(false);
      set_Id(_id);
      getSpecificGetInTouch(_id)
        .then((res) => {
          console.log(res);
          setValues({
            ...values,
            name: res.name,
            address: res.address,
            subject: res.subject,
            message: res.message,
            phoneno: res.phoneno,
            IsActive: res.IsActive,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const handleChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleCheck = (e) => {
      setValues({ ...values, IsActive: e.target.checked });
    };

  //   const handleClick = (e) => {
  //     e.preventDefault();
  //     setFormErrors({});
  //     console.log("country", values);
  //     let erros = validate(values);
  //     setFormErrors(erros);
  //     setIsSubmit(true);

  //       createCategory(values)
  //         .then((res) => {
  //           setmodal_list(!modal_list);
  //             setValues(initialState);
  //             fetchCategories();
  //           // if (res.isOk) {
  //           //   setmodal_list(!modal_list);
  //           //   setValues(initialState);
  //           //   fetchCategories();
  //           // } else {
  //           //   if (res.field === 1) {
  //           //     setErrCN(true);
  //           //     setFormErrors({
  //           //       categoryName: "This Category name is already exists!",
  //           //     });
  //           //   }
  //           // }
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //   };

    const handleDelete = (e) => {
      e.preventDefault();
      removeGetinTouch(remove_id)
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

      if (Object.keys(erros).length === 0) {
        updateGetInTouch(_id, values)
          .then((res) => {
            setmodal_edit(!modal_edit);
            fetchCategories();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
    const [errNA, setErrNA] = useState(false);
    const [errEM, setErrEM] = useState(false);
    const [errSU, setErrSU] = useState(false);
    const [errME, setErrME] = useState(false);
    const [errPH, setErrPH] = useState(false);

    const validate = (values) => {
      const errors = {};

      if (values.name === "") {
        errors.name = "Name is required!";
        setErrNA(true);
      }
      if (values.name !== "") {
        setErrNA(false);
      }
      if (!/\S+@\S+\.\S+/.test(values.address)) {
        errors.address = "Email address is invalid";
        // Assuming you have a setter function for the error state of Email field
        setErrEM(true);
      }
      else{
        setErrEM(false);
    }
      if (values.subject === "") {
        errors.subject = "Subject is required!";
        setErrSU(true);
      }
      if (values.subject !== "") {
        setErrSU(false);
      }
      if (values.message === "") {
        errors.message = "Message is required!";
        setErrME(true);
      }
      if (values.message !== "") {
        setErrME(false);
      }
      if (values.phoneno.length<10) {
        errors.phoneno = "Phone Number should be of 10 Digits!!";
        setErrPH(true);
      }
      if (values.phoneno !== "") {
        setErrPH(false);
      }
      
    

      return errors;
    };

  const validClassName =
    errNA && isSubmit ? "form-control is-invalid" : "form-control"; 
    const validClassEmail =
    errEM && isSubmit ? "form-control is-invalid" : "form-control"; 
    const validClassSubject =
    errSU && isSubmit ? "form-control is-invalid" : "form-control"; 
    const validClassMessage =
    errME && isSubmit ? "form-control is-invalid" : "form-control"; 
    const validClassPhoneNumber =
    errPH && isSubmit ? "form-control is-invalid" : "form-control"; 
   

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
        `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/list-by-params/getintouch`,
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
          setCategories(res.data);
          setTotalRows(res.count);
        } else if (response.length === 0) {
          setCategories([]);
        }
        // console.log(res);
      });

    setLoading(false);
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
  const col = [
    {
      name: " Name",
      selector: (row) => row.name,
      sortable: true,
      sortField: "name",
      minWidth: "150px",
    },
    {
      name: "Email Address",
      selector: (row) => row.address,
      sortable: true,
      sortField: "address",
      minWidth: "150px",
    },
    {
        name: "Phone no",
        selector: (row) => row.phoneno,
        sortable: true,
        sortField: "phoneno",
        minWidth: "150px",
      },
    {
      name: "Subject",
      selector: (row) => row.subject,
      sortable: true,
      sortField: "subject",
      minWidth: "150px",
    },
    {
      name: "Message",
      selector: (row) => row.message,
      sortable: true,
      sortField: "message",
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

  document.title = "Get In Touch | Contact to Owner";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb maintitle="Get In Touch" title="Get In Touch" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <Row className="g-4 mb-1">
                    <Col className="col-sm" sm={6} lg={6} md={6}>
                      <h2 className="card-title mb-0 fs-4 mt-2">Get In Touch</h2>
                    </Col>

                    <Col sm={6} lg={2} md={6} className="mt-20">
                      <div className="text-end mt-2">
                        <Input
                          type="checkbox"
                          className="form-check-input"
                          name="filter"
                          value={filter}
                          defaultChecked={true}
                          onChange={handleFilter}
                        />
                        <Label className="form-check-label ms-2">Active</Label>
                      </div>
                    </Col>
                    <Col className="col-sm-auto" sm={6} lg={4} md={6}>
                      <div className="d-flex justify-content-sm-end">
                        {/* <div className="ms-2">
                          <Button
                            color="success"
                            className="add-btn me-1"
                            onClick={() => tog_list()}
                            id="create-btn"
                          >
                            <i className="ri-add-line align-bottom me-1"></i>
                            Add
                          </Button>
                        </div> */}
                        <div className="search-box ms-2">
                          <input
                            type="text"
                            className="form-control search"
                            placeholder="Search..."
                            onChange={(e) => setQuery(e.target.value)}
                          />
                          <i className="ri-search-line search-icon"></i>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </CardHeader>

                <CardBody>
                  <div id="customerList">
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
                        paginationRowsPerPageOptions={[10, 50, 100, totalRows]}
                        onChangeRowsPerPage={handlePerRowsChange}
                        onChangePage={handlePageChange}
                      />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Add Modal */}
      {/* <Modal
        isOpen={modal_list}
        toggle={() => {
          tog_list();
        }}
        centered
      >
        <ModalHeader
          className="bg-light p-3"
          toggle={() => {
            setmodal_list(false);
            setIsSubmit(false);
          }}
        >
          Add Category
        </ModalHeader>
        <form>
          <ModalBody>
            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassCategoryName}
                placeholder="Enter Category Name"
                required
                name="categoryName"
                value={categoryName}
                onChange={handleChange}
              />
              <Label>Category Name <span className="text-danger">*</span></Label>
              {isSubmit && (
                <p className="text-danger">{formErrors.categoryName}</p>
              )}
            </div>

            <div className="form-check mb-2">
              <Input
                type="checkbox"
                className="form-check-input"
                name="IsActive"
                value={IsActive}
                onChange={handleCheck}
              />
              <Label className="form-check-label">Is Active</Label>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
              <button
                type="submit"
                className="btn btn-success"
                id="add-btn"
                onClick={handleClick}
              >
                Submit
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => {
                  setmodal_list(false);
                  setValues(initialState);
                  setIsSubmit(false);
                }}
              >
                Cancel
              </button>
            </div>
          </ModalFooter>
        </form>
      </Modal> */}

      {/* Edit Modal */}
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
            setIsSubmit(false);
          }}
        >
          Edit Get in Touch
        </ModalHeader>
        <form>
          <ModalBody>
            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassName}
                placeholder="Enter Name"
                required
                name="name"
                value={values.name}
                onChange={handleChange}
              />
              <Label> Name <span className="text-danger">*</span></Label>
              {isSubmit && (
                <p className="text-danger">{formErrors.name}</p>
              )}
            </div><div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassEmail}
                placeholder="Enter Email"
                required
                name="address"
                value={values.address}
                onChange={handleChange}
              />
              <Label> Email <span className="text-danger">*</span></Label>
              {isSubmit && (
                <p className="text-danger">{formErrors.address}</p>
              )}
            </div><div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassSubject}
                placeholder="Enter Category Name"
                required
                name="subject"
                value={values.subject}
                onChange={handleChange}
              />
              <Label> Subject <span className="text-danger">*</span></Label>
              {isSubmit && (
                <p className="text-danger">{formErrors.subject}</p>
              )}
            </div><div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassMessage}
                placeholder="Enter Message"
                required
                name="message"
                value={values.message}
                onChange={handleChange}
              />
              <Label> Message <span className="text-danger">*</span></Label>
              {isSubmit && (
                <p className="text-danger">{formErrors.message}</p>
              )}
            </div><div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassPhoneNumber}
                placeholder="Enter Phone Number"
                required
                name="phoneno"
                value={values.phoneno}
                onChange={handleChange}
              />
              <Label> Phone Number <span className="text-danger">*</span></Label>
              {isSubmit && (
                <p className="text-danger">{formErrors.phoneno}</p>
              )}
            </div>

            <div className="form-check mb-2">
              <Input
                type="checkbox"
                className="form-check-input"
                name="IsActive"
                value={IsActive}
                checked={IsActive}
                onChange={handleCheck}
              />
              <Label className="form-check-label">Is Active</Label>
            </div>
          </ModalBody>

          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
              <button
                type="submit"
                className="btn btn-success"
                id="add-btn"
                onClick={handleUpdate}
              >
                Update
              </button>

              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => {
                  setmodal_edit(false);
                  setIsSubmit(false);
                  setFormErrors({});
                }}
              >
                Cancel
              </button>
            </div>
          </ModalFooter>
        </form>
      </Modal>

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
          Remove Category
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
                Cancel
              </button>
            </div>
          </ModalFooter>
        </form>
      </Modal>
    </React.Fragment>
  );
};

export default GetInTouch;
