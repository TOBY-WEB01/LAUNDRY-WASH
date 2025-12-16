import { zodResolver } from "@hookform/resolvers/zod";
import { validateRegisterUserSchema } from "../../utils/dataSchema";
import { registerUser } from "../../api/auth";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Link} from "react-router";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";

export default function CreateAccount() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validateRegisterUserSchema),
  });
  const { setAccessToken } = useAuth();


  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (res) => {
      toast.success(res.data.message || "Registration Successful");
      //save access token and redirect user to home page
      setAccessToken(res.data.data);
    },
    onError: (error) => {
      import.meta.env.DEV && console.error(error);
      toast.error(error?.response?.data?.message || "Registration failed");
    },
  });

  const onSubmitForm = async (data) => {
    mutation.mutate(data);
  };



  return (
    <div>
      <div className="max-w-[400px] mx-auto rounded-lg shadow px-4 py-6">
        <h1 className="text-2xl  text-white ">Create Account</h1>
        <h2 className="text-white ">
          Enter Your Information To Create An Account
        </h2>
        <form onSubmit={handleSubmit(onSubmitForm)} className="mt-10 ">
          <div className="mb-4">
            <label className="floating-label">
              <p className="text-white">Fullname</p>
              <input
                type="text"
                placeholder="Full Name"
                {...register("fullname")}
                className="input input-md w-full border  py-2 px-3 rounded-xl  bg-white"
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
                className="input input-md w-full border  py-3 px-3 rounded-xl  bg-white"
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
                className="input input-md w-full border  py-3 px-3 rounded-xl  bg-white"
              />
            </label>
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors?.phone.message}</p>
            )}
          </div>
          <div className="relative">
            <label className="floating-label">
              <p  className="text-white ">Password</p>
              <input
                type="password"
                placeholder="Enter your password here"
                {...register("password")}
                className="input input-md w-full border py-3 rounded-xl px-3 bg-white"
              />
            </label>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors?.password.message}</p>
            )}
            <button className="absolute inset-y-0 right-2"></button>
          </div>

          <button
            className="btn btn-accent border-0  bg-(--purple) rounded-3xl  py-3 w-full mt-12"
            disabled={mutation.isPending}
            type="submit"
          >
            {mutation.isPending ? "Loading..." : "Sign Up"}
          </button>
          <h4 className="text-white text-center mt-4">
            Already have an account?
            <span className="text-(--purple)">
              {" "}
              <Link to="/auth/login">Sign In</Link>
            </span>
          </h4>
        </form>
      </div>
    </div>
  );
}
