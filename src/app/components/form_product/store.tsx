import { createContext, useEffect, useMemo, useState } from "react";

export const GlobalContext = createContext({})
export const GlobalProvider = ({children}:any)=>{
    interface Iproduct{
        id: number,
        quantidade: String;
        valor_uni: String;
        peso: String;
        volume: String;
        valor_total: String;
        descricao: String;
        prazo_min: String;
        prazo_max: String;
    }
    const [state , setState] = useState<Array<Iproduct>>([])

    useMemo(()=>{
        if(!localStorage.getItem("products")){
            localStorage.setItem("products",JSON.stringify([]))
        }else{
            const data:any = localStorage.getItem("products")
            setState(JSON.parse(data))
        }
    },[setState])

    function addProduct(product:Iproduct){
        Object.assign(product, {id: Math.floor( Math.random()*999 )})
        const newArray = new Array(...state, product)
        setState(newArray)
        localStorage.setItem("products",JSON.stringify(newArray))
    }

    function removeProduct(id:number){
        state.map((product, index)=>{
            if(product.id === id){
                state.splice(index, 1)
                const newArray = new Array(...state)
                localStorage.setItem("products",JSON.stringify(newArray))
                setState(newArray)
            }
        })

    }

    return(
        <GlobalContext.Provider value={{state, setState, addProduct, removeProduct}}>{children}</GlobalContext.Provider>
    )
}