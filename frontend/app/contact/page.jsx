"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";

export default function Page() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    messageError: "",
  });
  const [blacklistedWords, setBlacklistedWords] = useState([]);

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

  const handleSubmit = (e) => {
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

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.5 }}
      className="mx-auto flex min-h-screen w-full flex-col items-center justify-center p-8 lg:mt-0 lg:p-32"
    >
      <div className="mb-10 mt-[14rem] flex w-full flex-col items-start justify-center">
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
      <div className="flex w-full flex-col items-center justify-start gap-10 lg:flex-row lg:items-start">
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
          <div className="flex w-full flex-row items-center justify-start gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="w-full rounded-lg bg-neutral-700 p-3"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full rounded-lg bg-neutral-700 p-3"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-lg bg-neutral-700 p-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            placeholder="Message"
            className={`max-h-[20rem] min-h-[10rem] w-full rounded-lg bg-neutral-700 p-3 ${
              blacklistedWords && "border-red-500"
            }`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            className="bg-primary-500 hover:bg-primary-600 flex items-center justify-center rounded-lg px-6 py-2 font-bold text-white transition-colors"
            onClick={(e) => handleSubmit(e)}
          >
            Send Message
          </button>
        </form>
      </div>
    </motion.main>
  );
}
