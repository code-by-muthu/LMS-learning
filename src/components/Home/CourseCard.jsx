import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { FaHeart, FaStar, FaClock, FaBook, FaUsers } from 'react-icons/fa';
import Notification from '../Course/Notification';

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
  const [isBookmarked, setIsBookmarked] = useState(() => {
    const bookmarkedIds = JSON.parse(localStorage.getItem('wishlist') || '[]');
    return bookmarkedIds.includes(course.id);
  });
  const [notification, setNotification] = useState({ message: '', type: 'success' });

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
          scale: 1.15,
          color: 'var(--neon-pink)',
          backgroundColor: 'var(--dark-charcoal)',
          boxShadow: '0 0 20px var(--pink-glow), 0 0 8px var(--pink-glow) inset',
          duration: 0.4,
          ease: 'power3.out',
          keyframes: [
            { scale: 1.25, duration: 0.2 },
            { scale: 1.15, duration: 0.2 },
          ],
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
          color: isBookmarked ? 'var(--neon-pink)' : 'var(--white-smoke)',
          backgroundColor: 'var(--dark-charcoal)',
          boxShadow: 'none',
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
  }, [index, showWishlist, showRating, isBookmarked]);

  const handleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const bookmarkedIds = JSON.parse(localStorage.getItem('wishlist') || '[]');
    let updatedBookmarks;
    if (isBookmarked) {
      updatedBookmarks = bookmarkedIds.filter(id => id !== course.id);
    } else {
      updatedBookmarks = [...bookmarkedIds, course.id];
    }
    localStorage.setItem('wishlist', JSON.stringify(updatedBookmarks));
    setIsBookmarked(!isBookmarked);
    setNotification({
      message: isBookmarked ? 'Removed from wishlist' : 'Added to wishlist',
      type: 'success',
    });

    // Click animation for heart
    gsap.to(wishlistRef.current, {
      scale: 1.5,
      color: isBookmarked ? 'var(--white-smoke)' : 'var(--neon-pink)',
      duration: 0.2,
      ease: 'power3.out',
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        gsap.to(wishlistRef.current, {
          scale: 1,
          duration: 0.2,
        });
      },
    });
  };

  const hasProgress = course.progress > 0;

  return (
    <div className="relative">
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: 'success' })}
      />
      <Link
        to={`/course/${course.id}`}
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
              onClick={handleBookmark}
            >
              <FaHeart className={isBookmarked ? 'text-[var(--neon-pink)]' : ''} />
            </button>
          )}
        </div>
        {/* Content */}
        <div className={`px-4 py-4 flex flex-col justify-between h-[200px] ${hasProgress ? 'items-start' : 'items-center text-center'}`}>
          <h3 className={`text-base font-extrabold text-[var(--white-smoke)] line-clamp-2 [text-shadow:0_0_6px_var(--blue-glow)] leading-snug ${hasProgress ? '' : 'w-full'}`}>
            {course.title}
          </h3>
          <p className={`text-xs text-[var(--white-smoke)] opacity-80 line-clamp-2 ${hasProgress ? '' : 'w-full'}`}>
            {course.description || 'Learn the fundamentals and key concepts.'}
          </p>
          <div className={`flex items-center text-xs text-[var(--white-smoke)] opacity-80 ${hasProgress ? '' : 'justify-center w-full'}`}>
            <FaClock className="mr-1" /> {course.hours || 10} hours • <FaBook className="ml-2 mr-1" /> {course.lessons || 12} lessons
          </div>
          {showRating && (
            <div ref={ratingRef} className={`flex items-center gap-4 ${hasProgress ? '' : 'justify-center w-full'}`}>
              <div className="flex items-center">
                <FaStar className="text-[var(--cyber-yellow)] mr-1 text-sm" />
                <span className="text-sm font-bold text-[var(--cyber-yellow)]">{course.rating}</span>
              </div>
              <div className="flex items-center">
                <FaUsers className="text-[var(--white-smoke)] opacity-80 mr-1 text-sm" />
                <span className="text-xs text-[var(--white-smoke)] opacity-80">{course.numMembers}</span>
              </div>
            </div>
          )}
          {hasProgress && (
            <div className="mt-2 w-full">
              <div className="flex justify-between text-xs text-[var(--white-smoke)] mb-1">
                <span>Progress</span>
                <span>{course.progress || 0}%</span>
              </div>
              <div className="bg-[var(--white-smoke)] opacity-20 rounded-full h-1.5">
                <div
                  className="bg-[var(--aqua-glow)] rounded-full h-1.5"
                  style={{ width: `${course.progress || 0}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;