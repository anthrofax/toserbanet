import { wixClientServer } from "@/lib/wix-client-server";
import { members } from "@wix/members";
import Image from "next/image";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { MdOutlineContentCopy } from "react-icons/md";
async function UserPage() {
  // const wixClient = await wixClientServer();

  // const member = await wixClient.members.getCurrentMember({
  //   fieldsets: [members.Set.EXTENDED],
  // });

  // console.log(member);

  return (
    <div className="mt-5 flex flex-col items-center">
      <div className="flex flex-col items-center py-3 w-full">
        <Image
          src={
            "https://res.cloudinary.com/dmc0cvmf5/image/upload/v1721879584/empty-profile_d7fhjp.webp"
          }
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
          <button className="col-span-4 flex justify-between gap-3">
            <span>Afridho Ikhsan</span>
            <MdOutlineArrowForwardIos />
          </button>
          <div className="col-span-2 text-slate-700">Username</div>
          <button className="col-span-4 flex justify-between gap-3">
            <span>@afridho</span>
            <MdOutlineArrowForwardIos />
          </button>
        </div>
      </div>

      <div className="space-y-2 w-full">
        <hr className=" w-full mb-3" />

        <div className="grid grid-cols-6 gap-y-8  p-3">
          <h3 className="text-lg font-semibold col-span-6">Info Pribadi</h3>
          <div className="col-span-2 text-slate-700">User ID</div>
          <button className="col-span-4 flex justify-between gap-3 text-start">
            <span>
              {"8faeed71-f683-4fcd-8e48-6af5764b1091".length > 18
                ? `${"8faeed71-f683-4fcd-8e48-6af5764b1091".slice(0, 18)}...`
                : "8faeed71-f683-4fcd-8e48-6af5764b1091"}
            </span>
            <MdOutlineContentCopy className="flex-shrink-0" />
          </button>
          <div className="col-span-2 text-slate-700">Email</div>
          <button className="col-span-4 flex justify-between gap-3 text-start">
            <span>
              {"afridhoikhsan@gmail.com".length > 18
                ? `${"afridhoikhsan@gmail.com".slice(0, 18)}...`
                : "afridhoikhsan@gmail.com"}
            </span>
            <MdOutlineArrowForwardIos className="flex-shrink-0" />
          </button>
          <div className="col-span-2 text-slate-700">Nomor HP</div>
          <button className={`col-span-4 flex justify-between gap-3 text-start ${true ? 'text-slate-500' : 'text-slate-700'}`}>
            <span>
              {true ? "Atur Nomor HP anda disini" : "081234567890"}
            </span>
            <MdOutlineArrowForwardIos className="flex-shrink-0" />
          </button>
          <div className="col-span-2 text-slate-700">Alamat</div>
          <button className={`col-span-4 flex justify-between gap-3 text-start ${true ? 'text-slate-500' : 'text-slate-700'}`}>
            <span>
              {true
                ? "Atur Alamat anda disini"
                : "Jl. Jendral Sudirman No. 1 Bandung Indonesia"}
            </span>
            <MdOutlineArrowForwardIos className="flex-shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
