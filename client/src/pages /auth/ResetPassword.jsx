import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "react-toastify";
import { Link, useNavigate, useSearchParams } from "react-router";
import { Loader } from "lucide-react";
import { resetPassword } from "@/api/auth";
import { validateResetPasswordSchema } from "@/utils/dataSchema";

export default function ResetPassword() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validateResetPasswordSchema),
  });

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  //look for the query values on url
  const userId = searchParams.get("userId");
  const token = searchParams.get("token");

  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: (res) => {
      toast.success(res.data.message || "Registration Successful");
      navigate("/login");
    },
    onError: (error) => {
      import.meta.env.DEV && console.error(error);
      toast.error(error?.response?.data?.message);
    },
  });

  const onSubmitForm = async (data) => {
    const formData = { ...data, userId, token };
    mutation.mutate(formData);
  };
  return (
    <div className="max-w-[460px] mx-auto border rounded-lg shadow px-4 py-6">
      <h1 className="font-bold text-2xl  text-white ">Forgot Password</h1>
      <h2 className="text-white">Enter your new password</h2>

      <div className="mb-4 mt-10 ">
        <label className="floating-label">
          <span className="text-white ">Password</span>
          <input
            type="password"
            placeholder="Enter your password here"
            {...register("newPassword")}
            className="input input-md w-full border py-3 rounded-xl px-3 bg-white"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">
              {errors.newPassword?.message}
            </p>
          )}
        </label>
        {errors.email && (
          <p className="text-red-500 text-sm">{errors?.email.message}</p>
        )}
      </div>
      <form onSubmit={handleSubmit(onSubmitForm)} className="">
        <div className="mb-4">
          <label className="floating-label">
            <span className="text-white ">Confirm Password</span>
            <input
              type="password"
              placeholder="Enter your password here"
              {...register("confirmPassword")}
              className="input input-md w-full border py-3 rounded-xl px-3 bg-white"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password?.message}</p>
            )}
          </label>
          {errors.email && (
            <p className="text-red-500 text-sm">
              {errors?.confirmPassword?.message}
            </p>
          )}
        </div>

        <button
          className="btn btn-accent border bg-(--purple) rounded-3xl  py-3 w-full mt-12 flex justify-center gap-2"
          type="submit"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? (
            <>
              {" "}
              <Loader className="animate-spin" />{" "}
            </>
          ) : (
            "Next"
          )}
        </button>
      </form>
    </div>
  );
}
