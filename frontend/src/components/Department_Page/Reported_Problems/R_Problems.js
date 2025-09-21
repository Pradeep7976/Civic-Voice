import React, { useEffect, useState } from "react";
import {
  Spacer,
  Badge,
  Heading,
  Text,
  Button,
  ButtonGroup,
  Stack,
  Divider,
  Image,
  Card,
  CardHeader,
  Input,
  CardBody,
  CardFooter,
  SimpleGrid,
} from "@chakra-ui/react";
import { WarningTwoIcon, CheckIcon, InfoIcon } from "@chakra-ui/icons";
import Problems from "./R_Problems_api";
import "./R_Problems.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../../LoadingPage/LoadingPage";
import api from "../../requestClient/axiosInstance";

const reported_problems = Problems;
//
//
//
//
//
//

const R_Problems = (props) => {
  // const Port = "https://expensive-hem-elk.cyclic.app";
  const port = "http://localhost:7000/";
  const [problems, setproblems] = useState([]);
  const [name, setname] = useState("");
  const [load, setload] = useState(true);
  const [show, setshow] = useState(false);
  const [solvername, setsolvername] = useState("");
  const [notgiven, setgiven] = useState(true);
  const [pid, setpid] = useState(0);
  let navigate = useNavigate();
  function solved(pid) {
    setpid(pid);
    setshow(true);

    if (notgiven) {
      return;
    }
    const solver = {
      pid: pid,
      name: solvername,
    };
    api.post("/reportprob/solvername", solver).then((resp) => {
      console.log("SOLVER NAME DONE");
    });
    console.log("SOlved");
    console.log("FUNCPID IS " + pid.toString());
    api.get("/dept/solve/" + pid.toString()).then((result) => {
      console.log(result);
      window.location.reload();
    });

    // console.log("clicked");
  }
  function flag(pid) {
    console.log(pid);
    api.post("/dept/flag", { pid: pid }).then((result) => {
      console.log(result);
      window.location.reload();
    });
  }
  useEffect(() => {
    api
      .get("/dept/getdeptname/" + localStorage.getItem("uid"))
      .then((result) => {
        console.log(result.data);
        setname(result.data);
      });
    // axios.get(port + "/api/dept/probs/" + name).then((response) => {
    api
      .get("/problem/" + name)
      .then((response) => {
        if (response.data.length == 0) {
          alert("Congrats no problems");
        }
        setproblems(response.data.reverse());
        console.log(response.data);
        setload(false);
      })
      .catch((err) => {
        console.log("error fetching data ");
      });
  }, [name]);

  function Popup() {
    return (
      <div className="popup">
        <div
          className="popup-content"
          style={{ backgroundColor: "rgb(230, 46, 0)" }}
        >
          <h2>Confirm Solved</h2>
          <p>Enter the name of solver </p>
          <div className="popup-buttons">
            <Input
              onChange={(e) => {
                setsolvername(e.target.value);
              }}
            />
            <br />
            <button
              onClick={() => {
                setgiven(false);
                setshow(false);
                solved(pid);
              }}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    );
  }
  return show ? (
    <Popup />
  ) : (
    <>
      <SimpleGrid columns={[1, 2, 4]} spacing={"20"} mt={4} mx={10}>
        {problems.map((currElem) => {
          return (
            <>
              <center>
                <Card
                  maxW="lg"
                  minW={"22rem"}
                  boxShadow="dark-lg"
                  mb="7"
                  bg="gray.300"
                  cursor={"pointer"}
                >
                  <CardBody>
                    <Image
                      src={currElem.imageurl}
                      alt="Image of the problem"
                      borderRadius="lg"
                    />
                    <Stack mt="6" spacing="3">
                      <Heading size="md" color="red.600">
                        {currElem.name}
                      </Heading>
                      <Text color="black">
                        <Badge colorScheme="blue">Date</Badge>:{" "}
                        {new Date(currElem.formatdate).toLocaleDateString(
                          "en-GB"
                        )}
                      </Text>

                      {/* <Text color='blue.600' fontSize='2xl'>
                                $450
                            </Text> */}
                    </Stack>
                  </CardBody>
                  <Divider />
                  <CardFooter>
                    <ButtonGroup spacing="2">
                      <Button
                        variant="solid"
                        colorScheme="green"
                        onClick={() => {
                          solved(currElem.pid);
                        }}
                      >
                        <CheckIcon mr="2" />
                        Solved
                      </Button>
                      <Button
                        variant="ghost"
                        colorScheme="blue"
                        onClick={() => {
                          navigate("/probdetails/" + currElem.pid);
                        }}
                      >
                        Full Details
                        <InfoIcon ml="2" />
                      </Button>
                      <Spacer />
                      <Button
                        onClick={() => {
                          flag(currElem.pid);
                        }}
                      >
                        <WarningTwoIcon color="red" />
                      </Button>
                    </ButtonGroup>
                  </CardFooter>
                </Card>
              </center>
            </>
          );
        })}
      </SimpleGrid>
    </>
  );
};

export default R_Problems;
