import { useContext } from "react";
import { useLoaderData, useNavigate, useLocation } from "react-router-dom";
import { DotsThree } from "@phosphor-icons/react";
import * as Popover from "@radix-ui/react-popover";

import Logo from "/openai.svg";

import { UserPayloadProps } from "../pages/Home";

import { AuthContext } from "../contexts/AuthContext";
import clsx from "clsx";

export function Header() {
  const { signOut } = useContext(AuthContext);

  const { name, email } = useLoaderData() as UserPayloadProps;

  const navigate = useNavigate();
  const location = useLocation();

  function handleSignOut() {
    signOut();
    navigate("/login");
  }

  return (
    <div className="p-5 flex items-center justify-between border-b border-gray-200 bg-background">
      <div className="flex items-center gap-2 xs:gap-5">
        <img src={Logo} alt="OpenAi Logo" className="w-6" />
        <a onClick={() => navigate("/")} className="cursor-pointer">
          <span
            className={clsx("font-semibold text-sm tracking-wide", {
              ["opacity-100"]: location.pathname === "/",
              ["opacity-60"]: location.pathname !== "/",
            })}
          >
            DALL·E
          </span>
        </a>

        <a onClick={() => navigate("/create")} className="cursor-pointer">
          <span
            className={clsx("font-semibold text-sm tracking-wide", {
              ["opacity-100"]: location.pathname === "/create",
              ["opacity-60"]: location.pathname !== "/create",
            })}
          >
            Criar
          </span>
        </a>

        <a onClick={() => navigate("/history")} className="cursor-pointer">
          <span
            className={clsx("font-semibold text-sm tracking-wide", {
              ["opacity-100"]: location.pathname === "/history",
              ["opacity-60"]: location.pathname !== "/history",
            })}
          >
            Histórico
          </span>
        </a>
      </div>

      <Popover.Root>
        <Popover.Trigger asChild>
          <button className="flex items-center gap-2 hover:opacity-80">
            <DotsThree size={24} className="fill-gray-700" />
            <div className="w-6 h-6 font-medium text-white bg-gray-900 rounded-full relative">
              <div className="w-full absolute top-full left-full -translate-x-full -translate-y-full">
                {name[0]}
              </div>
            </div>
          </button>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content align="end" sideOffset={5}>
            <div className="bg-white border rounded-xl shadow-md [&>div:hover]:bg-gray-100 overflow-hidden">
              <div
                className="flex flex-col px-2 py-1 border-b"
                onClick={() => navigate("/history")}
              >
                <span className="font-medium text-sm text-gray-800">
                  {name}
                </span>
                <span className="font-medium text-xs text-gray-500">
                  {email}
                </span>
              </div>

              <div className="flex flex-col px-2 py-1 border-b">
                <button
                  onClick={() => navigate("/history")}
                  className="text-left font-medium text-sm text-gray-800"
                >
                  Histórico
                </button>
              </div>

              <div className="flex flex-col px-2 py-1">
                <button
                  onClick={handleSignOut}
                  className="text-left font-medium text-sm text-gray-800"
                >
                  Sair
                </button>
              </div>
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
