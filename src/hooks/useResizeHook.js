import { useEffect, useState } from "react";

const useResizeHook = () => {
  const [tabletSize, setTabletSize] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => {
      setTabletSize(window.innerWidth <= 600);
    };

    // Add event listener to listen for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return tabletSize;
};

export default useResizeHook;
