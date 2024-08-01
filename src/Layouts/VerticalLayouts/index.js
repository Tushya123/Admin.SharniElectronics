// import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
// import { Collapse } from "reactstrap";

// // Import Data
// import navdata from "../LayoutMenuData";
// //i18n
// import { withTranslation } from "react-i18next";
// import withRouter from "../../Components/Common/withRouter";

// const VerticalLayout = (props) => {
//   const [locationSetup, setLocationSetup] = useState(false);
//   const [setup, setSetup] = useState(false);
//   const [params, setParams] = useState(false);

//   const [product, setproduct] = useState(false);
//   const [order, setOrder] = useState(false);
//   const [category, setCategory] = useState(false);
//   const [subs, setSubs] = useState(false);
//   const [inquiry, setInquiry] = useState(false);
//   const [policy, setPolicy] = useState(false);
//   const [cms, setCMS] = useState(false);

//   const navData = navdata().props.children;
//   const path = props.router.location.pathname;

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//     const initMenu = () => {
//       const pathName = process.env.PUBLIC_URL + path;
//       const ul = document.getElementById("navbar-nav");
//       const items = ul.getElementsByTagName("a");
//       let itemsArray = [...items]; // converts NodeList to Array
//       removeActivation(itemsArray);
//       let matchingMenuItem = itemsArray.find((x) => {
//         return x.pathname === pathName;
//       });
//       if (matchingMenuItem) {
//         activateParentDropdown(matchingMenuItem);
//       }
//     };
//     if (props.layoutType === "vertical") {
//       initMenu();
//     }
//   }, [path, props.layoutType]);

//   function activateParentDropdown(item) {
//     item.classList.add("active");
//     let parentCollapseDiv = item.closest(".collapse.menu-dropdown");

//     if (parentCollapseDiv) {
//       // to set aria expand true remaining
//       parentCollapseDiv.classList.add("show");
//       parentCollapseDiv.parentElement.children[0].classList.add("active");
//       parentCollapseDiv.parentElement.children[0].setAttribute(
//         "aria-expanded",
//         "true"
//       );
//       if (parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown")) {
//         parentCollapseDiv.parentElement
//           .closest(".collapse")
//           .classList.add("show");
//         if (
//           parentCollapseDiv.parentElement.closest(".collapse")
//             .previousElementSibling
//         )
//           parentCollapseDiv.parentElement
//             .closest(".collapse")
//             .previousElementSibling.classList.add("active");
//         if (
//           parentCollapseDiv.parentElement
//             .closest(".collapse")
//             .previousElementSibling.closest(".collapse")
//         ) {
//           parentCollapseDiv.parentElement
//             .closest(".collapse")
//             .previousElementSibling.closest(".collapse")
//             .classList.add("show");
//           parentCollapseDiv.parentElement
//             .closest(".collapse")
//             .previousElementSibling.closest(".collapse")
//             .previousElementSibling.classList.add("active");
//         }
//       }
//       return false;
//     }
//     return false;
//   }

//   const removeActivation = (items) => {
//     let actiItems = items.filter((x) => x.classList.contains("active"));

//     actiItems.forEach((item) => {
//       if (item.classList.contains("menu-link")) {
//         if (!item.classList.contains("active")) {
//           item.setAttribute("aria-expanded", false);
//         }
//         if (item.nextElementSibling) {
//           item.nextElementSibling.classList.remove("show");
//         }
//       }
//       if (item.classList.contains("nav-link")) {
//         if (item.nextElementSibling) {
//           item.nextElementSibling.classList.remove("show");
//         }
//         item.setAttribute("aria-expanded", false);
//       }
//       item.classList.remove("active");
//     });
//   };

//   return (
//     <React.Fragment>
//       {/* menu Items */}
//       {/* <li className="menu-title">
//         <span data-key="t-menu">Menu</span>
//       </li> */}
// <br />
// <br />

