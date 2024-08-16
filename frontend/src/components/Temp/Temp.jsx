import React, { useEffect, useState } from "react";

import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Divider,
  Badge,
  Textarea,
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
  const [load, setload] = useState(true);
  const [rating, setRating] = useState(0.0);
  const [feedback, setFeedback] = useState("");
  // eslint-disable-next-line
  const port = "https://expensive-hem-elk.cyclic.app/";
  // eslint-disable-next-line
  const Port = "https://expensive-hem-elk.cyclic.app/";
  let navigate = useNavigate();
  function submit() {
    if (rating > 5 || rating < 0) {
      alert("Enter valid Rating plz");
    }
    const dat = {
      rating: rating,
      feedback: feedback,
      uid: localStorage.getItem("uid"),
    };
  }

  useEffect(() => {
    axios
      .get(Port + "/api/user/isUserAuth", {
        headers: { "x-access-token": localStorage.getItem("token") },
      })
      .then((response) => {
        if (!response.data.auth) {
          navigate("/login");
          // setload(response.data.auth);
        } else {
          setload(false);
        }
      });
  }, []);
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
                  <InputGroup>
                    <InputLeftAddon
                      children="Rating"
                      backgroundColor={"white"}
                    />
                    <Input
                      maxLength={20}
                      mb="5"
                      type="text"
                      placeholder="out of 5"
                      onChange={(e) => {
                        setRating(e.target.value);
                      }}
                    />
                  </InputGroup>
                  <InputGroup>
                    <Textarea
                      placeholder="Enter the Feedback (Optional)"
                      onChange={(e) => {
                        setFeedback(e.target.value);
                      }}
                    />
                  </InputGroup>

                  <Button colorScheme="green" onClick={submit}>
                    Submit
                  </Button>
                </CardBody>
              </Card>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Card>
    </>
  );
};

export default Edit_Profile;
