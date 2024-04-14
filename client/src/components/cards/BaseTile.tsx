type Props = {
  title?: string
  children: React.ReactNode
}

export const BaseTile = ({ title = 'Untitled', children }: Props) => {
  return (
    <div className="m-2 min-h-full min-w-40 divide-y divide-yellow-300 overflow-hidden rounded-2xl bg-gray-800 px-4 py-2 text-white transition-all">
      <div className=" text-left text-2xl font-bold">{title}</div>
      <div className="mt-1">{children}</div>
    </div>
  )
}
