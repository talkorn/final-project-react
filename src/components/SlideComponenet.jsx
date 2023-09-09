import React, { useEffect, useState, useRef } from "react";
import { Slide } from "@mui/material";
import axios from "axios";

const Slideshow = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [images, setImages] = useState([]);
  const imagesRef = useRef([]);

  useEffect(() => {
    axios
      .get("http://localhost:8181/api/cards")
      .then(({ data }) => {
        const pictures = data.map((card) => card.image.url);
        imagesRef.current = pictures;
        setImages(pictures);
      })
      .catch((error) => {
        console.log(error);
      });

    const handleNext = () => {
      setCurrentImage(
        (prevImage) => (prevImage + 1) % imagesRef.current.length
      );
    };

    const interval = setInterval(handleNext, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (images.length === 0) {
    return null; // Render null or a loading indicator while waiting for the images
  }

  const handleImageStyle = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth <= 600) {
      return {
        objectFit: "contain",
        width: "100%",
        height: "15rem",
      };
    } else {
      return {
        width: "95%",
        height: "30rem",
      };
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        //height: "30rem", // Adjust the height as needed
        margin: "0.5rem", // Adjust the margins as needed
      }}
    >
      <Slide in direction="left" mountOnEnter unmountOnExit>
        <img
          style={{
            width: "80%", // Adjust the width as needed
            height: "70%",
            ...handleImageStyle(), // Merge the responsive styles here
          }}
          src={images[currentImage]}
          alt={`Slide ${currentImage + 1}`}
        />
      </Slide>
    </div>
  );
};

export default Slideshow;

/* import React, { useEffect, useState, useRef } from "react";
import { Slide } from "@mui/material";
import axios from "axios";

const Slideshow = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [images, setImages] = useState([]);
  const imagesRef = useRef([]);

  useEffect(() => {
    axios
      .get("http://localhost:8181/api/cards")
      .then(({ data }) => {
        const pictures = data.map((card) => card.image.url);
        imagesRef.current = pictures;
        setImages(pictures);
      })
      .catch((error) => {
        console.log(error);
      });

    const handleNext = () => {
      setCurrentImage(
        (prevImage) => (prevImage + 1) % imagesRef.current.length
      );
    };

    const interval = setInterval(handleNext, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (images.length === 0) {
    return null; // Render null or a loading indicator while waiting for the images
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "30rem", // Adjust the height as needed
        margin: "0.5rem", // Adjust the margins as needed
      }}
    >
      <Slide in direction="left" mountOnEnter unmountOnExit>
        <img
          style={{
            width: "80%", // Adjust the width as needed
            height: "100%",
            // objectFit: "cover", // Use "cover" as default objectFit value
            "@media (max-width: 600px)": {
              objectFit: "contain",
              width: "50%", // Apply objectFit: "contain" within the media query
              height: "2rem", // Set the height to 5rem within the media query
            },
          }}
          src={images[currentImage]}
          alt={`Slide ${currentImage + 1}`}
        />
      </Slide>
    </div>
  );
};

export default Slideshow;
 */
