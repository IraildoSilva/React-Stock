import { Skeleton } from '@/components/ui/skeleton'

export default function SkeletonGroup() {
  return (
    <>
      <div className="flex items-center justify-between gap-6">
        <Skeleton className="w-full h-36" />
        <Skeleton className="w-full h-36" />
        <Skeleton className="w-full h-36" />
        <Skeleton className="w-full h-36" />
      </div>

      <div className="flex justify-center gap-6 mt-6">
        <div className="flex flex-col gap-2 flex-grow">
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-60" />
        </div>
        <div className="flex flex-col gap-2 flex-grow">
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-60" />
        </div>
      </div>
    </>
  )
}
