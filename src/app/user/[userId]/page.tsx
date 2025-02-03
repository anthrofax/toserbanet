"use client";

import Loader from "@/components/loader";
import UpdateModal from "@/components/user/update-modal";
import { useWixClientContext } from "@/contexts/wix-context";
import { generateRandomString } from "@/utils/random-string";
import { useQuery } from "@tanstack/react-query";
import { members } from "@wix/members";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineArrowForwardIos, MdOutlineContentCopy } from "react-icons/md";

function UserPage() {
  const [isModalNicknameOpen, setIsModalNicknameOpen] = useState(false);
  const [isModalAddressOpen, setIsModalAddressOpen] = useState(false);
  const wixClient = useWixClientContext();

  const { data, isLoading } = useQuery({
    queryKey: ["currentMember"],
    queryFn: async () => {
      const currentMember = await wixClient.members.getCurrentMember({
        fieldsets: [members.Set.FULL],
      });

      if (!currentMember) return { member: null };

      return {
        member: { ...currentMember.member },
      };
    },
  });

  const member = data?.member;
  const [newNickname, setNewNickname] = useState(
    member?.profile?.nickname || ""
  );
  const [newAddress, setNewAddress] = useState(
    member?.contact?.addresses[0]?.addressLine || ""
  );

  if (isLoading) return <Loader />;

  console.log(data);

  function handleCloseModal(setIsOpenModal: Dispatch<SetStateAction<boolean>>) {
    setIsOpenModal(false);
    setNewNickname(member?.profile?.nickname || "");
  }

  const handleCopy = (id: string) => {
    if (id) {
      navigator.clipboard
        .writeText(id)
        .then(() => {
          toast.success("Id berhasil dicopy ke clipboard mu");
        })
        .catch((err) => {
          console.error("Gagal saat copy userId: ", err);
        });
    }
  };

  return (
    <div className="pt-5 lg:pt-10 flex flex-col items-center justify-center w-full">
      <div className="flex flex-col items-center py-3 w-full">
        <Image
          src={`${member?.profile?.photo?.url}`}
          alt=""
          className="rounded-full overflow-hidden"
          width={72}
          height={72}
        />
        <button className="text-blue-500 p-3 font-medium">
          Ubah Foto Profil
        </button>
      </div>

      <div className="space-y-2 w-full">
        <hr className=" w-full mb-3" />

        <div className="grid grid-cols-6 gap-y-8  p-3">
          <h3 className="text-lg font-semibold col-span-6">Info Profil</h3>
          <div className="col-span-2 text-slate-700">Nama</div>
          <button
            className="col-span-4 flex justify-between gap-3"
            onClick={() => setIsModalNicknameOpen(true)}
          >
            <span>{member?.profile?.nickname}</span>
            <MdOutlineArrowForwardIos />
          </button>

          <UpdateModal
            key={"nickname"}
            handleClose={() => {
              handleCloseModal(setIsModalNicknameOpen);
            }}
            isOpen={isModalNicknameOpen}
            modalTitle="Ubah Nama Pengguna"
            userId={member?.contactId || ""}
            onSuccessTask={() => {
              setNewNickname(newNickname);
            }}
            updatedField={{
              profile: {
                nickname: newNickname,
              },
            }}
          >
            <input
              type="text"
              value={newNickname}
              onChange={(e) => setNewNickname(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-md"
              placeholder="Masukkan nama baru"
            />
          </UpdateModal>
          <div className="col-span-2 text-slate-700">Username</div>
          <div className="col-span-4 flex justify-between gap-3 cursor-not-allowed">
            <span>@{member?.profile?.slug}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2 w-full">
        <hr className=" w-full mb-3" />

        <div className="grid grid-cols-6 gap-y-8  p-3">
          <h3 className="text-lg font-semibold col-span-6">Info Pribadi</h3>
          <div className="col-span-2 text-slate-700">User ID</div>
          <button
            className="col-span-4 flex justify-between gap-3 text-start"
            onClick={() => {
              handleCopy(member?.contactId || "");
            }}
          >
            <span>{member?.contactId}</span>
            <MdOutlineContentCopy className="flex-shrink-0" />
          </button>{" "}
          <div className="col-span-2 text-slate-700">Email</div>
          <div className="col-span-4 flex justify-between gap-3 text-start cursor-not-allowed">
            <span>{member?.loginEmail ? member.loginEmail : ""}</span>
          </div>
          <div className="col-span-2 text-slate-700">Nomor HP</div>
          <button
            className={`col-span-4 flex justify-between gap-3 text-start ${
              member?.contact?.phones && member.contact.phones.length > 0
                ? "text-slate-700"
                : "text-slate-500"
            }`}
          >
            <span>
              {member?.contact?.phones && member.contact.phones.length > 0
                ? member.contact.phones[0]
                : "Atur Nomor HP anda disini"}
            </span>
            <MdOutlineArrowForwardIos className="flex-shrink-0" />
          </button>
          <div className="col-span-2 text-slate-700">Alamat</div>
          <button
            className={`col-span-4 flex justify-between gap-3 text-start ${
              member?.contact?.addresses && member.contact.addresses.length > 0
                ? "text-slate-700"
                : "text-slate-500"
            }`}
            onClick={() => {
              setIsModalAddressOpen(true);
            }}
          >
            <span>
              {member?.contact?.addresses && member.contact.addresses.length > 0
                ? member.contact.addresses[0]?.addressLine
                : "Atur Alamat anda disini"}
            </span>
            <MdOutlineArrowForwardIos className="flex-shrink-0" />
          </button>
          <UpdateModal
            key={"address"}
            handleClose={() => {
              handleCloseModal(setIsModalAddressOpen);
            }}
            isOpen={isModalAddressOpen}
            modalTitle="Perbarui alamatmu disini"
            userId={member?.contactId || ""}
            onSuccessTask={() => {
              setNewAddress(newAddress);
            }}
            updatedField={{
              contact: {
                addresses: [
                  {
                    _id: generateRandomString(16),
                    addressLine: newAddress,
                  },
                ],
              },
            }}
          >
            <input
              type="text"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-md"
              placeholder="Masukkan alamat lengkapmu disini"
            />
          </UpdateModal>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
