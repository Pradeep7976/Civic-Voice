import React, { useState } from "react";
import axios from "axios";
import "./Loginp.css";

import {
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Link,
  Stack,
  Select,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import LoadingPage from "../LoadingPage/LoadingPage";

function Loginp() {
  const [passwordd, setpassword] = useState("");
  const [showpassword, setshowpassword] = useState(true);
  const [passtext, setpasstext] = useState("password");
  const [depart, setdepart] = useState("Select Department");
  const [load, setload] = useState(false);

  // eslint-disable-next-line
  const port = "https://expensive-hem-elk.cyclic.app/";
  // eslint-disable-next-line
  const Port = "https://expensive-hem-elk.cyclic.app/";

  let navigate = useNavigate();
  function regestr() {
    navigate("/regester");
  }
  function clicki() {
    setload(true);
    const dat = {
      depart: depart,
      password: passwordd,
    };
    console.log(dat);
    axios
      .post(Port + "/api/dept/login", dat)
      .then((res) => {
        if (res.data.auth) {
          localStorage.setItem("tokendept", res.data.token);
          localStorage.setItem("did", res.data.did);
          navigate("/dept/" + res.data.did);
        }
      })
      .catch((err) => {
        alert("alert INVALID Password or phone" + err);
        navigate("/dept/login");
      });
  }
  return load ? (
    <LoadingPage />
  ) : (
    <div class="header">
      <div class="inner-header flex">
        <path
          fill="#FFFFFF"
          stroke="#000000"
          stroke-width="10"
          stroke-miterlimit="10"
          d="M57,283"
        />
        <g>
          <path
            fill="#fff"
            d="M250.4,0.8C112.7,0.8,1,112.4,1,250.2c0,137.7,111.7,249.4,249.4,249.4c137.7,0,249.4-111.7,249.4-249.4
C499.8,112.4,388.1,0.8,250.4,0.8z M383.8,326.3c-62,0-101.4-14.1-117.6-46.3c-17.1-34.1-2.3-75.4,13.2-104.1
c-22.4,3-38.4,9.2-47.8,18.3c-11.2,10.9-13.6,26.7-16.3,45c-3.1,20.8-6.6,44.4-25.3,62.4c-19.8,19.1-51.6,26.9-100.2,24.6l1.8-39.7		c35.9,1.6,59.7-2.9,70.8-13.6c8.9-8.6,11.1-22.9,13.5-39.6c6.3-42,14.8-99.4,141.4-99.4h41L333,166c-12.6,16-45.4,68.2-31.2,96.2	c9.2,18.3,41.5,25.6,91.2,24.2l1.1,39.8C390.5,326.2,387.1,326.3,383.8,326.3z"
          />
        </g>
        <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
          <Flex p={8} flex={1} align={"center"} justify={"center"}>
            <Stack spacing={4} w={"full"} maxW={"md"}>
              <Heading className="text" fontSize={"2xl"}>
                Sign in to your account
              </Heading>

              <FormControl className="text" id="phone">
                <Select
                  mt="4"
                  size="lg"
                  color="white"
                  placeholder="Select Department"
                  value={depart}
                  onChange={(e) => {
                    setdepart(e.target.value);
                    console.log(e.target.value);
                  }}
                >
                  <option
                    style={{
                      backgroundColor: "#0099ff",
                      color: "black",
                    }}
                    value="Muncipal Corporation"
                    onClick={(e) => {
                      console.log("e.target.value");
                    }}
                    onSelect={() => {
                      "s";
                    }}
                    onChange={() => {
                      console.log("sdfsdf");
                    }}
                  >
                    Muncipal Corporation
                  </option>
                  <option
                    style={{
                      backgroundColor: "#0099ff",
                      color: "black",
                    }}
                    value="Solid Waste Management Department"
                  >
                    Solid Waste Management Department
                  </option>
                  <option
                    style={{
                      backgroundColor: "#0099ff",
                      color: "black",
                    }}
                    value="Electric Department"
                  >
                    Electric Department
                  </option>
                  <option
                    style={{
                      backgroundColor: "#0099ff",
                      color: "black",
                    }}
                    value="Town Planning Departmemnt"
                  >
                    Town Planning Departmemnt
                  </option>
                  <option
                    style={{
                      backgroundColor: "#0099ff",
                      color: "black",
                    }}
                    value="Public Health Department"
                  >
                    Public Health Department
                  </option>
                  <option
                    style={{
                      backgroundColor: "#0099ff",
                      color: "black",
                    }}
                    value="Department of Water and Sanitation "
                  >
                    Department of Water and Sanitation
                  </option>
                  <option
                    style={{
                      backgroundColor: "#0099ff",
                      color: "black",
                    }}
                    value="Drainage Department"
                  >
                    Drainage Department
                  </option>
                  <option
                    style={{
                      backgroundColor: "#0099ff",
                      color: "black",
                    }}
                    value="Ministry of Road and Highway"
                  >
                    Ministry of Road and Highway
                  </option>
                  <option
                    style={{
                      backgroundColor: "#0099ff",
                      color: "black",
                    }}
                    value="State Pollution Control Board"
                  >
                    State Pollution Control Board
                  </option>
                  <option
                    style={{
                      backgroundColor: "#0099ff",
                      color: "black",
                    }}
                    value="Public Works Department"
                  >
                    Public Works Department
                  </option>
                </Select>
              </FormControl>

              <HStack>
                <FormControl className="text" id="password">
                  <FormLabel>Password</FormLabel>
                  <Input
                    type={passtext}
                    onChange={(e) => {
                      setpassword(e.target.value);
                    }}
                    maxLength={35}
                  />
                </FormControl>
                <Center pl="4" pt="7">
                  {showpassword ? (
                    <AiFillEye
                      onClick={() => {
                        setshowpassword(!showpassword);
                        setpasstext("text");
                      }}
                      fontSize={26}
                      className="eye"
                    />
                  ) : (
                    <AiFillEyeInvisible
                      onClick={() => {
                        setshowpassword(!showpassword);
                        setpasstext("password");
                      }}
                      fontSize={26}
                      className="eye"
                    />
                  )}
                </Center>
              </HStack>
              <Stack spacing={6}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                ></Stack>
                <Button colorScheme={"blue"} variant={"solid"} onClick={clicki}>
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Flex>
        </Stack>
      </div>
      <div>
        <svg
          class="waves"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shape-rendering="auto"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g class="parallax">
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="0"
              fill="rgba(255,255,255,0.7"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="3"
              fill="rgba(255,255,255,0.5)"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="5"
              fill="rgba(255,255,255,0.3)"
            />
            <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
          </g>
        </svg>
      </div>
    </div>
  );
}
export default Loginp;
