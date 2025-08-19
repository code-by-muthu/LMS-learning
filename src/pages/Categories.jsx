import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import CategoryCard from "../components/Home/CategoryCard";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [errors, setErrors] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch("/data/categories.json").then((r) => r.json()),
      fetch("/data/courses.json").then((r) => r.json()),
      fetch("/data/errorCategories.json").then((r) => r.json()),
    ])
      .then(([cats, crs, errs]) => {
        setCategories(cats);
        setCourses(crs);
        setErrors(errs);
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

  // Count errors directly from JSON
  const getErrorCount = (cat) =>
    errors.filter((e) => e.category === cat.name).length;

  const courseCategories = categories.filter((c) => c.type === "course");

  return (
    <div className="bg-[var(--main-bg)] min-h-screen text-[var(--white-smoke)]">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--neon-pink)]/20 via-[var(--electric-blue)]/20 to-[var(--acid-green)]/20 animate-pulse"></div>
        <div className="absolute inset-0 backdrop-blur-[2px]"></div>
        <div className="relative z-10 container mx-auto px-4 max-w-6xl text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[var(--white-smoke)] mb-6 [text-shadow:0_0_20px_var(--blue-glow)]">
            Explore Knowledge <span className="text-[var(--neon-pink)]">Universe</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-[var(--white-smoke)] opacity-90 max-w-3xl mx-auto mb-8">
            Browse through curated{" "}
            <span className="text-[var(--electric-blue)] font-semibold">
              Courses
            </span>{" "}
            and solve{" "}
            <span className="text-[var(--acid-green)] font-semibold">Errors</span>{" "}
            with our cyberpunk learning hub.
          </p>
          <Link
            to=""
            className="inline-block px-8 py-3 bg-gradient-to-r from-[var(--neon-pink)] to-[var(--electric-blue)] text-[var(--white-smoke)] rounded-xl font-bold text-lg hover:shadow-[0_0_20px_var(--pink-glow)] transition-all duration-300"
          >
            Start Your Learning
          </Link>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-12 sm:py-16 bg-[var(--main-bg)]">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--electric-blue)] [text-shadow:0_0_10px_var(--blue-glow)] mb-8 text-center">
            Courses
          </h2>
          {courseCategories.length === 0 ? (
            <p className="text-[var(--white-smoke)] text-center text-xl">
              No courses available...
            </p>
          ) : (
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
                gap-6 sm:gap-8 lg:gap-10 justify-items-center">              {courseCategories.map((category, index) => (
                <Link
                  key={category.id}
                  to={`/category/${encodeURIComponent(category.name)}?from=course`}
                  className="block w-full"
                >
                  <CategoryCard
                    category={category}
                    index={index}
                    courseCount={`${getCourseCount(category)} Courses`}
                  />
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Errors Section */}
      <section className="py-12 sm:py-16 bg-[var(--dark-charcoal)]/80">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--neon-pink)] [text-shadow:0_0_10px_var(--pink-glow)] mb-8 text-center">
            Errors
          </h2>
          {courseCategories.length === 0 ? (
            <p className="text-[var(--white-smoke)] text-center text-xl">
              No errors available...
            </p>
          ) : (
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
                gap-6 sm:gap-8 lg:gap-10 justify-items-center">              {courseCategories.map((category, index) => (
                <Link
                  key={category.id}
                  to={`/category/${encodeURIComponent(category.name)}?from=error`}
                  className="block w-full"
                >
                  <CategoryCard
                    category={category}
                    index={index + courseCategories.length}
                    courseCount={`${getErrorCount(category)} Errors`}
                  />
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Categories;
