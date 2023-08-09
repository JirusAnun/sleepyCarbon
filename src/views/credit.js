import React, { useState } from "react";
import {
  Button,
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import {
  useAuth0,
  withAuthenticationRequired,
} from "@auth0/auth0-react";
import { getConfig } from "../config";
import Loading from "../components/Loading";

const ExternalApiComponent = () => {
  const { apiOrigin = "http://localhost:3001", audience } = getConfig();

  const [state, setState] = useState({
    showResult: false,
    apiMessage: "",
    error: null,
    showReportModal: false,
    showDonateModal: false,
    email: "",
    score: 0,
    reportName: "",
    reportDescription: "",
    reportDate: "",
    reportImage: null,
  });

  const {
    getAccessTokenSilently,
    loginWithPopup,
    getAccessTokenWithPopup,
  } = useAuth0();

  const toggleReportModal = () => {
    setState((prevState) => ({
      ...prevState,
      showReportModal: !prevState.showReportModal,
    }));
  };

  const toggleDonateModal = () => {
    setState((prevState) => ({
      ...prevState,
      showDonateModal: !prevState.showDonateModal,
    }));
  };

  const handleConsent = async () => {
    try {
      await getAccessTokenWithPopup();
      setState({
        ...state,
        error: null,
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error,
      });
    }

    await callApi();
  };

  const handleLoginAgain = async () => {
    try {
      await loginWithPopup();
      setState({
        ...state,
        error: null,
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error,
      });
    }

    await callApi();
  };

  const callApi = async () => {
    try {
      const token = await getAccessTokenSilently();

      const response = await fetch(`${apiOrigin}/api/external`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();

      setState({
        ...state,
        showResult: true,
        apiMessage: responseData,
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error,
      });
    }
  };

  const handle = (e, fn) => {
    e.preventDefault();
    fn();
  };

  const handleDonate = async () => {
    // You can fetch the form data and send it to your backend here
    toggleDonateModal();
  };

  const handleReportSubmit = async () => {
    // You can fetch the report form data and send it to your backend here
    toggleReportModal();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setState({
      ...state,
      reportImage: file,
    });
  };

  const handleEmailChange = (e) => {
    setState({
      ...state,
      email: e.target.value,
    });
  };

  const handleScoreChange = (e) => {
    setState({
      ...state,
      score: parseInt(e.target.value),
    });
  };

  return (
      <div className="text-center d-flex justify-content-center align-items-center h-100">
        <div>
          <h1>Carbon credit: 100</h1>
          <div className="mb-5">
            {state.error === "consent_required" && (
                <Alert color="warning">
                  You need to{" "}
                  <a
                      href="#/"
                      className="alert-link"
                      onClick={(e) => handle(e, handleConsent)}
                  >
                    consent to get access to users api
                  </a>
                </Alert>
            )}

            {state.error === "login_required" && (
                <Alert color="warning">
                  You need to{" "}
                  <a
                      href="#/"
                      className="alert-link"
                      onClick={(e) => handle(e, handleLoginAgain)}
                  >
                    log in again
                  </a>
                </Alert>
            )}
            <Button color="primary" className="mt-3 mr-2" onClick={toggleReportModal}>
              Report Activity
            </Button>
            <Button color="primary" className="mt-3" onClick={toggleDonateModal}>
              Donate Carbon Credit
            </Button>
          </div>
        </div>
        <Modal isOpen={state.showReportModal} toggle={toggleReportModal}>
          <ModalHeader toggle={toggleReportModal}>Report Activity</ModalHeader>
          <ModalBody>
            <form>
              <label>Report Name:</label>
              <input
                  type="text"
                  className="form-control"
                  value={state.reportName}
                  onChange={(e) =>
                      setState({ ...state, reportName: e.target.value })
                  }
              />
              <label>Report Description:</label>
              <textarea
                  className="form-control"
                  rows="3"
                  value={state.reportDescription}
                  onChange={(e) =>
                      setState({ ...state, reportDescription: e.target.value })
                  }
              />
              <label>Date:</label>
              <input
                  type="date"
                  className="form-control"
                  value={state.reportDate}
                  onChange={(e) =>
                      setState({ ...state, reportDate: e.target.value })
                  }
              />
              <label>Image:</label>
              <input
                  type="file"
                  className="form-control-file"
                  onChange={handleImageChange}
              />
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleReportSubmit}>
              Submit
            </Button>{" "}
            <Button color="secondary" onClick={toggleReportModal}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={state.showDonateModal} toggle={toggleDonateModal}>
          <ModalHeader toggle={toggleDonateModal}>Donate Carbon Credit</ModalHeader>
          <ModalBody>
            <form>
              <label>Email:</label>
              <input
                  type="email"
                  className="form-control"
                  value={state.email}
                  onChange={handleEmailChange}
              />
              <label>Score:</label>
              <input
                  type="number"
                  className="form-control"
                  value={state.score}
                  onChange={handleScoreChange}
              />
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleDonate}>
              Submit
            </Button>{" "}
            <Button color="secondary" onClick={toggleDonateModal}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
  );
};

export default withAuthenticationRequired(ExternalApiComponent, {
  onRedirecting: () => <Loading />,
});
