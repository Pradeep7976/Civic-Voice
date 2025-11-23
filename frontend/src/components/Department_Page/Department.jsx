import React, { useEffect } from "react";
import Header from "./Header/Header";
import ReportedProblem from "./Reported_Problems/R_Problems";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../LoadingPage/LoadingPage";
import api from "../requestClient/axiosInstance";

const Department = () => {
  // localStorage.setItem("did", 4);
  const [Name, setname] = useState();
  const [load, setload] = useState(true);

  const Port = "http://localhost:7000/";
  const port = "http://localhost:7000/";
  let navigate = useNavigate();
  useEffect(() => {
    console.log("I AM USE EFFECT");
    const did = localStorage.getItem("uid");
    api.get("/dept/getdeptname/" + did).then((result) => {
      console.log(result.data);
      setname(result.data);
      setload(false);
    });
  }, [Name]);
  return load ? (
    <LoadingPage />
  ) : (
    <>
      <Header name={Name} />
      <ReportedProblem name={Name} />
    </>
  );
};

export default Department;
