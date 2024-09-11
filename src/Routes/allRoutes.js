import React from "react";
import { Navigate } from "react-router-dom";
import NewProduct from "../pages/Productsssss/NewProduct";
// import Country from "../pages/LocationSetUp/Country/Country";
// import City from "../pages/LocationSetUp/City/City";
// import State from "../pages/LocationSetUp/State/State";
// import CompanyLocation from "../pages/LocationSetUp/CompanyLocation";
import Login from "../pages/Authentication/Login";
// import Category from "../pages/Category/Category";
// import Blogs from "../pages/Blogs/Blogs";
// import PromocodeMaster from "../pages/Subscription/PromocodeMaster";
// import ProductDetails from "../pages/Products/ProductsDetails";
// import UserProfile from "../pages/Authentication/user-profile";
// import Banner from "../pages/CMS/Banner";
// import CompanyDetails from "../pages/Setup/CompanyDetails";
// import AdminUser from "../pages/Auth/AdminUser";
// import ContactUs from "../pages/CMS/ContactUs";
// import Review from "../pages/CMS/Review";
// import NewProject from "../pages/CMS/NewProject";
// import GetInTouch from "../pages/GetInTouch/GetInTouch";
// import UserSignIn from "../pages/UserSignIn/usersignin";
// import Roles from "../pages/Roles/Roles";
// import ProductInquiry from "../pages/Inquiry/ProductInquiry";
// import Preferences from "../pages/Preferences/Preferences";

// import ProductGroup from "../pages/ProductGroup/ProductGroup";
// import ProductDetail from "../pages/ProductDetail/ProductDetail";

// import Newspaper from "../pages/SubscribeNewspaper/Newspaper";
// import Feature from "../pages/Feature/Feature";
// import CmsMaster from "../pages/CMS/CmsMaster";
// import OtherProducts from "../pages/OtherProducts/OtherProducts";
// import Supplier from "../pages/SupplierSetup/SupplierSetup";
// import SupplierQuote from "../pages/SupplierQuote/SupplierQuote";
// import AssignProduct from "../pages/SupplierSetup/AssignProduct";
// import GalleryPhotos from "../pages/GalleryPhotos/GalleryPhotos";
// import ContactInquiry from "../pages/Inquiry/ContactInquiry";
// import SupplierWiseProductReport from "../pages/Report/SupplierWiseProduct";

// import Cms from "../pages/CMSshreeji/cmsShreeji";
// import Commitment from "../pages/CMSshreeji/Commitment";
// import Certificate from "../pages/CMSshreeji/Certificate";
// import StatusReport from "../pages/Report/StatusReport";

// import ServiceGroup from "../pages/Services/ServiceGroup";
// import CountryWiseReport from "../pages/Report/CountryWiseReports";
// import Newsletter from "../pages/CMSshreeji/Newsletter";
// import ServiceDetail from "../pages/Services/ServiceDetails";
const authProtectedRoutes = [
  // { path: "/dashboard", component: <DashboardCrm /> },
  // { path: "/profile", component: <UserProfile /> },
  { path: "/newproducts", component: <NewProduct /> },
  // { path: "/country", component: <Country /> },
  // { path: "/city", component: <City /> },
  // { path: "/state", component: <State /> },
  // { path: "/location", component: <CompanyLocation /> },
  // { path: "/admin-user", component: <AdminUser /> },
  // { path: "/company-details", component: <CompanyDetails /> },
  // { path: "/contact", component: <ContactUs /> },
  // { path: "/category", component: <Category /> },
  // { path: "/review", component: <Review /> },
  // { path: "/blogs", component: <Blogs /> },
  // { path: "/banner", component: <Banner /> },
  // { path: "/promocode-master", component: <PromocodeMaster /> },
  // { path: "/newproject", component: <NewProject /> },
  // { path: "/product-details", component: <ProductDetails /> },
  // { path: "/service-details", component: <ServiceDetail /> },

  // {path:"/getintouch",component:<GetInTouch/>},
  // {path:"/roles",component:<Roles/>},
  // {path:"/product-inquiry",component:<ProductInquiry/>},
  // {path:"/gallery-photos",component:<GalleryPhotos/>},
  // {path:"/banner-master",component:<Banner/>},

  // {path:"/product-group",component:<ProductGroup/>},
  // {path:"/product-detail",component:<ProductDetail/>},
  // {path:"/user-signin",component:<UserSignIn/>},
  // {path:"/other-products",component:<OtherProducts/>},
  // {path:"/supplier",component:<Supplier/>},
  // {path:"/assign-product", component:<AssignProduct />},
  // {path:"/supplier-quote",component:<SupplierQuote/>},
  // {path:"/preferences",component:<Preferences/>},
  // {path:"/contact-inquiry",component:<ContactInquiry/>},
  // {path:"/supplier-wise-product",component:<SupplierWiseProductReport/>},
  // {path:"/cms",component:<Cms/>},
  // {path:"/status-report",component:<StatusReport/>},
  // {path:"/newsletter",component:<Newsletter/>},
  // {path:"/service-group",component:<ServiceGroup/>},
  


  // { path: "/product-group", component: <ProductGroup /> },
  // { path: "/product-detail", component: <ProductDetail /> },
  // { path: "/user-signin", component: <UserSignIn /> },
  // { path: "/other-products", component: <OtherProducts /> },
  // { path: "/supplier", component: <Supplier /> },
  // { path: "/assign-product", component: <AssignProduct /> },
  // { path: "/supplier-quote", component: <SupplierQuote /> },
  // { path: "/preferences", component: <Preferences /> },
  // { path: "/contact-inquiry", component: <ContactInquiry /> },
  // { path: "/supplier-wise-product", component: <SupplierWiseProductReport /> },


  // {path:"/newspaper",component:<Newspaper/>},
  // {path:"/feature",component:<Feature/>},
  // {path:"/cmsmaster",component:<CmsMaster/>},
  // {path:"/commitment",component:<Commitment />},
  // {path:"/certificate",component:<Certificate />},


  {
    path: "/",
    exact: true,
    component: <Navigate to="/category" />,
  },
  // { path: "*", component: <Navigate to="/category" /> },
  // { path: "/country-wise-report", component: <CountryWiseReport /> },
];

const publicRoutes = [
  // { path: "/dashboard", component: <DashboardCrm /> },
  { path: "/", component: <Login /> },
];

export { authProtectedRoutes, publicRoutes };
