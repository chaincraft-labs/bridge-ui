"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllTokens } from "@/context/allfeat_bridge";
import { TokenType } from "@/context/types";


export function SelectTokens({
  onChange = () => {},
  className,
  classNameContent,
  value,
  placeholder = "Tokens",
}: SelectTokensProps) {
  const [tokens, setTokens] = useState<TokenType[]>([])
  const handleGetTokens = () => {
    getAllTokens()
      .then((tokens) => { setTokens(tokens) })
      .catch(err => { console.log("error : ", err) })
  }

  useEffect(() => {
    handleGetTokens()
  }, []);

  return (
    <Select
      value={value}
      onValueChange={(value: string) => {
        onChange(value);
      }}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        <SelectItem key="select-token" value="Select Token" className={classNameContent}>
          Select Token
        </SelectItem>

        {tokens.map((token) => (
          <SelectItem key={token.tokenName} value={token.tokenName} className={classNameContent}>
          {token.tokenName}
          <div className="text-xs">{token.label}</div>
        </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

/*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
/*                          TYPES                             */
/*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

type BaseSelectProps = {
  onChange?: (value: string) => void;
  className?: string;
  classNameContent?: string;
  placeholder?: string;
  value?: string;
};

type SelectTokensProps = BaseSelectProps;
