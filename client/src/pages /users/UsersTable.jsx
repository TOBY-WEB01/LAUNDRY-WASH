import TableBody from "@/components/TableBody";
import { adminUserColumn } from "@/utils/Constant";
import { Mail, Phone } from "lucide-react";
import { useCallback } from "react";

export default function UsersTable({ UsersActivities }) {
  const renderCell = useCallback((users, columnKey) => {
    const cellValue = users[columnKey];
    switch (columnKey) {
      case "fullname":
        return (
          <div className="flex items-center gap-2">
            <div className="bg-black text-neutral-content flex items-center justify-center w-10 h-10 rounded-full">
              <span className="text-xl text-white text-center">
                {users?.fullname
                  ?.split(" ")
                  .map((name) => name[0])
                  .join("")
                  .toUpperCase()}{" "}
              </span>
            </div>
            <p>{users.fullname}</p>
          </div>
        );
      case "email":
        return <p>{users?.email}</p>;
      case "phone":
        return <p>{users?.phone}</p>;
      case "action":
        return (
          <div className="flex items-center gap-3">
            <div className="tooltip tooltip-left" data-tip={`email ${users?.fullname}`}>
              <Mail
                className="text-green-500 cursor-pointer"
                onClick={() => window.open(`mailto:${users?.email}`, "_blank")}
                size={20}
              />
            </div>
            <div  className="tooltip tooltip-left" data-tip={`phone ${users?.fullname}`}>
              <Phone
                className="text-blue-500 cursor-pointer"
                onClick={() => window.open(`tel:${users?.phone}`, "_blank")}
                size={20}
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
        tableColumns={adminUserColumn}
        tableData={UsersActivities}
        renderCell={renderCell}
      />
    </div>
  );
}
