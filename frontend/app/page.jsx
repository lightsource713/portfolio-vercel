"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { projects, technologies } from "@/main.config";
import axios from "axios";
import { motion, useAnimation } from "framer-motion";

export default function Home() {
  const router = useRouter();

  const controls1 = useAnimation();
  const controls2 = useAnimation();
  const controls3 = useAnimation();
  const controls4 = useAnimation();

  const aboutControls = useAnimation();
  const projectsControls = useAnimation();
  const techControls = useAnimation();
  const contactControls = useAnimation();

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [blacklistedWords, setBlacklistedWords] = useState([]);
  const [currentTab, setCurrentTab] = React.useState(technologies[0]);
  const [shouldAnimate, setShouldAnimate] = React.useState(true);
  const [errors, setErrors] = useState({
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    messageError: "",
  });

  const tabs = technologies.map((tab) => (
    <button
      key={tab.name}
      onClick={() => setCurrentTab(tab)}
      className={`${
        currentTab.name === tab.name
          ? "bg-primary-500 text-neutral-100"
          : "text-primary-500 bg-neutral-800"
      } mb-4 rounded-lg px-4 py-2`}
    >
      {tab.name}
    </button>
  ));

  React.useEffect(() => {
    setShouldAnimate(false);
    const timer = setTimeout(() => setShouldAnimate(true), 0);
    return () => clearTimeout(timer);
  }, [currentTab]);

  const scrollContainerRef = useRef(null);
  const border1Ref = useRef();
  const border2Ref = useRef();
  const border3Ref = useRef();
  const border4Ref = useRef();
  const aboutRef = useRef();
  const projectsRef = useRef();
  const techRef = useRef();
  const contactRef = useRef();

  const onMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current?.offsetLeft);
    setScrollLeft(scrollContainerRef.current?.scrollLeft);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseLeave = () => {
    setIsDragging(false);
  };

  const onMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current?.offsetLeft;
    const walk = (x - startX) * 2;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const checkErrors = (messageData) => {
    let errorsTemp = {
      firstNameError: "",
      lastNameError: "",
      emailError: "",
      messageError: "",
    };
    if (messageData.firstName.length == 0) {
      errorsTemp = {
        ...errorsTemp,
        firstNameError: "First name must be required!",
      };
    }
    if (messageData.lastName.length == 0) {
      errorsTemp = {
        ...errorsTemp,
        lastNameError: "Last name must be required!",
      };
    }
    if (messageData.message.length < 5) {
      errorsTemp = {
        ...errorsTemp,
        messageError: "Message lenght must be bigger than 5",
      };
    }
    if (!validateEmail(messageData.email)) {
      errorsTemp = { ...errorsTemp, emailError: "Email is incorrect!" };
    }
    setErrors({ ...errorsTemp });
  };
  const checkValidation = () => {
    if (
      errors.firstNameError.length == 0 &&
      errors.lastNameError.length == 0 &&
      errors.messageError.length == 0 &&
      errors.emailError.length == 0
    ) {
      return true;
    } else return false;
  };

  const sendEmail = (e) => {
    const messageData = {
      email,
      firstName,
      lastName,
      message,
    };
    checkErrors(messageData);
    const validation = checkValidation();
    e.preventDefault();
    if (validation) {
      axios.post("http://localhost:3001/mail", messageData).then((res) => {
        console.log(res);
      });
    }
  };

  useEffect(() => {
    const borders = [
      { ref: border1Ref, controls: controls1 },
      { ref: border2Ref, controls: controls2 },
      { ref: border3Ref, controls: controls3 },
      { ref: border4Ref, controls: controls4 },
    ];
    let currentBorderIndex = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          borders[currentBorderIndex].controls.start("visible");
          observer.unobserve(entry.target);
          currentBorderIndex += 1;
          if (currentBorderIndex < borders.length) {
            const nextBorder = borders[currentBorderIndex].ref.current;
            if (nextBorder) {
              observer.observe(nextBorder);
            }
          }
        }
      },
      { threshold: 0.5 },
    );

    const firstBorder = borders[currentBorderIndex].ref.current;
    if (firstBorder) {
      observer.observe(firstBorder);
    }

    return () => {
      if (currentBorderIndex < borders.length) {
        const borderToUnobserve = borders[currentBorderIndex].ref.current;
        if (borderToUnobserve) {
          observer.unobserve(borderToUnobserve);
        }
      }
    };
  }, [controls1, controls2, controls3, controls4]);

  useEffect(() => {
    const aboutObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          aboutControls.start("visible");
        }
      },
      { threshold: 0.5 },
    );

    if (aboutRef.current) {
      aboutObserver.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        aboutObserver.unobserve(aboutRef.current);
      }
    };
  }, [aboutControls]);

  useEffect(() => {
    const projectsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          projectsControls.start("visible");
        }
      },
      { threshold: 0.5 },
    );

    if (projectsRef.current) {
      projectsObserver.observe(projectsRef.current);
    }

    return () => {
      if (projectsRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        projectsObserver.unobserve(projectsRef.current);
      }
    };
  }, [projectsControls]);

  useEffect(() => {
    const techObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          techControls.start("visible");
        }
      },
      { threshold: 0.5 },
    );

    if (techRef.current) {
      techObserver.observe(techRef.current);
    }

    return () => {
      if (techRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        techObserver.unobserve(techRef.current);
      }
    };
  }, [techControls]);

  useEffect(() => {
    const contactObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          contactControls.start("visible");
        }
      },
      { threshold: 0.5 },
    );

    if (contactRef.current) {
      contactObserver.observe(contactRef.current);
    }

    return () => {
      if (contactRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        contactObserver.unobserve(contactRef.current);
      }
    };
  }, [contactControls]);

  return (
    <>
      <motion.main
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto flex min-h-screen flex-col items-center justify-center p-8 lg:p-32"
      >
        <div className="flex w-full flex-col items-center justify-center">
          <div className="mb-4 rounded-lg bg-neutral-800 p-2 font-medium shadow-lg 2xl:text-lg">
            <div className="hi">👋</div> Hi There, I&apos;m Daniel Suzuki
          </div>
          <h1 className="text-center text-3xl font-bold lg:text-4xl 2xl:text-5xl">
            I Build{" "}
            <span className="from-primary-400 to-primary-500 bg-gradient-to-r bg-clip-text text-transparent">
              Websites
            </span>
            ,{" "}
            <span className="from-primary-400 to-primary-500 bg-gradient-to-r bg-clip-text text-transparent">
              APIs
            </span>
            ,{" "}
            <span className="from-primary-400 to-primary-500 bg-gradient-to-r bg-clip-text text-transparent">
              NPM Packages
            </span>{" "}
            and{" "}
            <span className="from-primary-400 to-primary-500 bg-gradient-to-r bg-clip-text text-transparent">
              More
            </span>{" "}
            <span className="rocket text-3xl">🚀</span>
          </h1>
          <p className="text-md mt-2 text-center lg:mt-4 lg:text-xl 2xl:text-2xl">
            As a full-stack developer, I possess the versatility to handle both
            front-end and back-end development, enabling me to build and
            maintain comprehensive web applications from server infrastructure
            to user interface.
          </p>
        </div>
        <div className="mt-4 flex w-full flex-row items-center justify-center gap-2">
          <button
            className="bg-primary-500 hover:bg-primary-600 flex items-center justify-center rounded-lg px-10 py-2 font-bold text-white shadow-lg transition-colors"
            onClick={() => router.push("/projects")}
          >
            Projects
          </button>
        </div>
      </motion.main>

      <motion.div
        ref={border1Ref}
        initial="hidden"
        animate={controls1}
        variants={{
          hidden: { width: 0 },
          visible: { width: "100%", transition: { duration: 0.8, delay: 0 } },
        }}
        className="mx-auto px-8 lg:px-32"
      >
        <div className="mb-4 mt-4 w-full border-t border-neutral-700" />
      </motion.div>

      <motion.section
        ref={aboutRef}
        initial="hidden"
        animate={aboutControls}
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, delay: 0 },
          },
        }}
        id="about"
        className="mx-auto flex min-h-screen w-full flex-col items-center justify-center p-8 lg:flex-row lg:items-start lg:p-32"
      >
        <div className="flex w-full flex-col items-start justify-center lg:w-2/3 ">
          <div className="mt-12 flex flex-row items-center justify-start gap-2">
            <div className="bg-primary-500 rounded-lg p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </div>
            <h2 className="text-center text-4xl font-bold">
              About Me<span className="text-primary-500">.</span>
            </h2>
          </div>
          <p className="mt-2 text-left text-xl">
            I am experienced and passionate Fullstack engineer with +5 years of
            experience. Designed and accomplished the development of a
            Manufacturing Execution System (MES) with my team members,
            demonstrating my versatility and expertise in diverse projects. And
            equipped with wide range of tech stack including frontend and
            backend frameworks. As well as web skills, very knowledgeable on
            cloud-based platforms (AWS, Azure), DB management systems, modern
            APIs and so on. Committed to staying updated with trending in the
            digital world and continuously enhancing skillset. Very flexible in
            work and communicative with teammates
          </p>
        </div>
        <div className="mt-10 flex w-full flex-row items-center justify-center gap-2 lg:mt-10 lg:w-1/3 lg:justify-end">
          <Image
            src="/img/me.png"
            width={256}
            height={256}
            alt="DanielSuzuki"
            className="border-primary-500 h-64 w-64 rounded-xl border-4 bg-neutral-800 shadow-lg transition-transform duration-150 ease-in-out hover:translate-y-[-4px] hover:transform"
            draggable="false"
          />
        </div>
      </motion.section>

      <motion.div
        ref={border2Ref}
        initial="hidden"
        animate={controls2}
        variants={{
          hidden: { width: 0 },
          visible: { width: "100%", transition: { duration: 0.8, delay: 0 } },
        }}
        className="mx-auto px-8 lg:px-32"
      >
        <div className="mb-4 mt-4 w-full border-t border-neutral-700" />
      </motion.div>

      <motion.section
        ref={projectsRef}
        initial="hidden"
        animate={projectsControls}
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, delay: 0 },
          },
        }}
        id="projects"
        className="mx-auto flex min-h-screen w-full flex-col items-start justify-center bg-gradient-to-b from-transparent via-neutral-900/90 to-neutral-900 p-8 lg:p-32"
      >
        <div className="flex w-full flex-col items-start justify-center">
          <div className="mb-8 flex w-full flex-col items-start justify-center">
            <div className="flex flex-row items-center justify-start gap-2">
              <div className="bg-primary-500 rounded-lg p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
                  />
                </svg>
              </div>
              <h2 className="text-4xl font-bold">
                Projects<span className="text-primary-500">.</span>
              </h2>
            </div>
            <p className="mt-2 text-left text-xl">
              Here are some of the projects I&apos;ve done before.
            </p>
          </div>
          <div className="grid w-full grid-cols-1 items-start justify-center gap-4 lg:grid-cols-2">
            {projects.slice(0, 2).map((project, index) => (
              <div
                key={index}
                className="z-[-1] flex h-full w-full flex-col items-center justify-center gap-4 rounded-lg bg-neutral-800 p-4 shadow-lg"
              >
                <Image
                  src={project.banner}
                  alt={project.title}
                  width={512}
                  height={256}
                  unoptimized
                  className="h-auto w-full rounded-lg bg-neutral-900 shadow-lg"
                  draggable="false"
                />
                <p className="text-left text-xl">{project.description}</p>
                <div className="mt-4 flex w-full flex-row items-center justify-start gap-2"></div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-end gap-2">
          <button
            className="bg-primary-500 hover:bg-primary-600 -mt-20 flex items-center justify-center rounded-lg px-6 py-2 font-bold text-white shadow-lg transition-colors"
            onClick={() => router.push("/projects")}
          >
            View All Projects
          </button>
        </div>
      </motion.section>

      <motion.div
        ref={border3Ref}
        initial="hidden"
        animate={controls3}
        variants={{
          hidden: { width: 0 },
          visible: { width: "100%", transition: { duration: 0.8, delay: 0 } },
        }}
        className="mx-auto px-8 lg:px-32"
      >
        <div className="mb-4 mt-4 w-full border-t border-neutral-700" />
      </motion.div>

      <motion.section
        ref={techRef}
        initial="hidden"
        animate={techControls}
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, delay: 0 },
          },
        }}
        id="projects"
        className="mx-auto flex min-h-screen w-full flex-col items-start justify-center bg-gradient-to-b from-transparent via-neutral-900/90 to-neutral-900 p-8 lg:p-32"
      >
        <div className="mt-[15rem] flex w-full flex-col items-start justify-center">
          <div className="flex flex-row items-center justify-start gap-2">
            <div className="bg-primary-500 rounded-lg p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                />
              </svg>
            </div>
            <h2 className="text-center text-4xl font-bold">
              Technologies I Use<span className="text-primary-500">.</span>
            </h2>
          </div>
          <p className="mt-2 text-left text-xl">
            I have experience with a wide range of technologies, from front-end
            frameworks like React and Vue to back-end frameworks like Express
            and Golang. I also have experience with cloud platforms like AWS and
            Google Cloud, and have worked with databases like MongoDB and
            PostgreSQL. I&apos;m always looking to learn new technologies and
            expand my skillset.
          </p>
        </div>
        <div className="mt-8 w-full">
          <div className="flex flex-row items-center justify-start gap-2 overflow-x-auto">
            {tabs}
          </div>
        </div>
        <div className="mt-16 flex w-full flex-col items-start justify-center">
          <h3 className="text-center text-xl font-bold">{currentTab.name}</h3>
          <motion.div
            className="mt-2 grid  w-full grid-cols-2 items-center justify-start gap-2 md:grid-cols-3 lg:grid-cols-4"
            transition={{ duration: 0.2, staggerChildren: 0.15 }}
          >
            {currentTab.technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                className="flex w-full transform flex-row items-center justify-start gap-2 rounded-lg bg-neutral-800 p-2 text-center transition-transform duration-150 ease-in-out hover:translate-y-[-4px]"
                initial={shouldAnimate ? { opacity: 0, y: 10 } : {}}
                animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
                exit={shouldAnimate ? { opacity: 0, y: 10 } : {}}
                transition={
                  shouldAnimate ? { duration: 0.2, delay: index * 0.1 } : {}
                }
              >
                <div className="rounded-md bg-neutral-700 p-2">
                  <Image
                    src={tech.icon}
                    alt={tech.name}
                    className="h-6 w-6"
                    width={24}
                    height={24}
                  />
                </div>
                {tech.name}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.div
        ref={border4Ref}
        initial="hidden"
        animate={controls3}
        variants={{
          hidden: { width: 0 },
          visible: { width: "100%", transition: { duration: 0.8, delay: 0 } },
        }}
        className="mx-auto px-8 lg:px-32"
      >
        <div className="mb-4 mt-4 w-full border-t border-neutral-700" />
      </motion.div>

      <motion.section
        ref={contactRef}
        initial="hidden"
        animate={contactControls}
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, delay: 0 },
          },
        }}
        id="contact"
        className="mx-auto flex min-h-screen w-full flex-col items-start justify-center p-8 lg:p-32"
      >
        <div className="mb-10 flex w-full flex-col items-start justify-center">
          <div className="flex flex-row items-center justify-start gap-2">
            <div className="bg-primary-500 rounded-lg p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                ></path>
              </svg>
            </div>
            <h2 className="text-4xl font-bold">
              Contact Me<span className="text-primary-500">.</span>
            </h2>
          </div>
          <p className="mt-2 text-left text-xl">
            Want to work together or just say hi? Feel free to reach out to me.
          </p>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-10 lg:flex-row lg:items-start lg:justify-start">
          <div className="flex w-full flex-col items-start justify-start gap-4 lg:w-1/2">
            <button
              className="flex w-full items-center justify-start gap-2 rounded-lg bg-neutral-800 px-6 py-4 font-bold text-white shadow-lg transition-colors hover:bg-neutral-700"
              onClick={() => router.push("mailto:me@binaryblazer.me")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-message-square"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              Email Me
            </button>
          </div>
          <form className="flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-neutral-800 p-4 shadow-lg lg:w-1/2">
            {error && (
              <p className="w-full items-center justify-center rounded-lg bg-red-500/10 p-2 text-center text-red-500">
                {error}
                {blacklistedWords.length > 0 && (
                  <ul className="mt-4 grid grid-cols-1 gap-2 rounded-lg bg-red-500/20 p-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {blacklistedWords.map((word, index) => (
                      <li key={index} className="text-red-400">
                        {word}
                      </li>
                    ))}
                  </ul>
                )}
              </p>
            )}
            {/* <div className="flex w-full flex-row items-center justify-start gap-4"> */}
            <div className="grid  w-full gap-4 md:grid-cols-2">
              <div className="w-full">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full rounded-lg bg-neutral-700 p-3"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstNameError.length !== 0 && (
                  <p className="error pt-3 ">{errors.firstNameError}</p>
                )}
              </div>
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full rounded-lg bg-neutral-700 p-3"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastNameError.length !== 0 && (
                  <p className="error pt-3 ">{errors.lastNameError}</p>
                )}
              </div>
            </div>
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-lg bg-neutral-700 p-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.emailError.length !== 0 && (
              <p className="error">{errors.emailError}</p>
            )}
            <textarea
              placeholder="Message"
              className={`max-h-[20rem] min-h-[10rem] w-full rounded-lg bg-neutral-700 p-3 ${
                blacklistedWords && "border-red-500"
              }`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            {errors.messageError.length !== 0 && (
              <p className="error">{errors.messageError}</p>
            )}
            <button
              type="submit"
              className="bg-primary-500 hover:bg-primary-600 flex items-center justify-center rounded-lg px-6 py-2 font-bold text-white transition-colors"
              onClick={(e) => sendEmail(e)}
            >
              Send Message
            </button>
          </form>
        </div>
      </motion.section>
    </>
  );
}
