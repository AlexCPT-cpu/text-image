import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function SliderImage({
  image,
  handleImageClick,
}: {
  image: string;
  handleImageClick: (img: string) => void;
}) {
  const [showCheckbox, setShowCheckbox] = useState(false);
  const [pressing, setPressing] = useState(false);
  const [ignoreClick, setIgnoreClick] = useState(false);
  const [isChecked, setIsChecked] = useState(false); // Track checkbox status
  const timeoutRef = useRef(null);

  const handleMouseDown = () => {
    //@ts-ignore
    timeoutRef.current = setTimeout(() => {
      setPressing(true);
      setShowCheckbox(true);
    }, 500);
  };

  const handleMouseUp = () => {
    //@ts-ignore
    clearTimeout(timeoutRef.current);
    if (pressing) {
      setIgnoreClick(true);
    }
    setPressing(false);
  };

  const handleClick = () => {
    if (!ignoreClick) {
      handleImageClick(image);
      setIsChecked(!isChecked); // Toggle checkbox status on image click
    }
    setIgnoreClick(false);
  };

  const handleCheckboxClick = (event: any) => {
    event.stopPropagation(); // Stop the click event from bubbling up
    setIsChecked(!isChecked); // Toggle checkbox status on checkbox click
  };

  useEffect(() => {
    return () => {
      //@ts-ignore
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      // onMouseDown={handleMouseDown}
      // onMouseUp={handleMouseUp}
      // onTouchStart={handleMouseDown}
      // onTouchEnd={handleMouseUp}
      onClick={handleClick}
      className="relative inline-block transition-all w-1/3 md:w-1/4 lg:w-1/5 px-2 mb-4"
    >
      <Image
        width={150}
        height={150}
        src={image}
        layout="responsive"
        alt="Image"
        className="transition-all w-full rounded-lg shadow-md drop-shadow-xl"
      />
      {/* {showCheckbox && (
        <div className="flex items-center absolute top-5 left-5 z-10 bg-white">
          <input
            checked={isChecked}
            id="checked-checkbox"
            type="checkbox"
            onChange={handleCheckboxClick}
            onClick={handleCheckboxClick}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
      )} */}
    </div>
  );
}
