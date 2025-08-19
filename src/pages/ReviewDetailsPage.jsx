import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const sampleReviews = [
  {
    id: 1,
    userName: 'John Doe',
    courseName: 'Error Handling Course',
    rating: 5,
    review: 'This course transformed how I debug my code. Highly recommended!',
    profileImage: 'https://via.placeholder.com/40?text=JD'
  },
  {
    id: 2,
    userName: 'Jane Smith',
    courseName: 'Python Basics',
    rating: 4,
    review: 'Great content, but could use more advanced examples.',
    profileImage: 'https://via.placeholder.com/40?text=JS'
  },
  {
    id: 3,
    userName: 'Alex Johnson',
    courseName: 'JavaScript Mastery',
    rating: 5,
    review: 'Excellent explanations and practical exercises.',
    profileImage: 'https://via.placeholder.com/40?text=AJ'
  },
  {
    id: 4,
    userName: 'Emily Brown',
    courseName: 'Data Science Essentials',
    rating: 4,
    review: 'Very informative, helped me a lot in my projects.',
    profileImage: 'https://via.placeholder.com/40?text=EB'
  },
];

const ReviewDetailsPage = () => {
  const { id } = useParams();
  const selectedReview = sampleReviews.find(review => review.id === parseInt(id));
  const [filter, setFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');

  const filteredReviews = sampleReviews.filter(review => review.id !== parseInt(id)).filter(review => {
    if (filter && review.courseName.toLowerCase().indexOf(filter.toLowerCase()) === -1) return false;
    if (ratingFilter && review.rating !== parseInt(ratingFilter)) return false;
    return true;
  });

  return (
    <section className="py-20 bg-[var(--main-bg)] relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--neon-pink)] [text-shadow:0_0_20px_var(--pink-glow)] text-center mb-12">
          Review Details
        </h1>
        {selectedReview ? (
          <div className="mb-12 bg-[var(--dark-charcoal)] p-6 rounded-xl border-2 border-[var(--aqua-glow)] shadow-[0_0_15px_var(--blue-glow)]">
            <div className="flex items-center mb-4">
              <img 
                src={selectedReview.profileImage} 
                alt={`${selectedReview.userName} profile`} 
                className="w-12 h-12 rounded-full mr-4 border-2 border-[var(--neon-pink)]"
              />
              <div>
                <h2 className="text-xl font-bold text-[var(--white-smoke)]">{selectedReview.userName}</h2>
                <p className="text-sm text-[var(--neon-pink)]">{selectedReview.courseName}</p>
              </div>
            </div>
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <span 
                  key={i} 
                  className={`text-xl ${i < selectedReview.rating ? 'text-[var(--cyber-yellow)]' : 'text-[var(--dark-charcoal)] opacity-50'}`}
                >
                  ★
                </span>
              ))}
            </div>
            <p className="text-base text-[var(--white-smoke)]">{selectedReview.review}</p>
          </div>
        ) : (
          <p className="text-center text-[var(--white-smoke)]">Review not found</p>
        )}
        <h2 className="text-2xl font-bold text-[var(--white-smoke)] mb-4">Other Reviews</h2>
        <div className="flex gap-4 mb-6">
          <input 
            type="text"
            placeholder="Filter by course name"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 rounded bg-[var(--dark-charcoal)] text-[var(--white-smoke)] border border-[var(--aqua-glow)]"
          />
          <select 
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="p-2 rounded bg-[var(--dark-charcoal)] text-[var(--white-smoke)] border border-[var(--aqua-glow)]"
          >
            <option value="">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredReviews.map(review => (
            <div key={review.id} className="bg-[var(--dark-charcoal)] p-4 rounded-xl border-2 border-[var(--aqua-glow)] shadow-[0_0_15px_var(--blue-glow)]">
              <div className="flex items-center mb-2">
                <img 
                  src={review.profileImage} 
                  alt={`${review.userName} profile`} 
                  className="w-8 h-8 rounded-full mr-2 border-2 border-[var(--neon-pink)]"
                />
                <div>
                  <h3 className="text-lg font-bold text-[var(--white-smoke)]">{review.userName}</h3>
                  <p className="text-sm text-[var(--neon-pink)]">{review.courseName}</p>
                </div>
              </div>
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <span 
                    key={i} 
                    className={`text-lg ${i < review.rating ? 'text-[var(--cyber-yellow)]' : 'text-[var(--dark-charcoal)] opacity-50'}`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="text-base text-[var(--white-smoke)]">{review.review}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewDetailsPage;