import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "@radix-ui/react-icons"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns"
import { cn } from "@/lib/utils";
import { useProductsStore } from "../store/store";

export const DateField = ({id}:{id:string}) =>{
    const [stateDate, setStateDate] = useState<any>()

    const useStore = useProductsStore()
    useMemo(()=>{
        let date_span = document.querySelector(`#${id} > span`)
        if(date_span?.classList.contains("clear-date")){
            setStateDate(undefined)
        }
    },[useStore])

    return(
        <Popover>
            <PopoverTrigger asChild>
                <Button
                id={id}
                variant={"outline"}
                className={cn(
                    "w-full justify-start text-left font-normal",
                    !stateDate && "text-muted-foreground"
                )}
                >
                <CalendarIcon className="mr-2 h-4 w-4" />
                
                {stateDate ? <span>{format(stateDate, "dd/MM/yyyy")}</span> : <span>Selecione uma data</span>}
                
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                mode="single"
                selected={stateDate}
                onSelect={setStateDate}
                initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}