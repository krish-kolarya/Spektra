import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserFriends } from "../lib/api";
import FriendCard from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFriend } from "../lib/api";
import toast from "react-hot-toast";

const FriendsPage = () => {
  const { data: friends = [], isLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

const [searchTerm, setSearchTerm] = useState("");
const [sortBy, setSortBy] = useState("name-asc");
const [selectedFriend, setSelectedFriend] = useState(null);
const [friendToRemove, setFriendToRemove] = useState(null);

const filteredFriends = friends
  .filter((friend) =>
    friend.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .sort((a, b) => {
    if (sortBy === "name-asc") {
      return a.fullName.localeCompare(b.fullName);
    }

    return b.fullName.localeCompare(a.fullName);
  });


  const queryClient = useQueryClient();

  const { mutate: removeFriendMutation } = useMutation({
    mutationFn: removeFriend,

        onSuccess: () => {
      toast.success("Friend removed");

      queryClient.invalidateQueries({
        queryKey: ["friends"],
      });

      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      queryClient.invalidateQueries({
        queryKey: ["outgoingFriendReqs"],
      });

      queryClient.invalidateQueries({
        queryKey: ["friendRequests"],
      });
    },
  });


  return (
<div className="container mx-auto space-y-10">

  {/* Header */}
  <div>
    <div className="flex items-center gap-3">
      <h1 className="text-3xl font-bold">Friends</h1>

      <div className="badge badge-outline">
        {friends.length}
      </div>
    </div>

    <p className="text-base-content opacity-70 mt-1">
      Manage and chat with your language partners
    </p>
  </div>

  {/* Search */}
  <div className="flex flex-col md:flex-row gap-3">
    <input
      type="text"
      placeholder="Search friends..."
      className="input input-bordered w-full"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />

    <select
      className="select select-bordered"
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
    >
      <option value="name-asc">Name A-Z</option>
      <option value="name-desc">Name Z-A</option>
    </select>
  </div>

  <p className="text-sm opacity-70">
    Showing {filteredFriends.length} of {friends.length} friends
  </p>

  {/* Friends */}
  {isLoading ? (
    <div className="flex justify-center py-12">
      <span className="loading loading-spinner loading-lg" />
    </div>
  ) : friends.length === 0 ? (
    <NoFriendsFound />
  ) : filteredFriends.length === 0 ? (
    <div className="card bg-base-200 p-6 text-center">
      <h3 className="font-semibold text-lg mb-2">
        No friends found
      </h3>
      <p className="text-base-content opacity-70">
        No friends match "{searchTerm}"
      </p>
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredFriends.map((friend) => (
        <FriendCard key={friend._id} friend={friend} onClick={() => setSelectedFriend(friend)} onRemove={() => setFriendToRemove(friend)}/>
      ))}
    </div>
  )}

{friendToRemove && (
  <dialog className="modal modal-open">
    <div className="modal-box">
      <h3 className="font-bold text-lg">
        Remove Friend
      </h3>

      <p className="py-4">
        Are you sure you want to remove{" "}
        <strong>{friendToRemove.fullName}</strong>?
      </p>

      <div className="modal-action">
        <button
          className="btn"
          onClick={() => setFriendToRemove(null)}
        >
          Cancel
        </button>

        <button
          className="btn btn-error"
          onClick={() => {
            removeFriendMutation(friendToRemove._id);
            setFriendToRemove(null);
          }}
        >
          Remove
        </button>
      </div>
    </div>
  </dialog>
)}

</div>
  );
};

export default FriendsPage;