import React, { useState } from "react";

import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Divider,
  Badge,
} from "@chakra-ui/react";
import {
  Button,
  InputGroup,
  InputLeftAddon,
  Input,
  Avatar,
  Card,
  CardBody,
} from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../LoadingPage/LoadingPage";

const Edit_Profile = () => {
  const [usernamed, setusername] = useState("");
  const [emaild, setemail] = useState("");
  const [passwordd, setpassword] = useState("");
  const [address, setaddressd] = useState("");
  const [phno, setphno] = useState(0);
  const [file, setFile] = useState(null);
  const [age, setage] = useState(0);
  const [city, setcity] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [load, setload] = useState(false);

  // eslint-disable-next-line
  const port = "https://expensive-hem-elk.cyclic.app/";
  // eslint-disable-next-line
  const Port = "https://expensive-hem-elk.cyclic.app/";
  let navigate = useNavigate();

  function handleFileChange(event) {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  }
  async function clicki(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    const dat = {
      name: usernamed,
      phone: phno,
      email: emaild.toLowerCase(),
      city: city.toLowerCase(),
      address: address,
      password: passwordd,
      age: age,
    };
    formData.append("data", JSON.stringify(dat));
    console.log(dat);
    if (
      usernamed === "" ||
      emaild === "" ||
      passwordd === "" ||
      phno === "" ||
      address === "" ||
      city == "" ||
      age == 0
    ) {
      alert("all the form elements should be filled");
    } else {
      setload(true);
      const response = await axios.post(Port + "/api/user/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }, // set the content type to multipart form data
      });
      if (response.data != null) {
        setImageUrl(response.data.url);
        navigate("/login");
      }
    }
  }
  return load ? (
    <LoadingPage />
  ) : (
    <>
      <Card margin="5" bg="black" borderRadius={10}>
        <Tabs mt="5" padding="auto" variant="soft-rounded" colorScheme="green">
          <TabList justifyContent={"center"}>
            <Tab color="white">Create Account</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Card mt="10" boxShadow={"dark-lg"}>
                <CardBody>
                  <center>
                    <Badge>
                      <Avatar
                        mb="3"
                        size="2xl"
                        src={
                          File
                            ? File
                            : "https://ik.imagekit.io/aj4rz7nxsa/av5c8336583e291842624_0079_2pC4.png"
                        }
                      />
                    </Badge>
                  </center>
                  <center>
                    {/* <Badge mb="5" colorScheme="green">
                      <Input type="file"  />
                    </Badge> */}
                    <Input
                      w="full"
                      placeholder="Choose image"
                      backgroundColor={"white"}
                      fontWeight={57}
                      color={"blackAlpha.600"}
                      type="file"
                      onChange={handleFileChange}
                    />
                  </center>
                  <Divider mb="10" />
                  <InputGroup>
                    <InputLeftAddon children="Name" />
                    <Input
                      maxLength={20}
                      mb="5"
                      type="text"
                      placeholder="Name of the person"
                      onChange={(e) => {
                        setusername(e.target.value);
                      }}
                    />
                  </InputGroup>
                  <InputGroup>
                    <InputLeftAddon children="Age" />
                    <Input
                      pattern="\d*"
                      mb="5"
                      type="number"
                      placeholder="Age of the person"
                      onChange={(e) => {
                        setage(e.target.value);
                      }}
                    />
                  </InputGroup>
                  <InputGroup>
                    <InputLeftAddon children="Phone No." />
                    <Input
                      maxLength={10}
                      mb="5"
                      type="number"
                      placeholder="Ph.No of the person"
                      onChange={(e) => {
                        if (e.target.value.length > 10) {
                          e.target.value = e.target.value.slice(0, 10);
                        }
                        setphno(e.target.value.toString());
                      }}
                    />
                  </InputGroup>
                  <InputGroup>
                    <InputLeftAddon children="Email" />
                    <Input
                      maxLength={35}
                      mb="5"
                      type="text"
                      placeholder="Email of the person"
                      onChange={(e) => {
                        setemail(e.target.value);
                      }}
                    />
                    {/* <InputRightAddon children="@gmail.com" /> */}
                  </InputGroup>
                  <InputGroup>
                    <InputLeftAddon children="Address" />
                    <Input
                      maxLength={100}
                      mb="5"
                      type="text"
                      placeholder="Address of the person"
                      onChange={(e) => {
                        setaddressd(e.target.value);
                      }}
                    />
                  </InputGroup>
                  <InputGroup>
                    <InputLeftAddon children="City" />
                    <Input
                      maxLength={20}
                      mb="5"
                      type="text"
                      placeholder="City of the person"
                      onChange={(e) => {
                        setcity(e.target.value);
                      }}
                    />
                  </InputGroup>
                  <InputGroup>
                    <InputLeftAddon children="Password" />
                    <Input
                      maxLength={20}
                      mb="5"
                      type="text"
                      placeholder="Password"
                      onChange={(e) => {
                        setpassword(e.target.value);
                      }}
                    />
                  </InputGroup>
                  <Divider />
                  <Button colorScheme="green" onClick={clicki}>
                    Submit
                  </Button>
                </CardBody>
              </Card>
              <Button
                mt="5"
                colorScheme="red"
                onClick={() => {
                  navigate("/");
                }}
              >
                <ChevronLeftIcon boxSize={8} />
                Go Back
              </Button>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Card>
    </>
  );
};

export default Edit_Profile;
