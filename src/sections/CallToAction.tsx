"use client";

import ArrowRight from "@/assets/arrow-right.svg";
import starImage from "@/assets/star.png";
import springImage from "@/assets/spring.png";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const CallToAction = () => {

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

const textVariants = {
  initial: { scale: 1, x: 0 },
  hover: {
    scale: 1.25,
    x: 4,
    transition: { duration: 0.2, ease: "easeInOut" },
  },
};

const iconVariants = {
  initial: { scale: 1, x: 0 },
  hover: {
    scale: 1.6,
    x: 22,
    transition: { duration: 0.2, ease: "easeInOut" },
  },
};



  return (
    <section ref={sectionRef} className="bg-gradient-to-b from-white to-[#D2DCFF] py-24 overflow-x-clip">
      <div className="container">
        <div className="section-heading relative">
          <h2 className="section-title">Book A meeting today</h2>
          <p className="section-description mt-5">
            Celebrate the joy of accomplishment with an app designed to track
            your progress and motivate your efforts.
          </p>
          <motion.img
            src={starImage.src}
            alt="Star Image"
            width={360}
            className="absolute -left-[350px] -top-[137px]"
            style={{
              translateY,
            }}
          />
          <motion.img
            src={springImage.src}
            alt="Spring Image"
            width={360}
            className="absolute -right-[331px] -top-[19px]"
            style={{
              translateY,
            }}
          />
        </div>
        <div className="flex gap-2 mt-10 justify-center">
           <motion.button
      className="btn btn-text gap-2 px-4 py-2 rounded bg-transparent focus:outline-none flex items-center"
      initial="initial"
      whileHover="hover"
      whileFocus="hover"
      style={{ border: "none" }} // optional: removes any default border
    >
      <motion.span
        variants={textVariants}
        className="text-base font-medium"
      >
        Contact us
      </motion.span>
      <motion.span
        variants={iconVariants}
        className="flex items-center"
      >
        <ArrowRight className="h-5 w-5" />
      </motion.span>
    </motion.button>
        </div>
      </div>
    </section>
  );
};
