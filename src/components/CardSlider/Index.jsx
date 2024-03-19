import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const CardSlider = ({ api }) => {
  const sliderRef = useRef(null);
  const [isTouching, setIsTouching] = useState(false);
  const [touchStart, setTouchStart] = useState(0);

  const slideLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= 500;
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += 500;
    }
  };

  const handleTouchStart = (e) => {
    setIsTouching(true);
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (isTouching && sliderRef.current) {
      const touchEnd = e.touches[0].clientX;
      const diff = touchStart - touchEnd;
      sliderRef.current.scrollLeft += diff;

      // Update touchStart to track continuous touch movement
      setTouchStart(touchEnd);
    }
  };

  const handleTouchEnd = () => {
    setIsTouching(false);
  };

  useEffect(() => {
    const slider = sliderRef.current;

    if (slider) {
      slider.addEventListener("wheel", (e) => {
        slider.scrollLeft += e.deltaY;
      });

      slider.addEventListener("touchstart", handleTouchStart);
      slider.addEventListener("touchmove", handleTouchMove);
      slider.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      if (slider) {
        slider.removeEventListener("wheel", (e) => {
          slider.scrollLeft += e.deltaY;
        });

        slider.removeEventListener("touchstart", handleTouchStart);
        slider.removeEventListener("touchmove", handleTouchMove);
        slider.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, []);

  return (
    <div className="relative flex items-center p-4 md:p-2">
      <CaretLeft
        className="opacity-50 cursor-pointer hover:opacity-100 mr-2 "
        onClick={slideLeft}
        size={32}
      />
      <div
        ref={sliderRef}
        className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {api.data?.map((data, index) => (
          <Link
            key={index}
            href={`/anime/${data.mal_id}`}
            className="inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300"
          >
            <div className="relative">
              <Image
                src={data.images.webp.image_url}
                alt="..."
                width={250}
                height={250}
                className="w-full max-h-64 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center">
                <h3
                  className="font-bold text-sm md:text-md p-2 overflow-hidden whitespace-normal"
                  style={{ whiteSpace: "normal" }}
                >
                  {data.title}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <CaretRight
        className="opacity-50 cursor-pointer hover:opacity-100 ml-2"
        onClick={slideRight}
        size={32}
      />
    </div>
  );
};

export default CardSlider;
