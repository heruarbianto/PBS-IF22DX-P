'use client'
import axios from 'axios';
import { useDynamicRouteParams } from 'next/dist/server/app-render/dynamic-rendering';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'

export default function EditUser({ params }: { params: { id: string } }) {
  params = useParams()

  // Buat variabel untuk respon slug
  // const params = props.params;

  // buat hook userstate
  // const [idValue, setIdValue] = useState("");
  // buat hook "useRef" untuk detail data
  const [erorNamaVisible, seterorNamaVisible] = useState(false);
  const [erorUsernameVisible, seterorUsernameVisible] = useState(false);
  const [erorPasswordVisible, seterorpasswordVisible] = useState(false);
  const [erorNamamsg, seterorNamamsg] = useState("");
  const [erorUsernamemsg, seterorUsernamemsg] = useState("");
  const [erorPasswordmsg, seterorpasswordmsg] = useState("");

  const setReload = () => {
    location.href = "/";
  };
  //   Buat hook useRef untuk Isi pesan error
  const errMsgNama = useRef<HTMLParagraphElement>(null);
  const errMsgUserName = useRef<HTMLParagraphElement>(null);
  const errMsgPassword = useRef<HTMLParagraphElement>(null);
  // Buat variable router
  const router = useRouter()
  const dataNama = useRef<HTMLInputElement>(null)
  const dataUsername = useRef<HTMLInputElement>(null)
  const dataPassword = useRef<HTMLInputElement>(null)
  // alert(params.id)
  const getDetailData = async (id: string) => {
    //  ambil service detail
    await axios.get(`http://localhost:1220/api/user/${id}`)
      .then((Response) => {
        // alert(Response.data.metaData.status)
        // Kondisi jika status 404
        if (Response.data.metadata.status == 404) {
          router.push("/404")
        }
        else if (Response.data.metadata.status == 400) {
          router.push("/400")
        }else{
            dataNama.current!.value = Response.data.dataUser.nama
            dataUsername.current!.value = Response.data.dataUser.username
            dataPassword.current!.value = "*****"
        }
      })
  }

  // Buat fungsi untuk ubah data
  const setUpdtaeData = ()=>{
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
       .put(`http://localhost:1220/api/user/${params.id}`, {
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
  }
  //panggil fungsi get detail data
  useEffect(() => {
    getDetailData(params.id);
    // seterorNamaVisible(false)
    // if (errMsgNama.current) {
    //   errMsgNama.current.innerHTML = "Nama User Harus Diisi !";
    // }
    // if (errMsgUserName.current) {
    //   errMsgUserName.current.innerHTML = "Username Harus Diisi !";
    // }
    // if (errMsgPassword.current) {
    //   errMsgPassword.current.innerHTML = "Password Harus Diisi !";
    // }

    seterorNamamsg("Nama User Wajib Diisi!!!")
    seterorUsernamemsg("Username User Wajib Diisi!!!")
    seterorpasswordmsg("Password User Wajib Diisi!!!")
  },[])


  return (
    <div>
      <title>Ubah Data User</title>

      <fieldset className="fieldset">
        <legend className="fieldset-legend">Nama User</legend>
        <input
          ref={dataNama}
          type="text"
          className="input"
          placeholder="Isi Nama User"
        />

{erorNamaVisible && (
          <p  className="label text-red-700">{erorNamamsg}</p>
        )}

      </fieldset>

      <fieldset className="fieldset">
        <legend className="fieldset-legend">Username User</legend>
        <input
          ref={dataUsername}
          type="text"
          className="input"
          placeholder="Isi Username User"
        />
  {erorUsernameVisible && (
          <p className="label text-red-700">{erorUsernamemsg}</p>
        )}
      </fieldset>

      <fieldset className="fieldset">
        <legend className="fieldset-legend">Password User</legend>
        <input
          ref={dataPassword}
          type="password"
          className="input"
          placeholder="Isi Nama User"
        />
{erorPasswordVisible && (
          <p className="label text-red-700">{erorPasswordmsg}</p>
        )}
      </fieldset>

      <section className="mt-5">
        <button onClick={setUpdtaeData} className="btn btn-success mr-1.5 w-30">
          Ubah
        </button>
        <button className="btn btn-soft ml-1.5 w-30">
          Batal
        </button>
      </section>
    </div>
  )
}