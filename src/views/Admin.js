import React, { useState } from "react";
import { Container, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from "reactstrap";
import "./admin.css"; // Import the admin.css file

const Dashboard = () => {
    const [reportData, setReportData] = useState([
        { id: 1, date: "2023-08-10", reportName: "Report 1", reportDescription: "Description 1", status: "Pending", reporter: "User A", imageUrl: "https://cdn.discordapp.com/attachments/1110981241618038857/1138147768788070410/Screenshot_2566-08-07_at_23.32.09.png" },
        { id: 2, date: "2023-08-11", reportName: "Report 2", reportDescription: "Description 2", status: "Authorized", reporter: "User B", imageUrl: "" },
        // ... (more report data)
    ]);

    const [popupReport, setPopupReport] = useState(null);
    const [addCouponModal, setAddCouponModal] = useState(false);
    const [couponData, setCouponData] = useState({
        id: "",
        name: "",
        description: "",
        price: "",
        available: ""
    });

    const handleAuthorize = (id) => {
        const updatedReportData = reportData.map((report) =>
            report.id === id ? { ...report, status: "Authorized" } : report
        );
        setReportData(updatedReportData);
    };

    const handleDeny = (id) => {
        const updatedReportData = reportData.map((report) =>
            report.id === id ? { ...report, status: "Denied" } : report
        );
        setReportData(updatedReportData);
    };

    const handleOpenReport = (report) => {
        setPopupReport(report);
    };

    const handleCloseReport = () => {
        setPopupReport(null);
    };

    const pendingReports = reportData.filter(report => report.status === "Pending");

    const handleAddCouponToggle = () => {
        setAddCouponModal(!addCouponModal);
    };

    const handleCouponInputChange = (e) => {
        const { name, value } = e.target;
        setCouponData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleAddCoupon = () => {
        // Handle adding coupon logic here
        // You can update the couponData state and perform any necessary actions
        console.log("Coupon added:", couponData);
        setAddCouponModal(false);
    };

    return (
        <Container>
            <div className="d-flex justify-content-end mt-4">
                <Button color="primary" onClick={handleAddCouponToggle}>
                    Add Coupon
                </Button>
            </div>
            <Table className="mt-4">
                <thead>
                <tr>
                    <th>Report ID</th>
                    <th>Date</th>
                    <th>Report Name</th>
                    <th>Status</th>
                    <th>Reporter</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {pendingReports.map((report) => (
                    <tr
                        key={report.id}
                        onClick={() => handleOpenReport(report)}
                        style={{ cursor: "pointer" }}
                        className="hover-grey"
                    >
                        <td>{report.id}</td>
                        <td>{report.date}</td>
                        <td>{report.reportName}</td>
                        <td>{report.status}</td>
                        <td>{report.reporter}</td>
                        <td>
                            {report.status === "Pending" && (
                                <>
                                    <Button color="success" onClick={() => handleAuthorize(report.id)} className="mr-2">
                                        Authorize
                                    </Button>
                                    <Button color="danger" onClick={() => handleDeny(report.id)}>
                                        Deny
                                    </Button>
                                </>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <Modal isOpen={popupReport !== null} toggle={handleCloseReport} size="lg">
                <ModalHeader toggle={handleCloseReport}>
                    Report Details
                </ModalHeader>
                <ModalBody>
                    {popupReport && (
                        <div>
                            <div>
                                <strong>Report ID:</strong> {popupReport.id}
                            </div>
                            <div>
                                <strong>Date:</strong> {popupReport.date}
                            </div>
                            <div>
                                <strong>Report Name:</strong> {popupReport.reportName}
                            </div>
                            <div>
                                <strong>Status:</strong> {popupReport.status}
                            </div>
                            <div>
                                <strong>Reporter:</strong> {popupReport.reporter}
                            </div>
                            <div>
                                <strong>Description:</strong> {popupReport.reportDescription}
                            </div>
                            {popupReport.imageUrl && (
                                <div>
                                    <img src={popupReport.imageUrl} alt="Report" className="img-fluid" />
                                </div>
                            )}
                        </div>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={handleCloseReport}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={addCouponModal} toggle={handleAddCouponToggle}>
                <ModalHeader toggle={handleAddCouponToggle}>
                    Add Coupon
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="couponId">Coupon ID</Label>
                        <Input type="text" id="couponId" name="id" value={couponData.id} onChange={handleCouponInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="couponName">Coupon Name</Label>
                        <Input type="text" id="couponName" name="name" value={couponData.name} onChange={handleCouponInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="couponDescription">Coupon Description</Label>
                        <Input type="textarea" id="couponDescription" name="description" value={couponData.description} onChange={handleCouponInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="couponPrice">Price</Label>
                        <Input type="text" id="couponPrice" name="price" value={couponData.price} onChange={handleCouponInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="couponAvailable">Available</Label>
                        <Input type="text" id="couponAvailable" name="available" value={couponData.available} onChange={handleCouponInputChange} />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleAddCoupon}>
                        Submit
                    </Button>{" "}
                    <Button color="secondary" onClick={handleAddCouponToggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </Container>
    );
};

export default Dashboard;
