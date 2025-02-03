"use client";

import { IoMdLogOut } from "react-icons/io";
import ConfirmationBox from "./confirmation.box";
import { confirmAlert } from "react-confirm-alert";
import Cookies from "js-cookie";
import { useWixClientContext } from "@/contexts/wix-context";
import { cn } from "@/utils/cn";
import useCurrentMember from "@/hooks/useCurrentMember";

function LogoutButton({
  className,
  onLogout,
}: {
  className?: string;
  onLogout?: () => void;
}) {
  const wixClient = useWixClientContext();
  const { member } = useCurrentMember();

  function handleLogout() {
    confirmAlert({
      customUI: ({ onClose }: { onClose: () => void }) => {
        if (!!onLogout) onLogout();
        return (
          <ConfirmationBox
            icon={<IoMdLogOut />}
            judul="Konfirmasi Logout"
            pesan="Apakah anda yakin ingin melakukan logout?"
            onClose={onClose}
            onClickIya={async () => {
              Cookies.remove("refreshToken");

              if (typeof window !== "undefined") {
                const { logoutUrl } = await wixClient.auth.logout(
                  window.location.origin + "/"
                );

                window.location.href = logoutUrl;
              }
            }}
            labelIya="Yakin"
            labelTidak="Hmm, sebentar."
          />
        );
      },
    });
  }

  return (
    !!member && (
      <button
        className={`${cn(
          " bg-red-300 text-red-500 transition-all hover:bg-red-200 flex gap-1 items-center p-2",
          className
        )}`}
        onClick={handleLogout}
      >
        <IoMdLogOut className="text-xl" />
        <span>Logout</span>
      </button>
    )
  );
}

export default LogoutButton;
