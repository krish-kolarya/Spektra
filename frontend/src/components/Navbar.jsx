import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, LogOutIcon, SparklesIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";
import { getFriendRequests } from "../lib/api.js";
import { useQuery } from "@tanstack/react-query";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");

  // const queryClient = useQueryClient();
  // const { mutate: logoutMutation } = useMutation({
  //   mutationFn: logout,
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  // });

  const { logoutMutation } = useLogout();

  const { data: friendRequests } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });

  const notificationCount =
  (friendRequests?.incomingReqs?.length || 0) +
  (friendRequests?.acceptedReqs?.length || 0);

  const notifications = [
    ...(friendRequests?.incomingReqs || []).map((req) => ({
      id: req._id,
      type: "incoming",
      user: req.sender.fullName,
      createdAt: req.createdAt,
    })),

    ...(friendRequests?.acceptedReqs || []).map((req) => ({
      id: req._id,
      type: "accepted",
      user: req.recipient.fullName,
      createdAt: req.createdAt,
    })),
  ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const latestNotifications = notifications.slice(0, 5);

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end w-full">
          {/* LOGO - ONLY IN THE CHAT PAGE */}
          {isChatPage && (
            <div className="pl-5">
              <Link to="/" className="flex items-center gap-2.5">
                <SparklesIcon className="size-9" style={{ color: "#407BFF" }} />
                <span
                  className="text-3xl font-bold font-mono tracking-wider"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #407BFF, #407BFF)",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Spektra
                </span>
              </Link>
            </div>
          )}

          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <div className="indicator">
                  {notificationCount > 0 && (
                    <span className="indicator-item badge badge-primary badge-xs -top-1 -right-1">
                      {notificationCount}
                    </span>
                  )}

                  <BellIcon className="h-6 w-6" />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="dropdown-content z-[100] menu p-2 shadow bg-base-200 rounded-box w-80 mt-2"
              >
                <li className="menu-title">
                  <span>Notifications</span>
                </li>

                {latestNotifications.length === 0 ? (
                  <li>
                    <span>No notifications</span>
                  </li>
                ) : (
                  latestNotifications.map((notification) => (
                    <li key={notification.id}>
                      <span>
                        <strong>{notification.user}</strong>{" "}
                        {notification.type === "incoming"
                          ? "sent you a friend request"
                          : "accepted your friend request"}
                      </span>
                    </li>
                  ))
                )}

                <li>
                  <Link to="/notifications">
                    {notifications.length > 5
                      ? `View all ${notifications.length} notifications`
                      : "Open notifications"}
                  </Link>
                </li>
              </ul>

            </div>
          </div>

          {/* TODO */}
          <ThemeSelector />

          <div className="avatar">
            <div className="w-9 rounded-full">
              <img
                src={authUser?.profilePic}
                alt="User Avatar"
                rel="noreferrer"
              />
            </div>
          </div>

          {/* Logout button */}
          <button className="btn btn-ghost btn-circle" onClick={logoutMutation}>
            <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
