import { useEffect } from "react";
import CustomCursor from "@/components/experience/CustomCursor";
import ScrollProgressLine from "@/components/experience/ScrollProgressLine";
import { useViewportAnimations } from "@/hooks/useViewportAnimations";

const ExperienceEnhancements = () => {
  useViewportAnimations();

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.createImageData(canvas.width, canvas.height);
    for (let index = 0; index < imageData.data.length; index += 4) {
      const value = Math.floor(Math.random() * 255);
      imageData.data[index] = value;
      imageData.data[index + 1] = value;
      imageData.data[index + 2] = value;
      imageData.data[index + 3] = 22;
    }

    ctx.putImageData(imageData, 0, 0);
    document.documentElement.style.setProperty("--noise-image", `url(${canvas.toDataURL("image/png")})`);
    document.body.classList.add("has-grain");

    return () => {
      document.body.classList.remove("has-grain");
      document.documentElement.style.removeProperty("--noise-image");
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <ScrollProgressLine />
    </>
  );
};

export default ExperienceEnhancements;
