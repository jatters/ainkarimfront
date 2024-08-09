"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import slide1 from "../../public/reconomiciento1-2020-COMMENDED-RE-2017.jpg";
import slide2 from "../../public/reconomiciento2-2017IWC-Bronce-RE-2017.jpg";
import slide3 from "../../public/reconomiciento3-2009-N-2009-SB-2008-Israel-Oro-Medalla.jpg";
import slide4 from "../../public/reconomiciento4-2019-DECANTER-WORLD-WINE-AWARDS-16.jpg";
import slide5 from "../../public/reconomiciento5-2018-COMMEMORACION-INTERNACIONAL.jpg";
import slide6 from "../../public/reconomiciento6-2017CONCOURS-MUNDIAL-BRUXELLES-13.jpg";
import slide7 from "../../public/reconomiciento7-2017-Medalla-de-Bronce-Cabernet-Sauvignon.jpg";
import slide8 from "../../public/reconomiciento8-2017-Medalla-de-Bronce-Sauvignon-Blanc.jpg";
import slide9 from "../../public/reconomiciento9-2016_MDVDL_Londres_Comm_2015.jpg";
import slide10 from "../../public/reconomiciento10-2013concours-mondial-bruxelles-2014.jpg";
import slide11 from "../../public/reconomiciento11-2011-silver-international_challange-2011.jpg";
import slide12 from "../../public/reconomiciento12-2012Cinve-Valladolid-2012.jpg";
import slide13 from "../../public/reconomiciento13-2013-Premio-Londres-Comm-2010.jpg";
import slide14 from "../../public/reconomiciento14-2013-Rose-Premio-Londres-Comm-2012.jpg";
import slide15 from "../../public/reconomiciento15-2013-Mencion-de-Honor-Cabernet-Sauvignon-Reserva-Especial.jpg";
import slide16 from "../../public/reconomiciento16-2013-Mencion-de-Honor-Cabernet-Sauvignon-Rosado.jpg";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Autoplay } from "swiper/modules";

export default function App() {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        modules={[Autoplay]}
        className="mySwiper h-72 w-72"
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
      >
        <SwiperSlide>
          <Image loading="lazy" src={slide1} alt="slide 1" />
        </SwiperSlide>
        <SwiperSlide>
          <Image loading="lazy" src={slide2} alt="slide 2" />
        </SwiperSlide>
        <SwiperSlide>
          <Image loading="lazy" src={slide3} alt="slide 3" />
        </SwiperSlide>
        <SwiperSlide>
          <Image loading="lazy" src={slide4} alt="slide 4" />
        </SwiperSlide>
        <SwiperSlide>
          <Image loading="lazy" src={slide5} alt="slide 5" />
        </SwiperSlide>
        <SwiperSlide>
          <Image loading="lazy" src={slide6} alt="slide 6" />
        </SwiperSlide>
        <SwiperSlide>
          <Image loading="lazy" src={slide7} alt="slide 7" />
        </SwiperSlide>
        <SwiperSlide>
          <Image loading="lazy" src={slide8} alt="slide 8" />
        </SwiperSlide>
        <SwiperSlide>
          <Image loading="lazy" src={slide9} alt="slide 9" />
        </SwiperSlide>
        <SwiperSlide>
          <Image loading="lazy" src={slide10} alt="slide 10" />
        </SwiperSlide>
        <SwiperSlide>
          <Image loading="lazy" src={slide11} alt="slide 11" />
        </SwiperSlide>
        <SwiperSlide>
          <Image loading="lazy" src={slide12} alt="slide 12" />
        </SwiperSlide>
        <SwiperSlide>
          <Image loading="lazy" src={slide13} alt="slide 13" />
        </SwiperSlide>
        <SwiperSlide>
          <Image loading="lazy" src={slide14} alt="slide 14" />
        </SwiperSlide>
        <SwiperSlide>
          <Image loading="lazy" src={slide15} alt="slide 15" />
        </SwiperSlide>
        <SwiperSlide>
          <Image loading="lazy" src={slide16} alt="slide 16" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
