"use client";

import { LoaderCircle, Trash2 } from "lucide-react";
import deleteBirthdayAction from "@/lib/actions/delete-birthday";
import { useState } from "react";

const DeleteButton = ({ id }: { id: string }) => {
  const [isPending, setIsPending] = useState(false);

  const handleDelete = async () => {
    setIsPending(true);
    await deleteBirthdayAction(id);
  };
  return (
    <button className="opacity-0 group-hover:opacity-100 transition-opacity" onClick={handleDelete}>
      {isPending ? (
        <LoaderCircle className="animate-spin w-4 h-4 text-red-500" />
      ) : (
        <Trash2 className="w-4 h-4 text-red-500 hover:text-red-600" />
      )}
    </button>
  );
};
export default DeleteButton;
