import { useAuth } from "@/hooks/useAuth";
import { validateProfileResetSchema } from "@/utils/dataSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Loader } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { updateUserDetails } from "@/api/auth";
import { toast } from "react-toastify";

export default function Profile() {
  const { user, accessToken } = useAuth();
  const QueryClient = useQueryClient();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validateProfileResetSchema),
  });

  const mutation = useMutation({
    mutationFn: updateUserDetails,
    onSuccess: (res) => {
      toast.success(res.data.message || "Profile updated successfully");
      QueryClient.invalidateQueries({ queryKey: ["auth_user"] });
    },
    onError: (error) => {
       import.meta.env.DEV && console.error(error);
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data ||
          "Failed to update profile"
      );
    },
  });

  const onSubmit = async (data) => {
    mutation.mutate({ formData: data, accessToken});
  };

  return (
    <div className="max-w-[800px]  mx-auto rounded-lg shadow px-4 py-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="floating-label">
            <p className="text-white">Fullname</p>
            <input
              type="text"
              placeholder="Full Name"
              {...register("fullname")}
              className="input input-md w-full border text-black  py-2 px-3 rounded-xl  bg-white"
              defaultValue={user?.fullname || ""}
            />
          </label>
          {errors.fullname && (
            <p className="text-red-500 text-sm">{errors?.fullname.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="floating-label">
            <p className="text-white">Email</p>
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="input input-md w-full border text-black  py-3 px-3 rounded-xl  bg-white"
              defaultValue={user?.email || ""}
            />
          </label>
          {errors.email && (
            <p className="text-red-500 text-sm">{errors?.email.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="floating-label">
            <p className="text-white">Phone Number</p>
            <input
              type="tell"
              placeholder="Tel..."
              {...register("phone")}
              className="input input-md text-black  w-full border  py-3 px-3 rounded-xl  bg-white"
              defaultValue={user?.phone || ""}
            />
          </label>
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors?.phone.message}</p>
          )}
        </div>

        <div className="flex justify-between gap-4">
          <button className="border border-white mt-12   text-white w-full  rounded-3xl ">
            Cancel
          </button>

          <button
            className=" btn-accent border-0  bg-(--purple) rounded-3xl  py-3 w-full mt-12"
            type="submit"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <>
                <Loader className="animate-spin mr-2 " />
              </>
            ) : (
              "Save changes"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
