import dynamic from "next/dynamic";

const GMap = dynamic(() => import("./GMap"), {
  ssr: false,
});

export default GMap;
