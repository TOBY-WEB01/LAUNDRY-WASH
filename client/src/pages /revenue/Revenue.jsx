import { getOrdersRevenue } from "@/api/admin";
import Filter from "@/components/Filter";
import { DashboardCardSkeleton } from "@/components/Skeleton";
import { useAuth } from "@/hooks/useAuth";
import usePaginate from "@/hooks/usePaginate";
import { formatCurrency } from "@/utils/Constant";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import RevenueTable from "./RevenueTable";
import Paginate from "@/components/Paginate";

export default function Revenue() {
  const { accessToken } = useAuth();
  const [searchParams] = useSearchParams();
  const { isPending, isError, error, data } = useQuery({
    queryKey: [" getOrdersRevenue", searchParams.toString()],
    queryFn: () => getOrdersRevenue(searchParams, accessToken),
  });

  const {
    isPaidTotal,
    totalRevenue,
    getPayDelivery,
    getPayPaystack,
    getPayments,
    pagination,
  } = data?.data?.data || {};



  

    const { handlePageChange, totalPages, hasMore, currentPage } = usePaginate({
      totalPages: pagination?.totalPages || 1,
      hasMore: pagination?.hasMore || false,
      currentPage: pagination?.page || 1,
    });
  return ( <div className=" container mx-auto text-white px-6">
        <div className="">
          <h1 className="text-3xl mt-6">Dashboard</h1>
        </div>
        {isPending ? (
          <DashboardCardSkeleton />
        ) : isError ? (
          <div role="alert" className="alert alert-error alert-soft">
            <span>
              Error!{" "}
              {error?.response?.data?.message ||
                error?.response?.data ||
                "Failed to fetch data"}
            </span>
          </div>
        ) : (
          <div>
            <div className="mt-10 grid md:grid-cols-12 gap-8 ">
              <div className="lg:col-span-3 md:col-span-6 border-0 px-3 rounded-3xl bg-[#897527]">
                <div className="flex  gap-3 items-center pt-4">
                  <div className="border w-14 h-14 p-2 rounded-full bg-white">
                    <img src="/public/cart.png" alt="" className="w-full " />
                  </div>
                  <div>
                    <h1 className="text-2xl">Total</h1>
                  </div>
                </div>
                <div className="pt-5 pb-4 text-4xl font-semibold">
                  {formatCurrency (isPaidTotal)}
                </div>
              </div>
              <div className="lg:col-span-3 md:col-span-6  border-0 px-3 rounded-3xl bg-[#7C4191]">
                <div className="flex  gap-3 items-center pt-4">
                  <div className="border w-14 h-14 p-2 rounded-full bg-white">
                    <img src="/users.png" alt="" className="w-full " />
                  </div>
                  <div>
                    <h1 className="text-2xl">Total Revenue </h1>
                  </div>
                </div>
                <div className="pt-5 pb-4 text-4xl font-semibold">
                  {formatCurrency (totalRevenue)}
                </div>
              </div>
              <div className="lg:col-span-3 md:col-span-6  border-0 px-3 rounded-3xl bg-[#43868A]">
                <div className="flex  gap-3 items-center pt-4">
                  <div className="border w-14 h-14 p-2 rounded-full bg-white">
                    <img src="/banknote.png" alt="" className="w-full " />
                  </div>
                  <div>
                    <h1 className="text-2xl">Pay on Delivery</h1>
                  </div>
                </div>
                <div className="pt-5 pb-4 text-4xl font-semibold">
                   {formatCurrency (getPayDelivery)}
                </div>
              </div>
              <div className="lg:col-span-3 md:col-span-6  border-0 px-3 rounded-3xl bg-red-500">
                <div className="flex  gap-3 items-center pt-4">
                  <div className="border w-14 h-14 p-2 rounded-full bg-white">
                    <img src="/banknote.png" alt="" className="w-full " />
                  </div>
                  <div>
                    <h1 className="text-2xl">Canceled </h1>
                  </div>
                </div>
                <div className="pt-5 pb-4 text-4xl font-semibold">
                    {formatCurrency ( getPayPaystack)}
                </div>
              </div>
            </div>
            <div className="my-10 flex items-center justify-between">
              <p>Recent Activites</p>
             
           
            </div>
            <RevenueTable payments={getPayments} />
            <Paginate
              totalPages={totalPages}
              hasMore={hasMore}
              handlePageChange={handlePageChange}
              currentPage={currentPage}
              totalItem={pagination?.total}
            />
          </div>
        )}
      </div>)
}
