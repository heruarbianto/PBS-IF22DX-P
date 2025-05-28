"use client";
import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import style from "./style.module.css";
// import Image from "next/image";
import useSWR from "swr";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

// buat variable fetcher
const fetcher = (url: string) => fetch(url).then((res) => res.json());
export default function Home() {
  // BUat hook "useRef"
  const modalRef = useRef<HTMLDialogElement>(null);
  const modalContentRef = useRef<HTMLParagraphElement>(null);
  // Buat hook useState
  const [idUSer, setidUSer] = useState("");
  const [toastMessage, settoastMessage] = useState("")
  const [Toastvisible, seToasttvisible] = useState(false)
  // const [ToastInterval, seToastInterval] = useState(0)


  useEffect(() => {
    // setting toast tampil selama 3 detik
    const timer = setInterval(()=>{
      seToasttvisible(false)
    },3000)

    return()=>clearInterval(timer)
  }, [Toastvisible])
  

  const { data, error, isLoading, mutate } = useSWR(
    "http://localhost:1220/api/user",
    fetcher
  );

  // BUat fungsi untuk hapus data
  const setDelete = async (id: string) => {
    const response =await axios.delete(`http://localhost:1220/api/user/${id}`);
    setidUSer("");
    mutate(data);

    settoastMessage(response.data.metadata.message)
    seToasttvisible(true)
  };

  // BUat Fungsi Open modal
  const openModal = (nama: string, id: string) => {
    setidUSer(id);
    modalRef.current?.showModal();
    modalContentRef.current!.innerHTML = `Data User <strong>${nama}</strong> Ingin Dihapus?`;
  };
  return (
    <div>
      <title>View Data User</title>
      {/* Buat tombol Tambah Data */}
      <section className="text-right">
        <Link href={"/add"} className="btn btn-soft btn-success">
          {" "}
          <FontAwesomeIcon icon={faPlus} />
          Tambah Data
        </Link>
      </section>
      {/* Buat Table */}
      <section className="overflow-x-auto mt-5">
        <table className="table">
          {/* head */}
          <thead>
            <tr className={style["background-th"]}>
              <th className="text-center w-1/5">Aksi</th>
              <th className="text-left w-2/5">Nama</th>
              <th className="text-center w-1/5">Username</th>
              <th className="text-center w-1/5">Password</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data?.metadata.error === 1 ? (
              <tr>
                <td className="text-center" colSpan={4}>
                  {data?.metadata.message}
                </td>
              </tr>
            ) : (
              data?.dataUser.map((item: any, index: number) => (
                <tr key={index} className="hover:bg-base-300">
                  <td className="text-center w-1/5">
                    <Link
                      href={`/edit/${item.id}`}
                      className="px-2 py-1 bg-emerald-700 text-white rounded mr-0.5"
                      title="Ubah Data"
                    >
                      <FontAwesomeIcon
                        icon={faPen}
                        size="1x"
                        shake
                      ></FontAwesomeIcon>
                    </Link>
                    <Link
                      href={"/"}
                      className="px-2 py-1 bg-rose-700 text-white rounded ml-0.5"
                      title="Hapus Data"
                      onClick={() => openModal(item.nama, item.id)}
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        size="1x"
                        shake
                      ></FontAwesomeIcon>
                    </Link>
                  </td>
                  <td className="text-left w-2/5">{item.nama}</td>
                  <td className="text-center w-1/5">{item.username}</td>
                  <td className="text-center w-1/5">
                    <div className={style["text-ellipsis"]}>
                      {item.password}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
      {/* buat toast */}

      {Toastvisible&&(
      <div className="toast">
  <div className="alert alert-info">
    <span>{toastMessage}</span>
  </div>
</div>
      )}
      {/* Buat modal */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Apakah anda yakin</h3>
          <p className="py-4" ref={modalContentRef}></p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn mr-1.5" onClick={() => setDelete(idUSer)}>
                Ya
              </button>
              <button className="btn ml-1.5 btn-primary">Tidak</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
