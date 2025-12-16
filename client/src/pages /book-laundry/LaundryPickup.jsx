import {
  itemQty,
  pickUpTimeData,
  serviceTypeData,
  itemsPerCost,
  ITEM_KEYS,
} from "@/utils/Constant";
import { validateBookingSchema } from "@/utils/dataSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router";
import { useAuth } from "@/hooks/useAuth";



export default function LaundryPickup() {
  const { bookingForm, setBookingForm } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(validateBookingSchema),
    defaultValues: {
      serviceType: bookingForm?.serviceType || "",
      pickUpAddress: bookingForm?.pickUpAddress || "",
      pickUpPhone: bookingForm?.pickUpPhone || "",
      date: bookingForm?.date || "",
      time: bookingForm?.time || "",
      deliveryAddress: bookingForm?.deliveryAddress || "",
      deliveryPhone: bookingForm?.deliveryPhone || "",
      shirt: bookingForm?.shirt || "",
      trouser: bookingForm?.trouser || "",
      senator: bookingForm?.senator || "",
      native: bookingForm?.native || "",
      duvet: bookingForm?.duvet || "",
      specialItem: bookingForm?.specialItem || "",
      total: bookingForm?.total || "",
    },
  });

  const watchedItems = useWatch({
    control,
    name: ITEM_KEYS,
  });

  useEffect(() => {
    const total = ITEM_KEYS.reduce((sum, key, index) => {
      const qty = Number(watchedItems?.[index]) || 0;
      const unitPrice = itemsPerCost[key] || 0;
      return sum + qty * unitPrice;
    }, 0);
    setValue("total", total, { shouldValidate: true });
  }, [watchedItems, setValue]);

  const cancelForm = () => {
    setBookingForm(null);
    localStorage.removeItem("laundryBookingForm");
    reset();
  };

  const onSubmit = async (data) => {
    if (
      !data.pickUpPhone.startsWith("+234") ||
      !data.deliveryPhone.startsWith("+234")
    ) {
      toast.warning(
        "Ensure Pick up and delivery phone begins with intl format"
      );
      return;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(data.date);
    selectedDate.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      toast.warning("Pick up date cannot be in the past ");
      return;
    }
    const items = {
      shirt: data.shirt,
      trouser: data.trouser,
      native: data.native,
      senator: data.senator,
      duvet: data.duvet,
      specialItem: data.specialItem,
    };
    const hasAtLeastOneItem = Object.values(items).some(
      (value) => value !== undefined && value !== "" && Number(value) > 0
    );

    if (!hasAtLeastOneItem) {
      toast.warning("Select at least one item quantity to proceed");
      return;
    }
    localStorage.setItem("laundryBookingForm", JSON.stringify(data));
    setBookingForm(data);
    navigate("/book-laundry/booking-summary");
  };

  return (
    <>
      {path === "/book-laundry" ? (
        <div className="container mx-auto max-w-[580px] px-4 py-6 min-h-screen">
          <div className=" mx-auto max-w-[381px] mt-24">
            <h1 className="text-white text-2xl text-center">
              Book Laundry Pick-up
            </h1>
          </div>
          <div className="mt-10">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2 className=" font-semibold text-white mb-2">Service Type</h2>
              <div className="bg-(--bgGrey) px-2 py-4 rounded-lg">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-white">
                    Select Service
                  </legend>
                  <select
                    defaultValue=""
                    className="select w-full text-black bg-white"
                    {...register("serviceType")}
                  >
                    <option disabled={true} value="">
                      Pick a service
                    </option>
                    {serviceTypeData.map((service, idx) => (
                      <option key={idx} className="w-full">
                        {service}
                      </option>
                    ))}
                  </select>
                </fieldset>
                {errors?.serviceType && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors?.serviceType?.message}
                  </p>
                )}
              </div>

              <div className="mt-4 ">
                <h2 className="text-xl text-white">Pick-up Information</h2>
                <div className="bg-(--bgGrey) rounded-lg px-2 space-y-3 pt-4">
                  <div>
                    <span className="text-white text-sm">Address</span>
                    <input
                      type="text"
                      placeholder="Enter address"
                      {...register("pickUpAddress")}
                      className="input w-full bg-white text-black"
                    />
                  </div>
                  {errors?.pickUpAddress && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors?.pickUpAddress?.message}
                    </p>
                  )}
                  <div>
                    <span className="text-white text-sm">Phone Number</span>
                    <input
                      type="phone"
                      placeholder="+2348012345678"
                      {...register("pickUpPhone")}
                      className="input w-full bg-white text-black"
                    />
                    {errors?.pickUpPhone && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors?.pickUpPhone?.message}
                      </p>
                    )}
                  </div>
                  <div className="md:grid grid-cols-12 gap-6 space-y-2 justify-between pb-6">
                    <div className="col-span-6">
                      <span className="text-white text-sm">Pick-up Date</span>
                      <input
                        type="date"
                        {...register("date")}
                        className="input w-full bg-white text-black"
                      />
                      {errors?.date && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors?.date?.message}
                        </p>
                      )}
                    </div>
                    <div className="col-span-6">
                      <div>
                        <span className=" text-sm text-white">
                          Pick-up Time
                        </span>
                        <select
                          className="bg-white text-black w-full rounded-sm text-xs px-2 py-3 "
                          {...register("time")}
                        >
                          <option value="" disabled selected>
                            Select Pick-up Time
                          </option>

                          {pickUpTimeData.map((time, index) => (
                            <option key={index} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>

                        {errors?.time && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors?.time?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 ">
                <h2 className="text-xl text-white">Delivery Information</h2>
                <div className="bg-(--bgGrey) rounded-lg px-2 space-y-3 pb-5 pt-4">
                  <div>
                    <span className="text-white text-sm">Address</span>
                    <input
                      type="text"
                      placeholder="Same as pickup"
                      {...register("deliveryAddress")}
                      className="input w-full bg-white text-black"
                    />
                    {errors?.deliveryAddress && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors?.deliveryAddress?.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <span className="text-white text-sm">Phone Number</span>
                    <input
                      type="tel"
                      placeholder="+2348012345678"
                      {...register("deliveryPhone")}
                      className="input w-full bg-white text-black"
                    />
                    {errors?.deliveryPhone && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors?.deliveryPhone?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-4 ">
                <h1 className="text-xl text-white">Add Item</h1>
                <div className="lg:grid grid-cols-12 bg-(--bgGrey) rounded-lg">
                  <div className="bg-(--bgGrey) px-2 py-4 rounded-lg col-span-4">
                    <fieldset className="fieldset">
                      <legend className="fieldset-legend text-white">
                        Shirt (NGN 900 per)
                      </legend>
                      <select
                        defaultValue=""
                        className="select w-full bg-white text-black"
                        {...register("shirt")}
                      >
                        <option disabled={true} value="" selected>
                          Select quantity
                        </option>
                        {itemQty.map((service, idx) => (
                          <option key={idx} className="w-full">
                            {service}
                          </option>
                        ))}
                      </select>
                    </fieldset>
                  </div>
                  <div className="bg-(--bgGrey) px-2 py-4 rounded-lg col-span-4">
                    <fieldset className="fieldset">
                      <legend className="fieldset-legend text-white">
                        Trouser(NGN 700 per)
                      </legend>
                      <select
                        defaultValue=""
                        className="select w-full bg-white text-black"
                        {...register("trouser")}
                      >
                        <option disabled={true} value="" selected>
                          Select quantity
                        </option>
                        {itemQty.map((service, idx) => (
                          <option key={idx} className="w-full">
                            {service}
                          </option>
                        ))}
                      </select>
                    </fieldset>
                  </div>
                  <div className="bg-(--bgGrey) px-2 py-4 rounded-lg col-span-4">
                    <fieldset className="fieldset">
                      <legend className="fieldset-legend text-white">
                        Senator(NGN 1,200 per)
                      </legend>
                      <select
                        defaultValue=""
                        className="select w-full bg-white text-black"
                        {...register("senator")}
                      >
                        <option disabled={true} value="" selected>
                          Select quantity
                        </option>
                        {itemQty.map((service, idx) => (
                          <option key={idx} className="w-full">
                            {service}
                          </option>
                        ))}
                      </select>
                    </fieldset>
                  </div>
                  <div className="bg-(--bgGrey) px-2 py-4 rounded-lg col-span-4">
                    <fieldset className="fieldset">
                      <legend className="fieldset-legend  text-white">
                        Native(NGN 900 per)
                      </legend>
                      <select
                        defaultValue=""
                        className="select w-full bg-white text-black "
                        {...register("native")}
                      >
                        <option disabled={true} value="" selected>
                          Select quantity
                        </option>
                        {itemQty.map((service, idx) => (
                          <option key={idx} className="w-full">
                            {service}
                          </option>
                        ))}
                      </select>
                    </fieldset>
                  </div>
                  <div className="bg-(--bgGrey) px-2 py-4 rounded-lg col-span-4">
                    <fieldset className="fieldset">
                      <legend className="fieldset-legend text-white">
                        Duvet (NGN 1,500 per)
                      </legend>
                      <select
                        defaultValue=""
                        className="select w-full bg-white text-black "
                        {...register("duvet")}
                      >
                        <option disabled={true} value="" selected>
                          Select quantity
                        </option>
                        {itemQty.map((service, idx) => (
                          <option key={idx} className="w-full">
                            {service}
                          </option>
                        ))}
                      </select>
                    </fieldset>
                  </div>
                  <div className="bg-(--bgGrey) px-2 py-4 rounded-lg col-span-4">
                    <fieldset className="fieldset">
                      <legend className="fieldset-legend  text-white">
                        Special Item (NGN 2,000 per)
                      </legend>
                      <select
                        defaultValue=""
                        className="select w-full bg-white text-black "
                        {...register("specialItem")}
                      >
                        <option disabled={true} value="" selected>
                          Select quantity
                        </option>
                        {itemQty.map((service, idx) => (
                          <option key={idx} className="w-full" value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </fieldset>
                  </div>
                </div>
              </div>
              <div className="mt-4 ">
                <h2 className="text-xl text-white">Pricing</h2>
                <div className="bg-(--bgGrey) rounded-lg px-2 space-y-3 pb-5 pt-4">
                  <div>
                    <span className="text-white text-sm">Total price</span>
                    <input
                      type="number"
                      placeholder="NGN"
                      {...register("total")}
                      className="input w-full bg-white text-black"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4 md:flex-row justify-between my-10 items-center">
                <div>
                  <button
                    className="border text-white py-2 px-37 md:px-27  rounded-3xl "
                    onClick={cancelForm}
                  >
                    Cancel
                  </button>
                </div>
                <div>
                  <button
                    type="submit"
                    className="border-0  text-white py-2 px-24 md:px-13 rounded-3xl bg-(--purple)"
                  >
                    Proceed To Summary
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
}
