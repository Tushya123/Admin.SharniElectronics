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

import {
  createCommitment,
  getCommitment,
  removeCommitment,
  updateCommitment,
} from "../../functions/CMSshreeji/Commitment";

const initialState = {
  Title: "",
  Description: "",
 
  CommitmentImage: "",
  IsActive: false,
};

const Commitment = () => {
  const [values, setValues] = useState(initialState);
  const { Title, Description, CommitmentImage, IsActive } =
    values;
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [filter, setFilter] = useState(true);

  const [query, setQuery] = useState("");

  const [_id, set_Id] = useState("");
  const [remove_id, setRemove_id] = useState("");

  const [Commitment, setCommitment] = useState([]);
  const [photoAdd, setPhotoAdd] = useState();
  const [checkImagePhoto, setCheckImagePhoto] = useState(false);
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
    getCommitment(_id)
      .then((res) => {
        setValues({
          ...values,
          Title: res.Title,
          Description: res.Description, 
          CommitmentImage:res.CommitmentImage,
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

  const handleClick = (e) => {
    e.preventDefault();
    setFormErrors({});
    let erros = validate(values);
    setFormErrors(erros);
    setIsSubmit(true);

    if (Object.keys(erros).length === 0) {
      const formdata = new FormData();

      formdata.append("CommitmentImage", values.CommitmentImage);
      formdata.append("Title", values.Title);
      formdata.append("Description", values.Description);
      formdata.append("IsActive", values.IsActive); 
      createCommitment(formdata)
        .then((res) => {
          setmodal_list(!modal_list);
          setValues(initialState);
          setCheckImagePhoto(false);
          setIsSubmit(false);
          setFormErrors({});
          setPhotoAdd("");

          fetchUsers();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    removeCommitment(remove_id)
      .then((res) => {
        setmodal_delete(!modal_delete);
        fetchUsers();
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
      const formdata = new FormData();

      formdata.append("CommitmentImage", values.CommitmentImage);
      formdata.append("Title", values.Title);
      formdata.append("Description", values.Description);
      formdata.append("IsActive", values.IsActive); 

      updateCommitment(_id, formdata)
        .then((res) => {
          setmodal_edit(!modal_edit);
          fetchUsers();
          setPhotoAdd("");

          setCheckImagePhoto(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const PhotoUpload = (e) => {
    if (e.target.files.length > 0) {
      const image = new Image();

      let imageurl = URL.createObjectURL(e.target.files[0]);
      console.log("img", e.target.files[0]);

      setPhotoAdd(imageurl);
      setValues({ ...values, CommitmentImage: e.target.files[0] });
      setCheckImagePhoto(true);
    }
  };
  const [errFN, setErrFN] = useState(false);
  const [errLN, setErrLN] = useState(false);
  const [errEM, setErrEM] = useState(false);
  const [errPA, setErrPA] = useState(false);
  const [errBI, setErrBI] = useState(false);
  const validate = (values) => {
    const errors = {};

    if (values.Title === "") {
      errors.Title = "First Name is required!";
      setErrFN(true);
    }
    if (values.Title !== "") {
      setErrFN(false);
    }

    if (values.Description === "") {
      errors.Description = "Last Name is required!";
      setErrLN(true);
    }
    if (values.Description !== "") {
      setErrLN(false);
    }

   
 
   
     if (values.CommitmentImage ==="") {
      errors.CommitmentImage = " Image is required!";
      setErrBI(true);
    }
    if (values.CommitmentImage !== "") {
      setErrBI(false);
    }

    

    return errors;
  };

  const validClassFN =
    errFN && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassLN =
    errLN && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassEM =
    errEM && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassPA =
    errPA && isSubmit ? "form-control is-invalid" : "form-control";
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

  useEffect(() => {
    // fetchUsers(1); // fetch page 1 of users
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [pageNo, perPage, column, sortDirection, query, filter]);

  const fetchUsers = async () => {
    setLoading(true);
    let skip = (pageNo - 1) * perPage;
    if (skip < 0) {
      skip = 0;
    }

    await axios
      .post(
        `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/list/Commitment`,
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
          console.log(">>>", res);
          setLoading(false);
          setCommitment(res.data);
          setTotalRows(res.count);
        } else if (response.length === 0) {
          setCommitment([]);
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
        name: "Sr No",
        selector: (row,index) => index+1,
        sortable: true,
        sortField: "srno",
        minWidth: "150px",
      },
    {
      name: "First Name",
      selector: (row) => row.Title,
      sortable: true,
      sortField: "Title",
      minWidth: "150px",
    },
    {
      name: "Last Name",
      selector: (row) => row.Description,
      sortable: true,
      sortField: "Description",
      minWidth: "150px",
    },
 
 
    {
      name: "Image",
      selector: (row) => renderImage(row.CommitmentImage),
      sortable: true,
      sortField: "password",
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

  document.title = "Commitment master|Shreeji Pharma" ;

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb  title="Commitment master"  />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <Row className="g-4 mb-1">
                    <Col className="col-sm" sm={6} lg={4} md={6}>
                      <h2 className="card-title mb-0 fs-4 mt-2">Commitment master</h2>
                    </Col>

                    <Col sm={6} lg={4} md={6}>
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
                    <Col className="col-sm-auto" sm={12} lg={4} md={12}>
                      <div className="d-flex justify-content-sm-end">
                        <div className="ms-2">
                          <Button
                            color="success"
                            className="add-btn me-1"
                            onClick={() => tog_list()}
                            id="create-btn"
                          >
                            <i className="ri-add-line align-bottom me-1"></i>
                            Add
                          </Button>
                        </div>
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
                        data={Commitment}
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
      <Modal
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
          Add Admin
        </ModalHeader>
        <form>
          <ModalBody>
            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassFN}
                placeholder="Enter first Name"
                required
                name="Title"
                value={Title}
                onChange={handleChange}
              />
              <Label>
               Commitment title <span className="text-danger">*</span>
              </Label>
              {isSubmit && (
                <p className="text-danger">{formErrors.Title}</p>
              )}
            </div>
            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassLN}
                placeholder="Enter last Name"
                required
                name="Description"
                value={Description}
                onChange={handleChange}
              />
              <Label>
               Description <span className="text-danger">*</span>
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.Description}</p>}
            </div>
            
            

            <Col lg={6}>
              <label>
                Admin Image <span className="text-danger">*</span>
              </label>

              <input
                type="file"
                name="CommitmentImage"
                className={validClassBI}
                // accept="images/*"
                accept=".jpg, .jpeg, .png"
                onChange={PhotoUpload}
              />
              {isSubmit && (
                <p className="text-danger">{formErrors.CommitmentImage}</p>
              )}
              {checkImagePhoto ? (
                <img
                  //   src={image ?? myImage}
                  className="m-2"
                  src={photoAdd}
                  alt="Profile"
                  width="300"
                  height="200"
                />
              ) : null}
            </Col>

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
                  setCheckImagePhoto(false);
                  setPhotoAdd("");
                }}
              >
                Cancel
              </button>
            </div>
          </ModalFooter>
        </form>
      </Modal>

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
          Edit Commitment master
        </ModalHeader>
        <form>
          <ModalBody>
            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassFN}
                placeholder="Enter first Name"
                required
                name="Title"
                value={Title}
                onChange={handleChange}
              />
              <Label>
               Commitment title<span className="text-danger">*</span>{" "}
              </Label>
              {isSubmit && (
                <p className="text-danger">{formErrors.Title}</p>
              )}
            </div>
            <div className="form-floating mb-3">
              <Input
                type="text"
                className={validClassLN}
                placeholder="Enter last Name"
                required
                name="Description"
                value={Description}
                onChange={handleChange}
              />
              <Label>
               Description<span className="text-danger">*</span>{" "}
              </Label>
              {isSubmit && <p className="text-danger">{formErrors.Description}</p>}
            </div>
           
             
            <Col lg={6}>
              <label>
                Admin Image <span className="text-danger">*</span>
              </label>
              <input
                key={"CommitmentImage" + _id}
                type="file"
                name="CommitmentImage"
                className={validClassBI}
                // accept="images/*"
                accept=".jpg, .jpeg, .png"
                onChange={PhotoUpload}
              />
              {isSubmit && (
                <p className="text-danger">{formErrors.CommitmentImage}</p>
              )}

              {values.CommitmentImage || photoAdd ? (
                <img
                  // key={photoAdd}
                  className="m-2"
                  src={
                    checkImagePhoto
                      ? photoAdd
                      : `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/${values.CommitmentImage}`
                  }
                  width="300"
                  height="200"
                />
              ) : null}
            </Col>
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
          Remove Admin
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

export default Commitment;
