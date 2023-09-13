import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"
import { ChannelType } from "@prisma/client"
import { redirect, useParams } from "next/navigation"
import ServerHeader from "./server-header"

interface ServerSidebarProps {
  serverId: string
}
const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
  const profile = await currentProfile()
  if (!profile) {
    redirect("/")
  }
  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  })
  if (!server) return redirect("/")
  // Filtering the data
  const textChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  )
  const audioChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  )
  const videoChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  )
  const members = server?.members.filter(
    (member) => member.profileId !== profile.id
  )
  const role = server.members.find(
    (member) => member.profileId === profile.id
  )?.role
  return (
    <div className="flex h-full flex-col text-primaty w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <ServerHeader server={server} role={role} />
    </div>
  )
}

export default ServerSidebar