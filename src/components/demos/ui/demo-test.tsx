"use client"

import { TokenType, UserBalancesType } from "@/context/types";
import { ChangeEvent, useState } from "react";
import { Evaluate } from "viem/_types/types/utils";
import { useAccountEffect } from "wagmi";
import { GetAccountReturnType } from "wagmi/actions";


type FormData = {
  token: undefined | string;
  amount: number;
}

const Test = () => {
  const [chainId, setChainId] = useState(0)
  const [userBalances, setUserBalances] = useState<UserBalancesType>({})
  const [tokens, setTokens] = useState<TokenType[]>([])
  const [formData, setFormData] = useState<FormData>({
    token: undefined,
    amount: 0,
  });
 
  const handleChangeOnSelect = (value: any) => {
    console.log(value)
    setFormData({
      ...formData,
      token: value
    });
  };

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log('submitting', formData);
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    console.log("change : ", name, value)
    setFormData({
      ...formData,
      amount: Number(value)
    });
  }




  const connect = (
    data: Evaluate<Pick<Extract<GetAccountReturnType, {status: "connected";}>, "address" | "addresses" | "chain" | "chainId" | "connector"> & { isReconnected: boolean; }>
  ) => {
    setChainId(data?.chain?.id ?? 0)
  }

  const disconnect = () => {}

  useAccountEffect({
    onConnect(data) {
      connect(data);
      // getUserBalances(data.address).then((balances) => setUserBalances(balances))
    },
    onDisconnect() {
      disconnect()
    },
  })

  // const handleGetTokens = () => {
  //   getAllTokens()
  //     .then((tokens) => { setTokens(tokens) })
  //     .catch(err => { console.log("error : ", err) })
  // }

  // useEffect(() => {
  //   handleGetTokens()
  // }, [])

    return (
      <div className="space-y-10">
        Hello world
        {/* <form onSubmit={onSubmit}>
          <SelectTokens 
            value={formData.token ?? "Select Token"}
            onChange={handleChangeOnSelect}
            className="w-full px-3 py-12 text-xl text-teal-400 dark:text-teal-200" 
            classNameContent="text-xl"/>

          <Input onChange={handleChange} id="amount" name="amount" 
              value={formData.amount === 0 ? "" : formData.amount}
              placeholder="0" type="number" 
              className="rounded-lg text-3xl px-2 pt-16 pb-8 relative min-w-[170px] text-teal-400 dark:text-teal-200"/>
        
        <button type="submit">Submit</button>
        </form> */}
      </div>
    );

}

export default Test
