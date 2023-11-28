import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FloatingLabel, Button, Alert } from "react-bootstrap";
import { toast } from "sonner";
const FormLogin = () => {
    // menggunakan hook useNavigate untuk mengatur navigasi
    const navigate = useNavigate();
    // membuat state user
    const [user, setUser] = useState({ username: "", password: "" });
    // mengubah state user sesuai dengan inputan
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };
    // menghandle submit form
    const handleSubmit = (event) => {
        event.preventDefault();
        // validasi inputan
        if (user.username === "" || user.password === "") {
            toast.error("Username dan Password Tidak Boleh Kosong!");
            return;
        } else {
            //menggunakan operator spread untuk menggabungkan data user yang ada distate, dengan data baru loginAt 
            const newUser = {
                ...user,
                loginAt: new Date(),
            };
            localStorage.setItem("user", JSON.stringify(newUser)); //menyimpan data newUser di localstorage 
            toast.success("Login berhasil!");
            setTimeout(() => {
                navigate("/dashboard"); //mengarahkan ke halaman dashboard
            }, 1000);
        }
    };
    return (
        <Form onSubmit={handleSubmit} style={{ maxWidth: "700px", margin: "auto" }}>
            <Alert variant="info">
                <strong>Info!</strong> Username dan password bebas, yang penting diisi.
            </Alert>
            <FloatingLabel controlId="floatingInput" label="Username" className="mb-3">
                <Form.Control type="text" placeholder="name@example.com" name="username" onChange={handleChange} />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange} autocomplete="off" />
            </FloatingLabel>
            <Button variant="primary" type="submit" className="mt-3 w-100">
                Login
            </Button>
        </Form>
    );
};
export default FormLogin;