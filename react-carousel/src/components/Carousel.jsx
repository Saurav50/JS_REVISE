// import styles from './index.module.less';
import { useEffect, useState } from "react";
import { data } from "../constants";
const Carousel = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      handleNext();
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [activeIdx]);

  function handleNext() {
    activeIdx == data.length - 1
      ? setActiveIdx(0)
      : setActiveIdx(activeIdx + 1);
  }
  function handlePrev() {
    activeIdx == 0
      ? setActiveIdx(data.length - 1)
      : setActiveIdx(activeIdx - 1);
  }
  return (
    <div className="flex  justify-center justify-items-center">
      <button onClick={handlePrev}> Prev</button>
      {data.map((image, idx) => (
        <img
          src={image}
          alt="carousel-image"
          key={image}
          className={
            "w-[700px] h-96 object-contain " +
            (activeIdx === idx ? "block" : "hidden")
          }
        />
      ))}
      <button onClick={handleNext}> Next</button>;
    </div>
  );
};
export default Carousel;
