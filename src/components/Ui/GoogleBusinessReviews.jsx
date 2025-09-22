import SwiperReviews from "@/components/Ui/SwipperReviews";

const HOST = process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_RAPIDAPI_HOST;
const KEY = process.env.NEXT_PUBLIC_GOOGLE_BUSINES_RAPIDAPI_KEY;
const LOCATION_ID =
  process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_RAPIDAPI_BUSINESS_ID;

async function getGoogleReviews() {
  const url = `https://${HOST}/reviews.php?business_id=${LOCATION_ID}&country=co&lang=es&limit=20&sort=Newest`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "x-rapidapi-host": HOST,
      "x-rapidapi-key": KEY,
    },
    next: {
      revalidate: 604800,
    },
  });

  if (!response.ok) {
    let errorDetails = "Unknown error";
    try {
      const errorBody = await response.text();
      errorDetails = JSON.parse(errorBody).message || errorBody;
    } catch (e) {
      errorDetails = "Could not get error body.";
    }
    throw new Error(
      `Failed to fetch reviews: ${response.status} ${response.statusText} - ${errorDetails}`
    );
  }

  return response.json();
}

export default async function GoogleReviews() {
  let data = [];
  try {
    const result = await getGoogleReviews();
    data = result.data || [];
    if (data.length === 0) {
      return null;
    }
  } catch (error) {
    console.error("Error fetching Google reviews:", error);
    return null;
  }

  const reviews = data.reviews.filter(
    (review) => review.review_rate >= 4 && review.review_text?.length > 0
  );

  return (
    <section className="">
      <div className="container mx-auto pt-16 py-8 lg:py-12 xl:py-16">
        <div className="">
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold font-serif -text--dark-green text-center lg:text-left uppercase">
            Así se vive la experiencia
          </h2>
          <p className="text-xl mt-5 text-center lg:text-left italic">
            Lo que piensan quienes ya han disfrutado de la experiencia en Ain
            Karim
          </p>
        </div>
        <div className="px-5">
          <SwiperReviews reviews={reviews}  />
        </div>
      </div>
    </section>
  );
}
