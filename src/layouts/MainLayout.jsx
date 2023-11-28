import { Outlet } from "react-router-dom";

// import component
import TopNavbar from "../components/TopNavbar";
import DynamicPageTitle from "../components/DynamicPageTitle";

//mengatur route yang akan ditampilkan di navbar
const routes = [
    {
        path: "/",
        name: "Home"
    },
    {
        path: "/login",
        name: "Admin Login",
    },
];

/* eslint-disable react/prop-types */
const MainLayout = ({ children }) => {
    return (
        <div className="mt-4 pt-5"> <DynamicPageTitle />
            <TopNavbar routes={routes} />
            {children ? children : <Outlet />}
            <footer className="container d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top"> <div className="col-md-4 d-flex align-items-center">
                <span className="mb-3 mb-md- text-body-secondary">© 2023 by Grand Atma</span>
            </div>
            </footer>
        </div>
    );
};
export default MainLayout;