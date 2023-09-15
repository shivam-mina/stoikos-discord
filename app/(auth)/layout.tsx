const authLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-indigo-200 h-full flex items-center justify-center ">
      {children}
    </div>
  )
}

export default authLayout
