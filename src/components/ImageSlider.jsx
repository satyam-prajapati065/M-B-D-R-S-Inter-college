import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { sliderImages } from "../assets/SliderImages";

// Swiper Styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const ImageSlider = () => {
  // Yahan tum apne school ki images ka path dalo
  const slides = [
    {
      url: sliderImages[0],
      title: "Welcome to MBDRS Inter College",
      sub: "Education for a better tomorrow",
    },
    {
      url: sliderImages[1],
      title: "Modern Science Labs",
      sub: "Practical learning for every student",
    },
    {
      url: sliderImages[2],
      title: "Big Playground",
      sub: "Sports and physical activities",
    },
  ];

  return (
    <div className="slider-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        className="mySwiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="single-slide"
              style={{ backgroundImage: `url(${slide.url})` }}
            >
              <div className="slide-overlay">
                <div className="slide-content">
                  <h1 className="animate-title">{slide.title}</h1>
                  <p className="animate-sub">{slide.sub}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
