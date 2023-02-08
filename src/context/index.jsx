import React, { useContext, createContext } from 'react'
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract('0xDA1A99f3154f61725C7BE62Ad00d47d7169B5d60');
    const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');

    const address = useAddress();
    const connect = useMetamask();

    const publishCampaign = async (form) => {
        try {
            const data = await createCampaign([
            address,
            form.title,
            form.description,
            form.target,
            new Date(form.deadline).getTime() / 1000,
            form.image
        ])

        console.log("Success", data)
        } catch (error) {
            console.log("Create a New Campaign Failed", error)
        }
    }
    
    return (
       <StateContext.Provider
        value={{ 
            address,
            contract,
            connect,
            createCampaign: publishCampaign,
        }}
       >
            {children}
       </StateContext.Provider> 
    )
}

export const useStateContext = () => useContext(StateContext);