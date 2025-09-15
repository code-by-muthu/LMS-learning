import React, { useState } from 'react';

const CommunityPage = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'SyntaxError in Module 3',
      description: 'Encountered SyntaxError: Unexpected token in JavaScript module. Discuss solutions in our Discord!',
      timestamp: '2025-09-14 12:30 PM',
      comments: 3,
    },
    {
      id: 2,
      title: 'TypeError in Python Basics',
      description: 'TypeError: unsupported operand type. Join the discussion to find fixes!',
      timestamp: '2025-09-13 09:15 AM',
      comments: 5,
    },
  ]);

  return (
    <div className="min-h-screen bg-[var(--main-bg)] text-[var(--white-smoke)] p-8 no-scrollbar overflow-hidden">
      <div className="max-w-6xl mx-auto relative">
        {/* Hero Section */}
        <div className="text-center mb-16 relative z-10">
          <h1 className="text-6xl font-extrabold text-[var(--acid-green)] tracking-tight animate-float mb-6">
            Our Vibrant Community
          </h1>
          <p className="text-xl text-[var(--soft-ivory)] max-w-3xl mx-auto leading-relaxed">
            Join our exclusive Discord community to connect with learners, discuss courses, resolve doubts, and share coding solutions.
          </p>
          <a
            href="https://discord.com/invite/your-discord-link" // Replace with actual Discord link
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-8 px-10 py-4 bg-[var(--electric-blue)] text-[var(--dark-charcoal)] rounded-lg hover:bg-[var(--neon-pink)] hover:text-[var(--white-smoke)] transition-all duration-300 shadow-[0_0_20px_var(--blue-glow)] text-lg font-bold transform hover:scale-105"
          >
            Join Discord Community
          </a>
        </div>

        

        {/* Community Highlights */}
        <div className="mb-16 relative z-10">
          <h2 className="text-4xl font-bold text-[var(--neon-purple)] mb-8 animate-float animation-delay-1000">
            Why Join Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 bg-[var(--midnight-blue)]/90 rounded-xl shadow-[0_0_20px_var(--pink-glow)] transform hover:scale-105 transition-all duration-300 animate-float">
              <h3 className="text-2xl font-semibold text-[var(--cyber-green)] mb-4">
                Course Discussions
              </h3>
              <p className="text-[var(--soft-ivory)] leading-relaxed">
                Dive into discussions about "Advanced JavaScript," "Python Basics," and more. Share insights and learn from peers.
              </p>
            </div>
            <div className="p-8 bg-[var(--midnight-blue)]/90 rounded-xl shadow-[0_0_20px_var(--blue-glow)] transform hover:scale-105 transition-all duration-300 animate-float animation-delay-1000">
              <h3 className="text-2xl font-semibold text-[var(--aqua-glow)] mb-4">
                Resolve Doubts
              </h3>
              <p className="text-[var(--soft-ivory)] leading-relaxed">
                Get your questions answered by experts and fellow learners in real-time on Discord.
              </p>
            </div>
            <div className="p-8 bg-[var(--midnight-blue)]/90 rounded-xl shadow-[0_0_20px_var(--green-glow)] transform hover:scale-105 transition-all duration-300 animate-float">
              <h3 className="text-2xl font-semibold text-[var(--neon-pink)] mb-4">
                Error Solutions
              </h3>
              <p className="text-[var(--soft-ivory)] leading-relaxed">
                Share coding errors and collaborate on solutions with the community in dedicated channels.
              </p>
            </div>
          </div>
        </div>

        {/* Recent Community Posts */}
        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-[var(--electric-violet)] mb-8">
            Recent Community Posts
          </h2>
          <div className="grid gap-6">
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <div
                  key={post.id}
                  className={`p-8 rounded-xl bg-[var(--dark-charcoal)]/80 border-l-4 border-[var(--neon-red)] shadow-[0_0_15px_var(--pink-glow)] transform hover:scale-[1.02] transition-all duration-300 animate-float ${
                    index % 2 === 1 ? 'animation-delay-1000' : ''
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-semibold text-[var(--white-smoke)]">
                        {post.title}
                      </h3>
                      <p className="text-[var(--soft-ivory)] mt-3 leading-relaxed">
                        {post.description}
                      </p>
                      <div className="flex items-center space-x-4 mt-3">
                        <p className="text-sm text-[var(--soft-violet)]">
                          {post.timestamp}
                        </p>
                        <p className="text-sm text-[var(--aqua-glow)]">
                          {post.comments} Comments
                        </p>
                      </div>
                    </div>
                    <a
                      href="https://discord.com/invite/your-discord-link" // Replace with actual Discord link
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--soft-violet)] hover:text-[var(--cyber-green)] transition transform hover:scale-110"
                      aria-label="Discuss on Discord"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-[var(--soft-ivory)] py-12">
                <p>No community posts available yet. Join our Discord to start the conversation!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;