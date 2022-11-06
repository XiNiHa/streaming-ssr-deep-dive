"use client";

import { Suspense } from "react";
import DelayedCheck from "./DelayedCheck";
import Spinner from "./Spinner";

export default function HomeImpl() {
  return (
    <div
      v-click="1"
      className="grid w-full h-100vh gap-3 grid-cols-5 grid-rows-3 transition-opacity duration-500"
    >
      <header className="bg-gray-300 col-span-full rounded-lg grid p-3">
        <div className="bg-gray-400 rounded-lg grid items-center justify-center">
          <Suspense fallback={<Spinner />}>
            <DelayedCheck ms={1000} />
          </Suspense>
        </div>
      </header>
      <aside className="bg-gray-300 row-[2/4] rounded-lg grid p-3">
        <div className="bg-gray-400 rounded-lg grid items-center justify-center">
          <Suspense fallback={<Spinner />}>
            <DelayedCheck ms={2000} />
          </Suspense>
        </div>
      </aside>
      <main className="bg-gray-300 col-[2/6] row-[2/4] rounded-lg grid grid-cols-5 grid-rows-3 p-3 gap-3">
        <div className="bg-gray-400 col-[1/3] row-[1/4] rounded-lg grid items-center justify-center">
          <Suspense fallback={<Spinner />}>
            <DelayedCheck ms={4000} />
          </Suspense>
        </div>
        <div className="bg-gray-400 col-[3/6] row-[1/3] rounded-lg grid items-center justify-center">
          <Suspense fallback={<Spinner />}>
            <DelayedCheck ms={3000} />
          </Suspense>
        </div>
        <div className="bg-gray-400 col-[3/6] row-[3/4] rounded-lg grid items-center justify-center">
          <Suspense fallback={<Spinner />}>
            <DelayedCheck ms={5000} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
