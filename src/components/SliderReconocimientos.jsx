"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Autoplay } from "swiper/modules";

export default function SliderReconocimientos({ reconocimientos }) {
  return (
    <section className="container mx-auto pb-8 lg:pb-16 px-5 lg:px-10 ">
      <h2 className="text-2xl lg:text-4xl text-dark-green text-center mb-8 lg:mb-16">
        RECONOCIMIENTOS
      </h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        modules={[Autoplay]}
        className="mySwiper pb-16 max-h-96"
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
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
      >
        {reconocimientos.map((item, index) => (
          <SwiperSlide key={item.documentId ? item.documentId : index}>
            <div className="relative ">
              <Image
                loading="lazy"
                src={`${process.env.NEXT_PUBLIC_SITE_URL}${item.image.url}`}
                alt={
                  item.image.alternativeText
                    ? item.image.alternativeText
                    : `slide reconocimiento ${index}`
                }
                width={350}
                height={350}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
