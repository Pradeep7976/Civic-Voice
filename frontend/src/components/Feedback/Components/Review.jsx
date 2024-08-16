import {
  Box,
  chakra,
  Flex,
  Text,
  useColorModeValue,
  HStack,
  Heading,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import axios from "axios";
function Rating({ rating, numReviews }) {
  return (
    <Box d="flex" alignItems="center">
      <HStack>
        {Array(5)
          .fill("")
          .map((_, i) => {
            const roundedRating = Math.round(rating * 2) / 2;
            if (roundedRating - i >= 1) {
              return (
                <BsStarFill
                  key={i}
                  style={{ marginLeft: "1" }}
                  color={i < rating ? "teal.500" : "gray.300"}
                />
              );
            }
            if (roundedRating - i === 0.5) {
              return <BsStarHalf key={i} style={{ marginLeft: "1" }} />;
            }
            return <BsStar key={i} style={{ marginLeft: "1" }} />;
          })}
      </HStack>
    </Box>
  );
}

function TestimonialCard(props) {
  const [name, setname] = useState("");
  const [user, setuser] = useState("");
  const Port = "https://expensive-hem-elk.cyclic.app/";
  useEffect(() => {
    axios
      .get(Port + "/api/user/details/" + props.uid.toString())
      .then((dat) => {
        setname(dat.data);
      });
  }, [user]);
  return (

    
    
    <Flex
      boxShadow={"lg"}
      direction={{ base: "column-reverse", md: "row" }}
      width={"full"}
      rounded={"xl"}
      p={10}
      justifyContent={"space-between"}
      position={"relative"}
      bgGradient='linear(to-b, blue.400, blue.600)'
      borderColor={"red"}
      borderStyle={"solid"}
      mt='5'
      ml='1'
      mr='1'
    >
      <Flex direction={"column"} textAlign={"left"}>
        <chakra.p
          fontFamily={"mono"}
          fontWeight={"BOLD"}
          fontSize={"20px"}
          pb={4}
          color="white"
        >
          {/* {user} */}
          {name}
        </chakra.p>
        <chakra.p  fontFamily={"Work Sans"} fontWeight={"bold"} fontSize={14}>
          <Text fontSize="xl" color='white' fontFamily={"Almarai"} fontWeight={"300"}>
            {props.feedback}
          </Text>
        </chakra.p>
        <br />
        <Text fontSize="xl" color='white' paddingBottom={1}>ratings given</Text>
        <Rating rating={parseFloat(props.rating)} />
      </Flex>
    </Flex>
   
  );
}
export default TestimonialCard;
