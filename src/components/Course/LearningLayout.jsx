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
        updateProgress(data);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setNotification({ message: err.message, type: 'error' });
      });
  }, [id]);

  const updateProgress = (data = course) => {
    if (!data) return;
    const totalTopics = data.chapters.reduce((acc, chapter) => acc + chapter.topics.length, 0);
    const completedTopics = data.chapters.reduce(
      (acc, chapter) => acc + chapter.topics.filter((t) => t.completed).length,
      0
    );
    setProgress((completedTopics / totalTopics) * 100);
  };

  const isChapterCompleted = (chapterIndex) => {
    return course?.chapters[chapterIndex]?.topics.every((topic) => topic.completed);
  };

  const handleTopicCompletion = () => {
    if (!course) return;
    const updatedCourse = { ...course };
    updatedCourse.chapters[currentChapterIndex].topics[currentTopicIndex].completed = true;
    setCourse(updatedCourse);
    updateProgress(updatedCourse);
    setNotification({ message: 'Topic completed!', type: 'success' });
  };

  const handleNext = () => {
    if (!course || !currentTopic.completed) {
      setNotification({ message: 'Please complete the current topic before proceeding.', type: 'error' });
      return;
    }

    const currentChapter = course.chapters[currentChapterIndex];
    if (currentTopicIndex < currentChapter.topics.length - 1) {
      setCurrentTopicIndex(currentTopicIndex + 1);
      setCurrentTopic(currentChapter.topics[currentTopicIndex + 1]);
    } else if (currentChapterIndex < course.chapters.length - 1) {
      if (isChapterCompleted(currentChapterIndex)) {
        setCurrentChapterIndex(currentChapterIndex + 1);
        setCurrentTopicIndex(0);
        setCurrentTopic(course.chapters[currentChapterIndex + 1].topics[0]);
      } else {
        setNotification({
          message: 'Complete all topics in this chapter to proceed.',
          type: 'error',
        });
      }
    } else {
      setNotification({ message: 'You have completed the course!', type: 'success' });
    }
  };

  const handlePrevious = () => {
    if (currentTopicIndex > 0) {
      setCurrentTopicIndex(currentTopicIndex - 1);
      setCurrentTopic(course.chapters[currentChapterIndex].topics[currentTopicIndex - 1]);
    } else if (currentChapterIndex > 0) {
      setCurrentChapterIndex(currentChapterIndex - 1);
      setCurrentTopicIndex(course.chapters[currentChapterIndex - 1].topics.length - 1);
      setCurrentTopic(course.chapters[currentChapterIndex - 1].topics[course.chapters[currentChapterIndex - 1].topics.length - 1]);
    }
  };

  const handleAssessmentClick = (assessmentId) => {
    if (!isChapterCompleted(currentChapterIndex)) {
      setNotification({
        message: 'Complete all topics in this chapter to unlock the assessment.',
        type: 'error',
      });
      return;
    }
    navigate(`/assessment/${assessmentId}`);
  };

  const handleExit = () => {
    navigate(`/course/${id}`);
  };

  if (!course) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[var(--main-bg)]">
        <div className="text-[var(--white-smoke)] text-lg animate-pulse">Loading...</div>
      </div>
    );
  }

  const isQuizChapter = currentChapterIndex >= course.chapters.length - 2; // Chapters 2 and 3

  return (
    <div className="flex min-h-screen bg-[var(--main-bg)]">
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
        onAssessmentClick={handleAssessmentClick}
        className="w-72 bg-[var(--dark-charcoal)] shadow-[0_4px_20px_rgba(0,183,235,0.3)] p-4"
      />
      <div className="flex-1 p-6 lg:p-8">
        <div className="bg-[var(--dark-charcoal)] rounded-2xl shadow-[0_4px_20px_rgba(0,183,235,0.3)] p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl lg:text-3xl font-extrabold text-[var(--neon-purple)] [text-shadow:0_0_12px_var(--pink-glow)]">
              {course.title}
            </h2>
            <button
              onClick={handleExit}
              className="text-[var(--neon-red)] hover:text-[var(--aqua-glow)] font-semibold transition-colors duration-300"
            >
              Exit Course
            </button>
          </div>
          <ProgressTracker progress={progress} />
          <LessonContent topic={currentTopic} onComplete={handleTopicCompletion} />
          <LessonControls
            onNext={handleNext}
            onPrevious={handlePrevious}
            isFirst={currentChapterIndex === 0 && currentTopicIndex === 0}
            isLast={
              currentChapterIndex === course.chapters.length - 1 &&
              currentTopicIndex === course.chapters[currentChapterIndex].topics.length - 1
            }
            isTopicCompleted={currentTopic?.completed || false}
            onAssessmentClick={handleAssessmentClick}
            assessment={isQuizChapter ? course.chapters[currentChapterIndex].assessment : null}
          />
        </div>
      </div>
    </div>
  );
};

export default LearningLayout;