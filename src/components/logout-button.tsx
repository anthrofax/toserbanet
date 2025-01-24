"use client";

import { IoMdLogOut } from "react-icons/io";
import ConfirmationBox from "./confirmation.box";
import { confirmAlert } from "react-confirm-alert";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";
import { useWixClientContext } from "@/contexts/wix-context";

function LogoutButton({ className }: { className?: string }) {
  const wixClient = useWixClientContext();

  return (
    <button
      className={`${cn(
        className,
        " bg-red-300 text-red-500 transition-all hover:bg-red-200"
      )}`}
      onClick={() =>
        confirmAlert({
          customUI: ({ onClose }: { onClose: () => void }) => {
            return (
              <ConfirmationBox
                icon={<IoMdLogOut />}
                judul="Konfirmasi Logout"
                pesan="Apakah anda yakin ingin melakukan logout?"
                onClose={onClose}
                onClickIya={async () => {
                  Cookies.remove("refreshToken");
                  const { logoutUrl } = await wixClient.auth.logout(
                    window.location.origin + "/"
                  );

                  window.location.href = logoutUrl;
                }}
                labelIya="Sudah"
                labelTidak="Sebentar, saya cek lagi"
              />
            );
          },
        })
      }
    >
      <IoMdLogOut className="text-xl" />
      <span>Logout</span>
    </button>
  );
}

export default LogoutButton;
