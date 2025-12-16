// import Nav from "@/components/Nav";
import { useAuth } from "@/hooks/useAuth";
import { ChevronRight, Loader } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBooking } from "@/api/booking";
import { toast } from "react-toastify";
import { itemsPerCost, ITEM_KEYS } from "@/utils/Constant";

export default function BookingSummary() {
  const { bookingForm, accessToken } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const items = {
    shirt: bookingForm?.shirt,
    trouser: bookingForm?.trouser,
    native: bookingForm?.native,
    senator: bookingForm?.senator,
    duvet: bookingForm?.duvet,
    specialItem: bookingForm?.specialItem,
  };

  const mutation = useMutation({
    mutationFn: createBooking,
    onSuccess: (res) => {
      toast.success(res.data.message || "Booking placed successfully");
      queryClient.invalidateQueries({ queryKey: ["userBookings"] });
      navigate(`/book-laundry/payment-options/${res.data.data._id}`);
    },
    onError: (error) => {
        import.meta.env.DEV && console.error(error);
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data ||
          "Failed to place booking"
      );
    },
  });

  const placeOrder = async () => {
    mutation.mutate({ formData: bookingForm, accessToken });
  };

  return (
    <div className=" space-y-20 py-10 min-h-screen ">
      <div className="container mx-auto pt-6 md:pt-20  pb-4 text-white space-y-4 px-4">
        <div className=" flex  md:gap-3 items-center mt-5 md:mt-0">
          <h1
            className="text-xl md:text-4xl font-semibold cursor-pointer"
            onClick={() => navigate(-1)}
          >
            Book Laundry
          </h1>
          <ChevronRight />
          <h1
            className={`text-xl md:text-4xl font-semibold ${
              path ? "text-(--purple)" : ""
            }`}
          >
            Booking Summary
          </h1>
        </div>
        <section className="max-w-[700px] mx-auto flex items-center justify-center">
          <div className="mt-4 w-full">
            <div>
              <h2 className="text-white text-lg">
                Service & Pick-up Information
              </h2>
            </div>
            <div className="border-0 rounded-lg mt-3 pt-2 pb-2 bg-(--bgGrey) space-y-2">
              <div className="flex justify-between px-2  item-center gap-40 md:gap-120 ">
                <p className="text-sm">Service</p>
                <h1>{bookingForm?.serviceType}</h1>
              </div>
              <div className="flex justify-between px-2  item-center gap-40 md:gap-120 ">
                <p className="text-sm">Address</p>
                <h1>{bookingForm?.pickUpAddress}</h1>
              </div>
              <div className="flex justify-between px-2  item-center gap-20 md:gap-100 ">
                <p className="text-sm">Phone Number</p>
                <h1>{bookingForm?.pickUpPhone}</h1>
              </div>
              <div className="flex justify-between px-2  item-center gap-13 md:gap-80 ">
                <p className="text-sm">Pick-up Date</p>
                <h1>
                  {bookingForm?.date &&
                    new Date(bookingForm?.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                </h1>
              </div>
              <div className="flex justify-between px-2  item-center gap-40 md:gap- ">
                <p className="text-sm">Pick-up Time</p>
                <h1>{bookingForm?.time}</h1>
              </div>
            </div>
          </div>
        </section>
        <section className="max-w-[700px] mx-auto flex items-center justify-center">
          <div className="mt-4 w-full">
            <div>
              <h2 className="text-white text-lg">Delivery Information</h2>
            </div>
            <div className="border-0 rounded-lg mt-3 pt-2 pb-2 bg-(--bgGrey) space-y-2">
              <div className="flex justify-between px-2  item-center gap-36 md:gap-108 ">
                <p className="text-sm">Address</p>
                <h1>{bookingForm?.deliveryAddress}</h1>
              </div>
              <div className="flex justify-between px-2  item-center gap-20 md:gap-10 ">
                <p className="text-sm">Phone Number</p>
                <h1>{bookingForm?.deliveryPhone}</h1>
              </div>
            </div>
          </div>
        </section>
        <section className="max-w-[700px] mx-auto flex items-center justify-center">
          <div className="mt-4 w-full">
            <div>
              <h2 className="text-white text-lg">Item Information</h2>
            </div>
            <div className="border-0 rounded-lg mt-3 pt-2 pb-2 bg-(--bgGrey) space-y-2">
              {ITEM_KEYS.map((key) => {
                const quantity = items[key];
                if (!quantity || Number(quantity) < 1) return null;

                const label =
                  key === "specialItem"
                    ? "Special Item"
                    : key.charAt(0).toLocaleUpperCase() + key.slice(1);

                const pricePerItem = itemsPerCost[key];

                return (
                  <div
                    key={key}
                    className="flex justify-between px-4 items-center"
                  >
                    <p>
                      {label} (&#x20A6; {pricePerItem} per item)
                    </p>
                    <h1 className="text-base sm-text-lg">{quantity}</h1>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <section className="max-w-[700px] mx-auto flex items-center justify-center">
          <div className="mt-4 w-full">
            <div>
              <h2 className="text-white text-lg">Pricing</h2>
            </div>
            <div className="border rounded-2xl bg-white mt-3 pt-2 pb-2 space-y-2">
              <div className="flex justify-between px-2  item-center gap-56 md:gap-130 ">
                <p className="text-sm text-black">Total Price</p>
                <h1 className="text-black">{bookingForm?.total}</h1>
              </div>
            </div>
          </div>
        </section>
        <div className="flex flex-col md:flex-row mt-10 justify-center lg:px-40 gap-6 md:gap-2 lg:gap-2 items-center">
          <div>
            <button
              className="border text-white py-2 px-40 rounded-3xl "
              onClick={() => navigate("/book-laundry")}
            >
              Edit
            </button>
          </div>
          <div>
            <button
              type="submit"
              className="border-0  text-white py-2 px-31 md:px-28 lg:px-29  rounded-3xl bg-(--purple)"
              onClick={placeOrder}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <>
                  <Loader className="animate-spin mr-2" />
                </>
              ) : (
                " Confirm Order"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* <Nav /> */}
    </div>
  );
}
