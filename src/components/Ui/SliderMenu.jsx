"use client";
import { register } from "swiper/element/bundle";
import { useRef, useEffect } from "react";
import Image from "next/image";

register();

export default function SliderMenu({ images }) {
  const mainSwiperRef = useRef(null);
  const thumbsSwiperRef = useRef(null);

  useEffect(() => {
    if (mainSwiperRef.current && thumbsSwiperRef.current) {
      const mainSwiper = mainSwiperRef.current.swiper;
      const thumbsSwiper = thumbsSwiperRef.current.swiper;

      if (mainSwiper && thumbsSwiper) {
        mainSwiper.thumbs.swiper = thumbsSwiper;
        mainSwiper.thumbs.init();
      }
    }
  }, []);

  if (!images?.length) {
    return (
      <div className="flex justify-center items-center h-64 bg-gray-100">
        <Image
          src="https://placehold.co/700x700"
          alt="Imagen no disponible"
          width={800}
          height={800}
          className="object-contain border border-gray-200 rounded-lg"
        />
      </div>
    );
  }

  const slides = images.map((item, idx) => (
    <swiper-slide key={idx}>
      <Image
        src={`${process.env.NEXT_PUBLIC_SITE_URL}${item.url}`}
        alt={item.alternativeText || `Menu ${idx + 1}`}
        width={400}
        height={400}
        loading="lazy"
        className="object-contain border border-gray-100 rounded-lg mx-auto"
      />
    </swiper-slide>
  ));

  return (
    <>
      {/* Slider principal */}
      <swiper-container
        ref={mainSwiperRef}
        loop="true"
        navigation="true"
        pagination="true"
        space-between="10"
        style={{
          "--swiper-navigation-color": "#6a6a6a",
          "--swiper-pagination-color": "#6a6a6a",
        }}
        class="mb-4"
      >
        {slides}
      </swiper-container>

      {/* Slider thumbs */}
      <swiper-container
        ref={thumbsSwiperRef}
        slides-per-view="9"
        space-between="10"
        watch-slides-progress="true"
      >
        {slides}
      </swiper-container>
    </>
  );
}
