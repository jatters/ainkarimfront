import PopupContent from "./PopupContent";
import { GetPopup } from "@/components/GetContentApi";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

export default async function Popup({ location }) {
  try {
    const data = await GetPopup();
    if (!data) {
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
    } = data;

    const isValid =
      new Date() >= new Date(startDate) && new Date() <= new Date(endDate);

    const shouldShowPopup =
      (location === "home" && visibleInHome) ||
      (location === "store" && visibleInStore) ||
      (location === "plans" && visibleInPlans);

    const imageUrl = image?.url ? `${baseUrl}${image.url}` : null;

    return (
      <>
        {isActive && isValid && shouldShowPopup && (
          <PopupContent imageUrl={imageUrl} />
        )}
      </>
    );
  } catch (error) {
    console.error("Error in Popup", error);
    return null;
  }
}
