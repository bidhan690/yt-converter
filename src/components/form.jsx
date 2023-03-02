import { useState } from "react";
import Image from "next/image";

export default function MainForm(props) {
  const [toggle, setToggle] = useState(true);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [imgsrc, setImgSrc] = useState("");
  const [status, setStatus] = useState(true);
  const [error, setError] = useState("");

  const [url, setUrl] = useState("");
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|\?v=)([^#&?]*).*/;
  const match = url.match(regExp);

  const download = async (e) => {
    e.preventDefault();

    if (match && match[2]) {
      if (toggle === true) {
        const options = {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "8b59088f1dmshfd0798dfab4bbbap1c5999jsn3c5e578fc733",
            "X-RapidAPI-Host": "youtube-mp3-download1.p.rapidapi.com",
          },
        };
        const res = await fetch(
          `https://youtube-mp36.p.rapidapi.com/dl?id=${match[2]}`,
          options
        );
        const data = await res.json();
        data.status === "ok" && setStatus(false);
        setTitle(data.title);
        setLink(data.link);

        data.status === "fail"
          ? setError("Enter a valid youtube url")
          : setError("");
      } else {
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
        data.status === "ok" && setStatus(false);
        setTitle(data.title);
        setLink(data.link[17][0]);
        setImgSrc(data.thumb);
        data.status === "fail"
          ? setError("Enter a valid youtube url")
          : setError("");
      }
    } else {
      setError("Enter a valid youtube url");
    }
  };

  return (
    <div className="mb-11 ">
      <h1> {toggle ? "Download Mp3" : "Download Mp4"}</h1>
      <p className="">Start download by pasting the youtube id below.</p>
      <div className="ml-12">
        {" "}
        <button
          onClick={() => {
            setToggle(!toggle);
            setTitle("");
            setLink("");
            setStatus(true);
            setError("");
          }}
        >
          Toggle {toggle ? "MP4" : "MP3"}
        </button>
      </div>

      <form onSubmit={download}>
        <div>
          <p className="">{title}</p>
          {imgsrc.length > 0 && (
            <Image src={imgsrc} width={200} height={300} alt={title} />
          )}
          <input
            type="text"
            className=""
            placeholder="Enter Youtube Url"
            onChange={(e) => setUrl(e.target.value)}
            value={url}
          />
          <p>{error}</p>
        </div>
        <div className="">
          {status ? (
            <button className="" type="submit">
              Convert
            </button>
          ) : (
            <button
              className=""
              onClick={(e) => {
                e.preventDefault();
                window.open(link);
                setStatus(true);
                setUrl("");
                setLink("");
                setTitle("");
                setImgSrc("");
              }}
            >
              Download
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
