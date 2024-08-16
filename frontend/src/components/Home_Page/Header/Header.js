import React from "react";
import { Card, CardBody } from "@chakra-ui/react";
import { Container, Flex, Avatar, Text, Badge, Box,Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  let navigate = useNavigate();
  return (
    <>
      <Flex bg='black'>
        <Avatar
          ml="3"
          mt="3"
          mb="3"
          src={props.url}
          cursor={"pointer"}
          onClick={() => {
            navigate("/profile");
          }}
        />
        <Box ml="3" mt="3" mb="3">
          <Text color='white'fontSize={'xl'} fontFamily='inherit' fontWeight="bold">{props.name}</Text>
          <Badge colorScheme="green">Citizen</Badge>
        </Box>
      </Flex>

      <Card mt="10" ml="5" p="5"  bgGradient='linear(to-b, blue.400, blue.600)' color="white" mr="5">
        <CardBody>
          <Container>
            <center>
              {/* <Text fontSize="2xl" color='white'>Hello {props.name + "!!"}</Text> */}
              <Heading fontFamily='mono'color='white'>Hello {props.name + "!!"}</Heading>
              <Text fontFamily='revert' mt='4' fontSize="2xl" fontWeight='bold'color='white'>Welcome Back...</Text>
              {/* <Text fontFamily='' fontSize="1xl" fontWeight='bold'color='white'>Help us to build a better place</Text> */}
            </center>
          </Container>
        </CardBody>
      </Card>
    </>
  );
};

export default Header;
