"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { projects } from "@/main.config";
import { motion } from "framer-motion";

export default function Page() {
  const router = useRouter();
  const [selectedRepoId, setSelectedRepoId] = useState(null);

  const style1 = {
    opacity: 1,
    zIndex: 100,
    backdropFilter: "blur(10px)",
    transition: "all 0.25s ease-in-out",
  };

  const style2 = {
    backdropFilter: "blur(0px)",
    opacity: 0,
    zIndex: -100,
    transition: "all 0.25s ease-in-out",
  };

  return (
    <>
      <motion.main
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.5 }}
        className="mx-auto flex min-h-screen w-full flex-col items-start justify-center p-8 lg:mt-0 lg:p-32"
      >
        <div className="mb-8 mt-[14rem] flex w-full flex-col items-start justify-center">
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
          {projects.map((project, index) => (
            <div
              key={index}
              className="flex h-full w-full flex-col items-center justify-center gap-4 rounded-lg bg-neutral-800 p-4 shadow-lg"
            >
              <Image
                src={project.banner}
                alt={project.title}
                width={1920}
                height={1080}
                className="h-auto w-full rounded-lg bg-neutral-900 shadow-lg"
                draggable="false"
              />
              <div className="mt-2 flex w-full flex-row items-center justify-start"></div>
              <p className="text-left text-xl">{project.description}</p>
              <div className="mt-2 flex w-full flex-row items-center justify-start">
                <p className="text-left text-xl">
                  Techinologies: {project.technologies.toString()}
                </p>
              </div>
              <div className="mt-4 flex w-full flex-row items-center justify-start gap-2">
                <button
                  className="bg-primary-500 hover:bg-primary-600 flex items-center justify-center rounded-lg px-6 py-2 font-bold text-white shadow-lg transition-colors"
                  onClick={() => router.push(project.link)}
                >
                  View Project
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.main>

      <div
        className="fixed inset-0 z-[100] h-full w-full cursor-pointer bg-neutral-900/90"
        style={selectedRepoId !== null ? style1 : style2}
        onClick={() => setSelectedRepoId(null)}
      ></div>
    </>
  );
}
