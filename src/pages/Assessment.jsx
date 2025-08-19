import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gsap } from 'gsap';

const Assessment = () => {
  const { id } = useParams();
  const [assessment, setAssessment] = useState(null);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [assessments, setAssessments] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    fetch('/data/assessments.json')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch assessments');
        return response.json();
      })
      .then((data) => {
        setAssessments(data);
        const foundAssessment = data.find((a) => a.id === id);
        if (foundAssessment) setAssessment(foundAssessment);
        else setError('Assessment not found');
      })
      .catch((err) => setError(err.message));
  }, [id]);

  const filteredAssessments = assessments.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleAnswer = (answer) => {
    setAnswers([...answers.slice(0, currentQuestion), answer]);
    if (currentQuestion < assessment.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const calculateScore = () => {
    return answers.reduce((score, answer, index) => (
      answer === assessment.questions[index].correctAnswer ? score + 1 : score
    ), 0);
  };

  return (
    <div className="bg-[var(--main-bg)] min-h-screen text-[var(--white-smoke)]">
      <section className="relative bg-[var(--dark-charcoal)] py-12 sm:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--neon-pink)]/20 to-[var(--electric-blue)]/20"></div>
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-[var(--white-smoke)] [text-shadow:0_0_20px_var(--pink-glow)] mb-6">
            Assessments
          </h1>
          <p className="text-lg sm:text-xl text-center text-[var(--white-smoke)] opacity-80 mb-8 max-w-2xl mx-auto">
            Test your knowledge with our interactive assessments.
          </p>
          <div className="flex justify-center">
            <input
              type="text"
              placeholder="Search assessments..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 rounded-l-full bg-[var(--dark-charcoal)] text-[var(--white-smoke)] border border-[var(--acid-green)] focus:outline-none"
            />
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-[var(--main-bg)]">
        <div className="container mx-auto px-4 max-w-7xl">
          {error ? (
            <p className="text-[var(--neon-red)] text-center">Error: {error}</p>
          ) : !assessment ? (
            <p className="text-[var(--white-smoke)] text-center">Loading assessment...</p>
          ) : id ? (
            <div>
              {!showResult ? (
                <div>
                  <h2 className="text-3xl font-extrabold text-[var(--neon-pink)] [text-shadow:0_0_15px_var(--pink-glow)] mb-6">
                    {assessment.title}
                  </h2>
                  <p className="text-lg text-[var(--white-smoke)] mb-4">{assessment.instructions}</p>
                  <div className="bg-[var(--dark-charcoal)] p-6 rounded-lg border-2 border-[var(--acid-green)] shadow-[0_0_12px_var(--green-glow)]">
                    <h3 className="text-xl font-bold text-[var(--white-smoke)] mb-4">
                      Question {currentQuestion + 1}: {assessment.questions[currentQuestion].question}
                    </h3>
                    <div className="grid gap-2">
                      {assessment.questions[currentQuestion].options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleAnswer(option)}
                          className="px-4 py-2 bg-[var(--neon-pink)] text-[var(--dark-charcoal)] rounded hover:shadow-[0_0_10px_var(--pink-glow)]"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <h2 className="text-3xl font-extrabold text-[var(--neon-pink)] [text-shadow:0_0_15px_var(--pink-glow)] mb-6">
                    Results
                  </h2>
                  <p className="text-lg text-[var(--white-smoke)]">
                    You scored {calculateScore()} out of {assessment.questions.length}.
                  </p>
                  <Link
                    to={`/course/${assessment.courseId}`}
                    className="mt-4 inline-block px-6 py-3 bg-gradient-to-r from-[var(--neon-pink)] to-[var(--electric-blue)] text-[var(--white-smoke)] rounded-full font-extrabold hover:shadow-[0_0_20px_var(--pink-glow)]"
                  >
                    Back to Course
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div>
              <h2 className="text-3xl font-extrabold text-[var(--neon-pink)] [text-shadow:0_0_15px_var(--pink-glow)] mb-6">
                Available Assessments
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:overflow-x-auto sm:flex sm:flex-row sm:gap-6 sm:hide-scrollbar sm:py-4 sm:snap-x sm:snap-mandatory">
                {filteredAssessments.map((a, index) => (
                  <div key={a.id} className="relative min-w-[280px] mx-auto">
                    <Link
                      to={`/assessment/${a.id}`}
                      className="flex-none w-full max-w-[280px] min-h-[200px] bg-[var(--dark-charcoal)] rounded-lg border-2 border-[var(--acid-green)] shadow-[0_0_12px_var(--green-glow)] p-4 text-center"
                    >
                      <h3 className="text-lg font-extrabold text-[var(--white-smoke)] mb-2">{a.title}</h3>
                      <p className="text-sm text-[var(--white-smoke)] opacity-80">{a.instructions}</p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Assessment;