import { zodResolver } from "@hookform/resolvers/zod";
import { validateLoginUserSchema } from "../../utils/dataSchema";

import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Link,  } from "react-router";
// import { useAuth } from "../../hooks/useAuth";
import { loginUser } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Loader, Eye, EyeClosed } from "lucide-react";

export default function Login() {
  //  const navigate = useNavigate;
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validateLoginUserSchema),
  });
  const { setAccessToken, user } = useAuth();
  const navigate = useMutation();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (res) => {
      toast.success(res.data.message || "Login Successful");
      //save access token and redirect user to home page
      setAccessToken(res.data.data);
      if (user && !user?.isEmailVerified) navigate("/verify-email");
    },
    onError: (error) => {
      import.meta.env.DEV && console.error(error);
      toast.error(error?.response?.data?.message || "Login failed");
    },
  });

  const onSubmitForm = async (data) => {
    mutation.mutate(data);
  };

  return (
    <div>
      <div className="max-w-[400px] mx-auto border-0 rounded-lg shadow px-4 py-6">
        <h1 className="font-bold text-2xl  text-white ">Welcome back</h1>
        <h2 className="text-white">Enter Your Details To Continue</h2>
        <form onSubmit={handleSubmit(onSubmitForm)} className="mt-10 ">
          <div className="mb-4">
            <label className="floating-label">
              <p className="text-white">Email</p>
              <input
                type="email"
                placeholder="Email@example.com"
                {...register("email")}
                className="input input-md w-full border  py-3 px-3 rounded-xl  bg-white text-black"
              />
            </label>
            {errors.email && (
              <p className="text-red-500 text-sm">{errors?.email.message}</p>
            )}
          </div>
          <div className="relative">
            <label className="floating-label">
              <p className="text-white ">Password</p>
              <input
                type="password"
                placeholder="Enter your password here"
                {...register("password")}
                className="input input-md w-full border py-3 rounded-xl px-3 bg-white text-black"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors?.password.message}
                </p>
              )}
            </label>

            <div className="text-end text-white text-sm mt-2">
              <Link to="/auth/forgotPassword">Forgot Password?</Link>
            </div>

          </div>

          <button
            className="btn btn-accent text-white border-0 bg-(--purple) rounded-3xl  py-3 w-full mt-12 flex justify-center gap-2"
            type="submit"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <>
                {" "}
                <Loader className="animate-spin" />{" "}
              </>
            ) : (
              "continue"
            )}
          </button>
          <h4 className="text-white text-center mt-4">
            Don't have an account?
            <span className="text-(--purple) ">
              <Link to="/auth/createAccount">Sign Up</Link>
            </span>
          </h4>
        </form>
      </div>
    </div>
  );
}
