import { PlaceholderPattern } from "@/components/ui/placeholder-pattern";
import { ReactNode } from "react";
import { ButtonDelete } from "@/components/button-delete";
import { destroy } from "@/routes/computer";
import { Computers } from "@/types/entity";

type ProsComputerCard = {
    isAdmin : boolean
    computers: Computers[]
    childComponent?: ReactNode
}

export const ComputerCard: React.FC<ProsComputerCard> = ({ isAdmin, computers, childComponent}) => {
    return(
        <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">

                {computers.map((computer) => (
                    <div
                        key={computer.id}
                        className="relative aspect-video  rounded-xl border border-sidebar-border/70 dark:border-sidebar-border"
                    >
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />

                        {isAdmin && 
                            (<div className="absolute bottom-1 right-2 z-10">
                                <ButtonDelete url={destroy.url(computer.id)} />
                            </div>)
                        }
                    </div>
                ))}

                {isAdmin && childComponent}

            </div>
        </div>

    );
}