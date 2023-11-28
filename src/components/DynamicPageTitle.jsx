import { Helmet, HelmetProvider } from "react-helmet-async";
import { useLocation } from "react-router-dom";
const DynamicPageTitle = () => {
    //menggunakan hook useLocation untuk mengambil path
    const location = useLocation();
    //mengatur title sesuai dengan path const 
    const switchPageTitle = (path) => {
        switch (path) {
            case "/":
                return "HomePage";
            case "/login":
                return "LoginPage";
            case "/dashboard":
                return "DashboardPage"; 
            default:
                return "DefaultPage";
        };
    };
    return (
        <HelmetProvider>
            <Helmet>
                <title>{switchPageTitle(location.pathname)} | GrandAtma</title> 
                <meta name="description" content="Grand Atma Hotel Best Hotel" /> 
            </Helmet>
        </HelmetProvider>
    );
};
export default DynamicPageTitle;
