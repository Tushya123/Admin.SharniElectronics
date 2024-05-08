import React, { useState, useEffect } from "react";
import axios from 'axios'
import {
  Button,
  Form,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Label,
  Input,
  FormFeedback,
  FormGroup,Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import  Select  from "react-select";
import BreadCrumb from "../../Components/Common/BreadCrumb";

import UiContent from "../../Components/Common/UiContent";
import DataTable from "react-data-table-component";

import myImage from "../../assets/images/logo/Image_not_available.png";

import {getinquiry,updateinquiry,createinquiry,listinquiry,removeinquiry} from "../../functions/Inquiry/Inquiry"
import { listState, listCountry } from "../../functions/Location/Location";
import {getInquiryProduct} from "../../functions/Inquiry/InquiryProduct"

const initialState = {
  ProductDetail :"",
  InquiryNo:"",
  ContactPerson:"",
  CompanyName:"",
 
  Country:"",
  
  Mobile:"",
  Email:"",
  Comments:"",
  IsActive:true,
};

const initialState2={
  ProductDetail2 :"",

  Quantity:"" ,
  IsActive:true,
  SupplierName:[],
   ProductDetailLabel:"",
   BasePrice:"",
   Group:"",
   RFQ_Status2:false, 
   RFQ_Date:""
}

const ProductInquiry = () => {

  const countriesArray = [
    { label: "AX", value : "ALAND ISLANDS" },
    { label: "AL", value : "ALBANIA" },
    { label: "DZ", value : "ALGERIA" },
    { label: "AS", value : "AMERICAN SAMOA" },
    { label: "AD", value : "ANDORRA" },
    { label: "AI", value : "ANGUILLA" },
    { label: "AQ", value : "ANTARCTICA" },
    { label: "AG", value : "ANTIGUA AND BARBUDA" },
    { label: "AR", value : "ARGENTINA" },
    { label: "AM", value : "ARMENIA" },
    { label: "AW", value : "ARUBA" },
    { label: "AU", value : "AUSTRALIA" },
    { label: "AT", value : "AUSTRIA" },
    { label: "AZ", value : "AZERBAIJAN" },
    { label: "BS", value : "BAHAMAS" },
    { label: "BH", value : "BAHRAIN" },
    { label: "BD", value : "BANGLADESH" },
    { label: "BB", value : "BARBADOS" },
    { label: "BE", value : "BELGIUM" },
    { label: "BZ", value : "BELIZE" },
    { label: "BJ", value : "BENIN" },
    { label: "BM", value : "BERMUDA" },
    { label: "BT", value : "BHUTAN" },
    { label: "BA", value : "BOSNIA-HERZEGOVINA" },
    { label: "BW", value : "BOTSWANA" },
    { label: "BV", value : "BOUVET ISLAND" },
    { label: "BR", value : "BRAZIL" },
    { label: "BN", value : "BRUNEI DARUSSALAM" },
    { label: "BG", value : "BULGARIA" },
    { label: "BF", value : "BURKINA FASO" },
    { label: "CA", value : "CANADA" },
    { label: "CV", value : "CAPE VERDE" },
    { label: "KY", value : "CAYMAN ISLANDS" },
    { label: "CF", value : "CENTRAL AFRICAN REPUBLIC" },
    { label: "CL", value : "CHILE" },
    { label: "CN", value : "CHINA" },
    { label: "CX", value : "CHRISTMAS ISLAND" },
    { label: "CC", value : "COCOS (KEELING) ISLANDS" },
    { label: "CO", value : "COLOMBIA" },
    { label: "CK", value : "COOK ISLANDS" },
    { label: "CR", value : "COSTA RICA" },
    { label: "CY", value : "CYPRUS" },
    { label: "CZ", value : "CZECH REPUBLIC" },
    { label: "DK", value : "DENMARK" },
    { label: "DJ", value : "DJIBOUTI" },
    { label: "DM", value : "DOMINICA" },
    { label: "DO", value : "DOMINICAN REPUBLIC" },
    { label: "EC", value : "ECUADOR" },
    { label: "EG", value : "EGYPT" },
    { label: "SV", value : "EL SALVADOR" },
    { label: "EE", value : "ESTONIA" },
    { label: "FK", value : "FALKLAND ISLANDS (MALVINAS)" },
    { label: "FO", value : "FAROE ISLANDS" },
    { label: "FJ", value : "FIJI" },
    { label: "FI", value : "FINLAND" },
    { label: "FR", value : "FRANCE" },
    { label: "GF", value : "FRENCH GUIANA" },
    { label: "PF", value : "FRENCH POLYNESIA" },
    { label: "TF", value : "FRENCH SOUTHERN TERRITORIES" },
    { label: "GA", value : "GABON" },
    { label: "GM", value : "GAMBIA" },
    { label: "GE", value : "GEORGIA" },
    { label: "DE", value : "GERMANY" },
    { label: "GH", value : "GHANA" },
    { label: "GI", value : "GIBRALTAR" },
    { label: "GR", value : "GREECE" },
    { label: "GL", value : "GREENLAND" },
    { label: "GD", value : "GRENADA" },
    { label: "GP", value : "GUADELOUPE" },
    { label: "GU", value : "GUAM" },
    { label: "GG", value : "GUERNSEY" },
    { label: "GY", value : "GUYANA" },
    { label: "VA", value : "HOLY SEE (VATICAN CITY STATE)" },
    { label: "HN", value : "HONDURAS" },
    { label: "HK", value : "HONG KONG" },
    { label: "HU", value : "HUNGARY" },
    { label: "IS", value : "ICELAND" },
    { label: "IN", value : "INDIA" },
    { label: "ID", value : "INDONESIA" },
    { label: "IE", value : "IRELAND" },
    { label: "IM", value : "ISLE OF MAN" },
    { label: "IL", value : "ISRAEL" },
    { label: "IT", value : "ITALY" },
    { label: "JM", value : "JAMAICA" },
    { label: "JP", value : "JAPAN" },
    { label: "JE", value : "JERSEY" },
    { label: "JO", value : "JORDAN" },
    { label: "KZ", value : "KAZAKHSTAN" },
    { label: "KI", value : "KIRIBATI" },
    { label: "KR", value : "KOREA, REPUBLIC OF" },
    { label: "KW", value : "KUWAIT" },
    { label: "KG", value : "KYRGYZSTAN" },
    { label: "LV", value : "LATVIA" },
    { label: "LS", value : "LESOTHO" },
    { label: "LI", value : "LIECHTENSTEIN" },
    { label: "LT", value : "LITHUANIA" },
    { label: "LU", value : "LUXEMBOURG" },
    { label: "MO", value : "MACAO" },
    { label: "MK", value : "MACEDONIA" },
    { label: "LI", value : "LIECHTENSTEIN" },
    { label: "LT", value : "LITHUANIA" },
    { label: "LU", value : "LUXEMBOURG" },
    { label: "MO", value : "MACAO" },
    { label: "MK", value : "MACEDONIA" },
    { label: "MG", value : "MADAGASCAR" },
    { label: "MW", value : "MALAWI" },
    { label: "MY", value : "MALAYSIA" },
    { label: "MT", value : "MALTA" },
    { label: "MH", value : "MARSHALL ISLANDS" },
    { label: "MQ", value : "MARTINIQUE" },
    { label: "MR", value : "MAURITANIA" },
    { label: "MU", value : "MAURITIUS" },
    { label: "YT", value : "MAYOTTE" },
    { label: "MX", value : "MEXICO" },
    { label: "MD", value : "MOLDOVA, REPUBLIC OF" },
    { label: "MC", value : "MONACO" },
    { label: "MN", value : "MONGOLIA" },
    { label: "ME", value : "MONTENEGRO" },
    { label: "MS", value : "MONTSERRAT" },
    { label: "MA", value : "MOROCCO" },
    { label: "MZ", value : "MOZAMBIQUE" },
    { label: "NA", value : "NAMIBIA" },
    { label: "NR", value : "NAURU" },
    { label: "NP", value : "NEPAL" },
    { label: "NL", value : "NETHERLANDS" },
    { label: "AN", value : "NETHERLANDS ANTILLES" },
    { label: "NC", value : "NEW CALEDONIA" },
    { label: "NZ", value : "NEW ZEALAND" },
    { label: "NI", value : "NICARAGUA" },
    { label: "NE", value : "NIGER" },
    { label: "NU", value : "NIUE" },
    { label: "NF", value : "NORFOLK ISLAND" },
    { label: "MP", value : "NORTHERN MARIANA ISLANDS" },
    { label: "NO", value : "NORWAY" },
    { label: "OM", value : "OMAN" },
    { label: "PW", value : "PALAU" },
    { label: "PS", value : "PALESTINE" },
    { label: "PA", value : "PANAMA" },
    { label: "PY", value : "PARAGUAY" },
    { label: "PE", value : "PERU" },
    { label: "PH", value : "PHILIPPINES" },
    { label: "PN", value : "PITCAIRN" },
    { label: "PL", value : "POLAND" },
    { label: "PT", value : "PORTUGAL" },
    { label: "PR", value : "PUERTO RICO" },
    { label: "QA", value : "QATAR" },
    { label: "RE", value : "REUNION" },
    { label: "RO", value : "ROMANIA" },
    { label: "RU", value : "RUSSIAN FEDERATION" },
    { label: "RW", value : "RWANDA" },
    { label: "SH", value : "SAINT HELENA" },
    { label: "KN", value : "SAINT KITTS AND NEVIS" },
    { label: "LC", value : "SAINT LUCIA" },
    { label: "PM", value : "SAINT PIERRE AND MIQUELON" },
    { label: "WS", value : "SAMOA" },
    { label: "SM", value : "SAN MARINO" },
    { label: "ST", value : "SAO TOME AND PRINCIPE" },
    { label: "SA", value : "SAUDI ARABIA" },
    { label: "SN", value : "SENEGAL" },
    { label: "RS", value : "SERBIA" },
    { label: "SC", value : "SEYCHELLES" },
    { label: "SG", value : "SINGAPORE" },
    { label: "SK", value : "SLOVAKIA" },
    { label: "SI", value : "SLOVENIA" },
    { label: "SB", value : "SOLOMON ISLANDS" },
    { label: "ZA", value : "SOUTH AFRICA" },
    { label: "ES", value : "SPAIN" },
    { label: "SR", value : "SURINAME" },
    { label: "SJ", value : "SVALBARD AND JAN MAYEN" },
    { label: "SZ", value : "SWAZILAND" },
    { label: "SE", value : "SWEDEN" },
    { label: "CH", value : "SWITZERLAND" },
    { label: "TW", value : "TAIWAN, PROVINCE OF CHINA" },
    { label: "TZ", value : "TANZANIA, UNITED REPUBLIC OF" },
    { label: "TH", value : "THAILAND" },
    { label: "TL", value : "TIMOR-LESTE" },
    { label: "TG", value : "TOGO" },
    { label: "TK", value : "TOKELAU" },
    { label: "TO", value : "TONGA" },
    { label: "TT", value : "TRINIDAD AND TOBAGO" },
    { label: "TN", value : "TUNISIA" },
    { label: "TR", value : "TURKEY" },
    { label: "TM", value : "TURKMENISTAN" },
    { label: "TC", value : "TURKS AND CAICOS ISLANDS" },
    { label: "TV", value : "TUVALU" },
    { label: "UG", value : "UGANDA" },
    { label: "UA", value : "UKRAINE" },
    { label: "AE", value : "UNITED ARAB EMIRATES" },
    { label: "GB", value : "UNITED KINGDOM" },
    { label: "US", value : "UNITED STATES" },
    { label: "UM", value : "URUGUAY" },
    { label: "UZ", value : "UZBEKISTAN" },
    { label: "VU", value : "VANUATU" },
    { label: "VE", value : "VENEZUELA" },
    { label: "VN", value : "VIET NAM" },
    { label: "VG", value : "VIRGIN ISLANDS, BRITISH" },
    { label: "VI", value : "VIRGIN ISLANDS, U.S." },
    { label: "WF", value : "WALLIS AND FUTUNA" },
    { label: "EH", value : "WESTERN SAHARA" },
    { label: "ZM", value : "ZAMBIA" }
  ];
  
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [filter, setFilter] = useState(true);
  const [query, setQuery] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [selectsupplier,setsupplierdetail] = useState([]);
  const [selectnewdetail,setselectnewdetail]=useState([]);
 
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(0);
  const [column, setcolumn] = useState();
  const [sortDirection, setsortDirection] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingOption, setLoadingOption] = useState(false);
  //validation
  const [errSP, setErrSP] = useState(false);
  const [errQU, setErrQU] = useState(false);
  const [errCPN, setErrCPN] = useState(false);
  const [errCN,setErrCN]=useState(false);
  const [errMN,setErrMN]=useState(false);
  const [errEM,setErrEM]=useState(false);
  const [errCOM,setErrCOM]=useState(false);
  // const [errCPN, setErrCPN] = useState(false);
  const [errCountry, setErrCountry] = useState(false);

  

  const [_id, set_Id] = useState("");
  const [remove_id, setRemove_id] = useState("");

  const [values, setValues] = useState(initialState);
  const [values2, setValues2] = useState(initialState2);
  const {
    ProductDetail ,
    
    ContactPerson,
    CompanyName,
  
 
    Country,
 
    Mobile,
    Email,
    Comments,
    IsActive,
 
  } = values;

  const{
    ProductDetail2 ,
  
    Quantity 
    , ProductDetailLabel,BasePrice,Group,RFQ_Status2, RFQ_Date,SupplierName
  }= values2

  const [showForm, setShowForm] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);

  const [details, setDetails] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  const [modal_list, setmodal_list] = useState(false);
  const tog_list = () => {
    setmodal_list(!modal_list);
    setIsSubmit(false);
    setValues([]);
  };

  const [modal_delete, setmodal_delete] = useState(false);
  const tog_delete = (_id) => {
    setmodal_delete(!modal_delete);
    setRemove_id(_id);
  };
  const getallAssignProduct=()=>{
    axios
      .get(
        `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/list/AssignProduct`)
      .then((response) => {
        if (response.length > 0) {

console.log(response)
      
        console.log("AssignProduct",response)
          const names = response.map((item)=>({
            value:item.ProductDetail.map((detail=>detail._id)) , label :item.ProductDetail.map((detail=>detail.Description)),toshow:false,SupplierName:item.SupplierName.SupplierName,default_id:item.SupplierName._id
          }
         ));
         console.log(names)
          
         setsupplierdetail(names);
        } else if(response.length===0){
          setsupplierdetail([]);
        }
      });
  }
  useEffect(()=>{
    getallProductDetail()
    getallAssignProduct()
    },[])

  const [modal_edit, setmodal_edit] = useState(false);
  const [rfqForm, setRfqForm] = useState(false)
  
  const [data, Setdata] = useState([])
  const [rfq, setrfq] = useState("")

  const handleTog_RFQ = (_id) => {
    console.log(_id)
    setRfqForm(true)
    setUpdateForm(false)
    setIsSubmit(false);
    setShowForm(false)
    setrfq(_id);
    getInquiryProduct(_id).then((res)=>{
      console.log(res)
      let count =0;
    // Update speciality state with the selected option's value
    selectsupplier.forEach(item => {
      item.toshow = false;
    });
    console.log(res.ProductDetail)
    for (let i = 0; i < selectsupplier.length; i++) {
      if (selectsupplier[i].value.some(item => item === res.ProductDetail)) {
        selectsupplier[i].toshow = true;
        count++;
       
      }
    }
    console.log(res.ProductDetail)
    console.log(selectsupplier)
    console.log("This is Count",count);
   const temp= selectsupplier.filter((item)=>item.toshow)
     Setdata(temp)

    console.log("THis is the Id", res.ProductDetail)
    console.log("THis is the Supplier",selectsupplier)
    

      setValues2({
        ...values2,
        ProductDetailLabel :res.ProductDetailLabel,
        ProductDetail2:res.ProductDetail,
   
        Group:res.Group,
        Quantity:res.Quantity,
        RFQ_Date:res.RFQ_Date,
        RFQ_Status2:res.RFQ_Status2,
        BasePrice:res.BasePrice,
        IsActive:res.IsActive,
        
       
        
      });
      


    }
  )
  };
  console.log("Nice",ProductDetail2)

  const handleTog_edit = (_id) => {
    // setmodal_edit(!modal_edit);
    setUpdateForm(true);
    setIsSubmit(false);
    set_Id(_id);
    getinquiry(_id)
      .then((res) => {
        console.log(res);
        setValues({
          ...values,
          ProductDetail :res.ProductDetail,
          
          ContactPerson:res.ContactPerson,
          CompanyName:res.CompanyName,
          
          Country:res.Country,
         
          Mobile:res.Mobile,
          Email:res.Email,
          Comments:res.Comments,
          IsActive:res.IsActive,
         
          
        });
        initialState.InquiryNo= res._id
        setAllProductDetail(res.ProductDetail)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(values)

  useEffect(() => {
    fetchCategories();
    loadCountries();
    loadStates();
  }, []);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("no errors");
    }
  }, [formErrors, isSubmit]);


  const handleSort = (column, sortDirection) => {
    setcolumn(column.sortField);
    setsortDirection(sortDirection);
  };
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
      .post(`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/list-by-params/inquiry`, {
        skip: skip,
        per_page: perPage,
        sorton: column,
        sortdir: sortDirection,
        match: query,
        IsActive: filter,
      })
      .then((response) => {
        console.log(response.length)
        if (response.length > 0) {
          let res = response[0];
          console.log("Response:",res.data)
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
  const handlePerRowsChange = async (newPerPage, page) => {
    // setPageNo(page);
    setPerPage(newPerPage);
  };
  const handleFilter = (e) => {
    setFilter(e.target.checked);
    console.log("lol",e.target.value)
  };
  const loadCountries = () => {
    listCountry().then((res) => setCountries(res));
  };

  const loadStates = () => {
    listState().then((res) => {
      setStates(res);
      console.log(res);
    });
  };

  const handleChange2 = (e) => {
    setValues2({ ...values2, [e.target.name]: e.target.value });
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(values));
    let errors = validate(values);
    setFormErrors(errors);
    setIsSubmit(true);
    values.ProductDetail=allProductId
    console.log(values)
if(Object.keys(errors).length===0){


    createinquiry(values)
      .then((res) => {
        setValues(initialState);
        setShowForm(false);
        setUpdateForm(false);
        fetchCategories();
        setAllProductId([]); // Assuming _id is in res.data
    setAllProductDetail([]);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  };  
  const handleSubmitRFQ = (e) => {
    e.preventDefault();
    setFormErrors(validate(values));
    let errors = validate(values);
    setFormErrors(errors);
    setIsSubmit(true);
    values.ProductDetail=allProductId
    console.log(values)
if(Object.keys(errors).length===0){


    createinquiry(values)
      .then((res) => {
        setValues(initialState);
        setShowForm(false);
        setUpdateForm(false);
        fetchCategories();
        setAllProductId([]); // Assuming _id is in res.data
    setAllProductDetail([]);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  };

  const handleAddCancel = (e) => {
    e.preventDefault();
    setSupplierNamePlaceholder("");
    setAllProductDetail([]);
    setAllProductId([])
    setShowForm(false);
    setUpdateForm(false);
    setValues(initialState);
    setValues2(initialState2)
    setIsSubmit(false);
  };
  const handleRFQCancel = (e) => {
    e.preventDefault();
    setSupplierNamePlaceholder("");
    setAllProductDetail([]);
    setAllProductId([])
    setUpdateForm(true);
    setShowForm(false);
    setValues2(initialState2)
    setIsSubmit(false);
  };
  const handleDelete = (e) => { 
    e.preventDefault();
    axios
      .delete(
        `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/remove/inquiry/${remove_id}`)
      .then((res) => {
        setmodal_delete(!modal_delete);
        fetchCategories();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdate = (e) => {
    // debugger;
    e.preventDefault();
    let errors = validate(values);
    setFormErrors(errors);
    console.log("errors", errors);
    setIsSubmit(true);
    if (Object.keys(errors).length === 0) {
      updateinquiry(_id, values)
        .then((res) => {
          setUpdateForm(false);
          setAllProductDetail([]);
          setShowForm(false);
          setValues(initialState);
          fetchCategories();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleUpdateCancel = (e) => {
    e.preventDefault();
    setValues2(initialState2)
    setSupplierNamePlaceholder("");
    setAllProductDetail([]);
    setAllProductId([])

    setRfqForm(false)
    setShowForm(false);
    setUpdateForm(false)
    setIsSubmit(false);
    setValues(initialState);
  };

  const handleCheck = (e) => {
    setValues({ ...values, IsActive: e.target.checked });
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    //const phone = /^\d{10}$/;
    const phone =
/^(?!.*(\d)(-?\1){4})(?!0123456789|1234567890|2345678901|3456789012|4567890123|5678901234|6789012345|7890123456|8901234567|9012345678)\d{10}$/;
    if (!values.ContactPerson) {
      errors.ContactPerson = "ContactPerson Name is required!";
      setErrCPN(true);
    } else {
      setErrCPN(false);
    }
   if (!values.Comments) {
      errors.Comments = "Remark is required!";
      setErrCOM(true);
    } else {
      setErrCOM(false);
    }
   
    if (!values.Country) {
      errors.Country = "Country Name is required!";
      setErrCountry(true);
    } else {
      setErrCountry(false);
    }
    
    if (!values.CompanyName) {
      errors.CompanyName = "Company Name is required!";
      setErrCN(true);
    } else {
      setErrCN(false);
    } 
    if (!values.Email) {
      errors.Email = "Email is required!";
      setErrEM(true);
    } else if (!regex.test(values.Email)) {
      errors.Email = "This is not a valid email format!";
      setErrEM(true);
    } else {
      setErrEM(false);
    }
    if (!values.Mobile) {
      errors.Mobile = "Contact No. is required";
      setErrMN(true);
    } else if (!phone.test(values.Mobile)) {
      errors.Mobile = "This is not a valid Contact Number";
      setErrMN(true);
    } else {
      setErrMN(false);
    }
    

    return errors;
  };  
  const validateinquiry = (values2) => {
    const errors = {};
    if(!values2.ProductDetail2){
      errors.ProductDetail2="Please Select a Product"
      setErrSP(true)
    }
    else{
      setErrSP(false)
    }if(values2.Quantity===""){
      errors.Quantity="Please Select a Product"
      setErrQU(true)
    }
    else{
      setErrQU(false)
    }

    return errors;
  };

  const validClassMobileNumber =
    errMN && isSubmit ? "form-control is-invalid" : "form-control";
  
  const validClassCountry =
    errCountry && isSubmit ? "form-control is-invalid" : "form-control";
    
  const validClassEmail =
    errEM && isSubmit ? "form-control is-invalid" : "form-control";
  
  const validClassCompanyName =
    errCN && isSubmit ? "form-control is-invalid" : "form-control";
  
 
  const validClassContactPerson =
    errCPN && isSubmit ? "form-control is-invalid" : "form-control";
 const validClassComments=
 errCOM && isSubmit?"form-control is-invalid":"form-control"
 const validClassProduct=
 errSP && isSubmit?"p-0 form-control is-invalid":"p-0 form-control"
 const validClassQuantity=
 errQU && isSubmit?"form-control is-invalid":"form-control"

  const columns = [
    {
      name: "Sr No",
      selector: (row,index) => index+1,
      sortable: true,
      sortField: "srno",
      minWidth: "150px",
    },
    {
      name: "ContactPerson",
      cell: (row) => row.ContactPerson,
      sortable: true,
      sortField: "ContactPerson",
      minWidth: "150px",
    },
    {
      name: "Email",
      cell: (row) => row.Email,
      sortable: true,
      sortField: "Email",
      minWidth: "150px",
    },
    {
      name: "Inquiry No",
      cell: (row) => row._id,
      sortable: true,
      sortField: "_id",
      minWidth: "150px",
    },
    {
      name: "Inquiry Date",
      cell: (row) => row.createdAt.split("T")[0],
      sortable: true,
      sortField: "createdAt",
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
  const [selectProductDetail,setproductdetail] = useState([]);
  const [prod, setprod] = useState("")
  const getallProductDetail=()=>{
    axios
      .get(
        `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/list/projectdetail`)
      .then((response) => {
        if (response.length > 0) {

console.log(response)
        // if (response.length > 0) {
        //   setproductdetail(response);
        // } else if (response.length === 0) {
        //   setproductdetail([]);
        // }
        console.log(response)
          const names = response.map((item)=>({
            value:item._id , label :item.Description,group:item.ProductDetail.ProductGroup
          }
         ));
          
         setproductdetail(names);
        } else if(response.length===0){
            setproductdetail([]);
        }
      });
  }
  const [SupplierNamePlaceholder, setSupplierNamePlaceholder] = useState("")
  const handleSelectSingle =(selectedOption)=>{
    console.log("Selected Specilty:", selectedOption);
    // Update speciality state with the selected option's value
    setprod(selectedOption.label)
    console.log(selectedOption.value)
    setSupplierNamePlaceholder(selectedOption.label)
    values2.ProductDetail2 =selectedOption.value
    values2.ProductDetailLabel=selectedOption.label
    values2.Group=selectedOption.group
}

 


const [allProductDetail, setAllProductDetail]= useState([])
const [allProductId, setAllProductId]= useState([])
const handleUpdateInquiry = () => {
 
 const currentData=new Date();
console.log(values2)
values2.RFQ_Date=currentData;
console.log(currentData)
values2.RFQ_Status2=true
    axios.put(`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/update/InquiryProduct/${rfq}`, values2)
  .then((res) => {
    setUpdateForm(true);
    setShowForm(false);
    console.log(res);
    setSupplierNamePlaceholder("");
    // setAllProductDetail(allProductDetail);
    // Spread operator is not necessary here, use push to add the new id to the array
    // setAllProductId(prevState => [...prevState, res.data._id]); // Assuming _id is in res.data
    // setAllProductDetail(prevState => [...prevState, res.data]);
    setLoadingOption(false);
    setValues2(initialState2);
     

  })
  .catch((err) => {
    console.log(err);
  });

      
  }
const handleAddInquiry = (e) => {
  e.preventDefault();
  setFormErrors(validateinquiry(values2));
  let errors = validateinquiry(values2);
  setFormErrors(errors);
  console.log("The errors are:",errors)
  setIsSubmit(true);

  if(Object.keys(errors).length===0){


    axios.post(`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/create/InquiryProduct`, values2)
  .then((res) => {
    console.log(res);
    setSupplierNamePlaceholder("");
    // Spread operator is not necessary here, use push to add the new id to the array
    setAllProductId(prevState => [...prevState, res.data._id]); // Assuming _id is in res.data
    setAllProductDetail(prevState => [...prevState, res.data]);
    setLoadingOption(false);
    setValues2(initialState2);
     

  })
  .catch((err) => {
    console.log(err);
  });
  }
      
  }
  console.log("This is it",allProductDetail,allProductId)
  const[tempArray, setTempArray] = useState([])
const handleCheckboxChange=(itemKey, default_id)=>{
  console.log(default_id)
  console.log(tempArray.length)
 
    if(tempArray.includes(default_id))
    {
      setTempArray(tempArray.filter((id)=>id !== default_id))
      console.log(tempArray)
    }
    else{
      setTempArray([...tempArray,default_id])
    }
 
  
}
console.log(tempArray)
values2.SupplierName=tempArray
console.log(values)

  document.title = "Company Details | Shreeji Pharma";

  return (
    <>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            
            title="Company Details"
          
          />

          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <Row className="g-4 mb-1">
                    <Col className="col-sm"  lg={4} md={6} sm={6}>
                      <h2 className="card-title mb-0 fs-4 mt-2">
                        Company Details
                      </h2>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      
                        
                          <div
                            style={{
                              display: !showForm || updateForm ? "" : "none",
                            }}
                          >{console.log(showForm)}
                      {console.log(updateForm)}
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
                            {/* <Row>
                              <Col lg={12}>
                                <div className="text-end">
                                  <button
                                    className="btn bg-success text-light mb-3 "
                                    onClick={() => {
                                      setValues(initialState);
                                      setShowForm(false);
                                      setUpdateForm(false);
                                    }}
                                  >
                                    <i class="ri-list-check align-bottom me-1"></i>{" "}
                                    List
                                  </button>
                                </div>
                              </Col>
                            </Row> */}
                            <Col className="col-sm-auto" lg={4} md={12} sm={12}>
                      <div className="d-flex justify-content-sm-end">
                        {/* add btn */}

                        <div
                          style={{
                            display: showForm || updateForm || rfqForm ? "none" : "",
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
                                      getallProductDetail();
                                      setValues(initialState);
                                      setShowForm(!showForm);
                                      setUpdateForm(false);
                                      // setFileId(Math.random() * 100000);
                                    }}
                                    // onClick={() => tog_list()}
                                    // id="create-btn"
                                  >
                                    <i className="ri-add-line align-bottom me-1"></i>
                                    Add
                                  </Button>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </div>

                        {/* update list btn */}
                       
                        <div
                          style={{
                            display: showForm || updateForm ||rfqForm ? "" : "none",
                          }}
                        >
                          <Row>
                            <Col lg={12}>
                              <div className="text-end">
                                <button
                                  className="btn bg-success text-light mb-3 "
                                  onClick={() => {
                                    // setValues(initialState);
                                    setRfqForm(false)
                                    setValues(initialState);
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
                            display: showForm || updateForm || rfqForm ? "none" : "",
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
                                <Col lg={4} md={6}>
                                                    <div className="mb-3">
                                                    <Label>
                                Select Product: {" "}
                                        <span className="text-danger">*</span>
                                      </Label>
                                       <Select
className={validClassProduct}
                                       placeholder={SupplierNamePlaceholder}
                                                            value={prod}
                                                            onChange={handleSelectSingle}
                                                            options={selectProductDetail}
                                                        />
                                                         {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.ProductDetail2}
                                        </p>
                                      )}
                                                    </div>
                                    </Col>
                                 
                                <Col lg={3}>
                                <Label style={{marginBottom:"6px"}}>
                                        Quantity{" "}
                                        <span className="text-danger">*</span>
                                      </Label>
                                    <div className="form-control-sm mb-4 ">
                                      
                                      <Input
                                      className={validClassQuantity}
                                        key={"blogTitle_" + _id}
                                        type="text"
                                      
                                        placeholder="Enter Quantity"
                                        name="Quantity"
                                        value={Quantity}
                                        onChange={handleChange2}

                                      />
                                      
                                      {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.Quantity}
                                        </p>
                                      )}
                                    </div>
                                  </Col>
                                  <Col lg={2}>
                                  <div className="hstack gap-2 justify-content-end">
                                      <button
                                       
                                        type="submit"
                                        className="btn btn-success mt-4  m-1"
                                        id="add-btn"
                                        onClick={ handleAddInquiry}
                                      >
                                        Submit
                                      </button>
                                      
                                    </div>
                                  </Col>
                                  {/* {console.log("Product is",allProductDetail)}
                                  {allProductDetail ? (
                                        <div>
                                            <Row>
                                              {allProductDetail.map((item,index)=>(
                                                <tr key={index}>
                                                  <td>
                                                    {item.Group}
                                                  </td>
                                                  <td>
                                                    {item.ProductDetailLabel}
                                                  </td>
                                                  <td>
                                                    {item.Quantity}
                                                  </td>
                                                  
                                                </tr>
                                              ))}
                                            </Row>
                                        </div>
                                    ) : null} */}
                                 <Row>
                                 <Col lg={3}>
    <Label>
        Contact Person <span className="text-danger ">*</span>
    </Label>
    <div className="form-control-sm mb-3">
        <Input
            key={"contactPerson"}
            type="text"
            className={validClassContactPerson}
            placeholder="Enter contact person"
            required
            name="ContactPerson"
            value={ContactPerson}
            onChange={handleChange}
        />
         {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.ContactPerson}
                                        </p>
                                      )}
    </div>
</Col>

<Col lg={3}>
    <Label>
        Company Name <span className="text-danger">*</span>
    </Label>
    <div className="form-control-sm mb-3">
        <Input
            key={"companyName"}
            type="text"
            className={validClassCompanyName}
            placeholder="Enter company name"
            required
            name="CompanyName"
            value={CompanyName}
            onChange={handleChange}
        />
         {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.CompanyName}
                                        </p>
                                      )}
    </div>
</Col>




<Col md={3}>
<Label>
                                      Country
                                      <span className="text-danger">*</span>
                                    </Label>
                                  <div className="form-control-sm mb-3">
                                    <select
                                      className={validClassCountry}
                                      name="Country"
                                      value={Country}
                                      data-choices
                                      data-choices-sorting="true"
                                      onChange={handleChange}
                                    >
                                      <option>Select Country</option>

                                      {countriesArray.map((c,index) => {
                                        return (
                                          <React.Fragment key={index}>
                                            
                                              <option value={c.value}>
                                                {c.value}
                                              </option>
                                            
                                          </React.Fragment>
                                        );
                                      })}
                                    </select>
                                    
                                    {isSubmit && (
                                      <p className="text-danger">
                                        {formErrors.Country}
                                      </p>
                                    )}
                                  </div>
                                </Col>




<Col lg={3}>
    <Label>
        Mobile <span className="text-danger">*</span>
    </Label>
    <div className="form-control-sm mb-3">
        <Input
            key={"mobile"}
            className={validClassMobileNumber}
            type="tel"
            placeholder="Enter mobile number"
            required
            name="Mobile"
            value={Mobile}
            onChange={handleChange}
        />
         {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.Mobile}
                                        </p>
                                      )}
    </div>
</Col>

<Col lg={3}>
    <Label>
        Email <span className="text-danger">*</span>
    </Label>
    <div className="form-control-sm mb-3">
        <Input
            key={"email"}
            type="email"
            className={validClassEmail}
            placeholder="Enter email"
            required
            name="Email"
            value={Email}
            onChange={handleChange}
        />
         {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.Email}
                                        </p>
                                      )}
    </div>
</Col>

<Col lg={3}>
    <Label>
        Remarks
    </Label>
    <div className="form-control-sm mb-3">
        <Input
            key={"comments"}
            type="text"
            placeholder="Enter Remark"
            className={validClassComments}
            name="Comments"
            value={Comments}
            onChange={handleChange}
        />
         {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.Comments}
                                        </p>
                                      )}
    </div>
</Col>


                                 </Row>
                                 <Row className="mt-4">
{console.log("lol2",allProductDetail)}
  {allProductDetail ? (
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Group</th>
          <th scope="col">ProductName</th>
      
          <th scope="col">Quantity</th>
          
          {/* <th scope="col">Generate RFQ</th> */}
        </tr>
      </thead>
      <tbody>
        {allProductDetail.map((items, index) => (
          <tr key={index}>
            
            <td>{items.Group}</td>
            <td>{items.ProductDetailLabel}</td>
          
            <td>{items.Quantity}</td>
           
          
          <React.Fragment>
              <div className="edit">
        
      
      </div>
            </React.Fragment>
        
            
          </tr>
        ))}
      </tbody>
    </table>
  ) : null}
</Row>

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
                                        onClick={handleSubmit}
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
                

                {/* update form */}
                <div
                  style={{
                    display: !showForm && updateForm ? "block" : "none",
                  }}
                >
                  <CardBody>
                            <div className="live-preview">
                              <Form>
                                <Row>
                               
                                  {/* {allProductDetail ? (
                                        <div>
                                            <Row>
                                              {allProductDetail.map((item,index)=>(
                                                <tr key={index}>
                                                  <td>
                                                    {item.Group}
                                                  </td>
                                                  <td>
                                                    {item.ProductDetailLabel}
                                                  </td>
                                                  <td>
                                                    {item.Quantity}
                                                  </td>
                                                 
                                                </tr>
                                              ))}
                                            </Row>
                                        </div>
                                    ) : null} */}
                                 <Row>
                                 <Col lg={3}>
        <Label>
           Inquiry Number: <span className="text-danger">*</span>
        </Label>
        <div className="form-control-sm mb-3">
            <Input
                key={"contactPerson"}
                type="text"
                placeholder="Enter contact person"
                required
                name="ContactPerson"
                value={initialState.InquiryNo}
                onChange={handleChange}
                disabled // Added disabled attribute
            />
        </div>
    </Col>
    <Col lg={3}>
        <Label>
            Contact Person <span className="text-danger">*</span>
        </Label>
        <div className="form-control-sm mb-3">
            <Input
                key={"contactPerson"}
                type="text"
                placeholder="Enter contact person"
                required
                name="ContactPerson"
                value={ContactPerson}
                onChange={handleChange}
                className={validClassContactPerson}
                 // Added disabled attribute
            />
             {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.ContactPerson}
                                        </p>
                                      )}
        </div>
    </Col>

    <Col lg={3}>
        <Label>
            Company Name <span className="text-danger">*</span>
        </Label>
        <div className="form-control-sm mb-3">
            <Input
                key={"companyName"}
                type="text"
                placeholder="Enter company name"
                required
                name="CompanyName"
                value={CompanyName}
                onChange={handleChange}
                className={validClassCompanyName}
                 // Added disabled attribute
            />
             {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.CompanyName}
                                        </p>
                                      )}
        </div>
    </Col>

    

    <Col md={3}>
<Label>
                                      Country
                                      <span className="text-danger">*</span>
                                    </Label>
                                  <div className="form-control-sm mb-3">
                                    <select
                                      className={validClassCountry}
                                      name="Country"
                                      value={Country}
                                      data-choices
                                      data-choices-sorting="true"
                                      onChange={handleChange}
                                    >
                                      <option>Select Country</option>

                                      {countriesArray.map((c,index) => {
                                        return (
                                          <React.Fragment key={index}>
                                            
                                              <option value={c.value}>
                                                {c.value}
                                              </option>
                                            
                                          </React.Fragment>
                                        );
                                      })}
                                    </select>
                                    
                                    {isSubmit && (
                                      <p className="text-danger">
                                        {formErrors.Country}
                                      </p>
                                    )}
                                  </div>
                                </Col>

    

    <Col lg={3}>
        <Label>
            Mobile <span className="text-danger">*</span>
        </Label>
        <div className="form-control-sm mb-3">
            <Input
                key={"mobile"}
                type="tel"
                placeholder="Enter mobile number"
                required
                name="Mobile"
                value={Mobile}
                onChange={handleChange}
                className={validClassMobileNumber}
                // Added disabled attribute
            />
             {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.Mobile}
                                        </p>
                                      )}
        </div>
    </Col>

    <Col lg={3}>
        <Label>
            Email <span className="text-danger">*</span>
        </Label>
        <div className="form-control-sm mb-3">
            <Input
                key={"email"}
                type="email"
                placeholder="Enter email"
                required
                name="Email"
                value={Email}
                onChange={handleChange}
                className={validClassEmail}
                 // Added disabled attribute
            />
             {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.Email}
                                        </p>
                                      )}
        </div>
    </Col>

    <Col lg={3}>
        <Label>
            Remarks
        </Label>
        <div className="form-control-sm mb-3">
            <Input
                key={"comments"}
                type="text"
                placeholder="Enter Remarks"
                name="Comments"
                value={Comments}
                onChange={handleChange}
                className={validClassComments}
                // Added disabled attribute
            />
             {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.Comments}
                                        </p>
                                      )}
        </div>
    </Col>
