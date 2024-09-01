'use client'
import MoreInf from "./moreInf";
import SetProduct from "./setProduct";
import { GlobalProvider } from "./store";
import Table_Product from "./table";

export default function Form_Product(){
    return(
        <GlobalProvider>
            <div className="w-full max-w-7xl mx-auto flex flex-col gap-4 pt-10">
                <MoreInf/>
                <SetProduct/>
                <Table_Product/>
            </div>
        </GlobalProvider>
    )
}