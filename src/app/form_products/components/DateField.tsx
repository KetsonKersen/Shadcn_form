import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "@radix-ui/react-icons"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { format } from "date-fns"
import { cn } from "@/lib/utils";

export const DateField = ({id}:{id:string}) =>{
    const [stateDate, setStateDate] = useState<any>()
    return(
        <Popover>
            <PopoverTrigger asChild>
                <Button
                variant={"outline"}
                className={cn(
                    "w-full justify-start text-left font-normal",
                    !stateDate && "text-muted-foreground"
                )}
                >
                <CalendarIcon className="mr-2 h-4 w-4" />
                
                {stateDate ? <span id={id}>{format(stateDate, "dd/MM/yyyy")}</span> : <span>Selecione uma data</span>}
                
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