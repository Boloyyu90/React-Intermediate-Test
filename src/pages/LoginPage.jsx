import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

//import component
import FormLogin from "../components/FormLogin";

const LoginPage = () => {
    //menggunakan hook useNavigate untuk mengatur navigasi
    const navigate = useNavigate();

    //menghandle jika user sudah login
    useEffect(() => {
        const user = localStorage.getItem("user"); if (user) {
            navigate("/dashboard");
        }
    }, [navigate]);

    return (
        <Container className="mt-5">
            <h1 className="text-center display-4">
                <strong>Welcome Admin!</strong>
            </h1>
            <p className="text-center lead">Untuk memastikan identitas, silakan isi form berikut:</p> <hr className="featurette-divider" />
            <FormLogin />
        </Container>
    );
};
export default LoginPage;