"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllTokens } from "@/context/bridge";
import { TokenType } from "@/context/types";


/**
 * A reusable select component for selecting tokens.
 *
 * @param {function} onChange - Callback function to handle token selection change.
 * @param {string} className - Class name for the select trigger.
 * @param {string} classNameContent - Class name for the select content.
 * @param {string} value - Currently selected token value.
 * @param {string} placeholder - Placeholder text for the select input.
 * @return {JSX.Element} A select component with token options.
 */
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
          <SelectItem key={token.tokenSymbol} value={token.tokenSymbol} className={classNameContent}>
          {token.tokenSymbol}
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
