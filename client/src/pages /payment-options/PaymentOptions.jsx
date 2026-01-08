import { createPayment } from "@/api/payment";
import { useAuth } from "@/hooks/useAuth";
import { payOptions } from "@/utils/Constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChevronRight, Loader } from "lucide-react";
import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import Modal from "@/components/Modal";
import Paystack from "@/components/Paystack";

export default function PaymentOptions() {
  const [selectPayment, setSelectPayment] = useState("Pay on delivery");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPaystack, setShowPaystack] = useState(false);
  const { accessToken, bookingForm, setBookingForm } = useAuth();
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const path = location.pathname.split("/")[2];

  const mutation = useMutation({
    mutationFn: createPayment,
    onSuccess: (res) => {
      toast.success(res.data.message || "Payment successful");
      queryClient.invalidateQueries({ queryKey: ["userBookings"] });
      localStorage.removeItem("laundryBookingForm");
      setBookingForm(null);
      setIsModalOpen(true);
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

  const makePayment = async () => {
    if (selectPayment === "Pay on Delivery") {
      const formData = {
        amount: bookingForm?.total,
        reference: new Date().getTime().toString(),
        paymentMethod: selectPayment,
      };
      mutation.mutate({ bookingId, formData, accessToken });
    } else {
      setShowPaystack(true);
    }
  };

  return (
    <div>
      <div className="container min-h-screen mx-auto pt-20 md:pt-30">
        <div className=" flex  md:gap-3 items-center">
          <h1
            className="text-xl md:text-4xl text-white font-semibold cursor-pointer"
            onClick={() => navigate(-1)}
          >
            Book Laundry
          </h1>
          <ChevronRight className="text-white" />
          <h1
            className={`text-xl md:text-4xl font-semibold ${
              path ? "text-(--purple)" : ""
            }`}
          >
            Payment Options
          </h1>
        </div>
        <div>
          <h1 className="text-center text-white text-xl pt-12 pr-40 ">
            Select Payment Option
          </h1>
        </div>
        <div>
          {payOptions.map((item) => (
            <div
              key={item.id}
              className="px-3 w-90  md:w-100 mt-6 mx-auto    bg-(--bgGgrey) border-0 py-6 rounded-xl flex justify-between items-center mb-6"
            >
              <div className="flex text-white items-center gap-2">
                <item.icon /> <p>{item.label}</p>
              </div>
              <input
                type="radio"
                name="radio-1"
                className="radio text-white"
                checked={selectPayment === item.label}
                value={item.label}
                onChange={(e) => setSelectPayment(e.target.value)}
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-3 lg:gap-4  items-center">
          <div>
            <button
              className="border text-white py-2 px-36 md:px-17  rounded-3xl "
              onClick={() => navigate("/book-laundry")}
            >
              Cancel
            </button>
          </div>
          <div>
            <button
              onClick={makePayment}
              disabled={mutation.isPending}
              className="btn border-0  text-white py-2 px-36 md:px-17 lg:px-15  rounded-3xl bg-(--purple)"
            >
              {mutation.isPending ? (
                <>
                  <Loader className="animate-spin mr-2" /> Proceed{" "}
                </>
              ) : (
                "Proceed"
              )}
            </button>
          </div>
        </div>
        {showPaystack && (
          <Paystack
            bookingId={bookingId}
            total={bookingForm?.total}
            setIsModalOpen={setIsModalOpen}
            onClose={() => setShowPaystack(false)}
            selectPayment={selectPayment}
          />
        )}

        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            id="createPaymentModal"
            classname="bg-(--bgGrey) p-4 rounded-xl shadow-lg w-[90%] max-w-[400px] mx-auto"
            showClose
            onClose={() => setIsModalOpen(false)}
          >
            <div classname="my-6 flex flex-col justify-center items-center">
              <img
                src="/Check.png"
                alt="success"
                className="w-[100px] mx-auto"
              />
              <div className="mt-4 text-center">
                <h1 className="text-2xl text-white">
                  {selectPayment === "Pay on Delivery"
                    ? "Your payment has been scheduled"
                    : "Your pick-up payment has been made successfully!"}
                </h1>
                <p className="text-white">
                  You will be notified once dispatch is on its way
                </p>
                <div className="mt-6 grid grid-cols-1 gap-4">
                  <button
                    type="submit"
                    className="btn btn-lg  text-white w-full rounded-full bg-(--purple)"
                    onClick={() =>
                      navigate("/profile/orders?status=in-progress")
                    }
                  >
                    View orders
                  </button>
                  <button
                    onClick={() => navigate("/")}
                    className="btn btn-lg border border-white bg-transparent  text-white w-full rounded-full"
                  >
                    Back to home
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}
