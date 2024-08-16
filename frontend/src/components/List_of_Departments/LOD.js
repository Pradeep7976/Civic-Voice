import React, { useEffect } from "react";
import {
  Flex,
  Box,
  Heading,
  Card,
  CardBody,
  Text,
  Button,
} from "@chakra-ui/react";
import Departments from "./LOD_api";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const LOD = () => {
  const params = useParams();
  const problem = params.probname;
  console.log(problem);
  const deptData = Departments;
  let navigate = useNavigate();
  const Port = "https://expensive-hem-elk.cyclic.app/";
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
          // setload(true);
        }
      });
  }, []);
  return (
    <>
      <Flex bg="#black" pt="3" pb="3" mb="10">
        <Box>
          <center>
            <Heading color="white" ml='2'>Choose The Department...</Heading>
          </center>
        </Box>
      </Flex>

      {deptData.map((currElem) => {
        return (
          <>
            <Card
              boxShadow="2xl"
              ml="5"
              mr="5"
              className="hovered"
              bg="#e6e6e6"
              border="50px"
              borderColor="black.200"
              mb="5"
              onClick={() => {
                localStorage.setItem("department", currElem.name);
                navigate(
                  "/reportprob/" +
                    problem +
                    "/" +
                    currElem.name.replace(/\s/g, "").toLowerCase()
                );
              }}
            >
              <CardBody>
                <center>
                  <Text cursor={"pointer"}>{currElem.name}</Text>
                </center>
              </CardBody>
            </Card>
            <Button
              mt="5"
              colorScheme="red"
              onClick={() => {
                navigate("/reportprob");
              }}
            >
              <ChevronLeftIcon boxSize={8} />
              Go Back
            </Button>
          </>
        );
      })}
    </>
  );
};

export default LOD;
