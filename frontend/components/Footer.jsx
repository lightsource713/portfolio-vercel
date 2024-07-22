"use client";

import React from "react";
import Image from "next/image";
import japanFlag from "../public/img/japan-flag.png";

export default function Footer() {
  return (
    <>
      <footer className="mt-[10rem] flex w-full flex-col items-center justify-center border-t border-neutral-700 bg-neutral-900 p-8 py-8 text-white lg:px-32">
        <p className="text-center">
          &copy; 2019 - {new Date().getFullYear()} DanielSuzuki
        </p>
        <p className="flex items-center justify-center gap-1 text-center">
          Made with ❤️ by DanielSuzuki in{" "}
          <Image
            src={japanFlag}
            placeholder="blur"
            alt="Germany flag"
            className="inline h-4 w-6 rounded-sm"
            draggable="false"
          />
        </p>
      </footer>
    </>
  );
}
