"use client";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

export default function tambahDataUser() {
  const [erorNamaVisible, seterorNamaVisible] = useState(false);
  const [erorUsernameVisible, seterorUsernameVisible] = useState(false);
  const [erorPasswordVisible, seterorpasswordVisible] = useState(false);

  //   Buat hook useRef untuk Isi pesan error
  const errMsgNama = useRef<HTMLParagraphElement>(null);
  const errMsgUserName = useRef<HTMLParagraphElement>(null);
  const errMsgPassword = useRef<HTMLParagraphElement>(null);
  const dataNama = useRef<HTMLInputElement>(null);
  const dataUsername = useRef<HTMLInputElement>(null);
  const dataPassword = useRef<HTMLInputElement>(null);
  // Buat hook untuk response pesan error
  useEffect(() => {
    // seterorNamaVisible(false)
    if (errMsgNama.current) {
      errMsgNama.current.innerHTML = "Nama User Harus Diisi !";
    }
    if (errMsgUserName.current) {
      errMsgUserName.current.innerHTML = "Username Harus Diisi !";
    }
    if (errMsgPassword.current) {
      errMsgPassword.current.innerHTML = "Password Harus Diisi !";
    }
  }, [erorNamaVisible, erorPasswordVisible, erorUsernameVisible]);

  const setReload = () => {
    location.href = "/add";
  };

  // BUat Fungsi Untuk Simpan Data
  const setSave = () => {
    // Jika txt nama tidak diisi
    dataNama.current!.value == ""
      ? seterorNamaVisible(true)
      : seterorNamaVisible(false);
    dataUsername.current!.value == ""
      ? seterorUsernameVisible(true)
      : seterorUsernameVisible(false);
    dataPassword.current!.value == ""
      ? seterorpasswordVisible(true)
      : seterorpasswordVisible(false);

      if(dataNama.current!.value && dataUsername.current!.value && dataPassword.current!.value){
         // simpan data (kirim ke service POST)
      // simpan data (kirim ke service POST)
      axios
        .post("http://localhost:1220/api/user", {
          namaValue: dataNama.current!.value,
          usernameValue: dataUsername.current!.value,
          passwordValue: dataPassword.current!.value,
        })
        .then((response) => {
          alert(response.data.metadata.message);
          setReload()
        })
        .catch((error) => {
          // if (error.response?.status === 409) {
            alert(error.message);
          // }
          // else
          // {

          // }
      })
    }
  };

  return (
    <div>
      <title>Tambah Data</title>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Nama User</legend>
        <input
          ref={dataNama}
          type="text"
          className="input"
          placeholder="Isi Nama User"
        />
        {erorNamaVisible && (
          <p ref={errMsgNama} className="label text-red-700"></p>
        )}
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Username</legend>
        <input
          ref={dataUsername}
          type="text"
          className="input"
          placeholder="Username"
        />
        {erorUsernameVisible && (
          <p ref={errMsgUserName} className="label text-red-700"></p>
        )}
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Password</legend>
        <input
          ref={dataPassword}
          type="password"
          className="input"
          placeholder="*********"
        />
        {erorPasswordVisible && (
          <p ref={errMsgPassword} className="label text-red-700"></p>
        )}
      </fieldset>
      <section className="mt-5">
        <button onClick={setSave} className="btn btn-accent mr-1.5 w-30">
          Simpan
        </button>
        <button
          onClick={setReload}
          className="btn btn-outline btn-warning ml-1.5 w-30"
        >
          Batal
        </button>
      </section>
    </div>
  );
}
