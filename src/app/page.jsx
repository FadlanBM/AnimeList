"use client";

import CardSlider from "@/components/CardSlider/Index";
import Header from "@/components/CardSlider/Header";
import GetAnime from "@/libs/api-libs";
import React, { useEffect, useRef, useState } from "react";

const Page = () => {
  const [topAnime, setTopAnime] = useState([]);

  useEffect(() => {
    const fetchTopAnime = async () => {
      const response = await GetAnime(`seasons/upcoming`);
      setTopAnime(response);
    };
    fetchTopAnime();
  }, []);
  return (
    <section>
      <Header
        title={"SeasonUpcoming"}
        linkTitle={"More Info"}
        linkHref={"/top"}
      />
      <CardSlider api={topAnime} />
    </section>
  );
};

export default Page;
