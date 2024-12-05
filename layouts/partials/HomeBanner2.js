"use client";

import ImageFallback from "@layouts/components/ImageFallback";
import { gsap } from "@lib/gsap";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import { useEffect } from "react";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

export default function HomeBanner2({ banner: bannerData, brands }) {
  useEffect(() => {
    const ctx2 = gsap.context(() => {
      const banner = document.querySelector(".banner");
      const bannerBg = document.querySelector(".banner-bg");
      const bannerContent = document.querySelector(".banner-content");
      const header = document.querySelector(".header");
      const tl = gsap.timeline();

      tl.fromTo(
        ".banner-title",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, delay: 0.5 }
      )
        .fromTo(
          ".banner-btn",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          ">-0.4"
        )
        .fromTo(
          ".banner-img",
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
          },
          ">-.5"
        );

      //parallax banner
      const parallaxTl = gsap.timeline({
        ease: "none",
        scrollTrigger: {
          trigger: banner,
          start: () => `top ${header.clientHeight}`,
          scrub: true,
        },
      });

      const position = (banner.offsetHeight - bannerBg.offsetHeight) * 0.4;
      parallaxTl
        .fromTo(
          bannerBg,
          {
            y: 0,
          },
          {
            y: -position,
          }
        )
        .fromTo(
          bannerContent,
          {
            y: 0,
          },
          {
            y: position,
          },
          "<"
        )
        .fromTo(
          ".banner-bg .circle",
          {
            y: 0,
          },
          {
            y: position,
          },
          "<"
        );
    });

    return () => ctx2.revert();
  }, []);

  return (
    <section className="section banner pt-0 bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-10 -z-20 transform-gpu overflow-hidden sm:-top-24"
        >
          <div className="blur-sm bg-gray-200 max-h-[700px] md:max-h-[525px] lg:max-h-[850px]">
            <ImageFallback
              className="banner-img opacity-0 w-full object-cover"
              src={bannerData.image}
              width={1170}
              height={666}
              priority={true}
              alt=""
            />
          </div>
        </div>

        <div className="mx-auto max-w-4xl py-12 sm:pb-40 sm:pt-8 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm text-gray-100 ring-1 ring-gray-100/80 hover:ring-gray-100/20 duration-200 [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">
              Votre plateforme d'informations et de sensibilisation.{" "}
              <Link href="#" className="font-semibold text-primary">
                <span aria-hidden="true" className="absolute inset-0" />
                En Plus <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
          <div className="text-center">
            <h1 className="">
              {markdownify(
                bannerData.title,
                "",
                "mb-8 banner-title opacity-0 [text-shadow:_1px_2px_1px_rgb(0_0_0_/_50%)] text-balance tracking-tight text-white text-3xl lg:text-6xl sm:text-4xl"
              )}
            </h1>

            <div className="animate banner-btn opacity-0 mt-12">
              <Link className="btn btn-primary" href={bannerData.link.href}>
                {bannerData.link.label}
              </Link>
            </div>
          </div>
        </div>

        <div className="row border-y border-border py-5">
          <div className="animate from-right col-12">
            <Swiper
              loop={true}
              slidesPerView={3}
              breakpoints={{
                992: {
                  slidesPerView: 5,
                },
              }}
              spaceBetween={20}
              modules={[Autoplay]}
              autoplay={{ delay: 3000 }}
            >
              {brands.map((brand, index) => (
                <SwiperSlide
                  className=" h-20 cursor-pointer px-6 py-6 grayscale  transition hover:grayscale-0 lg:px-10"
                  key={"brand-" + index}
                >
                  <div className="relative h-full">
                    <ImageFallback
                      className="object-contain"
                      src={brand}
                      sizes="100vw"
                      alt=""
                      fill={true}
                      priority={true}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