//           <ul className="nav nav-sm flex-column test">
//             <li className="nav-item">
//               <Link to="/company-details" className="nav-link">
//                 Company Details
//               </Link>
//             </li>

//             <li className="nav-item">
//               <Link to="/admin-user" className="nav-link">
//                 Admin Users
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to="/getintouch" className="nav-link">
//                 GetInTouch
//               </Link>
//             </li>

//             <li className="nav-item">
//               <Link to="/service-type" className="nav-link">
//                 ServiceType
//               </Link>
//             </li> <li className="nav-item">
//               <Link to="/service-detail" className="nav-link">
//                 Service Details
//               </Link>
//             </li>

//             <li className="nav-item">
//               <Link to="/newspaper" className="nav-link">
//                 Subscribe Newspaper
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to="/feature" className="nav-link">
//                 Features
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to="/cmsmaster" className="nav-link">
//                 Cms Master
//               </Link>
//             </li>
//             {/* <li className="nav-item">
//               <Link
//                 className="nav-link menu-link"
//                 to="#"
//                 data-bs-toggle="collapse"
//                 onClick={() => {
//                   setLocationSetup(!locationSetup);
//                 }}
//               >
//                 <span data-key="t-apps"> Location Setup </span>
//               </Link>
//               <Collapse
//                 className="menu-dropdown"
//                 isOpen={locationSetup}
//                 //   id="sidebarApps"
//               >
//                 <ul className="nav nav-sm flex-column test">
//                   <li className="nav-item">
//                     <Link to="/country" className="nav-link">
//                       Country
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/state" className="nav-link">
//                       State
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/city" className="nav-link">
//                       City
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/location" className="nav-link">
//                       Company Location
//                     </Link>
//                   </li>
//                 </ul>
//               </Collapse>
//             </li> */}
//           </ul>

//       {/* <li className="nav-item">
//         <Link
//           className="nav-link menu-link"
//           to="#"
//           data-bs-toggle="collapse"
//           onClick={() => {
//             setParams(!params);
//           }}
//         >
//           <span data-key="t-apps"> Parameters </span>
//         </Link>

//         <Collapse className="menu-dropdown" isOpen={params}>
//           <ul className="nav nav-sm flex-column test">
//             <li className="nav-item">
//               <Link
//                 className="nav-link menu-link"
//                 to="#"
//                 data-bs-toggle="collapse"
//                 onClick={() => {
//                   setCategory(!category);
//                 }}
//               >
//                 <span data-key="t-apps"> Category Master</span>
//               </Link>
//               <Collapse className="menu-dropdown" isOpen={category}>
//                 <ul className="nav nav-sm flex-column test">
//                   <li className="nav-item">
//                     <Link className="nav-link menu-link" to="/category">
//                       <span data-key="t-apps">Products Category </span>
//                     </Link>
//                   </li>
//                 </ul>
//               </Collapse>
//             </li>
//           </ul>
//         </Collapse>
//       </li> */}

//       {/* <li className="nav-item">
//         <Link
//           className="nav-link menu-link"
//           to="#"
//           data-bs-toggle="collapse"
//           onClick={() => {
//             setproduct(!product);
//           }}
//         >
//           <span data-key="t-apps"> Product Master </span>
//         </Link>
//         <Collapse
//           className="menu-dropdown"
//           isOpen={product}
//           //   id="sidebarApps"
//         >
//           <ul className="nav nav-sm flex-column test">
//             <li className="nav-item">
//               <Link to="/product-details" className="nav-link">
//                 Product Details
//               </Link>
//             </li>
//           </ul>
//         </Collapse>
//       </li> */}

