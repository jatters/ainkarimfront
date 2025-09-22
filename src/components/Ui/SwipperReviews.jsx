"use client";

import Image from "next/image";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";

import { Autoplay } from "swiper/modules";

export default function SwiperReviews({ reviews }) {
  if (reviews.length === 0) {
    return null;
  }

  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={4}
      modules={[Autoplay]}
      autoplay={{
        delay: 5000,
        disableOnInteraction: true,
        pauseOnMouseEnter: true,
      }}
      loop={true}
      breakpoints={{
        0: {
          slidesPerView: 1,
        },
        640: {
          slidesPerView: 2,
        },
        1280: {
          slidesPerView: 4,
        },
      }}
      autoHeight={false}
    >
      {reviews.map((review) => (
        <SwiperSlide key={review.review_id}>
          <div className="p-4 shadow-xl rounded-xl gap-y-3 flex flex-col px-6 justify-between my-10 min-h-80">
            <div className="flex gap-2 justify-between  pt-6 pb-2">
              <div className="flex items-center flex-row gap-2">
                <div className="h-14 w-14">
                  <Image
                    src={review.user_avatar || "https://placehold.co/50x50"}
                    alt={review.user_name}
                    width={50}
                    height={50}
                    className="rounded-full h-14 w-14"
                  />
                </div>
                <div className="flex flex-col justify-start items-start">
                  <span className="font-semibold text-sm">
                    {review.user_name}
                  </span>
                  <Stack spacing={0}>
                    <Rating
                      name="read-only"
                      value={review.review_rate}
                      readOnly
                      size="small"
                    />
                  </Stack>
                  <span className="text-xs font-medium">
                    {review.review_time}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-sm pt-2 text-left flex-1">
              {Object.keys(review.translations).length > 1 ? (
                <span className="line-clamp-8">{review.translations.es}</span>
              ) : (
                <span className="line-clamp-8">{review.review_text}</span>
              )}
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