</Row>
<Row>
{console.log("lol",ProductDetail)}
  {ProductDetail ? (
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Group</th>
          <th scope="col">ProductName</th>
      
          <th scope="col">Quantity</th>
          
          {/* <th scope="col">Generate RFQ</th> */}
        </tr>
      </thead>
      <tbody>
        {ProductDetail.map((items, index) => (
          <tr key={index}>
            
            <td>{items.Group}</td>
            <td>{items.ProductDetailLabel}</td>
          
            <td>{items.Quantity}</td>
           
          
          <React.Fragment>
              <div className="edit">
        
      
      </div>
            </React.Fragment>
        
            
          </tr>
        ))}
      </tbody>
    </table>
  ) : null}
</Row>


                              

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
                          </CardBody>
                </div>

                  {/* rfq Form */}
                  <div
  style={{
    display: !updateForm && rfqForm ? "block" : "none",
  }}
>{
  console.log(showForm)
}
  <CardBody>
    <Row>
    <Col lg={4}>
        <Label>
        Product Detail  <span className="text-danger">*</span>
        </Label>
        <div className="form-floating">
            <Input
                key={"ProductDetailLabel"}
                type="text"
                placeholder="Enter contact person"
                required
                name="ProductDetailLabel"
                value={values2.ProductDetailLabel}
                onChange={handleChange2}
                 // Added disabled attribute
            />
        </div>
    </Col>
   
  
    <Col lg={4}>
        <Label>
        Quantity <span className="text-danger">*</span>
        </Label>
        <div className="form-floating">
            <Input
                key={"Quantity"}
                type="text"
                placeholder="Enter contact person"
                required
                name="Quantity"
                value={values2.Quantity}
                onChange={handleChange2}
                 // Added disabled attribute
            />
        </div>
    </Col>
    <Col lg={6}>
                                  {data.map((items,index)=>{
                                    return(
                                      <Row className="px-5" key={index}>
                                        <Col lg={12}>
                                       <Input 
                                       defaultChecked={false}
                                        type="checkbox"
                                        onClick={()=>handleCheckboxChange(index,items.default_id)}
                                       />
                                       <Label className="ms-3">{items.SupplierName}</Label>
                                        </Col>
                                      </Row>
                                    )
                                  })}
                                 </Col>
                                 <Col lg={12}>
                                    <div className="hstack gap-2 justify-content-end">
                                      <button
                                        type="submit"
                                        className="btn btn-success  m-1"
                                        id="add-btn"
                                        onClick={handleUpdateInquiry}
                                      >
                                        Update
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-outline-danger m-1"
                                        onClick={handleRFQCancel}
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </Col>
    </Row>
  </CardBody>
</div>




                {/* list  */}
                <div
                  style={{ display: showForm || updateForm || rfqForm ? "none" : "block"  }}
                >
                  <CardBody>
                    <div>
                      <div className="table-responsive table-card mt-1 mb-1 text-right">
                        {/* <Table columns={col} dataSource={details}></Table> */}
                        {console.log("Col:",columns)}
                        <DataTable
                          columns={columns}
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
      <Modal
        isOpen={modal_delete}
        toggle={() => {
          tog_delete();
          setValues([]);
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
    </>
  );
};

export default ProductInquiry;
