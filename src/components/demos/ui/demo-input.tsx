import { FlexCol } from "@/components/ui/containers";
import { Input } from "@/components/ui/input";

export default function DemoInput() {
  return (
    <FlexCol className="max-w-[500px] gap-6">
      <Input type="email" placeholder="Email" />
      <Input id="picture" type="file" />
      <Input disabled type="email" placeholder="Disabled" />
    </FlexCol>
  );
}
