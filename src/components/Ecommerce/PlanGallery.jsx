"use client";
import { register } from "swiper/element/bundle";
import Image from "next/image";
register();

export default function PlanGallery({ images }) {
  if (images.length === 0) {
    return null;
  }
  if (images.length < 2) {
    return (
      <div>
        <Image
          src={images[0].sourceUrl}
          alt={images[0].altText}
          className="object-contain border border-gray-100 rounded-lg mx-auto w-[350px] lg:w-[500px] xl:w-full "
          loading="lazy"
          width={742}
          height={742}
        />
      </div>
    );
  }
  const swiperSlides = images.map((image, index) => (
    <swiper-slide key={index}>
      <Image
        src={image.sourceUrl}
        alt={image.altText}
        className="object-contain border border-gray-100 rounded-lg mx-auto w-[350px] lg:w-[500px] xl:w-full "
        loading="lazy"
        width={600}
        height={600}
      />
    </swiper-slide>
  ));

  return (
    <div>
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
    </div>
  );
}
