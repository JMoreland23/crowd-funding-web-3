import React, { useContext, createContext } from 'react'
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract('0x42bD5C738c6852d02Ac9001A26b8F9200737cE92');
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
       <StateContextProvider
        value={{ 
            address,
            contract,
            createCampaign: publishCampaign,
        }}
       >
            {children}
       </StateContextProvider> 
    )
}

export const useStateContext = () => useContext(StateContext);