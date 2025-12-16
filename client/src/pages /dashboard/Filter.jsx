import { Funnel } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router";

export default function Filter() {
  const [openOptions, setOpenOptions] = useState(false);
  const [filters, setFilters] = useState({
    status: "",
   
  });
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedSearchParams = new URLSearchParams(searchParams);
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        updatedSearchParams.set(key, value);
      } else {
        updatedSearchParams.delete(key);
      }
    });
    setSearchParams(updatedSearchParams);
    setOpenOptions(false);
  };

  const handleClearFilters = () => {
    setFilters({
      status: "",
      paymentMethod: "",
      startDate: "",
      endDate: "",
    });
    const params = new URLSearchParams(searchParams);
    params.delete("status");
    setSearchParams(params);
    setOpenOptions(false);
  };

  const status = ["pending", "confirmed", "cancelled"];

  return (
    <>
      <div className="bg-red-500">
        <div
          className={`dropdown dropdown-end ${
            openOptions ? "dropdown-open" : ""
          }`}
        >
          <div
            tabIndex={0}
            role="button"
            className="btn  border-gray-30 bg-white text-black"
          >
            <Funnel className="text-black" /> Filter
          </div>
          <div
            tabIndex={0}
            className="dropdown-content menu bg-(--darkgrey) border-[0.2px] border-gray-400 rounded-box z-1 w-[250px] md:w-[300px] p-4 shadow-sm"
          >
            <div className="flex flex-col">
              <h1 className="text-lg font-bold mb-4 text-white">
                Apply filters
              </h1>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2 space-y-4">
                  <select
                    value={filters.status}
                    onChange={(e) =>
                      handleFilterChange("status", e.target.value)
                    }
                    className="select capitalize bg-white text-black"
                  >
                    <option value="" disabled={true}>
                      Select Status
                    </option>
                    {status?.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>

                  <div className="flex justify-end gap-2">
                    <button
                      onClick={handleClearFilters}
                      className="btn btn-outline border-[0.1px] border-gray-400 bg-white text-black"
                    >
                      Clear Filters
                    </button>
                    <button
                      type="submit"
                      className="btn bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
