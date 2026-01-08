import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validateForgotPasswordSchema } from "@/utils/dataSchema";

import { toast } from "react-toastify";
import { Link } from "react-router";
import { Loader} from "lucide-react";
import { forgotPassword } from "@/api/auth";

export default function ForgotPassword() {
    //  const navigate = useNavigate;
    const {
      handleSubmit,
      register,
      formState: { errors },
    } = useForm({
      resolver: zodResolver(validateForgotPasswordSchema),
    });
  
    const mutation = useMutation({
     mutationFn:forgotPassword,
      onSuccess: (res) => {
        toast.success(res.data.message || "Registration Successful");
        //save access token and redirect user to home page
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
   <div className="max-w-[460px] mx-auto border-0 rounded-lg shadow px-4 py-6">
        <h1 className="font-bold text-2xl  text-white ">Forgot Password</h1>
        <h2 className="text-white">Enter Your Information</h2>
        <form onSubmit={handleSubmit(onSubmitForm)} className="mt-10 ">
          <div className="mb-4">
            <label className="floating-label">
              <p className="text-white">Email</p>
              <input
                type="email"
                placeholder="Johndoe@email.com"
                {...register("email")}
                className="input input-md w-full border-0 text-black py-3 px-3 rounded-xl  bg-white"
              />
            </label>
            {errors.email && (
              <p className="text-red-500 text-sm">{errors?.email.message}</p>
            )}
          </div>

          <button
            className="btn btn-accent border-0 bg-(--purple) rounded-3xl  py-3 w-full mt-12 flex justify-center gap-2"
            type="submit"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? <> <Loader className="animate-spin" />  </> : "Next"}
          </button>
        </form>
      </div>
  )
}
