import { useState } from "react";
import Image from "next/image";
import {Button,Spinner } from 'react-bootstrap';

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
         
       
        setTitle(data.title);
        setLink(data.link);
       data.status === 'ok'  &&  setStatus(false);
      

        data.status === "fail"
          ? setError("Enter a valid youtube url") && setStatus(true)
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
      
       
        
        data.status === 'fail'
          ? setError("Enter a valid youtube url")
          : setError("");
      }
    } else {
      setError("Enter a valid youtube url");
    }
  };

  return (
    <section className="m-48 ">
      <div className="flex text-center  justify-center items-center h-100vh  ">
        <div className="">
          <h1 className='text-5xl font-bold sm:text-6xl lg:text-5xl '> {toggle ? "Download Mp3" : "Download Mp4"}</h1>
          <p className="text-xl lg:text:xl">Start download by pasting the youtube link below.</p>
          <div className="">
            {" "}
            <Button variant="outline-dark"
              onClick={() => {
                setToggle(!toggle);
                setTitle("");
                setLink("");
                setStatus(true);
                setError("");
               setUrl('')
              }}
            >
              Toggle {toggle ? "MP4" : "MP3"}
            </Button>
          </div>

          <form onSubmit={download}>
            <div className="">
              <p className="font-bold text-3xl lg:text-2xl">{title}</p>
              
              <label htmfor='link' className='mr-2 text-xl lg:text-3xl'>Please enter youtube url: </label>
              <input
              
              id='link'
                type="text"
                className="text-xl placeholder-opacity-75 placeholder-gray-900 border-2  border-gray-600 rounded-md lg:text-2xl"
                placeholder="https://www.youtube......"
                onChange={(e) => setUrl(e.target.value)}
                value={url}
              />
              <p className='text-red-800 text-xl'>{error}</p>
            </div>
            <div className="">
               
               <Button variant="outline-dark" className="" type="submit" size='lg'   >
                  Convert
                </Button>
              
                {status === false && error === '' && <Button  variant="outline-dark" size='lg'
                  className="ml-12"
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
                </Button>}  
              
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
