import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { FaHeart, FaStar } from 'react-icons/fa';

const CourseCard = ({
  course,
  index = 0,
  showWishlist = true,
  showRating = true,
  showPrice = true,
  showCreator = true,
  className = "",
}) => {
  const cardRef = useRef(null);
  const wishlistRef = useRef(null);
  const ratingRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const wishlist = wishlistRef.current;
    const rating = ratingRef.current;

    if (!card) return;

    gsap.fromTo(
      card,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, delay: index * 0.15, ease: 'power3.out' }
    );

    const handleEnter = () => {
      gsap.to(card, {
        scale: 1.03,
        boxShadow: '0 0 25px var(--green-glow), 0 0 10px var(--pink-glow)',
        duration: 0.3,
        ease: 'power2.out',
      });
      if (wishlist && showWishlist) {
        gsap.to(wishlist, {
          scale: 1.2,
          color: 'var(--white-smoke)',
          backgroundColor: 'var(--neon-pink)',
          boxShadow: '0 0 15px var(--pink-glow), 0 0 5px var(--pink-glow) inset',
          rotate: 10,
          duration: 0.3,
          ease: 'elastic.out(1, 0.5)',
        });
      }
      if (rating && showRating) {
        gsap.to(rating.querySelectorAll('.star'), {
          scale: 1.1,
          stagger: 0.05,
          duration: 0.3,
        });
      }
    };

    const handleLeave = () => {
      gsap.to(card, {
        scale: 1,
        boxShadow: '0 0 12px var(--green-glow)',
        duration: 0.3,
        ease: 'power2.out',
      });
      if (wishlist && showWishlist) {
        gsap.to(wishlist, {
          scale: 1,
          color: 'var(--white-smoke)',
          backgroundColor: 'var(--dark-charcoal)',
          boxShadow: 'none',
          rotate: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
      if (rating && showRating) {
        gsap.to(rating.querySelectorAll('.star'), {
          scale: 1,
          duration: 0.3,
        });
      }
    };

    card.addEventListener('mouseenter', handleEnter);
    card.addEventListener('mouseleave', handleLeave);

    return () => {
      card.removeEventListener('mouseenter', handleEnter);
      card.removeEventListener('mouseleave', handleLeave);
    };
  }, [index, showWishlist, showRating]);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} className="star text-[var(--cyber-yellow)] text-[12px]" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FaStar key={i} className="star text-[var(--cyber-yellow)] opacity-60 text-[12px]" />);
      } else {
        stars.push(<FaStar key={i} className="star text-[var(--white-smoke)] opacity-30 text-[12px]" />);
      }
    }
    return stars;
  };

  return (
    <Link
      to={`/courses/${course.id}`}
      className={`course-card relative flex-none bg-[var(--dark-charcoal)] rounded-lg shadow-[0_0_12px_var(--green-glow)] overflow-hidden transition-all duration-300 w-[280px] h-[360px] ${className}`}
      ref={cardRef}
    >
      {/* Thumbnail + Wishlist */}
      <div className="relative w-full h-40">
        <img
          src={course.img}
          alt={course.title}
          className="w-full h-full object-cover rounded-t-lg"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/280x160?text=No+Image';
          }}
        />
        {showWishlist && (
          <button
            ref={wishlistRef}
            className="absolute top-2 right-2 text-[var(--white-smoke)] text-base p-2 rounded-full bg-[var(--dark-charcoal)] border border-[var(--aqua-glow)] transition-all duration-300"
            onClick={(e) => {
              e.preventDefault();
              console.log(`Added ${course.title} to wishlist`);
            }}
          >
            <FaHeart />
          </button>
        )}
      </div>
{/* Content */}
<div className="px-4 py-4 flex flex-col justify-between h-[200px] space-y-2">
  {/* Title */}
  <h3 className="text-base font-extrabold text-[var(--white-smoke)] line-clamp-2 [text-shadow:0_0_6px_var(--blue-glow)] leading-snug">
    {course.title}
  </h3>

  {/* Level + Creator */}
  <div className="flex items-center justify-between">
    <p className="text-xs text-[var(--white-smoke)] opacity-80 truncate">{course.level}</p>
    {showCreator && (
      <p className="text-xs text-[var(--white-smoke)] font-medium truncate">By {course.creator}</p>
    )}
  </div>

  {/* Rating */}
  {showRating && (
    <div ref={ratingRef} className="flex items-center justify-center gap-1">
      <span className="text-sm font-bold text-[var(--cyber-yellow)]">{course.rating}</span>
      <div className="flex items-center gap-0.5">{renderStars(course.rating)}</div>
      <span className="text-xs text-[var(--white-smoke)] opacity-80">({course.numMembers})</span>
    </div>
  )}

  {/* Price */}
  {showPrice && (
    <div className="flex items-center justify-center gap-2">
      <span className="text-base font-bold text-[var(--neon-pink)] [text-shadow:0_0_6px_var(--pink-glow)]">
        ₹{course.discountPrice}
      </span>
      <span className="text-sm text-[var(--white-smoke)] opacity-80 line-through">
        ₹{course.price}
      </span>
    </div>
  )}
</div>

    </Link>
  );
};

export default CourseCard;