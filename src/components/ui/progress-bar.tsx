"use client";

import { useEffect, useRef, useState } from "react";
import useWindowSize from "@/components/hooks/use-window-size";

type OffsetLeftType = {
  [key: number]: HTMLDivElement | null
}


/**
 * A customizable progress bar component that displays a series of steps with corresponding labels.
 * The component can be controlled by passing a status value, which determines the current step.
 * The appearance of the component can be customized by passing various color props.
 *
 * @param {number[]} data - An array of numbers representing the steps in the progress bar.
 * @param {any} dataLabels - An object containing labels for each step in the progress bar.
 * @param {number} [status=0] - The current status of the progress bar.
 * @param {string} [colorCircleOuterBackground="bg-zinc-100 dark:bg-zinc-800"] - The background color of the outer circle.
 * @param {string} [colorCircleBackground="bg-zinc-200 dark:bg-zinc-700"] - The background color of the inner circle.
 * @param {string} [colorCircleSelectedBackground="bg-teal-200 dark:bg-teal-200 dark:text-zinc-900"] - The background color of the selected circle.
 * @param {string} [colorBarActiveBackground="bg-gradient-to-r from-cyan-400 to-purple-600"] - The background color of the active progress bar.
 * @param {string} [colorBarBackground="bg-zinc-200 dark:bg-zinc-700"] - The background color of the progress bar.
 * @return {JSX.Element} The progress bar component.
 */
const ProgressBar = (
  {
    data, 
    dataLabels,
    status = 0,
    colorCircleOuterBackground = "bg-zinc-100 dark:bg-zinc-800",
    colorCircleBackground = "bg-zinc-200 dark:bg-zinc-700",
    colorCircleSelectedBackground = "bg-teal-200 dark:bg-teal-200 dark:text-zinc-900",
    colorBarActiveBackground = "bg-gradient-to-r from-cyan-400 to-purple-600",
    colorBarBackground = "bg-zinc-200 dark:bg-zinc-700",
  }: {
    data: number[], 
    dataLabels: any,
    status?: number,
    colorCircleOuterBackground?: string,
    colorCircleBackground?: string,
    colorCircleSelectedBackground?: string,
    colorBarActiveBackground?: string,
    colorBarBackground?: string,
  }
): JSX.Element => {
  const { width, height } = useWindowSize();
  const [barWidthSize, setBarWidthSize] = useState("0px")
  const refs = useRef<OffsetLeftType>({});
  const OFFSET = 6
  
  
  /**
   * Handles the progress of the progress bar by updating the bar width size based on the given status.
   *
   * @param {number} status - The current status of the progress bar.
   * @return {void}
   */
  const handleProgress = (status: number) => {
    if (data.slice(0, -1).includes(status)) {
      const element = refs.current[status];
      
      if (element) {
        const offsetLeftValue = element.offsetLeft + OFFSET;
        const value = `${offsetLeftValue}px`;
        setBarWidthSize(value)
      }
    } else if (status === data[data.length - 1]) {
      const value = `100%`;
      setBarWidthSize(value)
    } else {
      setBarWidthSize("0px")
    }
  }


  useEffect(() => {
    if (typeof window !== "undefined") { 
      handleProgress(status)
    }
  }, [status, width, height]);

  
  return (
    <div className="relative text-xs md:text-base">
      {/* progress bar */}
      <div className={`absolute h-2 md:h-3 overflow-hidden ${colorBarBackground} w-full rounded-full`}>
        <div className={`transition-all duration-1000 h-2 md:h-3 rounded-full ${colorBarActiveBackground}`} style={{ width: `${barWidthSize}` }}></div>
      </div>

      {/* circles & labels */}
      <div className="absolute flex justify-evenly inset-0 top-[-9px] md:top-[-12px]">
        {data.map((statusID) => (
          <div 
            ref={(el) => {refs.current[statusID] = el}}
            key={statusID} 
            className={`relative group h-7 w-7 md:h-9 md:w-9 ${colorCircleOuterBackground} rounded-full flex items-center justify-center`}
          >
            {/* Labels */}
            <div 
              key={`label-status-${statusID}`} 
              className={`absolute top-full mt-1 ${dataLabels[statusID].length > 20 ? 'w-32 ': ''} h-fit ${statusID > 7 ? '-ml-12': ''} p-2 w-fit ${colorBarBackground} rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300`}>
                {dataLabels[statusID]}
            </div>
            
            {/* circles */}
            <div
              key={`progress-bar-status-${statusID}`}               
              className={`transition-all duration-1000 cursor-pointer flex items-center justify-center h-6 w-6 md:h-8 md:w-8 rounded-full ${status === statusID ?colorCircleSelectedBackground : colorCircleBackground} `}
            >
              {statusID}
            </div>
          </div>
        ))}        
      </div>
    </div>
  );
};

export default ProgressBar

