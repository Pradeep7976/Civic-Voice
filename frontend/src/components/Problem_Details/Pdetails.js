import React, { useEffect, useState } from "react";
import {
  Text,
  Button,
  Center,
  Textarea,
  Flex,
  Box,
  Heading,
  Input,
  InputGroup,
  Stack,
  Container,
  InputLeftAddon,
  Img,
  VStack,
} from "@chakra-ui/react";
// import { AspectRatio } from "@chakra-ui/react";
import axios from "axios";
import "./MapboxMap.css";
import Mapbox from "./Mapbox";
import { useNavigate, useParams } from "react-router-dom";
import exifr from "exifr";
import { Popup } from "react-map-gl";
import LoadingPage from "../LoadingPage/LoadingPage";
import "./Pdetails.css";
import api from "../requestClient/axiosInstance";

const Pdetails = () => {
  let navigate = useNavigate();
  const params = useParams();
  // /* eslint-disable */
  const [prob, setprob] = useState(localStorage.getItem("problem"));
  const [load, setload] = useState(false);

  const [department, setdepartment] = useState(
    localStorage.getItem("department")
  );
  // eslint-disable-next-line
  const port = "http://localhost:7000/";
  // eslint-disable-next-line
  const Port = "http://localhost:7000/";
  const [description, setdescription] = useState("");
  const [longitude, setlongitude] = useState(0.0);
  const [latitude, setlatitude] = useState(0.0);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [mapshow, setmapshow] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [desc, setdesc] = useState("");
  ///////////////////                 IMAGE                  //////////////////////////////////////
  // async function handleSubmit(event) {
  //   console.log("sdfsdf");
  //   event.preventDefault();
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   const response = await axios.post(Port + "/upload", formData);
  //   setImageUrl(response.data.url);
  // }

  async function handleFileChange(event) {
    const selectedfile = event.target.files[0];
    setFile(selectedfile);

    try {
      const imglatitude = (await exifr.gps(selectedfile)).latitude;
      const imglongitude = (await exifr.gps(selectedfile)).longitude;
      console.log("This is a image1 " + imglatitude);
      console.log("This is a image1 " + imglongitude);
      localStorage.setItem("latitude", imglatitude);
      localStorage.setItem("longitude", imglongitude);
      console.log("popup set");
      setShowPopup(true);
    } catch (e) {
      console.log("Not Found GPS");
    }
  }
  async function HandlePopUp(decision) {
    setShowPopup(true);
  }
  ///////////////////                 IMAGE                  //////////////////////////////////////
  async function submit(event) {
    console.log("Sending the problem");

    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    const dat = {
      uid: localStorage.getItem("uid"),
      name: prob,
      description: description,
      latitude: localStorage.getItem("latitude"),
      longitude: localStorage.getItem("longitude"),
      department: department,
    };
    if (
      dat.latitude == 0 ||
      dat.longitude == 0 ||
      dat.department == "" ||
      file == null
    ) {
      alert("please fill all the fields");
      return;
    }
    console.log(dat);
    formData.append("problem", JSON.stringify(dat));
    setload(true);
    const response = await api
      .post("/problem", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        console.log(resp.data);
        if (resp.data.done) {
          navigate("/greet/" + 1);
        } else {
          navigate("/greet/" + 2);
        }
      });
  }
  useEffect(() => {
    // axios
    //   .get(Port + "/api/user/isUserAuth", {
    //     headers: { "x-access-token": localStorage.getItem("token") },
    //   })
    //   .then((response) => {
    //     if (!response.data.auth) {
    //       navigate("/login");
    //       // setload(response.data.auth);
    //     } else {
    //       // setload(true);
    //     }
    //   });
  }, []);
  function PopUp() {
    return (
      <div className="popup">
        <div
          className="popup-content"
          style={{ backgroundColor: "rgb(33, 150, 243)" }}
        >
          <h2 style={{ color: "white" }}>Confirm Selection</h2>
          <p style={{ color: "white" }}>GPS co-ordinates found in the image </p>
          <p style={{ color: "white" }}>Do u want to use it? </p>
          <div style={{ color: "white" }} className="popup-buttons">
            <button
              style={{ backgroundColor: "black", borderRadius: "8px" }}
              onClick={() => {
                setmapshow(false);
                setShowPopup(false);
              }}
            >
              Yes
            </button>
            <button
              style={{ backgroundColor: "black", borderRadius: "8px" }}
              onClick={() => {
                setShowPopup(false);
              }}
            >
              No
            </button>
          </div>
        </div>
      </div>
    );
  }
  function Pdetailspage() {
    return (
      <>
        <Flex bg="black" pt="3" pb="3" mb="10">
          <Box>
            <center>
              <Heading color={"white"} ml="5">
                More Details...
              </Heading>
            </center>
          </Box>
        </Flex>
        <VStack>
          <Box>{mapshow ? <Mapbox /> : <div></div>}</Box>
          <Container paddingTop={"0rem"}>
            <Stack spacing={6} mb="10">
              <InputGroup>
                <InputLeftAddon children="Name of the problem" />
                <Input type="text" value={prob} readOnly />
              </InputGroup>

              {/* If you add the size prop to `InputGroup`, it'll pass it to all its children. */}
              <InputGroup>
                <InputLeftAddon children="Associated Department" />
                <Input
                  type="text"
                  placeholder="Automatically fill"
                  value={department}
                />
                l
              </InputGroup>
            </Stack>
            <Text>
              <strong>Description: </strong>
            </Text>

            <Textarea
              mb="6"
              placeholder="Add more details(optional)..."
              onChange={(e) => {
                // console.log(e.target.value);
              }}
            />
            <Text>
              <strong>Upload a photo : </strong>
              {file ? (
                <Text
                  color={"green"}
                  paddingTop={"1rem"}
                  paddingBottom={"1rem"}
                >
                  {" "}
                  <strong> Image Selected </strong>{" "}
                </Text>
              ) : (
                <Img
                  src={
                    imageUrl
                      ? imageUrl
                      : "https://ik.imagekit.io/aj4rz7nxsa/Mini_project/av5c8336583e291842624_Yp22FJ3dQ.png"
                  }
                  width={"17rem"}
                />
              )}
            </Text>

            <Input
              type="file"
              pt="1"
              name="image"
              accept="image/*"
              bg={"blue.400"}
              onChange={handleFileChange}
            ></Input>

            <Center
              className="pointer"
              boxShadow="dark-lg"
              bg="red"
              h="100px"
              color="white"
              mt="10"
              mb="5"
              borderRadius={10}
              onClick={submit}
            >
              <Box
                as="button"
                borderRadius="md"
                bg="red"
                color="white"
                px={4}
                h={8}
                m="auto"
              >
                <Heading>Submit</Heading>
              </Box>
            </Center>
          </Container>
          <br />
        </VStack>
      </>
    );
  }
  return load ? <LoadingPage /> : showPopup ? <PopUp /> : <Pdetailspage />;
  // return <Pdetails />;
};

export default Pdetails;
