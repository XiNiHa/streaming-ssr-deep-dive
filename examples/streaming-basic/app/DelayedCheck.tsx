import { use, useEffect, useRef, useState } from "react";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export default function DelayedCheck({ ms }: { ms: number }) {
  const isClient = typeof window !== "undefined";

  const [hydrated, setHydrated] = useState(false);
  const delayed = useRef(false);

  if (!delayed.current && !isClient) {
    use(delay(ms).then(() => (delayed.current = true)));
  }

  useEffect(() => {
    setHydrated(true);
  }, [hydrated]);

  const check = hydrated ? (
    <div className="col-span-full row-span-full bg-green rounded-full w-14 h-14 flex items-center justify-center text-3xl">
      <i className="i-mdi-check inline-block color-gray-600" />
    </div>
  ) : (
    <div className="col-span-full row-span-full border-4 border-green rounded-full w-14 h-14 flex items-center justify-center text-3xl">
      <i className="i-mdi-check inline-block color-gray-100" />
    </div>
  );

  return (
    <div className="col-span-full row-span-full flex flex-col justify-center items-center gap-6">
      {check}
      <p className="text-2xl text-gray-800">{ms}ms 지연되어 렌더링됨</p>
    </div>
  );
}
