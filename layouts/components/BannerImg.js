"use client";
import { gsap } from "@lib/gsap";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import { useEffect, useRef } from "react";
import Circle from "./Circle";
import ImageFallback from "./ImageFallback";

const BannerImg = ({ title, content }) => {
  const banner = useRef(null);

  //banner animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const header = document.querySelector(".header");
      const tl = gsap.timeline();
      tl.fromTo(
        ".banner-regular-title",
        {
          y: 20,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
        }
      ).fromTo(
        ".breadcrumb",
        {
          y: 20,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
        },
        ">-.3"
      );
      //parallax banner
      const parallaxTl = gsap.timeline({
        ease: "none",
        scrollTrigger: {
          trigger: banner.current,
          start: () => `top ${header.clientHeight}`,
          end: () => `+=${banner.current.offsetHeight}`,
          scrub: true,
        },
      });

      const position = banner.current.offsetHeight * 0.15;
      parallaxTl.fromTo(
        ".banner-single .circle",
        {
          y: 0,
        },
        {
          y: position,
        },
        "<"
      );
    }, banner);

    return () => ctx.revert();
  }, []);

  return (
    <div className="banner banner-single " ref={banner}>
      <div className="container-xl ">
        <div className="banner-wrapper relative text-center">
          {markdownify(
            title,
            "h1",
            "mb-8 banner-regular-title opacity-0 [text-shadow:_1px_2px_1px_rgb(0_0_0_/_50%)] text-white"
          )}
          {content ? (
            <div className="text-white">{content}</div>
          ) : (
            <ul className="breadcrumb flex items-center justify-center opacity-0">
              <li>
                <Link className="text-primary" href="/">
                  Home
                </Link>
              </li>
              <li className="mx-2">/</li>
              <li className="capitalize">{title}</li>
            </ul>
          )}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-0 -z-20 transform-gpu overflow-hidden rounded-lg sm:-top-0"
          >
            <div className="bg-gray-200 max-h-[375px] blur-sm">
              <ImageFallback
                className="banner-img opaciy-0 w-full object-cover"
                src="/images/features-02.png"
                width={1170}
                height={666}
                priority={true}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerImg;
