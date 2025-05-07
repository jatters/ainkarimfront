"use client";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

export default function Timeline({ timeline }) {
  return (
    <>
      <VerticalTimeline lineColor="#062f1d">
        {timeline.map((item, index) => (
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: "#fff", color: "#000" }}
            contentArrowStyle={{ borderRight: "7px solid  #062f1d" }}
            iconStyle={{ background: "#062f1d", color: "#fff" }}
            icon={item.year}
            iconClassName="pt-5 pl-3"
            visible={true}
            key={item.doccumentId ? item.doccumentId : index}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_SITE_URL}${item.image.url}`}
              alt={
                item.image.alternativeText
                  ? item.image.alternativeText
                  : `Imagen ${item.title}`
              }
              className="rounded-xl mx-auto"
              width={500}
              height={500}
            />
            <h3 className="vertical-timeline-element-title -text--dark-green font-bold pt-5 uppercase">
              {item.title}
            </h3>
            <ReactMarkdown>{item.description}</ReactMarkdown>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </>
  );
}
