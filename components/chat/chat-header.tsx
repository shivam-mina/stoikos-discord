import { Hash } from "lucide-react"
import { MenuToggle } from "../mobile-toggle"

interface ChatHeaderProps {
  serverId: string
  name: string
  type: "channel" | "conversation"
  imageUrl?: string
}
export const ChatHeader = ({
  serverId,
  name,
  type,
  imageUrl,
}: ChatHeaderProps) => {
  return (
    <div
      className="text-md font-semibold px-3 flex items-center h-12
   border-neutral-200 dark:border-neutral-800 border-b-2"
    >
      <MenuToggle serverId={serverId} />
      {type === "channel" && (
        <Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
      )}
      <p className="font-semibold text-black dark:text-white text-md px-0.5">
        {name}
      </p>
    </div>
  )
}
