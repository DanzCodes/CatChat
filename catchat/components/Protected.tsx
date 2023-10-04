"use client";

import React from "react";
import { redirect } from "next/navigation";
import { userContextStore } from "../store/userStore";

const Protected = ({ children }: { children: React.ReactNode }) => {
  
  const { isAuth } = userContextStore();
  if(!isAuth) redirect("/");

  return children;
};

export default Protected;
