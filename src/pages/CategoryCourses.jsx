import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import CourseCard from '../components/Home/CourseCard';
import ErrorCard from '../components/ui/ErrorCard';

const CategoryCourses = () => {
  const { categoryName } = useParams();
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('courses');

  useEffect(() => {
    // Detect from query param
    const searchParams = new URLSearchParams(location.search);
    const fromError = searchParams.get('from') === 'error';
    setActiveTab(fromError ? 'errors' : 'courses');

    // Fetch categories
    fetch('/data/categories.json')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch categories');
        return response.json();
      })
      .then((data) => setCategories(data))
      .catch((err) => setError(err.message));

    // Fetch courses for this category
    fetch('/data/courses.json')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch courses');
        return response.json();
      })
      .then((data) =>
        setCourses(data.filter((course) => course.category === decodeURIComponent(categoryName)))
      )
      .catch((err) => setError(err.message));
  }, [categoryName, location.search]);

  useEffect(() => {
    gsap.fromTo(
      '.course-card, .error-card',
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
    );
  }, [courses, activeTab]);

  // errors related to this category
  const relatedErrors = categories.filter(
    (cat) => cat.type === 'error' && cat.category === decodeURIComponent(categoryName)
  );

  return (
    <div className="bg-[var(--main-bg)] min-h-screen text-[var(--white-smoke)]">
      {/* Header */}
      <section className="relative py-16 sm:py-20 bg-[var(--dark-charcoal)] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--dark-charcoal)]/80 via-[var(--dark-charcoal)]/50 to-[var(--dark-charcoal)]/30 animate-fade-in"></div>
        <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[var(--white-smoke)] [text-shadow:0_0_20px_rgba(216,27,255,0.5),0_0_10px_rgba(0,228,255,0.3)] mb-4 animate-fade-in-up">
            {decodeURIComponent(categoryName)}
          </h1>
          <p
            className="text-xl sm:text-2xl text-[var(--white-smoke)] opacity-90 mb-6 max-w-3xl mx-auto animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            Dive into premium courses and expert error solutions tailored for you.
          </p>

          {/* Tabs */}
          <div
            className="flex justify-center gap-4 flex-wrap animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            <button
              onClick={() => setActiveTab('courses')}
              className={`px-6 py-3 rounded-lg font-bold text-lg transition-all duration-300 ${
                activeTab === 'courses'
                  ? 'bg-[var(--neon-pink)] text-[var(--white-smoke)]'
                  : 'bg-[var(--dark-charcoal)]/50 text-[var(--white-smoke)]/80 hover:bg-[var(--electric-blue)]'
              }`}
            >
              Courses
            </button>
            <button
              onClick={() => setActiveTab('errors')}
              className={`px-6 py-3 rounded-lg font-bold text-lg transition-all duration-300 ${
                activeTab === 'errors'
                  ? 'bg-[var(--neon-pink)] text-[var(--white-smoke)]'
                  : 'bg-[var(--dark-charcoal)]/50 text-[var(--white-smoke)]/80 hover:bg-[var(--electric-blue)]'
              }`}
            >
              Errors
            </button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16 bg-[var(--main-bg)]">
        <div className="container mx-auto px-4 max-w-7xl">
          {error ? (
            <p className="text-[var(--neon-red)] text-center text-xl">Error: {error}</p>
          ) : (
            <div className="space-y-6">
              {/* Courses tab */}
              {activeTab === 'courses' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                  {courses.map((course, index) => (
                    <Link key={course.id} to={`/course/${course.id}`} className="block">
                      <div className="course-card relative w-[280px] h-[370px] border-2 border-[var(--acid-green)] shadow-[0_0_12px_var(--green-glow)] rounded-lg p-1 flex">
                        <CourseCard course={course} index={index} />
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Errors tab */}
              {activeTab === 'errors' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                  {relatedErrors.map((errorCategory, index) => (
                    <Link
                      key={errorCategory.id}
                      to={`/category/${encodeURIComponent(categoryName)}/errors`}
                      className="block"
                    >
                      <div className="error-card relative w-[280px] h-[370px] border-2 border-[var(--acid-green)] shadow-[0_0_12px_var(--green-glow)] rounded-lg p-1 flex">
                        <ErrorCard
                          error={{
                            ...errorCategory,
                            category: categoryName,
                            title: errorCategory.name,
                            description:
                              errorCategory.description || 'Learn to resolve this error.',
                          }}
                          index={index}
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CategoryCourses;
