"use client"

import ProgressBar from "@/components/ui/progress-bar";
import { OperationStatusLabels } from "@/constants";
import { useState } from "react";

const Page = () => {
  const [status, setStatus] = useState(0)
  

  return (
    <>
      <div className='flex flex-col gap-2 mt-4 p-0'>

        <div className="p-1">
          <div className="p-1"> Progress bar</div>
          <input 
            type="number" 
            placeholder="Enter number" 
            className="w-full p-2 rounded bg-zinc-100 dark:bg-zinc-700" 
            onChange={(e) => setStatus(Number(e.target.value))}
          />

          <div className='mt-1 w-full h-16 py-4 p-2 rounded bg-zinc-100 dark:bg-zinc-800'>
            <ProgressBar 
              data={[1, 2, 3, 4, 5, 6, 7, 8]}
              dataLabels={OperationStatusLabels}
              status={status}
            />
          </div>
        </div>
        
      </div>
    </>
  );
};

export default Page