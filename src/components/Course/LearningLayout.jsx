import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from './SidebarNavigation';
import LessonContent from './LessonContent';
import LessonControls from './LessonControls';
import ProgressTracker from './ProgressTracker';
import Notification from './Notification';

const LearningLayout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(0);
  const [currentTopic, setCurrentTopic] = useState(null);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
  const [notification, setNotification] = useState({ message: '', type: 'success' });

  useEffect(() => {
    fetch(`/data/courses/course_${id}.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch course data: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        setCourse(data);
        setCurrentTopic(data.chapters[0]?.topics[0] || null);
        // Initialize progress based on completed topics
        const totalTopics = data.chapters.reduce((acc, chapter) => acc + chapter.topics.length, 0);
        const completedTopics = data.chapters.reduce(
          (acc, chapter) => acc + chapter.topics.filter((t) => t.completed).length,
          0
        );
        setProgress((completedTopics / totalTopics) * 100);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setNotification({ message: err.message, type: 'error' });
      });
  }, [id]);

  const handleNext = () => {
    if (!course) return;
    const currentChapter = course.chapters[currentChapterIndex];
    console.log('Next clicked:', { currentChapterIndex, currentTopicIndex });

    if (currentTopicIndex < currentChapter.topics.length - 1) {
      setCurrentTopicIndex(currentTopicIndex + 1);
      setCurrentTopic(currentChapter.topics[currentTopicIndex + 1]);
      updateProgress();
    } else if (currentChapterIndex < course.chapters.length - 1) {
      setCurrentChapterIndex(currentChapterIndex + 1);
      setCurrentTopicIndex(0);
      setCurrentTopic(course.chapters[currentChapterIndex + 1].topics[0]);
      updateProgress();
    } else {
      setNotification({ message: 'You have completed the course!', type: 'success' });
    }
  };

  const handlePrevious = () => {
    if (!course) return;
    console.log('Previous clicked:', { currentChapterIndex, currentTopicIndex });

    if (currentTopicIndex > 0) {
      setCurrentTopicIndex(currentTopicIndex - 1);
      setCurrentTopic(course.chapters[currentChapterIndex].topics[currentTopicIndex - 1]);
    } else if (currentChapterIndex > 0) {
      setCurrentChapterIndex(currentChapterIndex - 1);
      setCurrentTopicIndex(course.chapters[currentChapterIndex - 1].topics.length - 1);
      setCurrentTopic(
        course.chapters[currentChapterIndex - 1].topics[
          course.chapters[currentChapterIndex - 1].topics.length - 1
        ]
      );
    }
  };

  const updateProgress = () => {
    const totalTopics = course.chapters.reduce((acc, chapter) => acc + chapter.topics.length, 0);
    const completedTopics = course.chapters.reduce(
      (acc, chapter) => acc + chapter.topics.filter((t) => t.completed).length,
      0
    );
    // Mark current topic as completed (simulated)
    course.chapters[currentChapterIndex].topics[currentTopicIndex].completed = true;
    setProgress(Math.min(((completedTopics + 1) / totalTopics) * 100, 100));
  };

  const handleExit = () => {
    console.log('Exit clicked, navigating to /course/', id);
    navigate(`/course/${id}`);
  };

  if (!course) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[var(--main-bg)]">
        <div className="text-[var(--white-smoke)] text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[var(--main-bg)]">
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: 'success' })}
      />
      <Sidebar
        chapters={course.chapters}
        currentChapterIndex={currentChapterIndex}
        currentTopicIndex={currentTopicIndex}
        setCurrentTopic={setCurrentTopic}
        setCurrentChapterIndex={setCurrentChapterIndex}
        setCurrentTopicIndex={setCurrentTopicIndex}
        progress={progress}
        className="w-full lg:w-64 bg-[var(--dark-charcoal)] shadow-[0_0_10px_var(--blue-glow)]"
      />
      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[var(--neon-purple)] [text-shadow:0_0_10px_var(--pink-glow)]">
            {course.title}
          </h2>
          <button
            onClick={handleExit}
            className="text-[var(--neon-red)] hover:text-[var(--aqua-glow)] text-sm sm:text-base font-semibold"
          >
            Exit
          </button>
        </div>
        <ProgressTracker progress={progress} />
        <LessonContent topic={currentTopic} />
        <LessonControls
          onNext={handleNext}
          onPrevious={handlePrevious}
          isFirst={currentChapterIndex === 0 && currentTopicIndex === 0}
          isLast={
            currentChapterIndex === course.chapters.length - 1 &&
            currentTopicIndex === course.chapters[currentChapterIndex].topics.length - 1
          }
        />
      </div>
    </div>
  );
};

export default LearningLayout;