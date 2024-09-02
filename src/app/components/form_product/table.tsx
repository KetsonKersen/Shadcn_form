import { memo } from "react"
import { Button } from "@/components/ui/button"
import { Trash2 } from 'lucide-react';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import { Iproduct } from "./interface";

function Table_Product({...props}:any){
    const {stateData, removeProduct} = props

    return(
        <div className="h-[460px] flex flex-col justify-between bg-zinc-50 border-[1px] border-zinc-200 rounded-md shadow-md">
            <Table className="rounded-md bg-zinc-50 overflow-hidden">
                <TableHeader className="bg-zinc-100">
                    <TableRow>
                        <TableHead className="w-10">Ações</TableHead>
                        <TableHead className="text-center w-16">Quantidade</TableHead>
                        <TableHead className="text-center w-40">Valor unitario</TableHead>
                        <TableHead className="text-center w-40">Valor</TableHead>
                        <TableHead className="text-center w-16">Peso</TableHead>
                        <TableHead className="text-center w-10">Volume</TableHead>
                        <TableHead className="text-center w-32">Prazo minimo</TableHead>
                        <TableHead className="text-center w-32">Prazo maximo</TableHead>
                        <TableHead className="text-center ">Descrição</TableHead>
                    </TableRow>
                </TableHeader >
                <TableBody>

                    {stateData.reverse().map((product:Iproduct)=>{
                        const {id,quantidade,valor_uni,valor_total,peso,volume,prazo_min,prazo_max,descricao} = product
                        return(
                            <TableRow key={id}>
                                <TableCell>
                                    <Button onClick={()=>removeProduct(id)} className="w-8 h-8 p-2"><Trash2 size={16}/></Button>
                                </TableCell>
                                <TableCell>{quantidade}</TableCell>
                                <TableCell>{valor_uni}</TableCell>
                                <TableCell>{valor_total}</TableCell>
                                <TableCell>{peso}</TableCell>
                                <TableCell>{volume}</TableCell>
                                <TableCell>{prazo_min}</TableCell>
                                <TableCell>{prazo_max}</TableCell>
                                <TableCell>{descricao}</TableCell>
                            </TableRow>
                        )
                    })}
                
                </TableBody>
            </Table>
            {/* <div className="flex items-center justify-between">
                <p>Total de produtos cadastrados: {stateData.length}</p>
                <div className="flex gap-4">
                    <Button>Voltar</Button>
                    <Button>Proximo</Button>
                </div>
            </div> */}
        </div>
    )
}
export default memo(Table_Product)