//       {/* <li className="nav-item">
//         <Link
//           className="nav-link menu-link"
//           to="#"
//           data-bs-toggle="collapse"
//           onClick={() => {
//             setPolicy(!policy);
//           }}
//         >
//           <span data-key="t-apps"> Policy and Promos</span>
//         </Link>
//         <Collapse className="menu-dropdown" isOpen={policy}>
//           <ul className="nav nav-sm flex-column test"></ul>
//           <ul className="nav nav-sm flex-column test">
//             <li className="nav-item">
//               <Link to="/promocode-master" className="nav-link">
//                 Promocode Master
//               </Link>
//             </li>
//           </ul>
//           <ul className="nav nav-sm flex-column test"></ul>
//         </Collapse>
//       </li> */}

//       {/* <li className="nav-item">
//         <Link
//           className="nav-link menu-link"
//           to="#"
//           data-bs-toggle="collapse"
//           onClick={() => {
//             setCMS(!cms);
//           }}
//         >
//           <span data-key="t-apps"> CMS </span>
//         </Link>
//         <Collapse
//           className="menu-dropdown"
//           isOpen={cms}
//           //   id="sidebarApps"
//         >
//           <ul className="nav nav-sm flex-column test">
//             <li className="nav-item">
//               <Link className="nav-link menu-link" to="/blogs">
//                 <span data-key="t-apps">Blogs </span>
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link menu-link" to="/contact">
//                 <span data-key="t-apps">Footer </span>
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link menu-link" to="/newproject">
//                 <span data-key="t-apps">New Project </span>
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link menu-link" to="/review">
//                 <span data-key="t-apps">User Review </span>
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link menu-link" to="/banner">
//                 <span data-key="t-apps">Banner </span>
//               </Link>
//             </li>
//           </ul>
//         </Collapse>
//       </li> */}
//     </React.Fragment>
//   );
// };

// VerticalLayout.propTypes = {
//   location: PropTypes.object,
//   t: PropTypes.any,
// };

// export default withRouter(withTranslation()(VerticalLayout));
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Collapse } from "reactstrap";

// Import Data
import navdata from "../LayoutMenuData";
//i18n
import { withTranslation } from "react-i18next";
import withRouter from "../../Components/Common/withRouter";

