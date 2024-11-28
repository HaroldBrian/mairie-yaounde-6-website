"use client";

import Link from "next/link";
import { markdownify } from "@lib/utils/textConverter";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { useRef } from "react";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const News = ({ news }) => {
  const paginationRef = useRef(null);
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
            // autoplay={{ delay: 3000 }}
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
              <SwiperSlide key={"feature-" + index}>
                <div className="feature-card m-4 rounded-md border border-transparent px-7 py-16 shadow-[0px_4px_25px_rgba(0,0,0,.05)] transition-all duration-300  hover:border-border-secondary hover:shadow-none">
                  <div className="feature-card-icon inline-flex h-20 w-20 items-center justify-center rounded-md border border-[#fff7f3] text-primary">
                    <FeatherIcon icon={item.icon} />
                  </div>
                  <h3 className="h4 mb-5 mt-6">{item.title}</h3>
                  <p>{item.content}</p>
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
