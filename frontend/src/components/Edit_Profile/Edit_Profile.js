import React, { useEffect, useState } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Divider,
  HStack,
} from "@chakra-ui/react";
import {
  Button,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Input,
  Badge,
  Text,
  Avatar,
  Card,
  CardBody,
} from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../LoadingPage/LoadingPage";
import api from "../requestClient/axiosInstance";

const Edit_Profile = () => {
  const [details, setdetails] = useState({});
  const [count, setcount] = useState(0);
  const [load, setload] = useState(true);
  let navigate = useNavigate();
  useEffect(() => {
    const uid = localStorage.getItem("uid");
    api
      .get(`/user/${uid}`)
      .then((response) => {
        console.log(response.data);
        setdetails(response.data);
        setload(false);
      });
    api
      .get(`/user/reported/count/${uid}`)
      .then((response) => {
        setcount(response.data.count);
      });
  }, []);
  return load ? (
    <LoadingPage />
  ) : (
    <>
      <Card margin="5" bg="black" borderRadius={10}>
        <Tabs mt="5" padding="auto" variant="soft-rounded" colorScheme="green">
          <TabList justifyContent={"center"}>
            <Tab color="white">Your Profile</Tab>
            <Tab color="white">Edit Profile</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Card mt="10" boxShadow={"dark-lg"}>
                <CardBody>
                  <center>
                    <Avatar mb="3" size="2xl" src={details.imageurl} />
                  </center>
                  <center>
                    <Badge mb="5" colorScheme="green">
                      Citizen
                    </Badge>
                  </center>
                  <Divider mb="10" />
                  <Text mb="3" fontSize="xl">
                    <strong>Name : </strong>
                    {details.name}
                  </Text>
                  <Text mb="3" fontSize="xl">
                    <strong>Age : </strong>
                    {details.age}
                  </Text>
                  <Text mb="3" fontSize="xl">
                    <strong>Phone : </strong>
                    {details.phone}
                  </Text>
                  <Text mb="3" fontSize="xl">
                    <strong>Email : </strong>
                    {details.email}
                  </Text>

                  <Text mb="3" fontSize="xl">
                    <strong>City : </strong>
                    {details.city}
                  </Text>

                  <Text color="green" fontSize={"xl"}>
                    <Badge fontSize={"md"} colorScheme="green">
                      Problems Reported :{" "}
                    </Badge>{" "}
                    {count}
                  </Text>
                </CardBody>
              </Card>
              <Button
                mt="5"
                colorScheme="red"
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.reload();
                }}
              >
                Logout
              </Button>
              <Button
                mt="5"
                colorScheme="red"
                marginLeft={5}
                onClick={() => {
                  navigate("/userproblems/" + localStorage.getItem("uid"));
                }}
              >
                View Problems Reported
              </Button>
              <Button
                mt="5"
                colorScheme="red"
                marginLeft={5}
                onClick={() => {
                  navigate("/feedback");
                }}
              >
                Feedback
              </Button>
            </TabPanel>
            <TabPanel>
              <Card mt="10" boxShadow={"dark-lg"}>
                <CardBody>
                  <center>
                    <Avatar mb="3" size="2xl" src={details.imageurl} />
                  </center>
                  <center>
                    <Badge mb="5" colorScheme="green">
                      Citizen
                    </Badge>
                  </center>
                  <Divider mb="10" />
                  <InputGroup>
                    <InputLeftAddon children="Name" />
                    <Input
                      maxLength={20}
                      mb="5"
                      type="text"
                      placeholder="Name of the person"
                    />
                  </InputGroup>
                  <InputGroup>
                    <InputLeftAddon children="Age" />
                    <Input
                      pattern="\d*"
                      mb="5"
                      type="number"
                      placeholder="Age of the person"
                    />
                  </InputGroup>
                  <InputGroup>
                    <InputLeftAddon children="Phone No." />
                    <Input
                      maxLength={10}
                      mb="5"
                      type="number"
                      placeholder="Ph.No of the person"
                    />
                  </InputGroup>
                  <InputGroup>
                    <InputLeftAddon children="Email" />
                    <Input
                      maxLength={25}
                      mb="5"
                      type="text"
                      placeholder="Email of the person"
                    />
                    <InputRightAddon children="@gmail.com" />
                  </InputGroup>
                  <InputGroup>
                    <InputLeftAddon children="Address" />
                    <Input
                      maxLength={100}
                      mb="5"
                      type="text"
                      placeholder="Address of the person"
                    />
                  </InputGroup>
                  <InputGroup>
                    <InputLeftAddon children="City" />
                    <Input
                      maxLength={20}
                      mb="5"
                      type="text"
                      placeholder="City of the person"
                    />
                  </InputGroup>
                  <Divider />
                  <Button colorScheme="green">Submit</Button>
                </CardBody>
              </Card>
              <HStack>
                <Button mt="5" colorScheme="red">
                  <ChevronLeftIcon boxSize={8} />
                  Go Back
                </Button>
              </HStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Card>
    </>
  );
};

export default Edit_Profile;
