import { paymentStatusColors, revenueOrdersColumn } from "@/utils/Constant";
import TableBody from "@/components/TableBody";
import { useCallback } from "react";

export default function RevenueTable({ payments }) {
  const renderCell = useCallback((payment, columnKey) => {
    const cellValue = payment[columnKey];
    switch (columnKey) {
      case "client":
        return <p className="text-sm">{payment?.userId?.fullname}</p>;

      case "service":
        return <p className="text-sm">{payment?.serviceType}</p>;

      case "PaidAt":
        return (
          <p className="text-sm">
            {new Date(payment?.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}{" "}
            {payment?.pickUp?.time}
          </p>
        );
      case "isPaid":
        return (
          <p className="text-sm">{payment?.isPaid ? "paid" : "Not Paid"}</p>
        );

      case "status":
        return (
          <div
            className={`capitalize badge font-semibold ${
              paymentStatusColors[payment?.status]
            }`}
          >
            {payment?.status}
          </div>
        );
      case "amount":
        return <p>&#x20A6; {payment?.amount || 0}</p>;
      case "isDelivered":
        return (
          <div
            className={`capitalize badge font-semibold ${
              payment?.isDelivered
                ? "bg-green-200 text-green-700"
                : "bg-yellow-200 text-yellow-700"
            }`}
          >
            {payment?.isDelivered ? "Delivered" : "Not Delivered"}
          </div>
        );
      case "action":
        return (
          <div className="flex gap-4 items-center">
            <div
              className="tooltip tooltip-primary tooltip-left cursor-pointer"
              data-tip={payment?.isPaid ? "paid" : "Mark payment as paid"}
            >
              <CheckCheck
                className={`${
                  payment?.isPaid ? "text-green-500" : "text-yellow-500"
                }`}
              />
            </div>
            <div
              className="tooltip tooltip-primary tooltip-left cursor-pointer"
              data-tip={
                payment?.isDelivered
                  ? "Mark as Not delivered"
                  : "Mark as Delivered"
              }
            >
              <Truck
                className={`${
                  payment?.isDelivered ? "text-green-500" : "text-red-500"
                }`}
              />
            </div>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
  return (
    <div>
      <TableBody
        tableColumns={revenueOrdersColumn}
        tableData={payments}
        renderCell={renderCell}
      />
    </div>
  );
}
