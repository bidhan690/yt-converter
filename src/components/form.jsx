import { useState, useEffect } from "react";

import { Button, Spinner } from "react-bootstrap";

export default function MainForm() {
  const [toggle, setToggle] = useState(true);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState();
  const [status, setStatus] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [url, setUrl] = useState("");

  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|\?v=)([^#&?]*).*/;
  const match = url.match(regExp);

  const download = async (e) => {
    e.preventDefault();

    if (match && match[2]) {
      if (toggle === true) {
        setLoading(true);
        const options = {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "8b59088f1dmshfd0798dfab4bbbap1c5999jsn3c5e578fc733",
            "X-RapidAPI-Host": "youtube-mp3-download1.p.rapidapi.com",
          },
        };
        const res = await fetch(
          `https://youtube-mp3-download1.p.rapidapi.com/dl?id=${match[2]}`,
          options
        );
        const data = await res.json();

        setTitle(data.title);
        setLink(`${data.link}`);
        // data.status === 'ok' && setStatus(false);

        data.status === "fail"
          ? setError(data.msg) && setStatus(true)
          : setError("");
      } else if (toggle === false) {
        const options = {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "8b59088f1dmshfd0798dfab4bbbap1c5999jsn3c5e578fc733",
            "X-RapidAPI-Host": "youtube-video-download-info.p.rapidapi.com",
          },
        };

        const res = await fetch(
          `https://youtube-video-download-info.p.rapidapi.com/dl?id=${match[2]}`,
          options
        );
        const data = await res.json();
        try {
          data.status === "ok" && setStatus(false);

          setTitle(data.title);
          setLink(data.link[17][0]);

          data.status === "fail"
            ? setError("Enter a valid youtube url")
            : setError("");
        } catch (err) {
          setError(err);
        }
      }
    } else {
      setError("Enter a valid youtube url");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const options = {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "8b59088f1dmshfd0798dfab4bbbap1c5999jsn3c5e578fc733",
            "X-RapidAPI-Host": "youtube-mp3-download1.p.rapidapi.com",
          },
        };
        const res = await fetch(
          `https://youtube-mp3-download1.p.rapidapi.com/dl?id=${match[2]}`,
          options
        );
        const data = await res.json();
        try {
          setLink(`${data.link}`);

          data.status === "fail"
            ? setError(data.msg) && setStatus(true)
            : setError("");
        } catch (err) {
          setError(err);
        }
      } catch (error) {
        setError(error);
      }
    };
    if (link === "" && !error) {
      fetchData();
      const intervalId = setInterval(() => {
        fetchData();
      }, 5000);
      return () => clearInterval(intervalId);
    }
    if (toggle && loading) {
      const timeoutId = setTimeout(() => {
        setStatus(false);
        setLoading(false);
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [loading, toggle, link, match, url, error]);

  return (
    <section className="m-48 ">
      <div className="flex text-center  justify-center items-center h-100vh sm:h-80vh ">
        <div className="">
          <h1 className="text-5xl text-white font-bold sm:text-6xl lg:text-5xl ">
            {" "}
            {toggle ? "Download Mp3" : "Download Mp4"}
          </h1>
          <p className="text-xl lg:text:xl">
            Start download by pasting the youtube link below.
          </p>
          <div className="">
            {" "}
            <Button
              variant="outline-dark"
              onClick={() => {
                setToggle(!toggle);
                setTitle("");
                setLink();
                setStatus(true);
                setError("");
                setUrl("");
              }}
            >
              Toggle {toggle ? "MP4" : "MP3"}
            </Button>
          </div>

          <form onSubmit={download}>
            <div className="">
              <p className="font-bold text-3xl lg:text-2xl">{title}</p>

              <input
                type="text"
                className="text-xl placeholder-opacity-75 placeholder-white  border-2 border-black rounded-md lg:text-2xl"
                placeholder="https://www.youtube......"
                onChange={(e) => setUrl(e.target.value)}
                value={url}
              />
              <p className="text-red-800 text-xl">{error}</p>
            </div>
            <div>
              <Button
                variant="outline-dark"
                className=""
                type="submit"
                size="lg"
              >
                Convert
              </Button>
              {loading && (
                <Spinner
                  animation="border"
                  varient="success"
                  className="ml-12 bg-white"
                />
              )}
              {status === false && error === "" && (
                <Button
                  variant="outline-dark"
                  size="lg"
                  className="ml-12"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(link);
                    setStatus(true);
                    setUrl("");
                    setLink();
                    setTitle("");
                  }}
                >
                  Download
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
