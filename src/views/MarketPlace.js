import React, { useState } from "react";
import { Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import "./Marketplace.css"; // Import your CSS file for styling

const Marketplace = () => {
    const couponItems = [
        { title: "Coupon 1", description: "Description 1", price: "$5.00", available: 10 },
        { title: "Coupon 2", description: "Description 2", price: "$10.00", available: 5 },
        { title: "Coupon 3", description: "Description 3", price: "$7.50", available: 8 },
        { title: "Coupon 4", description: "Description 4", price: "$12.00", available: 3 },
        { title: "Coupon 5", description: "Description 5", price: "$8.50", available: 6 },
        { title: "Coupon 6", description: "Description 6", price: "$15.00", available: 2 },
        // Repeat similar entries as needed
    ];

    const [modal, setModal] = useState(false);
    const [selectedCoupon, setSelectedCoupon] = useState(null);
    const [score, setScore] = useState(100); // Example score, you can replace with actual logic

    const toggleModal = () => {
        setModal(!modal);
    };

    const handleBuyButtonClick = (coupon) => {
        setSelectedCoupon(coupon);
        toggleModal();
    };

    const handleConfirmPurchase = () => {
        // Perform purchase logic here if needed
        toggleModal();
    };

    return (
        <div className="marketplace-container">
            <h1 className="marketplace-title">Marketplace</h1>
            <p className="marketplace-score">Score: {score}</p> {/* Display the score */}
            <div className="coupon-grid">
                {couponItems.map((coupon, index) => (
                    <div key={index} className="coupon-item">
                        <div className="coupon-content">
                            <h2 className="title">{coupon.title}</h2>
                            <p className="description">{coupon.description}</p>
                            <p className="price">{coupon.price}</p>
                            <p className="available">Available: {coupon.available}</p>
                            <button
                                className="buy-button"
                                onClick={() => handleBuyButtonClick(coupon)}
                            >
                                Buy
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Confirm Purchase</ModalHeader>
                <ModalBody>
                    Are you sure you want to buy {selectedCoupon?.title} for{" "}
                    {selectedCoupon?.price}?
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleConfirmPurchase}>
                        Confirm
                    </Button>{" "}
                    <Button color="secondary" onClick={toggleModal}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default Marketplace;
