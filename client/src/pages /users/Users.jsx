// import { dashboardCards } from "@/utils/Constant";
import { getAllUsers } from "@/api/admin";
import { DashboardCardSkeleton } from "@/components/Skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Funnel } from "lucide-react";
import { useSearchParams } from "react-router";
import usePaginate from "@/hooks/usePaginate";
import Paginate from "@/components/Paginate";
import UsersTable from "./UsersTable";
import Filter from "@/components/Filter";

export default function Users() {
  const { accessToken } = useAuth();
  const [searchParams] = useSearchParams();
  const { isPending, isError, error, data } = useQuery({
    queryKey: ["getAllUsers", searchParams.toString()],
    queryFn: () => getAllUsers(searchParams, accessToken),
  });

  const { users, pagination, totalUsers, recentUsers } = data?.data?.data || {};


  const { handlePageChange, totalPages, hasMore, currentPage } = usePaginate({
    totalPages: pagination?.totalPages || 1,
    hasMore: pagination?.hasMore || false,
    currentPage: pagination?.page || 1,
  });

  return (
    <div className=" container mx-auto text-white px-6">
      <div className="">
        <h1 className="text-3xl mt-6">Users</h1>
      </div>
      <div className="mt-10 mb-10 grid md:grid-cols-12 gap-8 ">
        <div className=" md:col-span-6 border-0 px-3 rounded-3xl bg-[#897527]">
          <div className="flex  gap-3 items-center pt-4">
            <div className="border w-14 h-14 p-2 rounded-full bg-white">
              <img src="/users.png" alt="" className="w-full " />
            </div>
            <div>
              <h1 className="text-2xl">Total Users</h1>
            </div>
          </div>
          <div className="pt-5 pb-4 text-4xl font-semibold">{totalUsers}</div>
        </div>
        <div className=" md:col-span-6  border-0 px-3 rounded-3xl bg-[#7C4191]">
          <div className="flex  gap-3 items-center pt-4">
            <div className="border w-14 h-14 p-2 rounded-full bg-white">
              <img src="/users.png" alt="" className="w-full " />
            </div>
            <div>
              <h1 className="text-2xl">Recent Users</h1>
            </div>
          </div>
          <div className="pt-5 pb-4 text-4xl font-semibold">{recentUsers}</div>
        </div>
      </div>

      {isPending ? (
        <DashboardCardSkeleton />
      ) : isError ? (
        <div role="alert" className="alert alert-error alert-soft">
          <span>
            Error!{" "}
            {error?.response?.data?.message ||
              error?.response?.data ||
              "Failed to fetch user"}
          </span>
        </div>
      ) : (
        <div>
          <UsersTable UsersActivities={users} />
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
