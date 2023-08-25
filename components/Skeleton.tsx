import { Skeleton } from "@/components/ui/skeleton";

const SkeletonPlaceHolder = () => {
  return (
    <div className="">
      {[1, 2, 3, 4, 5, 6].map((e) => (
        <div key={e} className="flex gap-2 max-w-[1200px] mx-auto px-4">
          <Skeleton className="w-[20px] h-[20px] rounded-full mb-4" />
          <Skeleton className="w-[20px] h-[20px] rounded-full" />
          <Skeleton className="w-[1000px] h-[20px] rounded-full" />
          <Skeleton className="w-[100px] h-[20px] rounded-full" />
        </div>
      ))}
      {/* <div className="flex items-center justify-center gap-10">
        <Skeleton className="w-[20px] h-[20px] rounded-md" />
        <Skeleton className="w-[20px] h-[20px] rounded-md" />
        <Skeleton className="w-[20px] h-[20px] rounded-md" />
        <Skeleton className="w-[20px] h-[20px] rounded-md" />
      </div> */}
    </div>
  );
};

export default SkeletonPlaceHolder;
