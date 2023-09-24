"use client"

import { cn } from "@/lib/utils"
import { Member, MemberRole, Profile, Server } from "@prisma/client"
import { ShieldAlert, ShieldCheck } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import UserAvatar from "../user-avatar"

interface ServerMemberProps {
  member: Member & { profile: Profile }
  server: Server
}

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MOD]: <ShieldCheck className="text-indigo-500 mr-2 h4 w-4" />,
  [MemberRole.ADMIN]: <ShieldAlert className="text-red-500 mr-2 h4 w-4" />,
}
export const ServerMember = ({ member, server }: ServerMemberProps) => {
  const router = useRouter()
  const params = useParams()

  const icon = roleIconMap[member.role]
  return (
    <button
      className={cn(
        "group px-2 py-2 rounded-md flex items-center mb-1 w-full gap-x-2 hover:bg-zinc-700/10  dark:hover:bg-zinc-700/50 transition",
        params?.memberId === member.id && "bg-zinc-700/20 dark:bg-zinc-700"
      )}
    >
      <UserAvatar
        src={member.profile.imageURL}
        classname="h-8 w-8 md:h-8 md:w-8"
      />
      <p
        className={cn(
          "font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
          params?.memberId === member.id &&
            "text-primary dark:text-zinc-200 dark:group-hover:text-white"
        )}
      >
        {member.profile.name}
      </p>
      {icon}
    </button>
  )
}
