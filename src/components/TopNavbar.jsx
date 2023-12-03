import { useNavigate, useLocation } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { toast } from "sonner";

//mengimport gambar logo
import imgCrown from "../assets/images/crown.png";
/* eslint-disable react/prop-types */
const TopNavbar = ({ routes }) => {
    //menggunakan hook useNavigate untuk mengatur navigasi
    const navigate = useNavigate();
    //menggunakan hook useLocation untuk mengambil path
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("user");
        console.log("hhh")
        //menghapus data user di localstorage
        toast.success("Logout berhasil!");
        setTimeout(() => {
            navigate("/login"); //mengarahkan ke halaman login
        }, 1000);
    };

    return (
        <Navbar fixed="top" collapseonselect expand="lg" className="bg-body-tertiary shadow">
            <Container>
                <Navbar.Brand style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
                    <div className="d-flex align-items-center">
                        <img alt="Crown Logo" src={imgCrown} width="50" height="50" className="d-inline-block align-top" />
                        <div className="ms-2">
                            <p className="mb-0 fs-5 fw-bold">Grand Atma</p>
                            <p className="small mb-@">Hotel & Resort</p>
                        </div>
                    </div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                        {routes?.map((route, index) => (
                            <Nav.Link key={index} onClick={() => navigate(route.path)}>
                                <Button variant={location.pathname === route.path ? "primary" : "light"} className="w-100">
                                    {route.name}
                                </Button>
                            </Nav.Link>
                        ))}
                        {location.pathname === "/dashboard" ? (
                            <Nav.Link>
                                <Button variant="danger" className="w-100" onClick={handleLogout}>
                                    Logout
                                </Button>
                            </Nav.Link>
                        ) : null}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
export default TopNavbar;