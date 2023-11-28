import { Container, Row, Col } from "react-bootstrap";

// import component
import ImageCarousel from "../components/ImageCarousel";

// import gambar
import imgHotell from "../assets/images/hotel1.jpg";
import imgHotel2 from "../assets/images/hotel2.jpg";
import imgHotel3 from "../assets/images/hotel3.jpg";
import imgFeaturettel from "../assets/images/featurette-1.jpeg";
import imgFeaturette2 from "../assets/images/featurette-2.jpeg";

// gambar yang akan ditampilkan di carousel
const images = [
    {
        img: imgHotell,
        title: "First slide label",
        description: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
    },
    {
        img: imgHotel2,
        title: "Second slide label",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
        img: imgHotel3,
        title: "Third slide label",
        description: "Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
    },
];

const HomePage = () => {
    return (
        <>
            <ImageCarousel images={images} />
            <Container className="mt-5">
                <Row>
                    <Col md={7}>
                        <h2 className="fw-normal">
                            Hotel pertama dan satu-satunya <strong>yang fiksional</strong>. </h2>
                        <p className="lead">
                            Diciptakan oleh <strong>I Gede Bala Putra</strong>, mahasiswa Universitas Atma Jaya Yogyakarta dari program
                            studi Informatika.
                        </p>
                        <p className="lead">
                            Nomor Pokok Mahasiswa: <strong>210711320</strong>.
                        </p> </Col>
                    <Col md={5}>
                        <img src={imgFeaturettel} className="img-fluid mx-auto rounded shadow" role="img" aria-label="Gambar featurette1" />
                    </Col>
                </Row>
                <hr className="nt-5 mb-5" />
                <Row>
                    <Col md={7} className="order-md-2">
                        <h2 className="fw-normal">
                            Your comfort is key, <strong>experience the heartbeat of our hotel</strong>.
                        </h2>
                        <p className="lead">
                            Our modern, sophisticated guest rooms are designed to exceed expectations with premium comfort, technology where you need it, and thoughtful attention to detail.
                        </p> </Col>
                    <Col md={5} className="order-md-1">
                        <img src={imgFeaturette2} className="img-fluid mx-auto rounded shadow" role="img" aria-label="Gambar featurette2" />
                    </Col>
                </Row>
            </Container>
        </>
    );
};
export default HomePage;