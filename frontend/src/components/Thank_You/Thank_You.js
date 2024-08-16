import React, { useEffect, useState } from "react";
import {
  Alert,
  AlertTitle,
  AlertDescription,
  Box,
  Heading,
  Text,
  Center,
  useSafeLayoutEffect,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { WarningTwoIcon } from "@chakra-ui/icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Thank_You = () => {
  const params = useParams();
  // const id = params.id;
  const [id, setid] = useState(false);
  const text1 =
    "will work with the concerned department on resolving the issue as soon as possible";
  const text2 =
    "The issue is already addressed will work with the concerned department on \n resolving the issue as soon as possible";
  const Port = "https://expensive-hem-elk.cyclic.app/";
  let navigate = useNavigate();
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
    if (params.id == 1) {
      setid(true);
    } else {
      setid(false);
    }
  }, [id]);
  return (
    <>
      <Center>
        <Center d="flex" justifyContent="center" alignItems="center" h="100vh">
          <Box textAlign="center">
            <CheckCircleIcon boxSize={100} color="green" />
            <Heading size="lg" mt="4">
              Thank you for submitting the issue
            </Heading>
            <Text mt="4">We appreciate your help {id ? text1 : text2}</Text>
            <Alert mt="50" status="error">
              <AlertDescription>
                <AlertTitle>
                  <WarningTwoIcon color="red" mr="2" mb="1" />
                  Notice:
                </AlertTitle>
                Spamming or improper submissions will lead to account
                termination
              </AlertDescription>
            </Alert>
          </Box>
        </Center>
      </Center>
    </>
  );
};

export default Thank_You;
