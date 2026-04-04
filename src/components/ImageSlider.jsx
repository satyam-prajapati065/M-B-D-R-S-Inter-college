import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
// Swiper Styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const ImageSlider = () => {
  // Yahan tum apne school ki images ka path dalo
  const slides = [
    {
      url: "https://i.ytimg.com/vi/qh1XhsUezNk/hqdefault.jpg",
      title: "Welcome to MBDRS Inter College",
      sub: "Education for a better tomorrow",
      myStyle: { backgroundColor: "#ffb320" },
    },
    {
      url: "https://content.jdmagicbox.com/v2/comp/akbarpur/g4/9999p5271.5271.180119005024.b3g4/catalogue/m-b-d-r-s-sainik-school-akbarpur-akbarpur-military-schools-cmc710z59j.jpg",
      title: "",
      sub: "",
    },
    {
      url: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweoZr5FazlVAS0mf9EFq8Wv-U6aO4m4T-DmdeyJMqVguF0o1yjtY4NJAUJUh3v5golqA91Cqx_YDkl1EQ_pdgDZaoHqLkCTnZTJyL95lR7EWOVBfw14AXBsbZRHtUUFzWFOXZL2V1opP2aVD=w222-h100-k-no",
      title: "Big Playground",
      sub: "",
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
                  <p className="animate-sub" style={slide.myStyle}>
                    {slide.sub}
                  </p>
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
