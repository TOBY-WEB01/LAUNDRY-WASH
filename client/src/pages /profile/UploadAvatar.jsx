import { useAuth } from "@/hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useRef } from "react";
import { toast } from "react-toastify";
import { useFile } from "@/hooks/useFile";
import { Pencil, Upload, X } from "lucide-react";
import { updateAvatar } from "@/api/auth";

export default function UploadAvatar() {
  const { user, accessToken, setUser } = useAuth();
  const fileRef = useRef(null);
  //   const queryClient = useQueryClient();
  const { selectedFile, setSelectedFile, handleFile } = useFile();

  const mutation = useMutation({
    mutationFn: updateAvatar,
    onSuccess: (res) => {
      if (res.status === 200) {
        toast.success(res.data?.message || "Upload successfull");
        setUser(res.data.data);
        setSelectedFile("")
      }
    },
    onError: (error) => {
      import.meta.env.DEV && console.error(error);
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data ||
          "Error uploading image"
      );
    },
  });

  const handleImageClick = () => {
    if (fileRef.current) fileRef.current.value = "";
    fileRef.current.click();
  };

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (selectedFile) {
        const formData = {
          avatar: selectedFile,
        };
        mutation.mutate({ formData, accessToken });
      }
    },
    [accessToken, mutation, selectedFile]
  );

  return (
    <>
      {" "}
      <div className=" container  mx-auto py-10 px-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="avatar avatar-placeholder relative">
            <div className="bg-black text-neutral-content w-24 rounded-full">
              {user?.avatar || selectedFile ? (
                <img
                  src={selectedFile ? selectedFile : user?.avatar}
                  alt={user?.fullname}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="text-xl ">
                  {user?.fullname
                    ?.split(" ")
                    .map((name) => name[0])
                    .join("")
                    .toUpperCase()}
                </span>
              )}
            </div>
            {selectedFile && (
              <>
                <button
                  type="button"
                  className="absolute top-0 right-0 p-2 rounded-full bg-gray-600 cursor-pointer"
                  title="change image"
                  onClick={() => setSelectedFile("")}
                >
                  <X />
                </button>
                <button
                  type="button"
                  className="absolute bottom-[-12%] left-8 p-1 rounded-full bg-gray-300 text-gray-600 cursor-pointer"
                  title="Upload image"
                  onClick={onSubmit}
                  disabled={mutation.isPending}
                >
                  <Upload />
                </button>
                {mutation.isPending && (
                  <p className="absolute bottom-[-40%] left-4">Uploading...</p>
                )}
              </>
            )}
          </div>

          <div>
            <h1 className="text-xl font-semibold text-white">
              {user?.fullname}
            </h1>
            <p>{user?.email}</p>
          </div>
        </div>
        <label htmlFor="avatar">
          <button
            onClick={handleImageClick}
            type="button"
            className="cursor-pointer"
          >
            <Pencil />
          </button>
        </label>
        <input
          type="file"
          id="avatar"
          accept="image/*"
          className="hidden"
          ref={fileRef}
          onChange={(e) => {
            handleFile(e);
          }}
        />
      </div>
    </>
  );
}
