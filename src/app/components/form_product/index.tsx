'use client'
import { useState } from "react";
import SetProduct from "./setProduct";
import Table_Product from "./table";
import { Iproduct } from "./interface";

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
        state.map((product, index)=>{
            if(product.id === id){
                state.splice(index, 1)
                const newArray = new Array(...state)
                localStorage.setItem("products",JSON.stringify(newArray))
                setState(newArray)
            }
        })

    }
    console.log("render index")

    return(
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-4 py-10 px-4">
            <SetProduct stateData={state} addProduct={addProduct}/>
            <Table_Product stateData={state} removeProduct={removeProduct}/>
        </div>
    )
}