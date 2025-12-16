import { useAuth } from "@/hooks/useAuth";
import { verifyToken } from "@/api/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";
import { useParams, useNavigate } from "react-router";
import { useEffect } from "react";

export default function VerifyEmail() {
  const { user, accessToken } = useAuth();
  const { userId, verifyTokenLink } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.isEmailVerified) {
      navigate("/verify-email");
    } else if (!userId || !verifyTokenLink) {
      navigate("/verify-email");
    }
  }, [navigate, user?.isEmailVerified, userId, verifyTokenLink]);

  const mutation = useMutation({
    mutationFn: verifyToken,
    onSuccess: (res) => {
      toast.success(res?.data?.message || "Account verified");
      queryClient.invalidate({ queryKey: ["auth_user"] });
      navigate("/verify-email");
    },
    onError: (err) => {
        import.meta.env.DEV && console.error(err);
      toast.error(
        err?.response.data?.message || "Something went wrong, please try again"
      );
      navigate("/verify-email");
    },
  });

  const verifyUserAccount = async () => {
    mutation.mutate({ userId, verifyTokenLink, accessToken });
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-zinc-950">
        <div className="max-w-[800px] mx-auto text-center text-white">
          <img src="/warning.svg" alt="success" className="w-full h-[300px] " />
          <h1 className="text-2xl font-bold">Hi {user?.fullname}</h1>
          <p>Click the button below to verify your account </p>
          <button
            className="btn btn-lg bg-purple  font-bold cursor-pointer my-8 rounded-full  w-[211px] "
            onClick={verifyUserAccount}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <Loader className="animate-spin" />
            ) : (
              "Verify Account"
            )}
          </button>
        </div>
      </div>
    </>
  );
}
