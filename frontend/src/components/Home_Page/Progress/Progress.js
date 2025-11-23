import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardBody,
  Heading,
  Stack,
  StackDivider,
  Box,
  Text,
  Divider,
} from "@chakra-ui/react";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import { Progress } from "@chakra-ui/react";
import axios from "axios";
import api from "../../requestClient/axiosInstance";
const Progres = () => {
  const [total, settotal] = useState(0);
  const [solvedcount, setsolvedcount] = useState(0);
  useEffect(() => {
    api.get("/problem/count/solved").then((response) => {
      setsolvedcount(parseInt(response.data.count));
      console.log("Solved " + solvedcount);
    });
    api.get("/problem/count/total").then((response) => {
      if (response.data.count != 0) settotal(response.data.count);
      else {
        settotal(1);
      }
      console.log("Total " + total);
    });
  }, [total, solvedcount]);
  return (
    <>
      <Container
        h="calc(80vh)"
        borderRadius={10}
        bgGradient="linear(to-b, blue.600, blue.400)"
        pt="5"
        mt="10"
        mb="10"
      >
        <center>
          <Heading color="white">Our Progress</Heading>
        </center>
        <Card boxShadow="dark-lg" borderRadius={10} mt="10" mb="10">
          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Heading size="xs" mb="5" textTransform="uppercase">
                  Weekly Data
                </Heading>
                <Divider orientation="horizontal"></Divider>

                <div>
                  <span mt="5" mb="2">
                    Problems Reported
                  </span>
                  <Progress
                    mt="3"
                    mb="5"
                    colorScheme="green"
                    hasStripe
                    value={20}
                  />
                </div>
                <Divider orientation="horizontal"></Divider>
                <div>
                  <span mt="5" mb="2">
                    Problems Solved
                  </span>
                  <Progress
                    colorScheme="green"
                    value={(solvedcount / total) * 100}
                    mb="4"
                  />
                </div>
                <Divider orientation="horizontal"></Divider>
              </Box>
            </Stack>
          </CardBody>
        </Card>
        <Card boxShadow="dark-lg" borderRadius={10} mt="10" mb="10">
          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Montly Data
                </Heading>
                <Divider orientation="horizontal"></Divider>

                <div>
                  <span>Problems Reported</span>
                  <CircularProgress
                    mt="5"
                    ml="10"
                    color="green.300"
                    value={30}
                    size="80px"
                  >
                    <CircularProgressLabel>{total}</CircularProgressLabel>
                  </CircularProgress>
                </div>
                <Divider orientation="horizontal"></Divider>

                <div>
                  <span>Problems Solved </span>
                  <CircularProgress
                    mt="5"
                    color="green.300"
                    ml="14"
                    value={30}
                    size="80px"
                  >
                    <CircularProgressLabel>
                      {((solvedcount / total) * 100).toFixed(2)}%
                    </CircularProgressLabel>
                  </CircularProgress>
                </div>
                <Divider orientation="horizontal"></Divider>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default Progres;
