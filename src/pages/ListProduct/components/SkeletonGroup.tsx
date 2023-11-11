import { Skeleton } from '@/components/ui/skeleton'

export default function SkeletonGroup() {
  return (
    <>
      <div className="mt-6 flex gap-4 items-center justify-start">
        <Skeleton className="w-52 h-8" />
        <div className="flex">
          <Skeleton className="w-24 h-8" />
          <Skeleton className="w-24 h-8 ml-3" />
        </div>
      </div>

      <div className="flex w-full max-w-3xl gap-4 mt-8">
        <Skeleton className="w-60 h-10" />
        <Skeleton className="w-60 h-10" />
        <Skeleton className="w-60 h-10" />
      </div>

      <Skeleton className="w-96 h-8 mt-8" />

      <div className="flex items-center justify-start gap-8">
        <Skeleton className="w-72 h-8 mt-8" />
        <Skeleton className="w-72 h-8 mt-8" />
      </div>
    </>
  )
}
