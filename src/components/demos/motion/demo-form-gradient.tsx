"use client";

import type { FormEvent } from "react";

import { clx } from "@/lib/utils/clx/clx-merge";
import { STYLES } from "@/components/ui/_shared";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Flex2, FlexCol } from "@/components/ui/containers";
import { BottomGradient, ButtonGradient } from "@/components/ui/form-gradient";
import { Input } from "@/components/ui/input-motion";
import { Label } from "@/components/ui/label-motion";

// TODO UI

export default function FormGradientDemo() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Form submitted");
  };

  const LabelInputContainer = clx.div(STYLES.FLEX_COL, "gap-2");

  return (
    <Card>
      <CardTitle>Welcome</CardTitle>
      <CardDescription>
        Login if you can because we don&apos;t have a login flow yet
      </CardDescription>

      <form className="my-8" onSubmit={handleSubmit}>
        <FlexCol className="mb-4 space-y-2 md:flex-row md:space-x-2 md:space-y-0">
          <Flex2 className="w-full">
            <LabelInputContainer>
              <Label htmlFor="firstname">First name</Label>
              <Input id="firstname" placeholder="Maxime" type="text" />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname">Last name</Label>
              <Input id="lastname" placeholder="Montfort" type="text" />
            </LabelInputContainer>
          </Flex2>
        </FlexCol>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="maximemontfort.pro@gmail.com" type="email" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <Input id="password" placeholder="••••••••" type="password" />
        </LabelInputContainer>

        <ButtonGradient type="submit">
          Sign up &rarr;
          <BottomGradient />
        </ButtonGradient>
      </form>
    </Card>
  );
}
