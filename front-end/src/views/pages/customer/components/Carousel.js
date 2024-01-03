import React, { useEffect, useState } from "react";

const Carousel = ({ images, interval }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const changeIndex = (newIndex) => {
    setActiveIndex(newIndex);
  };
  useEffect(() => {
    const timer = setInterval(() => {
      const newIndex = (activeIndex + 1) % images.length;
      changeIndex(newIndex);
    }, interval * 1000);

    return clearInterval(timer);
  }, [activeIndex, interval, images.length]);

  return (
    <div className="carousel slide wh-100 mt-5" data-bs-ride="carousel">
      <div className="carousel-inner">
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-item ${index === activeIndex ? "active" : ""}`}
            style={{ height: "50vh" }}
          >
            <img
              src={image}
              alt="carousel"
              style={{ objectFit: "fill", width: "100%", height: "100%" }}
            />
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        onClick={() => {
          changeIndex((activeIndex - 1 + images.length) % images.length);
        }}
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        onClick={() => {
          changeIndex((activeIndex + 1) % images.length);
        }}
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
