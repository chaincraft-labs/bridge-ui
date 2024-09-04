import { type IconProps, SvgIcon } from "@/components/icons/_iconShared";

export default function MoonIcon({ className, ...props }: IconProps) {
  return (
    <SvgIcon className={className} {...props}>
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </SvgIcon>
  );
}
