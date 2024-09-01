import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Trash2 } from 'lucide-react';
import { useContext } from "react";
import { GlobalContext } from "./store";

interface IFormInput {
    id:number;
    quantidade: String;
    valor_uni: String;
    peso: String;
    volume: String;
    valor_total: String;
    descricao: String;
    prazo_min: String;
    prazo_max: String;
  }


export default function Table_Product(){
    const {state, removeProduct} = useContext<any>(GlobalContext)
    return(
        <Table>
            <TableHeader className="bg-zinc-100">
                <TableRow>
                    <TableHead className="w-10">Ações</TableHead>
                    <TableHead>Quantidade</TableHead>
                    <TableHead>Valor unitario</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Peso</TableHead>
                    <TableHead>Volume</TableHead>
                    <TableHead>Prazo minimo</TableHead>
                    <TableHead>Prazo maximo</TableHead>
                    <TableHead>Descrição</TableHead>
                </TableRow>
            </TableHeader >
            <TableBody >
                {state?.map((item:IFormInput)=>{
                    const {id,quantidade,valor_uni,valor_total,peso,volume,prazo_min,prazo_max,descricao} = item
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
    )
}
