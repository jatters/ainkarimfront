import Image from "next/image";
import PopupContent from "./PopupContent";

async function GetPopup() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/popup?[fields][0]=isActive&[fields][1]=visibleInHome&[fields][2]=visibleInStore&[fields][3]=visibleInPlans&[populate][image][fields]=url,alternativeText&[fields][4]=startDate&[fields][5]=endDate`,
      {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching popup data:", error);
    return null;
  }
}

export default async function Popup({ location }) {
  try {
    const data = await GetPopup();
    if (!data || !data.data) {
      return null;
    }

    const {
      isActive,
      visibleInHome,
      visibleInStore,
      visibleInPlans,
      image,
      startDate,
      endDate,
    } = data.data;

    const isValid =
      new Date() >= new Date(startDate) && new Date() <= new Date(endDate);

    const shouldShowPopup =
      (location === "home" && visibleInHome) ||
      (location === "store" && visibleInStore) ||
      (location === "plans" && visibleInPlans);

    const imageUrl = image?.url
      ? `${process.env.NEXT_PUBLIC_SITE_URL}${image.url}`
      : null;

    return (
      <>
        {isActive && isValid && shouldShowPopup && (
          <PopupContent imageUrl={imageUrl} />
        )}
      </>
    );
  } catch (error) {
    console.error("Error in Popup component:", error);
    return null;
  }
}
