"use client";

import Link from "next/link";
import config from "@config/config.json";
import { markdownify } from "@lib/utils/textConverter";
import { useRef } from "react";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import ImageFallback from "@layouts/components/ImageFallback";

const News = ({ news }) => {
  const paginationRef = useRef(null);
  const { summary_length } = config.settings;
  return (
    <section className="section  bg-border-secondary">
      <div className="container text-center">
        <div className="animate">
          <p className="uppercase">{news.sub_title}</p>
          {markdownify(news.title, "h2", "mt-4 section-title")}
          {markdownify(news.description, "p", "mt-10")}
        </div>
        <div className="animate from-right relative mt-10">
          <Swiper
            slidesPerView={1}
            pagination={{
              type: "bullets",
              el: paginationRef.current,
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{ delay: 3000 }}
            onBeforeInit={(swiper) => {
              swiper.params.pagination.el = paginationRef.current;
            }}
            modules={[Pagination]}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1200: {
                slidesPerView: 3,
              },
            }}
          >
            {news.list.map((item, index) => (
              <SwiperSlide key={"news-" + index}>
                <div className="bg-white group m-4 rounded-md border border-transparent shadow-[0px_4px_25px_rgba(0,0,0,.05)] transition-all duration-300  hover:border-border-secondary hover:shadow-none overflow-hidden">
                  {item.image && (
                    <Link href="/">
                      <ImageFallback
                        className="w-full object-cover group-hover:scale-110 transition-all duration-500"
                        src={item.image}
                        alt={item.title}
                        width={570}
                        height={335}
                      />
                    </Link>
                  )}
                  <div className="p-6 text-left">
                    <h2 className="h5">
                      <Link
                        href="/"
                        className="block hover:text-primary hover:underline"
                      >
                        {item.content.length < 68
                          ? item.content
                          : item.content.slice(0, 68) + "..."}
                      </Link>
                    </h2>
                    <p className="mt-4">{item.title}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="relative mt-9 flex items-center justify-center">
            <div className="pagination " ref={paginationRef}></div>
          </div>

          <div className="banner-btn mt-12">
            <Link
              className=" btn-primary py-4 px-20 rounded-md text-lg"
              href={news.link.href}
            >
              {news.link.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default News;
