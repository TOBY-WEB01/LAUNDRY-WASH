import { useState } from "react";
import { useSearchParams } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { SkeletonTable } from "@/components/Skeleton";
import Ptable from "./Ptable";
import usePaginate from "@/hooks/usePaginate";
import Paginate from "@/components/Paginate";
import { getPayments } from "@/api/payment";

export default function Payment() {
  const tabs = ["Pending", "Confirmed", "Cancelled"];
  const [searchParams, setSearchParams] = useSearchParams();
  const statusParam = (searchParams.get("status") || "active").toLowerCase();
  const initialTab =
    tabs.find((tab) => tab.toLowerCase() === statusParam) || "Active";
  const [activeTab, setActiveTab] = useState(initialTab);
  const { accessToken } = useAuth();
  const { isPending, isError, error, data } = useQuery({
    queryKey: ["getPayments", searchParams.toString()],
    queryFn: () => getPayments(searchParams, accessToken),
  });

  const { payment, pagination } = data?.data?.data || {};

  const { handlePageChange, totalPages, hasMore, currentPage } = usePaginate({
    totalPages: pagination?.totalPages || 1,
    hasMore: pagination?.hasMore || false,
    currentPage: pagination?.currentPage || 1,
  });

  const handleTabSwitch = (tabName) => {
    setActiveTab(tabName);
    setSearchParams({ status: tabName.toLowerCase(), page: 1 });
  };
  return (
    <div className="px-4">
      <div role="tablist" className="tabs tabs-bordered">
        {tabs.map((tab) => (
          <button
            key={tab}
            role="tab"
            className={`tab ${
              activeTab === tab ? "tab-active border-b border-(--purple)" : ""
            } text-white`}
            onClick={() => handleTabSwitch(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {isPending ? (
          <SkeletonTable />
        ) : isError ? (
          <>
            <div role="alert" className="alert alert-error alert-soft">
              <span>
                Error!{" "}
                {error?.response?.data?.message ||
                  error?.response?.data ||
                  "Failed to fetch payment"}
              </span>
            </div>
          </>
        ) : (
          <>
            {activeTab === "Pending" && <Ptable filterPayments={payment} />}
            {activeTab === "Confirmed" && <Ptable filterPayments={payment} />}
            {activeTab === "Cancelled" && <Ptable filterPayments={payment} />}
            <Paginate
              totalPages={totalPages}
              hasMore={hasMore}
              handlePageChange={handlePageChange}
              currentPage={currentPage}
            />
          </>
        )}
      </div>
    </div>
  );
}
