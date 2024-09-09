'use client'
import Table_Product from "./components/table"
import { FormProducts } from "./components/formProducts";

export default function Form_Product(){
    return(
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-4 py-10 px-4">
            <FormProducts/>
            <Table_Product/>
        </div>
    )
}