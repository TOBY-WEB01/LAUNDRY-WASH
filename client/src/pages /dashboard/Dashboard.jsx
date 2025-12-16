// import { dashboardCards } from "@/utils/Constant";
import { dashboardStats } from "@/api/admin";
import { DashboardCardSkeleton } from "@/components/Skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Funnel } from "lucide-react";
import { useSearchParams } from "react-router";
import DashboardTable from "./DashboardTable";
import { formatCurrency } from "@/utils/Constant";
import usePaginate from "@/hooks/usePaginate";
import Paginate from "@/components/Paginate";
import Filter from "./Filter";


export default function Dashboard() {
  const { accessToken } = useAuth();
  const [searchParams] = useSearchParams();
  const { isPending, isError, error, data } = useQuery({
    queryKey: ["dashboardStats", searchParams.toString()],
    queryFn: () => dashboardStats(searchParams, accessToken),
  });

  const {
    ordersCount,
    usersCount,
    paymentTotal,
    recentActivities,
    pagination,
  } = data?.data?.data || {};


  

  const { handlePageChange, totalPages, hasMore, currentPage } = usePaginate({
    totalPages: pagination?.totalPages || 1,
    hasMore: pagination?.hasMore || false,
    currentPage: pagination?.page || 1,
  });

  return (
    <div className=" container mx-auto px-6">
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
            <div className="lg:col-span-4 md:col-span-6 border-0 px-3 rounded-3xl bg-[#897527]">
              <div className="flex  gap-3 items-center pt-4">
                <div className="border w-14 h-14 p-2 rounded-full bg-white">
                  <img src="public/cart.png" alt="" className="w-full " />
                </div>
                <div>
                  <h1 className="text-2xl">Orders</h1>
                </div>
              </div>
              <div className="pt-5 pb-4 text-4xl font-semibold">
                {ordersCount}
              </div>
            </div>
            <div className="lg:col-span-4 md:col-span-6  border-0 px-3 rounded-3xl bg-[#7C4191]">
              <div className="flex  gap-3 items-center pt-4">
                <div className="border w-14 h-14 p-2 rounded-full bg-white">
                  <img src="public/users.png" alt="" className="w-full " />
                </div>
                <div>
                  <h1 className="text-2xl">Users</h1>
                </div>
              </div>
              <div className="pt-5 pb-4 text-4xl font-semibold">
                {usersCount}
              </div>
            </div>
            <div className="lg:col-span-4 md:col-span-6  border-0 px-3 rounded-3xl bg-[#43868A]">
              <div className="flex  gap-3 items-center pt-4">
                <div className="border w-14 h-14 p-2 rounded-full bg-white">
                  <img src="public/banknote.png" alt="" className="w-full " />
                </div>
                <div>
                  <h1 className="text-2xl">Revenue</h1>
                </div>
              </div>
              <div className="pt-5 pb-4 text-4xl font-semibold">
                {formatCurrency(paymentTotal)}
              </div>
            </div>
          </div>
          <div className="my-10 flex items-center justify-between">
            <p>Recent Activites</p>
            <div>
              <Filter/>
            </div>
          </div>
          <DashboardTable recentActivities={recentActivities} />
          <Paginate
            totalPages={totalPages}
            hasMore={hasMore}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            totalItem={pagination?.total}
          />
        </div>
      )}
    </div>
  );
}
