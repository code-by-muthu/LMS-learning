// src/components/CategoryCard.jsx
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

const CategoryCard = ({ category, index, courseCount }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    gsap.fromTo(
      card,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        delay: index * 0.1,
        ease: "power2.out",
      }
    );

    const handleEnter = () => {
      gsap.to(card, {
        scale: 1.03,
        boxShadow:
          "0 10px 25px rgba(0, 255, 255, 0.35), 0 0 15px rgba(255, 0, 255, 0.35)",
        y: -6,
        duration: 0.3,
        ease: "power2.out",
      });
    };
    const handleLeave = () => {
      gsap.to(card, {
        scale: 1,
        boxShadow:
          "0 5px 15px rgba(0, 0, 0, 0.3), inset 0 0 8px rgba(57,255,20,0.25)",
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

  const link =
    category.type === "error"
      ? `/category/${encodeURIComponent(category.category)}?from=error`
      : `/category/${encodeURIComponent(category.name)}?from=course`;

  return (
    <Link
      to={link}
      ref={cardRef}
      className="relative w-full max-w-[300px] h-[360px] 
        bg-[var(--dark-charcoal)] rounded-xl border border-[var(--aqua-glow)]/30 
        overflow-hidden flex flex-col shadow-[0_5px_15px_rgba(0,0,0,0.35)] 
        transition-all duration-300 hover:border-[var(--neon-purple)]/50"
    >
      {/* Top Bar Glow */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--neon-pink)] to-[var(--electric-blue)] shadow-[0_0_6px_var(--pink-glow)]" />

      {/* Image */}
      <div className="w-full h-[150px] bg-[var(--dark-charcoal)]/80 flex items-center justify-center overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/250x150?text=Image+Not+Found";
          }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 p-5 flex flex-col justify-between text-[var(--white-smoke)]">
        <h3 className="text-lg font-bold truncate [text-shadow:0_0_6px_var(--blue-glow)]">
          {category.name}
        </h3>
        <p className="text-sm text-gray-400 mt-2 line-clamp-3">
          {category.description}
        </p>
        <div className="mt-4 text-sm font-medium text-[var(--electric-blue)]">
          {category.type === "error"
            ? `${courseCount} Errors`
            : `${courseCount} Courses`}
        </div>
      </div>

      {/* CTA */}
      <div className="w-full px-5 pb-4">
        <button className="w-full py-2 bg-gradient-to-r from-[var(--neon-purple)] to-[var(--electric-blue)] text-white rounded-md text-sm font-semibold shadow-[0_0_10px_var(--blue-glow)] hover:opacity-90 transition-all">
          Explore Now
        </button>
      </div>
    </Link>
  );
};

export default CategoryCard;
