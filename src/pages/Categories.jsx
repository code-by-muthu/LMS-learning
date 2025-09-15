// src/pages/Categories.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import CategoryCard from "../components/ui/CategoryCard";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch("/data/categories.json").then((r) => r.json()),
      fetch("/data/courses.json").then((r) => r.json()),
    ])
      .then(([cats, crs]) => {
        setCategories(cats);
        setCourses(crs);
      })
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      gsap.fromTo(
        ".category-card",
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        }
      );
    }
  }, [categories]);

  // Count courses directly from JSON
  const getCourseCount = (cat) =>
    courses.filter((c) => c.category === cat.name).length;

  const courseCategories = categories.filter((c) => c.type === "course");

  return (
    <div className="bg-[var(--main-bg)] min-h-screen text-[var(--white-smoke)]">
      {/* Hero Section */}
      <section className="relative py-8 sm:py-12 lg:py-18 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--neon-pink)]/20 via-[var(--electric-blue)]/20 to-[var(--acid-green)]/20 animate-pulse"></div>
        <div className="absolute inset-0 backdrop-blur-[2px]"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[var(--white-smoke)] mb-4 sm:mb-6 [text-shadow:0_0_20px_var(--blue-glow)]">
            Explore Knowledge <span className="text-[var(--neon-pink)]">Universe</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[var(--white-smoke)] opacity-90 max-w-2xl mx-auto mb-6 sm:mb-8">
            Browse through curated{" "}
            <span className="text-[var(--electric-blue)] font-semibold">
              Courses
            </span>{" "}
            with our cyberpunk learning hub.
          </p>
          <Link
            to="/signup"
            className="inline-block px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-[var(--neon-pink)] to-[var(--electric-blue)] text-[var(--white-smoke)] rounded-xl font-bold text-base sm:text-lg hover:shadow-[0_0_20px_var(--pink-glow)] transition-all duration-300"
          >
            Start Your Learning
          </Link>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-8 sm:py-16 lg:py-8 bg-[var(--main-bg)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--electric-blue)] [text-shadow:0_0_10px_var(--blue-glow)] mb-8 sm:mb-12 text-center">
            Courses
          </h2>
          {error && (
            <p className="text-[var(--neon-red)] text-center text-base sm:text-lg">
              Error loading data: {error}
            </p>
          )}
          {courseCategories.length === 0 ? (
            <p className="text-[var(--white-smoke)] text-center text-base sm:text-lg">
              No courses available...
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
              {courseCategories.map((category, index) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  index={index}
                  courseCount={`${getCourseCount(category)} Courses`}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Categories;