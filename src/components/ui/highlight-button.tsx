import { clx } from '@/lib/utils/clx/clx-merge';

const baseStyle ="px-3 py-1 font-normal w-full text-center transition-all duration-500 bg-[length:200%] hover:bg-[position:right_center] rounded";
const textColors = "text-zinc-900 dark:text-zinc-100"
const backgroundGradientColors = "bg-gradient-to-r from-zinc-200 via-zinc-100 to-zinc-200 dark:from-zinc-900 dark:via-zinc-700 dark:to-zinc-900"
const borderColors = "border border-zinc-300/80 dark:border-zinc-700/80"  
const HighlightButton = clx.button(`${baseStyle} ${textColors} ${borderColors} ${backgroundGradientColors}`)

export default HighlightButton