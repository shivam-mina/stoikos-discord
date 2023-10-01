import { Hash, Mic, Video } from "lucide-react"
import { MenuToggle } from "../mobile-toggle"
import { ChannelType } from "@prisma/client"
import UserAvatar from "../user-avatar"
import { SocketIndicator } from "../socket-indicator"

const channelIconMap = {
  [ChannelType.TEXT]: (
    <Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
  ),
  [ChannelType.AUDIO]: (
    <Mic className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
  ),
  [ChannelType.VIDEO]: (
    <Video className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
  ),
}
interface ChatHeaderProps {
  serverId: string
  name: string
  type: "channel" | "conversation"
  imageUrl?: string
  channelType: ChannelType
}

export const ChatHeader = ({
  serverId,
  name,
  type,
  channelType,
  imageUrl,
}: ChatHeaderProps) => {
  const Icon = channelIconMap[channelType]
  return (
    <div
      className="text-md font-semibold px-3 flex items-center h-12
   border-neutral-200 dark:border-neutral-800 border-b-2"
    >
      <MenuToggle serverId={serverId} />
      {type === "channel" && Icon}
      {type === "conversation" && (
        <UserAvatar src={imageUrl} classname="h-8 w-8 md:h-8 md:w-8 mr-2" />
      )}
      <p className="font-semibold text-black dark:text-white text-md px-1">
        {name}
      </p>
      <div className="ml-auto flex items-center">
        <SocketIndicator />
      </div>
    </div>
  )
}
