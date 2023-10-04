import { create } from "zustand";
import { Socket } from "socket.io-client";

export interface IUserData {
  isAuth: boolean;
  user: {
    id: string;
    token: string;
    avatar: string;
    chatHistory: [];
    socket?: Socket;
    username: string;
    nickname: string;
  };
  selectedChat: string | null;

  return: () => IUserData;
  select: (property: keyof IUserData) => any;
  save: (
    property: Partial<IUserData>,
    callback?: (states: IUserData) => void
  ) => void;
}


let storedData: string | null = null;

if (typeof window !== "undefined") {
  storedData = window.localStorage.getItem("user");
}

export const userContextStore = create<IUserData>((set, get) => {
  const initialState: IUserData = {
    isAuth: false,
    user: {
      id: "",
      token: "",
      avatar: "",
      username: "",
      nickname: "",
      chatHistory: [],
    },
    selectedChat: null,
    select: (property: keyof IUserData) => {
      return get()[property];
    },
    save: (property: Partial<IUserData>) => {
      set(property);

      const state = get() as any;

      delete state.save;
      delete state.select;
      delete state.return;

      console.log(state);

      localStorage.setItem("user", JSON.stringify(state));
    },
    return: () => {
      return get();
    },
  };

  if (storedData) {
    let parsedData: Partial<IUserData>;
    try {
      parsedData = JSON.parse(storedData);
    } catch (error: any) {
      console.error(`Error parsing user data: ${error.message}`);
      set(() => initialState);
      return initialState;
    }

    const mergedState = { ...initialState, ...parsedData };
    const missingKeys = Object.keys(initialState).filter(
      (key) => !(key in mergedState)
    );
    if (missingKeys.length) {
      console.warn(`Missing keys in user data: ${missingKeys.join(", ")}`);
    }
    set(() => mergedState);
    return mergedState;
  } else {
    set(() => initialState);
    return initialState;
  }
});
