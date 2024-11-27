"use client";

import { useEffect, useState } from "react";
import { CgArrowUp } from "react-icons/cg";

function ScrollToTop() {
  const [shadowButton, setShadowButton] = useState(false);

  useEffect(() => {
    const handleScrollButtonVisibility = () => {
      window.pageYOffset > 300 ? setShadowButton(true) : setShadowButton(false);
    };

    window.addEventListener("scroll", handleScrollButtonVisibility);

    return () => {
      window.removeEventListener("scroll", handleScrollButtonVisibility);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      {shadowButton && (
        <div className="">
          <button
            className="btn btn-primary fixed bottom-5 right-7 z-50 shadow-md shadow-white rounded-full w-11 h-11 p-0 flex items-center justify-center"
            onClick={handleScrollToTop}
          >
            <CgArrowUp className="text-[26px] text-white" />
          </button>
        </div>
      )}
    </div>
  );
}

export default ScrollToTop;
