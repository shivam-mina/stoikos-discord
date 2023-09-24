import { UserButton } from "@clerk/nextjs"
import { redirect } from "next/navigation"

import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"
import NavigationAction from "@/components/navigation/navigation-action"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ModeToggle } from "@/components/mode-toggle"
import NavigationItem from "./navigation-item"

const NavigationSidebar = async () => {
  const profile = await currentProfile()
  if (!profile) return redirect("/")

  const servers = await db.server.findMany({
    where: {
      members: {
        some: { profileId: profile.id },
      },
    },
  })
  return (
    <div className="flex flex-col items-center h-full w-full text-primary space-y-4 bg-[#E3E5E8] dark:bg-[#1E1F22] py-3">
      <NavigationAction />
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
      <ScrollArea className="flex-1 w-full">
        {servers.map((server) => (
          <div key={server.id} className="mb-4">
            <NavigationItem
              id={server.id}
              name={server.name}
              imageUrl={server.imageURL}
            />
          </div>
        ))}
      </ScrollArea>
      <div className="pb-3 mt-auto items-center flex flex-col gap-y-4">
        <ModeToggle />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-[48px] w-[48px]",
            },
          }}
        />
      </div>
    </div>
  )
}

export default NavigationSidebar
