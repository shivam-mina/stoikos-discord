"use client"

import axios from "axios"
import qs from "query-string"
import { useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { useModal } from "@/hooks/use-modal-store"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export const DeleteChannelModal = () => {
  const router = useRouter()
  const { isOpen, onClose, type, data } = useModal()

  const isModalOpen = isOpen && type === "deleteChannel"
  const { server, channel } = data

  const [isLoading, setIsLoading] = useState(false)

  const onConfirm = async () => {
    try {
      setIsLoading(true)
      const url = qs.stringifyUrl({
        url: `/api/channels/${channel?.id}`,
        query: {
          serverId: server?.id,
        },
      })
      await axios.delete(url)
      onClose()
      router.refresh()
      router.push(`/servers/${server?.id}`)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Delete channel
          </DialogTitle>
          <DialogDescription className="text-zinc-500 text-center">
            Are you sure you want to delete this channel{" "}
            <span className="font-semibold text-indigo-500">
              #{channel?.name}?
            </span>
            <br />
            <div className="text-rose-500 font-semibold mt-4">
              All data will be lost
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 py-4 px-6">
          <div className="flex items-center justify-between w-full ">
            <Button disabled={isLoading} variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              variant="destructive"
              onClick={onConfirm}
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
