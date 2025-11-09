import React from "react";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

const styles =    
  "[&>p>a]:text-light-green " +  
  "[&>p>a]:hover:text-dark-green " +
  "[&>p>a]:hover:underline " +
  "[&>p>a]:duration-200 " +
  "[&>strong]:text-dark-gray " +
  "[&>p>strong]:text-gray-800 " +
  "[&>h2]:text-2xl " +
  "[&>h2]:font-semibold " +
  "[&>h2]:text-gray-800 " +
  "[&>h3]:text-gray-800 " +
  "[&>h3]:text-xl " +
  "[&>h4]:text-lg " +
  "[&>h4]:text-gray-800 " +  
  "[&>img]:mx-auto " +
  "[&>ul]:list-disc " +
  "[&>ul]:list-inside " +
  "[&>ul]:pl-0 " +
  "[&>ul]:md:pl-5 " +
  "[&>ul]:mb-5 " +
  "[&>ul>li]:marker:font-bold " +
  "[&>ul>li]:marker:text-gray-800 " +  
  "[&>ol]:list-decimal " +
  "[&>ol]:pl-0 " +
  "[&>ol]:md:pl-5 " +
  "[&>ol]:list-inside " +
  "[&>ol>li]:marker:font-bold " +
  "[&>ol>li]:marker:text-gray-800 " +
  "prose-base " +
  "text-gray-700 " +
  "mb-5";


export default function BlocksRendererWithStyles({ content, className = "" }) {
  return (
    <div className={styles + " " + className}>
      <BlocksRenderer content={content} />
    </div>
  );
}
