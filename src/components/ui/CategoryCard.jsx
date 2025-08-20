import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

const CategoryCard = ({ category, index, courseCount }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    gsap.fromTo(
      card,
      { opacity: 0, y: 30, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        delay: index * 0.1,
        ease: "power2.out",
      }
    );

    const handleEnter = () => {
      gsap.to(card, {
        scale: 1.04,
        boxShadow:
          "0 8px 20px rgba(0, 255, 255, 0.4), 0 0 12px rgba(255, 0, 255, 0.4)",
        y: -5,
        duration: 0.3,
        ease: "power2.out",
      });
    };
    const handleLeave = () => {
      gsap.to(card, {
        scale: 1,
        boxShadow:
          "0 4px 12px rgba(0, 0, 0, 0.3), inset 0 0 6px rgba(57,255,20,0.3)",
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    card.addEventListener("mouseenter", handleEnter);
    card.addEventListener("mouseleave", handleLeave);

    return () => {
      card.removeEventListener("mouseenter", handleEnter);
      card.removeEventListener("mouseleave", handleLeave);
    };
  }, [index]);

  return (
    <Link
      to={`/category/${encodeURIComponent(category.name)}?from=course`}
      ref={cardRef}
      className="relative w-full max-w-[260px] sm:max-w-[280px] h-[320px] bg-[var(--dark-charcoal)] rounded-lg border border-[var(--aqua-glow)]/40 overflow-hidden flex flex-col shadow-[0_4px_12px_rgba(0,0,0,0.3)] transition-all duration-300 hover:border-[var(--neon-purple)]/60 mx-auto category-card"
    >
      {/* Top Glow Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--neon-pink)] to-[var(--electric-blue)] shadow-[0_0_5px_var(--pink-glow)]" />

      {/* Image */}
      <div className="w-full h-[160px] bg-[var(--dark-charcoal)]/90 flex items-center justify-center overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/260x160?text=Image+Not+Found";
          }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 p-3 sm:p-4 flex flex-col justify-between text-[var(--white-smoke)]">
        <h3 className="text-base sm:text-lg font-bold truncate [text-shadow:0_0_5px_var(--blue-glow)]">
          {category.name}
        </h3>
        <div className="text-xs sm:text-sm font-medium text-[var(--electric-blue)] mt-2">
          {courseCount}
        </div>
      </div>

      {/* CTA */}
      <div className="w-full px-3 sm:px-4 pb-3 sm:pb-4">
        <button className="w-full py-2 bg-gradient-to-r from-[var(--neon-purple)] to-[var(--electric-blue)] text-[var(--white-smoke)] rounded-md text-xs sm:text-sm font-semibold shadow-[0_0_8px_var(--blue-glow)] hover:opacity-85 transition-all duration-200">
          Explore Now
        </button>
      </div>
    </Link>
  );
};

export default CategoryCard;