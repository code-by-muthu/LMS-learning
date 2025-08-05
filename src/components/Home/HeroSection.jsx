import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    // --- Data for the progress map ---
    // Define the steps for the learning path.
    const projectSteps = [
        { id: 1, title: 'Foundations', icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg> },
        { id: 2, title: 'Core Concepts', icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13.5 10.5L21 3M17 3h4v4M12 22h10M2 12h10M5 12a7 7 0 1014 0 7 7 0 00-14 0z"/></svg> },
        { id: 3, title: 'Advanced Topics', icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 19.5V15H7v4.5M12 15V9M12 9L9 6l3-3 3 3L12 9zM7 19.5h10M12 22h-1c-2.76 0-5-2.24-5-5a5 5 0 0110 0c0 2.76-2.24 5-5 5H12z"/></svg> },
        { id: 4, title: 'Final Project', icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg> },
    ];
    
    const [currentStep, setCurrentStep] = useState(1);

    // This effect simulates progress by changing the active step every few seconds.
    // In a real application, this would be tied to user data.
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep(prevStep => (prevStep % projectSteps.length) + 1);
        }, 3000); // Change step every 3 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        // The main section now has proper vertical padding and uses a max-width for content.
        <section className="bg-[var(--main-bg)] w-full py-8 flex flex-col items-center justify-center min-h-[60vh] xl:min-h-[40vh] relative">
            {/* Main content container with responsive layout. Uses flex-col for mobile and flex-row for larger screens. */}
            <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl px-4 relative gap-8 lg:gap-16">
                
                {/* Content Section (Order 1) */}
                {/* This section now uses `items-center` and `text-center` by default and overrides to `lg:items-start` and `lg:text-left` on large screens. */}
                <div className="order-1 flex-none flex flex-col items-center text-center space-y-4 sm:space-y-5 max-w-full lg:max-w-xl z-10 lg:text-left lg:items-start">
                    <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold leading-tight tracking-tight animate-fade-in-up">
                        <span className="text-[var(--electric-blue)] [text-shadow:0_0_20px_var(--blue-glow),_0_0_40px_var(--blue-glow-strong)]">Debug</span>
                        <span className="text-[var(--acid-green)] [text-shadow:0_0_20px_var(--green-glow),_0_0_40px_var(--green-glow-strong)] mx-2 sm:mx-3"> - Learn - </span>
                        <span className="text-[var(--neon-purple)] [text-shadow:0_0_20px_var(--pink-glow),_0_0_40px_var(--pink-glow-strong)]">Master</span>
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[var(--white-smoke)] w-full leading-relaxed animate-fade-in-up animation-delay-300 px-2 sm:px-0 break-words">
                        Subscribe to build Technology skills from Advanced level programmers.{' '}
                        <span className="text-[var(--neon-purple)] font-semibold [text-shadow:0_0_10px_var(--pink-glow)] whitespace-nowrap">₹5,068/month</span>, cancel anytime
                    </p>
                    <div className="flex flex-col items-center gap-4 w-full">
                        <div className="flex flex-row flex-wrap gap-3 justify-center">
                            <Link
                                to="/courses"
                                className="px-4 py-2 bg-[var(--neon-purple)] text-[var(--white-smoke)] rounded-md text-base font-semibold hover:bg-[var(--soft-violet)] hover:shadow-[0_0_15px_var(--pink-glow)] transition-all duration-300"
                            >
                                Explore Courses
                            </Link>
                            <Link 
                                to="/signup"
                                className="px-4 py-2 bg-[var(--acid-green)] text-[var(--dark-charcoal)] rounded-md text-base font-semibold hover:bg-[var(--cyber-yellow)] hover:shadow-[0_0_15px_var(--green-glow)] transition-all duration-300"
                            >
                                Join Now
                            </Link>
                        </div>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[var(--electric-blue)] [text-shadow:0_0_25px_var(--blue-glow),0_0_50px_var(--neon-purple)] leading-tight tracking-tight animate-fade-in-up">
                            Learn with Errors
                        </h1>
                    </div>
                </div>

                {/* Image and Progress bar container (Order 2) */}
                {/* This container uses flex to arrange the image and progress bar side-by-side on desktop. */}
                <div className="order-2 flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-16">
                    {/* Image container */}
                    <div className="w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[300px] md:h-[300px] lg:w-[280px] lg:h-[280px]">
                        <img
                            src="/hero.png"
                            alt="NeonLearn Hero"
                            className="w-full h-full object-cover rounded-lg shadow-[0_0_15px_var(--blue-glow)]"
                            // Fallback image in case the original path is broken
                            onError={(e) => { e.target.src = "https://placehold.co/400x400/0F0F1A/9B59FF?text=Hero+Image" }}
                        />
                    </div>
                    
                    {/* Progress bar container */}
                    <div className="w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[300px] md:h-[300px] lg:w-[280px] lg:h-[280px] flex flex-col items-start gap-4 p-4 rounded-lg bg-[rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.1)] shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                        <h3 className="text-xl font-bold text-[var(--white-smoke)] mb-2">Your Learning Path</h3>
                        {projectSteps.map((step, index) => (
                            <div key={step.id} className="relative flex items-center">
                                {/* Step line: a connecting line that changes color when the step is complete */}
                                {index < projectSteps.length - 1 && (
                                    <div
                                        className={`absolute left-2 top-8 w-0.5 h-full ${
                                            step.id <= currentStep ? 'bg-[var(--acid-green)] shadow-[0_0_5px_var(--green-glow)]' : 'bg-gray-700'
                                        } transition-all duration-500`}
                                    ></div>
                                )}

                                {/* Step icon and title */}
                                <div className="flex items-center gap-4 z-10">
                                    <div
                                        className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-500 ${
                                            step.id === currentStep
                                                ? 'bg-[var(--neon-purple)] shadow-[0_0_10px_var(--pink-glow)] animate-pulse-step'
                                                : step.id < currentStep
                                                ? 'bg-[var(--acid-green)] shadow-[0_0_10px_var(--green-glow)]'
                                                : 'bg-gray-800 border-2 border-gray-700'
                                        }`}
                                    >
                                        <div
                                            className={`w-5 h-5 transition-transform duration-500 transform ${
                                                step.id === currentStep ? 'scale-110' : 'scale-100'
                                            }`}
                                        >
                                            {step.icon}
                                        </div>
                                    </div>
                                    <span
                                        className={`font-semibold text-lg transition-colors duration-500 ${
                                            step.id === currentStep
                                                ? 'text-[var(--neon-purple)]'
                                                : step.id < currentStep
                                                ? 'text-[var(--acid-green)]'
                                                : 'text-gray-400'
                                        }`}
                                    >
                                        {step.title}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;