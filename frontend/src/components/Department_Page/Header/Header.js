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
  Heading
} from "@chakra-ui/react";
import axios from "axios";
const Header = (props) => {
  
  return (
    <>
      <Flex bg="black" mb="10">
        <Avatar ml="3" mt="3" mb="3" src="https://bit.ly/sage-adebayo" />
        <Box ml="3" mt="3" mb="3">
          <Text color="white" fontWeight="bold">
            {props.name}
          </Text>
          <Badge colorScheme="blue">Department</Badge>
        </Box>
        <Spacer />

        {/* <Text ml="10" mt="3" color="white" marginLeft={5}>
          {props.name}
        </Text> */}
      </Flex>
      <Card  bgGradient='linear(to-b, blue.600, blue.400)' mt="10" ml="5" mb="10" p="5"  color="black" mr="5">
        <CardBody>
          <Container>
            <center>
              <Heading fontFamily='mono' textColor={"white"}>Here are the unsolved issues...</Heading>
              {/* <Text mt="5" textColor='white'fontSize="xl">
                Help us to build a better place
              </Text> */}
            </center>
          </Container>
        </CardBody>
      </Card>
    </>
  );
};

export default Header;
