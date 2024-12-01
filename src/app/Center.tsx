"use client";

import { useEffect, useState } from "react";

function randomInt(i: number): number {
  return Math.floor(Math.random() * i);
}

function randomGradientColor(): string {
  const colors = ["#66ffff", "#99ccff", "#ccffcc", "#ffccff"];
  const gradientFromColor = colors[randomInt(colors.length)];
  let gradientToColor: string;
  do {
    gradientToColor = colors[randomInt(colors.length)];
  } while (gradientToColor == gradientFromColor);
  const directions = [45, 90, 135];
  const gradientDirection = directions[randomInt(directions.length)];
  return `linear-gradient(${gradientDirection}deg, ${gradientFromColor}, ${gradientToColor})`;
}

function useRandomGradientColor() {
  const [gradientColor, setGradientColor] = useState("");
  useEffect(() => {
    setGradientColor(randomGradientColor);
    // const handler = setInterval(() => {
    //   setGradientColor(randomGradientColor);
    // }, 5000);
    // return () => clearInterval(handler);
  }, []);
  return gradientColor;
}

function usePosition() {
  const [position, setPosition] = useState(0);
  useEffect(() => {
    const handler = setInterval(() => {
      setPosition((position) => 1 - position);
    }, 4000);
    return () => clearInterval(handler);
  }, []);
  return position;
}

export function Center({ rawHtml }: { rawHtml: string }) {
  const gradientColor = useRandomGradientColor();
  const position = usePosition();
  return (
    <div className={"w-[1200px] mx-auto pt-[10%] flex flex-col items-center"}>
      <a
        href={"https://z2z63.dev"}
        className="inline w-max text-[72px] leading-none  text-center relative text-transparent bg-clip-text
        hover:scale-105"
        style={{
          backgroundImage: gradientColor,
          backgroundPositionX: position === 0 ? "left" : "right",
          backgroundSize: "150% 100%",
          transition:
            "background-position-x 4000ms, transform 150ms ease-in-out",
        }}
      >
        z2z63.dev
        <div
          className={"absolute bottom-0 left-0 right-0 h-2"}
          style={{
            backgroundImage: gradientColor,
            backgroundPositionX: position === 0 ? "left" : "right",
            backgroundSize: "150% 100%",
            transition:
              "background-position-x 4000ms, transform 150ms ease-in-out",
          }}
        />
      </a>
      <center className="mt-[50px] prose-slate prose-lg prose-a:underline prose-a:text-blue-300 text-left">
        <div dangerouslySetInnerHTML={{ __html: rawHtml }}></div>
      </center>
    </div>
  );
}
