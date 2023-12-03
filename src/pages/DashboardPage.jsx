import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Modal, Form, Table } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPlus } from "react-icons/fa";
import { FaTrash, FaEdit } from 'react-icons/fa';

import imgStandard from "../assets/images/asset-kamar-standard.jpg";
import imgSuperior from "../assets/images/asset-kamar-superior.jpg";
import imgLuxury from "../assets/images/asset-kamar-luxury.jpg";

const DashboardPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return new Date(date).toLocaleDateString("id-ID", options);
  };

  const [showModal, setShowModal] = useState(false);
  const [roomData, setRoomData] = useState({
    name: "",
    type: "Standard",
    price: "",
    description: "",
    lastUpdated: null, 
  });
  const [rooms, setRooms] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [totalRoomTypes, setTotalRoomTypes] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoomData({ ...roomData, [name]: value });
  };

  const handleDeleteRoom = (index) => {
    const updatedRooms = [...rooms];
    updatedRooms.splice(index, 1);
    setRooms(updatedRooms);
    toast.success("Kamar berhasil dihapus!");

    const uniqueRoomTypes = new Set(updatedRooms.map((room) => room.type));
    setTotalRoomTypes(uniqueRoomTypes.size);
  };

  const handleEditRoom = (index) => {
    setRoomData(rooms[index]);
    setEditingIndex(index);
    setShowModal(true);
  };

  const handleSaveRoom = () => {
    const { name, type, price, description } = roomData;
  
    if (!name || !type || !price || !description) {
      toast.error("Harap isi semua kolom.");
      return;
    }
  
    const roomWithImage = {
      ...roomData,
      image: `/assets/images/asset-kamar-luxury/${roomData.type.toLowerCase()}.jpg`,
    };
  
    if (editingIndex !== null) {
      // Editing an existing room
      const updatedRooms = [...rooms];
      updatedRooms[editingIndex] = {
        ...roomWithImage,
        lastUpdated: new Date().toISOString(),
        updatePending: true, // Set the flag for an update pending
      };
      setRooms(updatedRooms);
      toast.success("Kamar berhasil diubah!");
    } else {
      // Creating a new room
      setRooms([...rooms, roomWithImage]);
      toast.success("Kamar berhasil ditambahkan!");
    }
  
    setRoomData({
      name: "",
      type: "Standard",
      price: "",
      description: "",
      image: "",
      lastUpdated: null,
    });
  
    setEditingIndex(null);
    setShowModal(false);
  
    const uniqueRoomTypes = new Set(
      [...rooms, roomWithImage].map((room) => room.type)
    );
    setTotalRoomTypes(uniqueRoomTypes.size);
  };
  
  
  

  const getImagePath = (roomType) => {
    switch (roomType.toLowerCase()) {
      case 'standard':
        return imgStandard;
      case 'superior':
        return imgSuperior;
      case 'luxury':
        return imgLuxury;
      default:
        return null;
    }
  };

  return (
    <Container className="mt-5">
      <Container className="mt-5">
        <h1 className="mb-3 border-bottom fw-bold">Dashboard</h1>
        <Row className="mb-4">
          <Col md={10}>
            <Card className="h-100 justify-content-center">
              <Card.Body>
                <h4>Selamat datang,</h4>
                <h1 className="fw-bold display-6 mb-3">{user?.username}</h1>
                <p className="mb-0">Kamu sudah login sejak:</p>
                <p className="fw-bold lead mb-0">{formatDate(user?.loginAt)}</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={2}>
            <Card>
              <Card.Body>
                <p>Bukti sedang ngantor:</p>
                <img
                  src="https://via.placeholder.com/150"
                  className="img-fluid rounded"
                  alt="Tidak Ada Gambar"
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Container className="mt-5">
        <h1 className="mb-3 border-bottom fw-bold">Daftar Kamar</h1>
        <p>Grand Atma saat ini memiliki <strong> {totalRoomTypes}</strong> jenis kamar yang eksotis.</p>
      </Container>

      <Row className="mt-4">
        <Col md={12} className="text-left">
          <Button variant="success" onClick={() => setShowModal(true)}>
            <FaPlus className="me-2" />
            Tambah Kamar
          </Button>
        </Col>
      </Row>

      <Row className="mt-4">
        {rooms.map((room, index) => (
          <Row key={index} className="mb-4">
            <Card className="w-100 border rounded p-3">
              <Row>
                <Col md={3}>
                  {console.log(getImagePath(room.type))}
                  <div style={{ height: '200px', overflow: 'hidden' }}>
                    <Card.Img src={getImagePath(room.type)} className="img-fluid mx-auto rounded shadow" role="img" aria-label="" style={{ width: '100%', height: 'auto' }} />
                  </div>
                </Col>

                <Col md={9}>
                  <Card.Body>
                    <div className="mb-1">
                      <h5>
                        <strong>{room.name}</strong>
                        {room.updatePending && (
                          <span className="ms-2 text-success">(Update)</span>
                        )}
                      </h5>
                    </div>
                    <div className="mb-3" style={{ borderBottom: '1px solid #ccc' }}>
                      {room.description}
                    </div>
                    <div className="mb-3">
                      Tipe Kamar: <strong> {room.type} </strong>| Harga:<strong> Rp. {room.price}</strong>
                    </div>

                    <Button variant="danger" onClick={() => handleDeleteRoom(index)}>
                      <FaTrash className="me-2" /> Hapus Kamar
                    </Button>
                    <Button
                      variant="warning"
                      className="ms-2"
                      onClick={() => handleEditRoom(index)}
                      style={{
                        backgroundColor: '#007bff',
                        borderColor: '#007bff',
                        color: 'white',
                      }}
                    >
                      <FaEdit className="me-2" /> Edit Kamar
                    </Button>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Row>
        ))}
      </Row>
      
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingIndex !== null ? "Ubah" : "Tambah"} Kamar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formRoomName">
              <Form.Label>Nama Kamar</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan Nama Kamar"
                name="name"
                value={roomData.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formRoomType">
              <Form.Label>Tipe Kamar</Form.Label>
              <Form.Control as="select" name="type" value={roomData.type} onChange={handleInputChange}>
                <option>Standard</option>
                <option>Superior</option>
                <option>Luxury</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formRoomPrice">
              <Form.Label>Harga Kamar</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan Harga Kamar"
                name="price"
                value={roomData.price}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formRoomDescription">
              <Form.Label>Deskripsi Kamar</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Masukkan Deskripsi Kamar"
                name="description"
                value={roomData.description}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Tutup
          </Button>
          <Button variant="primary" onClick={handleSaveRoom}>
            {editingIndex !== null ? "Ubah" : "Simpan"}
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </Container>
  );
};

export default DashboardPage;
