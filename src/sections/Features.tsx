"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Define valid step number type
type StepNumber = 1 | 2 | 3 | 4 | 5;

interface ProcessDetail {
  title: string;
  description: string;
  icon: string;
  color: string;
}

const processDetails: Record<StepNumber, ProcessDetail> = {
  1: { title: "Planning", description: "Strategic planning and analysis phase", icon: "📋", color: "from-blue-400 to-blue-600" },
  2: { title: "Design", description: "Creative design and user experience", icon: "🎨", color: "from-purple-400 to-purple-600" },
  3: { title: "Development", description: "Code implementation and building", icon: "💻", color: "from-green-400 to-green-600" },
  4: { title: "Testing", description: "Quality assurance and testing", icon: "🔍", color: "from-orange-400 to-orange-600" },
  5: { title: "Launch", description: "Deployment and go-live process", icon: "🚀", color: "from-red-400 to-red-600" }
};

const Features = () => {
    const [hoveredNumber, setHoveredNumber] = useState<StepNumber | null>(null);
    const numbers: StepNumber[] = [1, 2, 3, 4, 5];
    
    const carouselOpacityDuration = 0.6; // Longer duration for a smooth fade-out
    const carouselLayoutDuration = 0.2; // Quick collapse after fade-out

    return (
        <>
            <div className="flex flex-col lg:flex-row items-center justify-center p-8 lg:p-12">
                {numbers.map((number, index) => (
                    <div key={`step-wrapper-${number}`} className="flex flex-col lg:flex-row items-center">
                        {/* Interactive element: Circle + Title */}
                        <motion.div 
                            className="flex flex-col items-center cursor-pointer group"
                            onMouseEnter={() => setHoveredNumber(number)}
                            onMouseLeave={() => setHoveredNumber(null)}
                        >
                            <motion.div 
                                className={`w-20 h-20 bg-gradient-to-br ${processDetails[number].color} text-white rounded-full flex items-center justify-center font-bold text-3xl shadow-lg mb-3`}
                                initial={{ scale: 1 }}
                                animate={{ 
                                    scale: hoveredNumber === number ? 1.3 : 1,
                                    rotate: hoveredNumber === number ? 5 : 0
                                }}
                                transition={{ 
                                    type: "spring", 
                                    stiffness: 400, 
                                    damping: 25,
                                    mass: 0.8
                                }}
                                whileHover={{ 
                                    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.2)",
                                    y: -2
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {number}
                            </motion.div>
                            <motion.h4 
                                className="text-sm font-semibold text-gray-700 text-center min-h-[2rem] flex items-center"
                                initial={{ opacity: 0.7 }}
                                animate={{ 
                                    opacity: hoveredNumber === number ? 1 : 0.7,
                                    scale: hoveredNumber === number ? 1.1 : 1,
                                    color: hoveredNumber === number ? "#1F2937" : "#6B7280"
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                {processDetails[number].title}
                            </motion.h4>
                        </motion.div>

                        {/* Connecting Line */}
                        {index < numbers.length - 1 && (
                            <motion.div 
                                className="hidden lg:block w-12 h-0 border-t-2 border-dotted border-gray-400 mx-6 mt-[-2rem] xl:mt-[-2.5rem]"
                                initial={{ scaleX: 0, originX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: index * 0.15, duration: 0.4, ease: "circOut" }}
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* Carousel Section - fade out content first, then collapse container */}
            <AnimatePresence mode="wait">
                {hoveredNumber !== null && (
                    <motion.div
                        key={hoveredNumber}
                        initial={{ opacity: 0 }}
                        animate={{ 
                            opacity: 1,
                            transition: { 
                                opacity: { duration: 0.3, ease: "easeIn" }
                            }
                        }}
                        exit={{ 
                            opacity: 0,
                            transition: { 
                                opacity: { duration: carouselOpacityDuration, ease: "easeOut" }
                            }
                        }}
                        className="mx-8"
                        onAnimationComplete={() => {
                            // Optional: Force removal of space or ensure cleanup if needed
                            // This is a fallback in case the layout doesn't collapse as expected
                        }}
                    >
                        {/* Inner wrapper to maintain space during fade-out */}
                        <motion.div
                            initial={{ maxHeight: 0, marginBottom: 0 }}
                            animate={{ 
                                maxHeight: 500, // Adjust if content is taller
                                marginBottom: "2rem",
                                transition: { 
                                    maxHeight: { duration: 0.4, type: "spring", stiffness: 200, damping: 25, delay: 0.1 },
                                    marginBottom: { duration: 0.4, type: "spring", stiffness: 200, damping: 25, delay: 0.1 }
                                }
                            }}
                            exit={{ 
                                maxHeight: 0,
                                marginBottom: 0,
                                transition: { 
                                    maxHeight: { duration: carouselLayoutDuration, ease: "easeIn", delay: carouselOpacityDuration },
                                    marginBottom: { duration: carouselLayoutDuration, ease: "easeIn", delay: carouselOpacityDuration }
                                }
                            }}
                            className="overflow-hidden"
                        >
                            {/* Content */}
                            <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-8 shadow-2xl border border-gray-100">
                                <div className="text-center">
                                    <motion.div 
                                        className="text-6xl mb-4"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1, transition: { type: "spring", stiffness: 260, damping: 20, delay: 0.2 } }}
                                    >
                                        {processDetails[hoveredNumber].icon}
                                    </motion.div>
                                    <h3 className="text-3xl font-bold text-gray-800 mb-3">
                                        Step {hoveredNumber}: {processDetails[hoveredNumber].title}
                                    </h3>
                                    <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                                        {processDetails[hoveredNumber].description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default Features;
