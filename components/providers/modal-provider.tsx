"use client"

import { CreateServerModal } from "@/components/modals/create-server-modal"
import { InviteModal } from "../modals/invite-modal"

import { useEffect, useState } from "react"

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])
  if (!isMounted) {
    return null
  }
  /** the above code prevents modal to be rendered on server side
   * --avoid Consistency i.e. Hydration error */
  return (
    <>
      <CreateServerModal />
      <InviteModal />
    </>
  )
}
