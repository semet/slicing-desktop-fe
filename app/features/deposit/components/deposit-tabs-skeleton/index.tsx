export const DepositTabsSkeleton = () => {
  return (
    <div className="flex w-full gap-2">
      <div className="flex min-w-72 flex-col items-start rounded-md bg-gray-300 p-4 text-white">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="w-full text-start outline-none"
          >
            <div className="flex w-full animate-pulse cursor-pointer items-center gap-2 px-4 py-2">
              <div className="h-6 w-6 rounded-full bg-gray-400" />
              <div className="h-4 w-32 rounded-md bg-gray-400" />
            </div>
          </div>
        ))}
      </div>
      <div className="flex-1 animate-pulse">
        <div className="grid h-40 grid-cols-2 gap-4 rounded-md bg-gray-300 p-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-10 rounded-md bg-gray-400"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
