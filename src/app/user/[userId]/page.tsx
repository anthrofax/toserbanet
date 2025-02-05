"use client";

import Loader from "@/components/loader";
import UpdateModal from "@/components/user/update-modal";
import { useWixClientContext } from "@/contexts/wix-context";
import { generateRandomString } from "@/utils/random-string";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { members } from "@wix/members";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineArrowForwardIos, MdOutlineContentCopy } from "react-icons/md";
import {
  getCldImageUrl,
  CldUploadButton,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";

function UserPage() {
  const [isModalNicknameOpen, setIsModalNicknameOpen] = useState(false);
  const [isModalAddressOpen, setIsModalAddressOpen] = useState(false);
  const [isModalPhoneOpen, setIsModalPhoneOpen] = useState(false);
  const [inputError, setError] = useState<string | null>(null);
  const wixClient = useWixClientContext();
  const queryClient = useQueryClient();

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

  const { mutate: handleSaveNewPhoto, isPending } = useMutation({
    mutationKey: ["currentMember"],
    mutationFn: async ({ newProfilePhoto }: { newProfilePhoto: string }) => {
      if (newProfilePhoto) {
        if (!member?.contactId) throw new Error("Contact Id tidak valid");

        await wixClient.members.updateMember(member?.contactId, {
          profile: {
            photo: {
              url: photoPreview || "",
            },
          },
        });
      } else {
        throw new Error("User tidak menyertakan gambar");
      }
    },
    onError: (err: any) => {
      console.error("Gagal memperbarui foto profil:", err);
      toast.error("Gagal memperbarui foto profil");
    },
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: ["currentMember"],
      });

      setPhotoPreview(null);
      toast.success("Foto profil berhasil diperbarui!");
    },
  });
  const [newNickname, setNewNickname] = useState(
    member?.profile?.nickname || ""
  );
  const [newAddress, setNewAddress] = useState(
    member?.contact?.addresses[0]?.addressLine || ""
  );
  const [newPhone, setNewPhone] = useState(
    (member?.contact?.phones && member.contact.phones[0]) || "" // New phone number state
  );
  const [photoPreview, setPhotoPreview] = useState<string | null>(null); // Preview for new photo

  useEffect(() => {
    setNewNickname(member?.profile?.nickname || "");
    setNewAddress(member?.contact?.addresses[0]?.addressLine || "");
    setNewPhone((member?.contact?.phones && member.contact.phones[0]) || "");
  }, [isLoading, isModalAddressOpen, isModalPhoneOpen, isModalNicknameOpen]);

  if (isLoading) return <Loader />;

  function handleCloseModal(setIsOpenModal: Dispatch<SetStateAction<boolean>>) {
    setIsOpenModal(false);
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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const cleanedPhone = input.replace(/\D/g, ""); // Hanya angka

    if (cleanedPhone.length === 0) {
      setNewPhone("");
      return;
    }

    console.log(newPhone);

    // Pastikan hanya memproses nomor dengan awalan '62'
    if (cleanedPhone.startsWith("62")) {
      setError(null);
      setNewPhone(formatPhoneNumber(cleanedPhone));
    } else {
      setNewPhone(cleanedPhone);
      setError(
        "Nomor yang anda masukkan tidak sesuai format, pastikan nomor yang dimasukkan diawali dengan 628"
      );
    }
  };

  const formatPhoneNumber = (phone: string) => {
    // Menghapus kode negara "62" di awal
    const number = phone.substring(2);

    // Format nomor telepon berdasarkan panjang string yang tersedia
    if (number.length <= 3) {
      return `+62 ${number}`;
    } else if (number.length <= 7) {
      return `+62 ${number.substring(0, 3)}-${number.substring(3)}`;
    } else {
      return `+62 ${number.substring(0, 3)}-${number.substring(
        3,
        7
      )}-${number.substring(7)}`;
    }
  };

  const handlePhotoChange = (result: CloudinaryUploadWidgetResults) => {
    if (typeof result.info !== "object")
      return toast.error("Tidak ada gambar yang diunggah");

    const newPhotoUrl = result.info.url || "";
    setPhotoPreview(newPhotoUrl);
  };

  return (
    <div className="py-3 lg:pt-10 flex flex-col items-center justify-center w-full">
      <div className="flex flex-col items-center py-3 w-full">
        <Image
          src={
            photoPreview ||
            member?.profile?.photo?.url ||
            "https://res.cloudinary.com/dmc0cvmf5/image/upload/v1721879584/empty-profile_d7fhjp.webp"
          }
          alt=""
          className="rounded-full overflow-hidden"
          width={72}
          height={72}
        />
        <div className="mt-3">
          {/* CldUploadButton untuk mengupload gambar ke Cloudinary */}
          <CldUploadButton
            uploadPreset={process.env.NEXT_PUBLIC_UPLOAD_PRESET!}
            onSuccess={handlePhotoChange}
            options={{ maxFiles: 1, cropping: true }}
          >
            <button className="text-blue-500 cursor-pointer">
              Ubah Foto Profil
            </button>
          </CldUploadButton>
        </div>

        {photoPreview && (
          <div className="mt-3">
            <button
              onClick={() => {
                if (!photoPreview) return toast.error("Gambar belum diunggah");
                handleSaveNewPhoto({ newProfilePhoto: photoPreview });
              }}
              className={`px-4 py-2 rounded-md ${
                isPending
                  ? "text-slate-700 bg-slate-300 cursor-not-allowed"
                  : "text-white bg-blue-500 cursor-pointer"
              }`}
              disabled={isPending}
            >
              Simpan Foto
            </button>
          </div>
        )}
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
              handleCloseModal(setIsModalNicknameOpen);
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
            onClick={() => setIsModalPhoneOpen(true)}
          >
            <span>
              {member?.contact?.phones && member.contact.phones.length > 0
                ? member.contact.phones[0]
                : "Atur Nomor HP anda disini"}
            </span>
            <MdOutlineArrowForwardIos className="flex-shrink-0" />
          </button>
          <UpdateModal
            key={"nomorHp"}
            modalDescription={`Masukkan nomor dengan format "628xxxxx"`}
            handleClose={() => {
              handleCloseModal(setIsModalPhoneOpen);
            }}
            isOpen={isModalPhoneOpen}
            modalTitle="Perbarui nomor teleponmu disini"
            userId={member?.contactId || ""}
            onSuccessTask={() => {
              handleCloseModal(setIsModalPhoneOpen);
            }}
            updatedField={{
              contact: {
                phones: [newPhone],
              },
            }}
            inputError={inputError}
          >
            <input
              type="text"
              value={newPhone}
              onChange={handlePhoneChange}
              className="w-full p-2 border border-slate-300 rounded-md"
              placeholder="Masukkan nomor teleponmu yang baru"
            />
          </UpdateModal>
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
              handleCloseModal(setIsModalAddressOpen);
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
