import { clx } from '@/lib/utils/clx/clx-merge';

const baseStyle ="px-3 py-1 font-normal w-full text-center transition-all duration-500 bg-[length:200%] hover:bg-[position:right_center] rounded";
const textColors = "text-zinc-900 dark:text-zinc-100"
const backgroundColors = "bg-zinc-200 dark:bg-zinc-900"
const borderColors = "border border-zinc-300/80 dark:border-zinc-700/80"  

const FlatButton = clx.button(`${baseStyle} ${textColors} ${borderColors} ${backgroundColors}`)

export default FlatButton