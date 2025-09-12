import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaFileAlt, FaVideo, FaBook, FaDownload, FaShareAlt, FaHeart, FaLock } from 'react-icons/fa';
import { gsap } from 'gsap';

const ResourcesPage = () => {
  const [freeResources, setFreeResources] = useState([]);
  const [premiumResources, setPremiumResources] = useState({});
  const [likedResources, setLikedResources] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [showLikedSection, setShowLikedSection] = useState(false);
  const wishlistRefs = useRef([]);

  // Mock user data
  const mockUser = {
    isSubscribed: true,
    subscribedCourses: [
      { id: 'ai101', title: 'AI Model Training' },
    ],
  };

  // Fetch resources data
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch('/data/resources.json');
        const data = await response.json();
        setFreeResources(data.freeResources);
        setPremiumResources(data.premiumResources);
      } catch (error) {
        console.error('Error fetching resources:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  // Handle download functionality
  const handleDownload = (url, title) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle share functionality
  const handleShare = async (title, url) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  // Handle like functionality
  const handleLike = (resource, index) => {
    setLikedResources((prev) => {
      const isLiked = prev.some((r) => r.id === resource.id);
      if (isLiked) {
        return prev.filter((r) => r.id !== resource.id);
      } else {
        return [...prev, resource];
      }
    });

    // Simple heart animation on click
    const wishlist = wishlistRefs.current[index];
    if (wishlist) {
      gsap.to(wishlist, {
        scale: 1.5,
        color: likedResources.some((r) => r.id === resource.id) ? 'var(--white-smoke)' : 'var(--neon-pink)',
        duration: 0.2,
        ease: 'power3.out',
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          gsap.to(wishlist, {
            scale: 1,
            duration: 0.2,
          });
        },
      });
    }
  };

  // Filter resources
  const filterResources = (resources) =>
    resources.filter((resource) => {
      const matchesTab =
        activeTab === 'All' ||
        (activeTab === 'Documents' && resource.type === 'document') ||
        (activeTab === 'Videos' && resource.type === 'video') ||
        (activeTab === 'Books' && resource.type === 'book');
      const matchesSearch =
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });

  // Get all resources, including subscribed courses
  const allResources = [
    ...freeResources,
    ...(premiumResources.common || []),
    ...mockUser.subscribedCourses
      .filter((course) => premiumResources[course.id])
      .flatMap((course) => premiumResources[course.id]),
  ];

  const filteredLikedResources = filterResources(likedResources);

  if (loading) {
    return <div className="text-center text-[var(--white-smoke)] text-lg">Loading...</div>;
  }

  return (
    <div className="bg-[var(--main-bg)] min-h-screen p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Particle Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-2 h-2 bg-[var(--neon-pink)] rounded-full top-10 left-10 animate-float"></div>
        <div className="absolute w-2 h-2 bg-[var(--electric-blue)] rounded-full bottom-20 right-20 animate-float animation-delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        {/* Liked Resources Section */}
        <section className="bg-[var(--dark-charcoal)] p-4 sm:p-6 rounded-lg shadow-[0_0_15px_var(--pink-glow)]">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--neon-pink)] [text-shadow:0_0_10px_var(--pink-glow)]">
              Liked Resources ({likedResources.length})
            </h2>
            <button
              onClick={() => setShowLikedSection(!showLikedSection)}
              className="px-4 py-2 bg-[var(--neon-purple)] text-[var(--white-smoke)] rounded text-sm sm:text-base hover:bg-[var(--aqua-glow)] transition-all duration-300"
            >
              {showLikedSection ? 'Hide' : 'Show'}
            </button>
          </div>
          {showLikedSection && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center">
              {filteredLikedResources.length > 0 ? (
                filteredLikedResources.map((resource, index) => (
                  <div
                    key={resource.id}
                    className="bg-[var(--dark-charcoal)] p-4 rounded-lg shadow-[0_0_12px_var(--green-glow)] w-full max-w-[280px]"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center space-x-2">
                        {resource.type === 'document' && <FaFileAlt className="text-[var(--electric-blue)] text-xl sm:text-2xl" />}
                        {resource.type === 'video' && <FaVideo className="text-[var(--neon-purple)] text-xl sm:text-2xl" />}
                        {resource.type === 'book' && <FaBook className="text-[var(--acid-green)] text-xl sm:text-2xl" />}
                      </div>
                      <button
                        ref={(el) => (wishlistRefs.current[index] = el)}
                        className="text-[var(--white-smoke)] text-sm sm:text-base p-2 rounded-full bg-[var(--dark-charcoal)] border border-[var(--aqua-glow)]"
                        onClick={() => handleLike(resource, index)}
                      >
                        <FaHeart
                          className={likedResources.some((r) => r.id === resource.id) ? 'text-[var(--neon-pink)]' : ''}
                        />
                      </button>
                    </div>
                    <h3 className="text-sm sm:text-base font-extrabold text-[var(--white-smoke)] text-left mb-2 line-clamp-2">
                      {resource.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--white-smoke)] opacity-80 text-left mb-3 line-clamp-3">
                      {resource.description}
                    </p>
                    <div className="flex justify-between items-center text-xs text-[var(--white-smoke)] opacity-80 mb-3">
                      <span>{resource.category}</span>
                      <span>{resource.size || resource.duration || resource.pages} {resource.date}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <FaDownload
                        className="text-[var(--white-smoke)] hover:text-[var(--aqua-glow)] cursor-pointer text-sm sm:text-lg"
                        onClick={() => handleDownload(resource.url, resource.title)}
                      />
                      <FaShareAlt
                        className="text-[var(--white-smoke)] hover:text-[var(--neon-pink)] cursor-pointer text-sm sm:text-lg"
                        onClick={() => handleShare(resource.title, resource.url)}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-[var(--white-smoke)] opacity-80 text-center col-span-full">No liked resources yet.</p>
              )}
            </div>
          )}
        </section>

        {/* Free Resources Section */}
        <section className="bg-[var(--dark-charcoal)] p-4 sm:p-6 rounded-lg shadow-[0_0_15px_var(--blue-glow)]">
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--electric-blue)] [text-shadow:0_0_10px_var(--blue-glow)] mb-4">
            Free Learning Resources
          </h2>
          <p className="text-[var(--white-smoke)] opacity-80 mb-6 text-sm sm:text-base">
            Access comprehensive study materials, guides, and tutorials to support your learning journey.
          </p>
          <div className="flex flex-col sm:flex-row items-center mb-6 gap-4">
            <input
              type="text"
              placeholder="Search for resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-auto flex-grow p-2 bg-[var(--main-bg)] border border-[var(--neon-purple)] rounded text-[var(--white-smoke)]"
            />
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('All')}
                className={`px-4 py-2 rounded ${
                  activeTab === 'All'
                    ? 'bg-[var(--neon-purple)] text-[var(--white-smoke)]'
                    : 'text-[var(--white-smoke)] hover:text-[var(--aqua-glow)]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveTab('Documents')}
                className={`px-4 py-2 rounded ${
                  activeTab === 'Documents'
                    ? 'bg-[var(--neon-purple)] text-[var(--white-smoke)]'
                    : 'text-[var(--white-smoke)] hover:text-[var(--aqua-glow)]'
                }`}
              >
                Documents
              </button>
              <button
                onClick={() => setActiveTab('Videos')}
                className={`px-4 py-2 rounded ${
                  activeTab === 'Videos'
                    ? 'bg-[var(--neon-purple)] text-[var(--white-smoke)]'
                    : 'text-[var(--white-smoke)] hover:text-[var(--aqua-glow)]'
                }`}
              >
                Videos
              </button>
              <button
                onClick={() => setActiveTab('Books')}
                className={`px-4 py-2 rounded ${
                  activeTab === 'Books'
                    ? 'bg-[var(--neon-purple)] text-[var(--white-smoke)]'
                    : 'text-[var(--white-smoke)] hover:text-[var(--aqua-glow)]'
                }`}
              >
                Books
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center">
            {filterResources(freeResources).map((resource, index) => (
              <div
                key={resource.id}
                className="bg-[var(--dark-charcoal)] p-4 rounded-lg shadow-[0_0_12px_var(--green-glow)] w-full max-w-[280px]"
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center space-x-2">
                    {resource.type === 'document' && <FaFileAlt className="text-[var(--electric-blue)] text-xl sm:text-2xl" />}
                    {resource.type === 'video' && <FaVideo className="text-[var(--neon-purple)] text-xl sm:text-2xl" />}
                    {resource.type === 'book' && <FaBook className="text-[var(--acid-green)] text-xl sm:text-2xl" />}
                  </div>
                  <button
                    ref={(el) => (wishlistRefs.current[index + filteredLikedResources.length] = el)}
                    className="text-[var(--white-smoke)] text-sm sm:text-base p-2 rounded-full bg-[var(--dark-charcoal)] border border-[var(--aqua-glow)]"
                    onClick={() => handleLike(resource, index + filteredLikedResources.length)}
                  >
                    <FaHeart
                      className={likedResources.some((r) => r.id === resource.id) ? 'text-[var(--neon-pink)]' : ''}
                    />
                  </button>
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-[var(--white-smoke)] text-left mb-2 line-clamp-2">
                  {resource.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--white-smoke)] opacity-80 text-left mb-3 line-clamp-3">
                  {resource.description}
                </p>
                <div className="flex justify-between items-center text-xs text-[var(--white-smoke)] opacity-80 mb-3">
                  <span>{resource.category}</span>
                  <span>{resource.size || resource.duration || resource.pages} {resource.date}</span>
                </div>
                <div className="flex justify-between items-center">
                  <FaDownload
                    className="text-[var(--white-smoke)] hover:text-[var(--aqua-glow)] cursor-pointer text-sm sm:text-lg"
                    onClick={() => handleDownload(resource.url, resource.title)}
                  />
                  <FaShareAlt
                    className="text-[var(--white-smoke)] hover:text-[var(--neon-pink)] cursor-pointer text-sm sm:text-lg"
                    onClick={() => handleShare(resource.title, resource.url)}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Membership Resources Section */}
        <section className="bg-[var(--dark-charcoal)] p-4 sm:p-6 rounded-lg shadow-[0_0_15px_var(--pink-glow)]">
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--neon-pink)] [text-shadow:0_0_10px_var(--pink-glow)] mb-4">
            Membership Resources
          </h2>
          {!mockUser.isSubscribed ? (
            <div className="flex flex-col items-center justify-center space-y-4">
              <FaLock className="text-4xl sm:text-6xl text-[var(--neon-red)]" />
              <p className="text-[var(--white-smoke)] text-center text-sm sm:text-base">
                This section is locked. Subscribe to access premium resources.
              </p>
              <Link
                to="/pricing"
                className="px-4 py-2 sm:px-6 sm:py-3 bg-[var(--acid-green)] text-[var(--dark-charcoal)] rounded-md font-semibold hover:bg-[var(--cyber-yellow)] hover:shadow-[0_0_15px_var(--green-glow)] transition-all duration-300 text-sm sm:text-base"
              >
                Subscribe Now
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row items-center mb-6 gap-4">
                <input
                  type="text"
                  placeholder="Search for resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-auto flex-grow p-2 bg-[var(--main-bg)] border border-[var(--neon-purple)] rounded text-[var(--white-smoke)]"
                />
                <div className="flex space-x-4">
                  <button
                    onClick={() => setActiveTab('All')}
                    className={`px-4 py-2 rounded ${
                      activeTab === 'All'
                        ? 'bg-[var(--neon-purple)] text-[var(--white-smoke)]'
                        : 'text-[var(--white-smoke)] hover:text-[var(--aqua-glow)]'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setActiveTab('Documents')}
                    className={`px-4 py-2 rounded ${
                      activeTab === 'Documents'
                        ? 'bg-[var(--neon-purple)] text-[var(--white-smoke)]'
                        : 'text-[var(--white-smoke)] hover:text-[var(--aqua-glow)]'
                    }`}
                  >
                    Documents
                  </button>
                  <button
                    onClick={() => setActiveTab('Videos')}
                    className={`px-4 py-2 rounded ${
                      activeTab === 'Videos'
                        ? 'bg-[var(--neon-purple)] text-[var(--white-smoke)]'
                        : 'text-[var(--white-smoke)] hover:text-[var(--aqua-glow)]'
                    }`}
                  >
                    Videos
                  </button>
                  <button
                    onClick={() => setActiveTab('Books')}
                    className={`px-4 py-2 rounded ${
                      activeTab === 'Books'
                        ? 'bg-[var(--neon-purple)] text-[var(--white-smoke)]'
                        : 'text-[var(--white-smoke)] hover:text-[var(--aqua-glow)]'
                    }`}
                  >
                    Books
                  </button>
                </div>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[var(--acid-green)] mb-4">Common Resources</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center">
                  {filterResources(premiumResources.common || []).map((resource, index) => (
                    <div
                      key={resource.id}
                      className="bg-[var(--dark-charcoal)] p-4 rounded-lg shadow-[0_0_12px_var(--green-glow)] w-full max-w-[280px]"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center space-x-2">
                          {resource.type === 'document' && <FaFileAlt className="text-[var(--electric-blue)] text-xl sm:text-2xl" />}
                          {resource.type === 'video' && <FaVideo className="text-[var(--neon-purple)] text-xl sm:text-2xl" />}
                          {resource.type === 'book' && <FaBook className="text-[var(--acid-green)] text-xl sm:text-2xl" />}
                        </div>
                        <button
                          ref={(el) => (wishlistRefs.current[index + filteredLikedResources.length + freeResources.length] = el)}
                          className="text-[var(--white-smoke)] text-sm sm:text-base p-2 rounded-full bg-[var(--dark-charcoal)] border border-[var(--aqua-glow)]"
                          onClick={() => handleLike(resource, index + filteredLikedResources.length + freeResources.length)}
                        >
                          <FaHeart
                            className={likedResources.some((r) => r.id === resource.id) ? 'text-[var(--neon-pink)]' : ''}
                          />
                        </button>
                      </div>
                      <h3 className="text-sm sm:text-base font-extrabold text-[var(--white-smoke)] text-left mb-2 line-clamp-2">
                        {resource.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[var(--white-smoke)] opacity-80 text-left mb-3 line-clamp-3">
                        {resource.description}
                      </p>
                      <div className="flex justify-between items-center text-xs text-[var(--white-smoke)] opacity-80 mb-3">
                        <span>{resource.category}</span>
                        <span>{resource.size || resource.duration || resource.pages} {resource.date}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <FaDownload
                          className="text-[var(--white-smoke)] hover:text-[var(--aqua-glow)] cursor-pointer text-sm sm:text-lg"
                          onClick={() => handleDownload(resource.url, resource.title)}
                        />
                        <FaShareAlt
                          className="text-[var(--white-smoke)] hover:text-[var(--neon-pink)] cursor-pointer text-sm sm:text-lg"
                          onClick={() => handleShare(resource.title, resource.url)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {mockUser.subscribedCourses.map((course) => (
                <div key={course.id}>
                  <h3 className="text-lg sm:text-xl font-bold text-[var(--neon-purple)] mb-4">{course.title} Resources</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center">
                    {filterResources(premiumResources[course.id] || []).map((resource, index) => (
                      <div
                        key={resource.id}
                        className="bg-[var(--dark-charcoal)] p-4 rounded-lg shadow-[0_0_12px_var(--green-glow)] w-full max-w-[280px]"
                      >
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center space-x-2">
                            {resource.type === 'document' && <FaFileAlt className="text-[var(--electric-blue)] text-xl sm:text-2xl" />}
                            {resource.type === 'video' && <FaVideo className="text-[var(--neon-purple)] text-xl sm:text-2xl" />}
                            {resource.type === 'book' && <FaBook className="text-[var(--acid-green)] text-xl sm:text-2xl" />}
                          </div>
                          <button
                            ref={(el) =>
                              (wishlistRefs.current[
                                index +
                                  filteredLikedResources.length +
                                  freeResources.length +
                                  (premiumResources.common || []).length
                              ] = el)
                            }
                            className="text-[var(--white-smoke)] text-sm sm:text-base p-2 rounded-full bg-[var(--dark-charcoal)] border border-[var(--aqua-glow)]"
                            onClick={() =>
                              handleLike(
                                resource,
                                index + filteredLikedResources.length + freeResources.length + (premiumResources.common || []).length
                              )
                            }
                          >
                            <FaHeart
                              className={likedResources.some((r) => r.id === resource.id) ? 'text-[var(--neon-pink)]' : ''}
                            />
                          </button>
                        </div>
                        <h3 className="text-sm sm:text-base font-extrabold text-[var(--white-smoke)] text-left mb-2 line-clamp-2">
                          {resource.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[var(--white-smoke)] opacity-80 text-left mb-3 line-clamp-3">
                          {resource.description}
                        </p>
                        <div className="flex justify-between items-center text-xs text-[var(--white-smoke)] opacity-80 mb-3">
                          <span>{resource.category}</span>
                          <span>{resource.size || resource.duration || resource.pages} {resource.date}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <FaDownload
                            className="text-[var(--white-smoke)] hover:text-[var(--aqua-glow)] cursor-pointer text-sm sm:text-lg"
                            onClick={() => handleDownload(resource.url, resource.title)}
                          />
                          <FaShareAlt
                            className="text-[var(--white-smoke)] hover:text-[var(--neon-pink)] cursor-pointer text-sm sm:text-lg"
                            onClick={() => handleShare(resource.title, resource.url)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ResourcesPage;