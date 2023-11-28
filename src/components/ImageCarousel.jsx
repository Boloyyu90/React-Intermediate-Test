import { Carousel } from "react-bootstrap";
/* eslint-disable react/prop-types */
const ImageCarousel = ({ images }) => {
    return (
        <Carousel>
            {images?.map((image, index) => (
                <Carousel.Item key={index}>
                    <img className="d-block w-100" src={image.img} alt={image.title} />
                    <Carousel.Caption>
                        <h3 className="d-none d-md-block">{image.title}</h3>
                        <p className="d-none d-md-block">{image.description}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};
export default ImageCarousel;
