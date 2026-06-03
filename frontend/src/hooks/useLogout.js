import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../lib/api";
import { StreamChat } from "stream-chat";

const useLogout = () => {
  const queryClient = useQueryClient();

  const {
    mutate: logoutMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: async () => {
      // Disconnect Stream user before logging out
      const client = StreamChat.getInstance(
        import.meta.env.VITE_STREAM_API_KEY
      );

      if (client.userID) {
        await client.disconnectUser();
      }

      return logout();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["authUser"],
      });
    },
  });

  return { logoutMutation, isPending, error };
};

export default useLogout;