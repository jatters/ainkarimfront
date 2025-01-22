"use client";
import { register } from "swiper/element/bundle";
import Image from "next/image";
register();

export default function ProductGalery({images}) {
 
  const swiperSlides = images.map((image, index) => (
    <swiper-slide key={index}>
      <Image
        src={(image.sourceUrl)+'.webp'}
        alt={image.altText}
        className="object-contain border border-gray-100 rounded-lg"
        loading="lazy"
        width={750}
        height={750}
      />
    </swiper-slide>
  ));

  return (
    <>
      <swiper-container
        style={{
          "--swiper-navigation-color": "#6a6a6a",
          "--swiper-pagination-color": "#6a6a6a",
        }}
        space-between="10"
        navigation="true"
        thumbs-swiper=".mySwiper2"
        pagination="true"
        loop="true"
        class="mb-4"
      >
        {swiperSlides}
      </swiper-container>
      <swiper-container
        slides-per-view="5"
        space-between="10"
        class="mySwiper2"
      >
        {swiperSlides}
      </swiper-container>
    </>
  );
}