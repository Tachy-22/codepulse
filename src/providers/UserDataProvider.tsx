"use client";
import React, { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "@/lib/redux/userSlice";
import { FirebaseError } from "firebase/app";
import { User } from "@/types";
//import { getUserId } from "@/lib/utils";

const UserDataProvider = ({
  children,
  user,
}: {
  children: ReactNode;
  user: FirebaseError | { id: string; data: User } | null;
}) => {
 // const userId = getUserId();
  const dispatch = useDispatch();
  useEffect(() => {
    if (user && "data" in user) {
      dispatch(updateUser({ ...user.data, id: user.id }));
    }
  }, [user, dispatch]);

  return <>{children}</>;
};

export default UserDataProvider;
