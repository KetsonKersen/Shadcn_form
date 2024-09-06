'use client'
import { useState } from "react";
import SetProduct from "./setProduct";
import Table_Product from "./table";
import { Iproduct } from "./interface";
import MoreInf from "./moreInf";
import Teste from "./teste";

export default function Form_Product(){
    const data = localStorage.getItem("products")
    const [state , setState] = useState<Array<Iproduct>>(data ? JSON.parse(data) : [])

    function addProduct(product:Iproduct){
        Object.assign(product, {id: Math.floor( Math.random()*999 )})
        const newArray = new Array(...state, product)
        setState(newArray)
        localStorage.setItem("products",JSON.stringify(newArray))
    }

    function removeProduct(id:number){
        state.map((product:Iproduct, index:number)=>{
            if(product.id === id){
                state.splice(index, 1)
                const newArray = new Array(...state)
                localStorage.setItem("products",JSON.stringify(newArray))
                setState(newArray)
            }
        })
    }

    return(
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-4 py-10 px-4">
            <div className="grid grid-cols-2 gap-4">
                <SetProduct stateData={state} addProduct={addProduct}/>
                <MoreInf stateData={state}/>
            </div>
            <Table_Product stateData={state} removeProduct={removeProduct}/>
            {/* <Teste/> */}
        </div>
    )
}