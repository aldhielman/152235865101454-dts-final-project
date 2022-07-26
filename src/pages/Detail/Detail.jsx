import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";

function Detail() {
  const [user] = useAuthState(auth);
  return <div>Detail {user?.displayName}</div>;
}

export default Detail;
