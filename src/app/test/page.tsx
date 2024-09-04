import BoxTxDetail from "@/components/ui/box-tx-detail";
import ProgressBar from "@/components/ui/progress-bar";
import { OperationStatusLabels } from "@/constants";

const Page = () => {
  
  return (
    <>
      <div className='flex flex-col gap-2 mt-4 p-0'>

        <div className='w-full h-16 py-4 p-2 rounded bg-zinc-100 dark:bg-zinc-800'>
          <ProgressBar 
            data={[1, 2, 3, 4, 5, 6, 7, 8]}
            dataLabels={OperationStatusLabels}
            status={5}
          />
        </div>
        
        <div className='w-full p-2 mt-5'>
          <BoxTxDetail txDatas={[
            {
              chainId: 440,
              txHash: '0xd0498f2cfdaa5ab7a37de39a19cdd18bec7742cd0e6b9d0884280ce95c944de5',
              label: 'deposit asset'
            },
            {
              chainId: 1337,
              txHash: '0xd0498f2cfdaa5ab7a37de39a19cdd18bec7742cd0e6b9d0884280ce95c944de5',
              label: 'deposit fees'
            }
          ]} />
        </div>

      </div>
    </>
  );
};

export default Page
