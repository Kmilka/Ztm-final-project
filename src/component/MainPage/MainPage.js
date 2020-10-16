import React, { Component } from "react";
import FaceRecognition from "../FaceRecognition/FaceRecognition.js";
import Popup from "../Popup/Popup.js";
import ImageLinkForm from "../ImageLinkForm/ImageLinkForm.js";
import Rank from "../Rank.js";
import { api } from "../../utils/API.js";
import "./MainPage.css";
import "../../index.css";

const initialState = {
  input: "",
  imageURL: "",
  box: {},
  error: false,
  errorMessage: "",
  showPopup: false,
  entries: 0,
};

class MainPage extends Component {
  constructor() {
    super();
    this.state = {
      input: initialState.input,
      imageURL: initialState.imageURL,
      box: initialState.box,
      error: initialState.error,
      errorMessage: initialState.errorMessage,
      showPopup: initialState.showPopup,
      entries: initialState.entries,
    };
  }

  calculateFaceLocation(data) {
    if (!data.outputs) {
      this.setState({
        error: true,
        errorMessage: data,
      });
      return {};
    } else {
      const clarifaiFace = data.outputs[0].data.regions;
      if (clarifaiFace === undefined) {
        this.setState({
          showPopup: true,
        });
        setTimeout(() => {
          this.setState({
            showPopup: false,
          });
        }, 3000);
        return {};
      }
      const image = document.getElementById("imageinput");
      const width = image.width;
      const height = image.height;
      const faces = clarifaiFace.map((item) => {
        return {
          leftCol: item.region_info.bounding_box.left_col * width,
          topRow: item.region_info.bounding_box.top_row * height,
          rightCol: width * (1 - item.region_info.bounding_box.right_col),
          bottomRow: height * (1 - item.region_info.bounding_box.bottom_row),
        };
      });
      return faces;
    }
  }

  displayFaceBox(box) {
    this.setState({
      box: box,
    });
  }

  onInputChange = (event) => {
    this.setState({
      input: event.target.value,
      error: initialState.error,
      errorMessage: initialState.errorMessage,
      imageURL: initialState.imageURL,
    });
  };

  onSubmit = () => {
    if (this.state.input.length === 0) {
      return;
    }
    this.setState({
      imageURL: this.state.input,
    });
    api
      .post(
        "imageRecognition",
        {
          input: this.state.input,
          id: this.props.user.id,
        },
        {
          headers: {
            Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((data) => {
        const faceLocations = this.calculateFaceLocation(data.data);
        if (Object.keys(faceLocations).length !== 0) {
          this.displayFaceBox(faceLocations);
          this.updateRank();
        }
      })
      .catch((error) => {
        this.setState({ error: true });
        if (error.response) {
          this.setState({ errorMessage: error.response.data });
          if (error.response.data === "unauthorized") {
            window.sessionStorage.clear();
          } else console.log(error.response.data);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
  };

  onReset = () => {
    document.getElementById("imageURL").value = "";
    this.setState({
      imageURL: initialState.imageURL,
      box: initialState.box,
      error: initialState.error,
      errorMessage: initialState.errorMessage,
      input: initialState.input,
    });
  };

  updateRank = () => {
    api
      .get(`profile/${this.props.user.id}/rank`, {
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
      })
      .then((data) => {
        const userInfo = data.data;
        this.setState(Object.assign({}, this.state, userInfo));
        window.sessionStorage.setItem("rank", userInfo.entries);
      })
      .catch((error) => {
        this.setState({ error: true });
        if (error.response) {
          this.setState({ errorMessage: error.response.data });
          if (error.response.data === "unauthorized") {
            window.sessionStorage.clear();
          } else console.log(error.response.data);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
  };

  render() {
    const {
      imageURL,
      box,
      error,
      errorMessage,
      showPopup,
      entries,
    } = this.state;
    return (
      <div>
        <Rank
          className="mainpage"
          currentRank={entries || this.props.user.entries}
          name={this.props.user.name}
        />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onSubmit={this.onSubmit}
          onReset={this.onReset}
        />
        <FaceRecognition imageURL={error ? "" : imageURL} box={box} />
        <legend className={error ? "error center" : "invisible"}>
          {errorMessage}
        </legend>
        {showPopup ? (
          <Popup popupText={"No faces were detected on this picture"} />
        ) : null}
      </div>
    );
  }
}

export default MainPage;
