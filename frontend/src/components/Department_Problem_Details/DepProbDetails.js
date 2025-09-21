import React, { useEffect, useState } from "react";
import {
  Divider,
  Flex,
  Heading,
  Text,
  Avatar,
  Box,
  Badge,
  Link,
} from "@chakra-ui/react";
import { Image, Button, Card, CardBody } from "@chakra-ui/react";
import { ChevronLeftIcon, InfoIcon } from "@chakra-ui/icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LoadingPage from "../LoadingPage/LoadingPage";
import api from "../requestClient/axiosInstance";

const DepProbDetails = () => {
  // const Port = "https://expensive-hem-elk.cyclic.app";
  const port = "http://localhost:7000/";

  let params = useParams();

  const pid = params.pid;
  const [problem, setproblem] = useState({});
  const [uid, setuid] = useState(0);
  const [count, setcount] = useState(0);
  const [noofdays, setnoofdays] = useState(0);
  const [userdetails, setuserdetails] = useState({});
  const [load, setload] = useState(true);
  const [solvername, setsolvername] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    api
      .get("/problem/details/" + pid)
      .then((result) => {
        setproblem(result.data);
        setuid(result.data.uid);
        console.log(result.data.uid);
        if (result.data.status) {
          api.get("/reportprob/solvername/" + problem.pid).then((resp) => {
            setsolvername(resp.data.name);
          });
        }
      })
      .catch((e) => {
        console.log(e);
        // alert(e);
      });
    api.get("/user/" + uid.toString()).then((result) => {
      setuserdetails(result.data);
      console.log(result.data);
    });
    api.get("/user/reported/count/" + uid.toString()).then((result) => {
      setcount(result.data.count);
      console.log(result.data.count);
    });
    api.get("/problem/timeelapsed/" + pid.toString()).then((result) => {
      console.log(result);
      if (result.data != null) setnoofdays(result.data.timeelapsed);
      setload(false);
    });
  }, [uid, count, noofdays, solvername]);
  return load ? (
    <LoadingPage />
  ) : (
    <>
      <Flex bg="black" pt="3" pb="3" mb="10">
        <Box>
          <center>
            <Heading color={"white"}>
              <InfoIcon mr="3" mb="1" />
              Details about the problem...
            </Heading>
          </center>
        </Box>
      </Flex>
      <Box
        borderRadius={10}
        mr="5"
        ml="5"
        mb="5"
        padding="6"
        boxShadow="dark-lg"
        // bg="#e6e6e6"
      >
        <Text
          borderRadius={10}
          pl="4"
          pr="4"
          mb="5"
          bgGradient="linear(to-b, blue.600, blue.400)"
          color="white"
          fontSize="3xl"
        >
          <strong>Problem Reported By...</strong>
        </Text>
        <Avatar ml="3" mt="3" mb="3" size="lg" src={userdetails.imageurl} />
        <Text>
          <strong>{"Name : "} </strong>
          {userdetails.name}
        </Text>
        <Text>
          <strong>{"Age : "}</strong> {userdetails.age}
        </Text>
        <Text>
          <strong>{"Phone : "}</strong>
          {userdetails.phone}
        </Text>
        <Text>
          <strong>{"Email : "}</strong>
          {userdetails.email}
        </Text>
        <Text color="blue.600">
          <Badge colorScheme="blue">City</Badge> : {userdetails.city}
        </Text>
        <Text color="green">
          <Badge colorScheme="green">Problems Reported</Badge> {count}
        </Text>
      </Box>
      <Card
        ml="5"
        mr="5"
        mb="5"
        boxShadow="dark-lg"
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        <vStack mb="3">
          <CardBody>
            <Text
              borderRadius={10}
              pl="4"
              pr="4"
              mb="5"
              bg="#cc0000"
              color="white"
              fontSize="3xl"
            >
              <strong>About the problem...</strong>
            </Text>

            <Text py="2">
              <Text fontSize="xl" as="span">
                <strong>Name :</strong>{" "}
              </Text>
              <Text as="span">{problem.name}</Text>
              <Text>
                <Text fontSize="xl">
                  <strong>Description :</strong>{" "}
                </Text>
                <Text mb="5">{problem.description}</Text>
              </Text>
              <Divider mb="5" />
              <Text mb="2" color="blue.600">
                <Badge colorScheme="blue" fontSize={"sm"}>
                  Location
                </Badge>{" "}
                Full Location Link{" "}
                <Link
                  href={`https://www.google.com/maps/search/?api=1&query=${problem.latitude},${problem.longitude}`}
                  target="_blank "
                >
                  Google map
                </Link>
              </Text>

              <Text mb="2" color="blue.600">
                <Badge colorScheme="blue" fontSize={"sm"}>
                  Date
                </Badge>{" "}
                : {new Date(problem.formatdate).toLocaleDateString("en-GB")}
              </Text>

              <Text color="red" mb="2">
                <Badge colorScheme="red" fontSize={"sm"}>
                  Problem persisted for :{" "}
                </Badge>{" "}
                {noofdays}
              </Text>
              <Text color="blue.500" mb="2" fontSize={"md"} fontWeight={"bold"}>
                <Badge colorScheme="green" fontSize={"sm"}>
                  Departmemnt :{" "}
                </Badge>{" "}
                {problem.department}
              </Text>
              <Text color="green">
                <Badge colorScheme="green" fontSize={"sm"}>
                  Acknowledgement Number :{" "}
                </Badge>{" "}
                {problem.pid}
              </Text>
              <Text color="green">
                <Badge colorScheme="green" fontSize={"sm"}>
                  Status :{" "}
                </Badge>{" "}
                {problem.status ? (
                  <strong>
                    {" "}
                    <Text fontWeight={"44px"} fontSize={"sm"} color={"green"}>
                      SOLVED
                    </Text>
                    <Badge colorScheme="green" fontSize={"sm"}>
                      solvername :{" "}
                    </Badge>{" "}
                    <Text>{solvername}</Text>
                  </strong>
                ) : (
                  <strong>
                    <Text fontWeight={"bold"} fontSize={"sm"} color={"red"}>
                      NOT SOLVED
                    </Text>
                  </strong>
                )}
              </Text>
            </Text>
          </CardBody>

          <Text pl="5" fontSize={"xl"}>
            <strong>Image Provided:</strong>
          </Text>
          <Image
            pl="2"
            pr="2"
            pb="2"
            objectFit="cover"
            maxW={{ base: "100%", sm: "200px" }}
            src={problem.imageurl}
            alt="Image missing"
          />
        </vStack>
      </Card>
      <Button
        ml="5"
        colorScheme="red"
        onClick={() => {
          navigate("/");
        }}
      >
        <ChevronLeftIcon boxSize={8} />
        Go Back
      </Button>
    </>
  );
};

export default DepProbDetails;
