/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useOutsideClick(handler: any, listenCapturing: boolean = true) {
  const ref:any = useRef();
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleClick(e: any) {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    }
    document.addEventListener("click", handleClick, listenCapturing);

    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, [handler]);
  return ref;
}

export default useOutsideClick;