const VerticalLayout = (props) => {
  const [locationSetup, setLocationSetup] = useState(false);
  const [setup, setSetup] = useState(false);
  const [params, setParams] = useState(false);

  const [product, setproduct] = useState(false);
  const [service, setservice] = useState(false);
  const [order, setOrder] = useState(false);
  const [category, setCategory] = useState(false);
  const [subs, setSubs] = useState(false);
  const [inquiry, setInquiry] = useState(false);
  const [policy, setPolicy] = useState(false);
  const [cms, setCMS] = useState(false);
  const [supplier, setsupplier] = useState(false);
  const [inquiry1, setinquiry1] = useState(false);
  const [preferences, setpreferences] = useState(false);
  const [gallery, setgallery] = useState(false);
  const [reports, setreports] = useState(false);
  const [cmsss, setcmsss] = useState(false);
  const [cmsmaster, setCMSMaster] = useState(false);
  const navData = navdata().props.children;
  const path = props.router.location.pathname;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const initMenu = () => {
      const pathName = process.env.PUBLIC_URL + path;
      const ul = document.getElementById("navbar-nav");
      const items = ul.getElementsByTagName("a");
      let itemsArray = [...items]; // converts NodeList to Array
      removeActivation(itemsArray);
      let matchingMenuItem = itemsArray.find((x) => {
        return x.pathname === pathName;
      });
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem);
      }
    };
    if (props.layoutType === "vertical") {
      initMenu();
    }
  }, [path, props.layoutType]);

  function activateParentDropdown(item) {
    item.classList.add("active");
    let parentCollapseDiv = item.closest(".collapse.menu-dropdown");

    if (parentCollapseDiv) {
      // to set aria expand true remaining
      parentCollapseDiv.classList.add("show");
      parentCollapseDiv.parentElement.children[0].classList.add("active");
      parentCollapseDiv.parentElement.children[0].setAttribute(
        "aria-expanded",
        "true"
      );
      if (parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown")) {
        parentCollapseDiv.parentElement
          .closest(".collapse")
          .classList.add("show");
        if (
          parentCollapseDiv.parentElement.closest(".collapse")
            .previousElementSibling
        )
          parentCollapseDiv.parentElement
            .closest(".collapse")
            .previousElementSibling.classList.add("active");
        if (
          parentCollapseDiv.parentElement
            .closest(".collapse")
            .previousElementSibling.closest(".collapse")
        ) {
          parentCollapseDiv.parentElement
            .closest(".collapse")
            .previousElementSibling.closest(".collapse")
            .classList.add("show");
          parentCollapseDiv.parentElement
            .closest(".collapse")
            .previousElementSibling.closest(".collapse")
            .previousElementSibling.classList.add("active");
        }
      }
      return false;
    }
    return false;
  }

  const removeActivation = (items) => {
    let actiItems = items.filter((x) => x.classList.contains("active"));

    actiItems.forEach((item) => {
      if (item.classList.contains("menu-link")) {
        if (!item.classList.contains("active")) {
          item.setAttribute("aria-expanded", false);
        }
        if (item.nextElementSibling) {
          item.nextElementSibling.classList.remove("show");
        }
      }
      if (item.classList.contains("nav-link")) {
        if (item.nextElementSibling) {
          item.nextElementSibling.classList.remove("show");
        }
        item.setAttribute("aria-expanded", false);
      }
      item.classList.remove("active");
    });
  };

  return (
    <React.Fragment>
      {/* menu Items */}
      {/* <li className="menu-title">
        <span data-key="t-menu">Menu</span>
      </li> */}
      <li className="nav-item">
        <Link
          // className="nav-link menu-link"
          // to="#"

          data-bs-toggle="collapse"
          onClick={() => {
            setSetup(!setup);
          }}
        >
          {/* <span data-key="t-apps"> </span> */}
        </Link>

        <Collapse className="menu-dropdown" isOpen={setup}>
          <ul className="nav nav-sm flex-column test">
            <li className="nav-item">
              <Link to="/company-details" className="nav-link">
                Company Details
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/admin-user" className="nav-link">
                Admin Users
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/getintouch" className="nav-link">
                GetInTouch
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/newspaper" className="nav-link">
                Subscribe Newspaper
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/feature" className="nav-link">
                Features
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link to="/cmsmaster" className="nav-link">
                Cms Master
              </Link>
            </li> */}
            {/* <li className="nav-item">
              <Link
                className="nav-link menu-link"
                to="#"
                data-bs-toggle="collapse"
                onClick={() => {
                  setLocationSetup(!locationSetup);
                }}
              >
                <span data-key="t-apps"> Location Setup </span>
              </Link>
              <Collapse
                className="menu-dropdown"
                isOpen={locationSetup}
                //   id="sidebarApps"
              >
                <ul className="nav nav-sm flex-column test">
                  <li className="nav-item">
                    <Link to="/country" className="nav-link">
                      Country
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/state" className="nav-link">
                      State
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/city" className="nav-link">
                      City
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/location" className="nav-link">
                      Company Location
                    </Link>
                  </li>
                </ul>
              </Collapse>
            </li> */}
          </ul>
        </Collapse>
      </li>
      <li className="nav-item">
        <Link to="/admin-user" className="nav-link">
          Admin User
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className="nav-link menu-link"
          to="#"
          data-bs-toggle="collapse"
          onClick={() => {
            setCMS(!cms);
          }}
        >
          <span data-key="t-apps"> Product Setup </span>
        </Link>
        <Collapse
          className="menu-dropdown"
          isOpen={cms}
          //   id="sidebarApps"
        >
          <ul className="nav nav-sm flex-column test">
            {/* <li className="nav-item">
              {" "}
              <Link to="/company-details" className="nav-link">
                Company Details
              </Link>
            </li>
            <li className="nav-item">
              {" "}
              <Link to="/admin-user" className="nav-link">
                {" "}
                Admin Users{" "}
              </Link>
            </li> */}
            {/* <li className="nav-item">
              <Link to="/user-signin" className="nav-link">
                User Details
              </Link>
            {/* </li> */}
            {/* <li className="nav-item">
              <Link to="/roles" className="nav-link">
                Roles
              </Link>
            </li> */}
            {/* <li className="nav-item">
              {" "}
              <Link to="/getintouch" className="nav-link">
                GetInTouch
              </Link>
            </li> */}
            <li className="nav-item">
              <Link to="/product-group" className="nav-link">
                Product Group
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/product-detail" className="nav-link">
                Product Details
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link to="/other-products" className="nav-link">
                 Other Products
               </Link>
             </li> */}
            {/* <li className="nav-item">
          <Link to="/newspaper" className="nav-link">
                 Subscribe Newspaper
               </Link>
             </li>
           
           
            <li className="nav-item">
               <Link to="/feature" className="nav-link">
                 Features
               </Link>
             </li>
             <li className="nav-item">
            <Link to="/cmsmaster" className="nav-link">                Cms Master
              </Link>
            </li> */}
          </ul>
        </Collapse>
        <Link
          className="nav-link menu-link"
          to="#"
          data-bs-toggle="collapse"
          onClick={() => {
            setservice(!service);
          }}
        >
          <span data-key="t-apps"> Service Setup </span>
        </Link>
        <Collapse
          className="menu-dropdown"
          isOpen={service}
          //   id="sidebarApps"
        >
          <ul className="nav nav-sm flex-column test">
            {/* <li className="nav-item">
              {" "}
              <Link to="/company-details" className="nav-link">
                Company Details
              </Link>
            </li>
            <li className="nav-item">
              {" "}
              <Link to="/admin-user" className="nav-link">
                {" "}
                Admin Users{" "}
              </Link>
            </li> */}
            {/* <li className="nav-item">
              <Link to="/user-signin" className="nav-link">
                User Details
              </Link>
            {/* </li> */}
            {/* <li className="nav-item">
              <Link to="/roles" className="nav-link">
                Roles
              </Link>
            </li> */}
            {/* <li className="nav-item">
              {" "}
              <Link to="/getintouch" className="nav-link">
                GetInTouch
              </Link>
            </li> */}
            <li className="nav-item">
              <Link to="/service-group" className="nav-link">
                Service Group
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/service-details" className="nav-link">
                Service Detail
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link to="/other-products" className="nav-link">
                 Other Products
               </Link>
             </li> */}
            {/* <li className="nav-item">
          <Link to="/newspaper" className="nav-link">
                 Subscribe Newspaper
               </Link>
             </li>
           
           
            <li className="nav-item">
               <Link to="/feature" className="nav-link">
                 Features
               </Link>
             </li>
             <li className="nav-item">
            <Link to="/cmsmaster" className="nav-link">                Cms Master
              </Link>
            </li> */}
          </ul>
        </Collapse>
      </li>
      <li className="nav-item">
        <Link
          className="nav-link menu-link"
          to="#"
          data-bs-toggle="collapse"
          onClick={() => {
            setsupplier(!supplier);
          }}
        >
          <span data-key="t-apps"> Supplier Setup </span>
        </Link>
        <Collapse
          className="menu-dropdown"
          isOpen={supplier}
          //   id="sidebarApps"
        >
          <ul className="nav nav-sm flex-column test">
            {/* <li className="nav-item">
              {" "}
              <Link to="/company-details" className="nav-link">
                Company Details
              </Link>
            </li> */}
            {/* <li className="nav-item">
              {" "}
              <Link to="/admin-user" className="nav-link">
                {" "}
                Admin Users{" "}
              </Link>
            </li> */}
            {/* <li className="nav-item">
              <Link to="/user-signin" className="nav-link">
                User Details
              </Link>
            {/* </li> */}
            {/* <li className="nav-item">
              <Link to="/roles" className="nav-link">
                Roles
              </Link>
            </li> */}
            {/* <li className="nav-item">
              {" "}
              <Link to="/getintouch" className="nav-link">
                GetInTouch
              </Link>
            </li> */}
            {/* <li className="nav-item">
              <Link to="/service-type" className="nav-link">
                ServiceType
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/service-detail" className="nav-link">
                 Service Details
               </Link>
             </li><li className="nav-item">
              <Link to="/inquiry" className="nav-link">
                 Inquiry
               </Link>
             </li> */}
            <li className="nav-item">
              <Link to="/supplier" className="nav-link">
                Supplier
              </Link>
            </li>

            <li className="nav-item">
              {/* <Link to="/supplier-quote" className="nav-link">
                Supplier Quote
              </Link> */}
              <Link to="/assign-product" className="nav-link">
                Assign product
              </Link>
            </li>
            {/* <li className="nav-item">
            <Link to="/cmsmaster" className="nav-link">                Cms Master
              </Link>
            </li> */}
          </ul>
        </Collapse>
      </li>
      <li className="nav-item">
        <Link
          className="nav-link menu-link"
          to="#"
          data-bs-toggle="collapse"
          onClick={() => {
            setinquiry1(!inquiry1);
          }}
        >
          <span data-key="t-apps"> Inquiry Management </span>
        </Link>
        <Collapse
          className="menu-dropdown"
          isOpen={inquiry1}
          //   id="sidebarApps"
        >
          <ul className="nav nav-sm flex-column test">
            {/* <li className="nav-item">
              {" "}
              <Link to="/company-details" className="nav-link">
                Company Details
              </Link>
            </li>
            <li className="nav-item">
              {" "}
              <Link to="/admin-user" className="nav-link">
                {" "}
                Admin Users{" "}
              </Link>
            </li> */}
            {/* <li className="nav-item">
              <Link to="/user-signin" className="nav-link">
                User Details
              </Link>
            {/* </li> */}
            {/* <li className="nav-item">
              <Link to="/roles" className="nav-link">
                Roles
              </Link>
            </li> */}
            {/* <li className="nav-item">
              {" "}
              <Link to="/getintouch" className="nav-link">
                GetInTouch
              </Link>
            </li> */}
            {/* <li className="nav-item">
              <Link to="/service-type" className="nav-link">
                ServiceType
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/service-detail" className="nav-link">
                 Service Details
               </Link>
             </li> */}
            <li className="nav-item">
              <Link to="/product-inquiry" className="nav-link">
                Product Inquiry
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact-inquiry" className="nav-link">
                Contact Inquiry
              </Link>
            </li>
          </ul>
        </Collapse>
      </li>
      <li className="nav-item">
        <Link
          className="nav-link menu-link"
          to="#"
          data-bs-toggle="collapse"
          onClick={() => {
            setpreferences(!preferences);
          }}
        >
          <span data-key="t-apps"> Preferences</span>
        </Link>
        <Collapse
          className="menu-dropdown"
          isOpen={preferences}
          //   id="sidebarApps"
        >
          <ul className="nav nav-sm flex-column test">
            <li className="nav-item">
              <Link to="/preferences" className="nav-link">
                Preferences
              </Link>
            </li>
          </ul>
        </Collapse>
      </li>
      <li className="nav-item">
        <Link
          className="nav-link menu-link"
          to="#"
          data-bs-toggle="collapse"
          onClick={() => {
            setgallery(!gallery);
          }}
        >
          <span data-key="t-apps"> Gallery Management </span>
        </Link>
        <Collapse
          className="menu-dropdown"
          isOpen={gallery}
          //   id="sidebarApps"
        >
          <ul className="nav nav-sm flex-column test">
            {/* <li className="nav-item">
              {" "}
              <Link to="/company-details" className="nav-link">
                Company Details
              </Link>
            </li>
            <li className="nav-item">
              {" "}
              <Link to="/admin-user" className="nav-link">
                {" "}
                Admin Users{" "}
              </Link>
            </li> */}
            {/* <li className="nav-item">
              <Link to="/user-signin" className="nav-link">
                User Details
              </Link>
            {/* </li> */}
            <li className="nav-item">
              <Link to="/category" className="nav-link">
                Category
              </Link>
            </li>
            <li className="nav-item">
              {" "}
              <Link to="/gallery-photos" className="nav-link">
                Gallery Photos
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link to="/service-type" className="nav-link">
                ServiceType
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/service-detail" className="nav-link">
                 Service Details
               </Link>
             </li><li className="nav-item">
              <Link to="/inquiry" className="nav-link">
                 Inquiry
               </Link>
             </li>
             <li className="nav-item">
          <Link to="/newspaper" className="nav-link">
                 Subscribe Newspaper
               </Link>
             </li> */}

            {/*            
            <li className="nav-item">
               <Link to="/feature" className="nav-link">
                 Features
               </Link>
             </li>
             <li className="nav-item">
            <Link to="/cmsmaster" className="nav-link">                Cms Master
              </Link>
            </li>
             */}
          </ul>
        </Collapse>

        {/* <Link
          className="nav-link menu-link"
          to="#"
          data-bs-toggle="collapse"
          onClick={() => {
            setreports(!reports);
          }}
        >
          <span data-key="t-apps"> CMS </span>
        </Link> */}
        <Collapse
          className="menu-dropdown"
          isOpen={reports}
          //   id="sidebarApps"
        >
          <ul className="nav nav-sm flex-column test">
            <li className="nav-item">
              <Link to="/cmsmaster" className="nav-link">
                Cms Master
              </Link>
            </li>
          </ul>
        </Collapse>
      </li>{" "}
      <li className="nav-item">
        <Link
          className="nav-link menu-link"
          to="#"
          data-bs-toggle="collapse"
          onClick={() => {
            setcmsss(!cmsss);
          }}
        >
          <span data-key="t-apps"> Reports </span>
        </Link>
        <Collapse
          className="menu-dropdown"
          isOpen={cmsss}
          //   id="sidebarApps"
        >
          <ul className="nav nav-sm flex-column test">
            {/* <li className="nav-item">
              <Link to="/cmsmaster" className="nav-link">
                {" "}
                Cms Master
              </Link>
            </li>{" "} */}
            <li className="nav-item">
              <Link to="/supplier-wise-product" className="nav-link">
                {" "}
                Supplier Wise Product
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/country-wise-report" className="nav-link">
                {" "}
                Customer List Country Wise
              </Link>
            </li>{" "}
            <li className="nav-item">
              <Link to="/status-report" className="nav-link">
                {" "}
                Status Report
              </Link>
            </li>
          </ul>
        </Collapse>
      </li>
      <li className="nav-item">
        <Link
          className="nav-link menu-link"
          to="#"
          data-bs-toggle="collapse"
          onClick={() => {
            setCMSMaster(!cmsmaster);
          }}
        >
          <span data-key="t-apps">Master </span>
        </Link>
        <Collapse
          className="menu-dropdown"
          isOpen={cmsmaster}
          //   id="sidebarApps"
        >
          <ul className="nav nav-sm flex-column test">
            <li className="nav-item">
              <Link to="/cms" className="nav-link">
                CMS Master
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/commitment" className="nav-link">
                Commitment Master
              </Link>
            </li>{" "}
            <li className="nav-item">
              <Link to="/newsletter" className="nav-link">
                Newsletter
              </Link>
            </li>{" "}
            <li className="nav-item">
              <Link to="/banner" className="nav-link">
                Banner Master
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/certificate" className="nav-link">
                Certificate Master
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link menu-link" to="/blogs">
                <span data-key="t-apps">Blogs </span>
              </Link>
            </li>
          </ul>
        </Collapse>
      </li>
    </React.Fragment>
  );
};

VerticalLayout.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(VerticalLayout));
