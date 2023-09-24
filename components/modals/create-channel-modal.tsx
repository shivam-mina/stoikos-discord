"use client"

import qs from "query-string"
import * as z from "zod"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { useModal } from "@/hooks/use-modal-store"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ChannelType } from "@prisma/client"

// ui imports
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog"

import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form"

import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { useEffect } from "react"

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Channel name is required !" })
    .refine((name) => name !== "general", {
      message: "Channel name 'general' not allowed",
    }),
  type: z.nativeEnum(ChannelType),
})
export const CreateChannelModal = () => {
  /** Variables */
  const { isOpen, onClose, type, data } = useModal()
  const isModalOpen = isOpen && type === "createChannel"
  const { channelType } = data
  const router = useRouter()
  const params = useParams()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: channelType || ChannelType.TEXT,
    },
  })

  useEffect(() => {
    if (channelType) {
      form.setValue("type", channelType)
    } else {
      form.setValue("type", ChannelType.TEXT)
    }
  }, [channelType, form])
  const isLoading = form.formState.isSubmitting

  /** Functions */
  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: "/api/channels",
        query: {
          serverId: params?.serverId,
        },
      })
      await axios.post(url, values)
      form.reset()
      router.refresh()
      onClose()
    } catch (error) {
      console.log(error)
    }
  }
  const handleClose = () => {
    form.reset()
    onClose()
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Create a Channel
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            <div className="space-y-8 px-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-500 font-bold text-xs dark:text-secondary/70">
                      CHANNEL NAME
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter Channel name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-500 font-bold text-xs dark:text-secondary/70">
                      CHANNEL TYPE
                    </FormLabel>
                    <Select
                      disabled={isLoading}
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger
                          className="text-black bg-zinc-300/50 border-0 focus:ring-0
                         focus:ring-offset-0 outline-none capitalize"
                        >
                          <SelectValue
                            className="text-black"
                            placeholder="Select a channel type"
                          />
                          <SelectContent>
                            {Object.values(ChannelType).map((type) => (
                              <SelectItem
                                key={type}
                                value={type}
                                className="capitalize"
                              >
                                {type.toLowerCase()}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </SelectTrigger>
                      </FormControl>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button disabled={isLoading} variant="primary">
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
