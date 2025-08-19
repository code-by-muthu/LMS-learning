import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { FaHeart, FaStar } from 'react-icons/fa';

const CourseCard = ({ course, index }) => {
  const cardRef = useRef(null);
  const wishlistRef = useRef(null);
  const ratingRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const wishlist = wishlistRef.current;
    const rating = ratingRef.current;

    gsap.fromTo(
      card,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, delay: index * 0.2, ease: 'power3.out' }
    );

    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        scale: 1.03,
        boxShadow: '0 0 25px var(--green-glow), 0 0 10px var(--pink-glow)',
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(wishlist, {
        scale: 1.2,
        color: 'var(--white-smoke)',
        backgroundColor: 'var(--neon-pink)',
        boxShadow: '0 0 15px var(--pink-glow), 0 0 5px var(--pink-glow) inset',
        rotate: 10,
        duration: 0.3,
        ease: 'elastic.out(1, 0.5)',
      });
      gsap.to(rating.querySelectorAll('.star'), {
        scale: 1.1,
        stagger: 0.05,
        duration: 0.3,
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        scale: 1,
        boxShadow: 'none',
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(wishlist, {
        scale: 1,
        color: 'var(--white-smoke)',
        backgroundColor: 'var(--dark-charcoal)',
        boxShadow: 'none',
        rotate: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(rating.querySelectorAll('.star'), {
        scale: 1,
        duration: 0.3,
      });
    });

    return () => {
      card.removeEventListener('mouseenter', () => {});
      card.removeEventListener('mouseleave', () => {});
    };
  }, [index]);

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
      to={`/course/${course.id}`}
      className="course-card relative flex-none w-full max-w-[280px] min-h-[360px] bg-[var(--dark-charcoal)] rounded-lg overflow-hidden transition-all duration-300 mx-auto"
      ref={cardRef}
    >
      <div className="relative w-full h-40">
        <img
          src={course.img}
          alt={course.title}
          className="w-full h-full object-cover rounded-t-lg"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
          }}
        />
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
      </div>
      <div className="p-4 flex flex-col h-[calc(100%-160px)]">
        <h3 className="text-base font-extrabold text-[var(--white-smoke)] mb-2 truncate [text-shadow:0_0_6px_var(--blue-glow)] leading-tight">{course.title}</h3>
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-[var(--white-smoke)] opacity-80">{course.level}</p>
          <p className="text-xs text-[var(--white-smoke)] font-medium truncate">By {course.creator}</p>
        </div>
        <div ref={ratingRef} className="flex items-center justify-center gap-1 mb-2">
          <span className="text-sm font-bold text-[var(--cyber-yellow)]">{course.rating}</span>
          <div className="flex items-center gap-0.5">{renderStars(course.rating)}</div>
          <span className="text-xs text-[var(--white-smoke)] opacity-80">({course.numMembers})</span>
        </div>
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="text-base font-bold text-[var(--neon-pink)] [text-shadow:0_0_6px_var(--pink-glow)]">₹{course.discountPrice}</span>
          <span className="text-sm text-[var(--white-smoke)] opacity-80 line-through">₹{course.price}</span>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;