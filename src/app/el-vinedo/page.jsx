import Link from "next/link";
import HeaderImage from "@/components/Ui/HeaderImage";

export default function vinedoPage() {
  return (
    <>
      <HeaderImage title="el viñedo" background="/banner-el-vinedo.jpg" />
      <div className="container mx-auto pt-16 pb-14"></div>
    </>
  );
}
