"use client";

import React, { useEffect, useRef, useState } from "react";
import { Product } from "types/productType";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ProductCard from "components/website/ProductCard";

type Props = {
  products: Product[];
};

const ProductsCarousel = ({ products }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const isMouseDown = useRef(false);
  const hasDragged = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const container = containerRef.current;

    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    const maxScroll = scrollWidth - clientWidth;

    setCanScrollRight(Math.abs(scrollLeft) < maxScroll - 1);
    setCanScrollLeft(Math.abs(scrollLeft) > 1);
  };

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    checkScroll();

    container.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      container.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [products]);

  const scroll = (direction: "left" | "right") => {
    const container = containerRef.current;

    if (!container) return;

    container.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;

    if (!container) return;

    isMouseDown.current = true;
    hasDragged.current = false;

    startX.current = e.pageX - container.offsetLeft;
    startScrollLeft.current = container.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMouseDown.current) return;

    const container = containerRef.current;

    if (!container) return;

    const x = e.pageX - container.offsetLeft;
    const walk = x - startX.current;

    if (Math.abs(walk) > 5) {
      hasDragged.current = true;
    }

    e.preventDefault();

    container.scrollLeft = startScrollLeft.current - walk;
  };

  const stopDragging = () => {
    isMouseDown.current = false;
  };

  const handleClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hasDragged.current) return;

    e.preventDefault();
    e.stopPropagation();

    hasDragged.current = false;
  };

  return (
    <div className="group/carousel relative" dir="rtl">
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
        onClickCapture={handleClickCapture}
        className="flex gap-3 overflow-x-auto select-none px-4 py-4 scrollbar-hide bg-blue-400 rounded-2xl sm:rounded-3xl sm:gap-3"
        dir="rtl"
      >
        {products.map((product) => (
          <ProductCard variant="slider" key={product._id} product={product} />
        ))}
      </div>

      {/* Right */}
      {canScrollLeft && (
        <button
          type="button"
          onClick={() => scroll("right")}
          aria-label="محصولات قبلی"
          className="absolute right-2 top-1/2 cursor-pointer z-10 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-secondary-200 bg-white text-secondary-700 shadow-lg transition-all duration-200 hover:scale-105 hover:border-primary-200 hover:text-primary-600 md:flex"
        >
          <ChevronRightIcon fontSize="small" />
        </button>
      )}

      {/* Left */}
      {canScrollRight && (
        <button
          type="button"
          onClick={() => scroll("left")}
          aria-label="محصولات بعدی"
          className="absolute left-2 top-1/2 cursor-pointer z-10 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-secondary-200 bg-white text-secondary-700 shadow-lg transition-all duration-200 hover:scale-105 hover:border-primary-200 hover:text-primary-600 md:flex"
        >
          <ChevronLeftIcon fontSize="small" />
        </button>
      )}
    </div>
  );
};

export default ProductsCarousel;
