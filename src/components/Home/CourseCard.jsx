
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

const CourseCard = ({ course, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        scale: 1.05,
        boxShadow: '0 0 20px rgba(0, 255, 133, 0.6)',
        duration: 0.3,
        ease: 'power2.out',
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        scale: 1,
        boxShadow: '0 0 10px rgba(0, 255, 133, 0.4)',
        duration: 0.3,
        ease: 'power2.out',
      });
    });

    return () => {
      card.removeEventListener('mouseenter', () => {});
      card.removeEventListener('mouseleave', () => {});
    };
  }, []);

  return (
    <Link
      to={`/courses/${course.id}`}
      className="course-card relative flex-none w-64 bg-[var(--dark-charcoal)] rounded-lg border-2 border-[#00FF85] shadow-[0_0_10px_rgba(0,255,133,0.4)]"
      ref={cardRef}
    >
      <img
        src={course.img}
        alt={course.title}
        className="w-full h-36 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h3 className="text-base font-extrabold text-[var(--white-smoke)] mb-2 truncate">{course.title}</h3>
        <p className="text-xs text-[var(--white-smoke)] opacity-80">{course.level}</p>
      </div>
    </Link>
  );
};

export default CourseCard;
