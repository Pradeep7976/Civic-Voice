import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Container,
  Spacer,
  Flex,
  Avatar,
  Box,
  Text,
  Badge,
} from "@chakra-ui/react";
import axios from "axios";
const Header = (props) => {
  // eslint-disable-next-line
  const port = "https://expensive-hem-elk.cyclic.app/";
  // eslint-disable-next-line
  const Port = "https://expensive-hem-elk.cyclic.app/";
  const [details, setdetails] = useState({});
  useEffect(() => {
    axios.post(Port + "/api/user/details", { uid: props.uid }).then((resu) => {
      setdetails(resu.data);
    });
    console.log("sdfsdf" + props.uid);
  }, [details]);
  return (
    <>
      <Flex bg="black" mb="10">
        <Avatar ml="3" mt="3" mb="3" src={details.imageurl} />
        <Box ml="3" mt="3" mb="3">
          <Text color="white" fontWeight="bold">
            {details.name}
          </Text>
          <Badge colorScheme="blue">Department</Badge>
        </Box>
        <Spacer />

        <Text ml="10" mt="3" color="white" marginLeft={5}>
          {props.name}
        </Text>
      </Flex>
      <Card mt="10" ml="5" mb="10" p="5" bg="tomato" color="black" mr="5">
        <CardBody>
          <Container>
            <center>
              <Text fontSize="2xl">Here are the unsolved issues...</Text>
              <Text mt="5" fontSize="1xl">
                Help us to build a better place
              </Text>
            </center>
          </Container>
        </CardBody>
      </Card>
    </>
  );
};

export default Header;
