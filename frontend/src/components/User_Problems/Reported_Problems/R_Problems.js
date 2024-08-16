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
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
import { WarningTwoIcon, CheckIcon, InfoIcon } from "@chakra-ui/icons";
import Problems from "./R_Problems_api";
import "./R_Problems.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import LoadingPage from "../../LoadingPage/LoadingPage";

const reported_problems = Problems;
//
//
//
//
//
//

const R_Problems = (props) => {
  const Port = "https://expensive-hem-elk.cyclic.app/";
  const port = "https://expensive-hem-elk.cyclic.app/";
  const [problems, setproblems] = useState([]);
  const [name, setname] = useState("");
  const [load, setload] = useState(true);

  let navigate = useNavigate();
  const params = useParams();
  function solved(pid) {
    console.log("FUNCPID IS " + pid.toString());
    axios.get(Port + "/api/dept/solve/" + pid.toString()).then((result) => {
      console.log(result);
      window.location.reload();
    });

    // console.log("clicked");
  }
  function flag(pid) {
    console.log(pid);
    axios.post(Port + "/api/dept/flag", { pid: pid }).then((result) => {
      console.log(result);
      window.location.reload();
    });
  }
  useEffect(() => {
    // axios.get(port + "/api/dept/probs/" + name).then((response) => {
    axios
      .get(Port + "/api/user/userdetails/" + params.uid)
      .then((response) => {
        setload(false);
        if (response.data.length == 0) {
          alert("Congrats no problems");
        }
        setproblems(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log("error fetching data ");
      });
  }, [name]);
  return (
    <>
      {problems.map((currElem) => {
        return (
          <>
            <center>
              <Card
                maxW="sm"
                boxShadow="dark-lg"
                mb="7"
                bg="#e6e6e6"
                cursor={"pointer"}
              >
                <CardBody>
                  <Image
                    src={currElem.imageurl}
                    alt="Image of the problem"
                    borderRadius="lg"
                  />
                  <Stack mt="6" spacing="3">
                    <Heading size="md" color="tomato">
                      {currElem.name}
                    </Heading>
                    <Text color="blue.600">
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
                  </ButtonGroup>
                </CardFooter>
              </Card>
            </center>
          </>
        );
      })}
    </>
  );
};

export default R_Problems;
