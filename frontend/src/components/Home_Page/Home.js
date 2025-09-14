import { useEffect, useState } from "react";
import Header from "./Header/Header";
import Progress from "./Progress/Progress";
import Report from "./Report/Report";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../LoadingPage/LoadingPage";
function Home() {
  // eslint-disable-next-line
  const port = "http://localhost:7000/";
  // eslint-disable-next-line
  const [details, setDetails] = useState({});
  const [url, setUrl] = useState("");
  const [load, setLoad] = useState(true);
  let navigate = useNavigate();
    useEffect(() => {
      const uid=localStorage.getItem("uid");
    const checkAuth = async () => {
      try {
        const apiPath = `${port}api/v1/user/${uid}`;
        const res = await axios.get(apiPath, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        });

        setDetails(res.data);
        setUrl(res.data.imageurl || "");
        setLoad(false);
      } catch (err) {
        console.error("Auth check failed:", err);
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate]);

  return load ? (
    <LoadingPage />
  ) : (
    <>
      <Header url={url} name={details.name} />
      <Progress />
      <Report />
    </>
  );
}

export default Home;
