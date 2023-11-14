import { Skeleton } from '@/components/ui/skeleton'

export default function SkeletonGroup() {
  return (
    <div className="space-y-6 mt-8 max-w-xl mx-auto">
      <div>
        <Skeleton className="w-14 h-4 mb-2" />
        <Skeleton className="w-full h-10" />
      </div>
      <div>
        <Skeleton className="w-20 h-4 mb-2" />
        <Skeleton className="w-full h-10" />
      </div>
      <div>
        <Skeleton className="w-14 h-4 mb-2" />
        <Skeleton className="w-full h-10" />
      </div>
      <div>
        <Skeleton className="w-16 h-4 mb-2" />
        <Skeleton className="w-full h-10" />
      </div>
      <div>
        <Skeleton className="w-16 h-4 mb-2" />
        <Skeleton className="w-full h-16" />
      </div>
      <div>
        <Skeleton className="w-full h-10" />
      </div>
    </div>
  )
}
