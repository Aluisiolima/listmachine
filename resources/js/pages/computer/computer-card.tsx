import { PlaceholderPattern } from "@/components/ui/placeholder-pattern";
import { ReactNode } from "react";

type ProsComputerCard = {
    isAdmin : boolean
    computers: []
    childComponent?: ReactNode
}

export const ComputerCard: React.FC<ProsComputerCard> = ({ isAdmin, computers, childComponent}) => {
    return(
        <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">        
                <>    
                    {computers.map((_, index) => (
                        <div
                            key={index}
                            className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border"
                        >
                            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        </div>
                    ))}
                </>
            {isAdmin === true ? childComponent : <></>}
            </div>
        </div>
    );
}