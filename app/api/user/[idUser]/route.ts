import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { genSaltSync, hashSync } from "bcrypt-ts";

// Buat Variabel prisma
const prisma = new PrismaClient()

// Buat service "Delete" (Parameter = id) tb_user

export const DELETE = async (request:NextRequest, props:{params: Promise<{idUser:string}>}) => {
  try{

    const params = await props.params;
    
    // Cek data username tersedia/tidak
    const cek = await prisma.tb_user.findUnique({
      where:{
        id: Number(params.idUser)
      },
    });

    // BUat kondisi jika data ditemukan
    if(!cek){
      // tampilkan respon api
      return NextResponse.json(
        {
          metadata: {
            error: 1,
            message: "Gagal Dihapus!!! Id User Tidak Ditemukan!!!",
          },
        },{
          status:404
        })
      }
      
      await prisma.tb_user.delete({
        where :{
          id: Number(params.idUser)
        }
})

return NextResponse.json(
  {
    metadata: {
      error: 0,
      message: "Berhasil Menghapus!!!",
    },
    dataUser:cek,
  },{
    status:200
  })
}catch(e:any){
  return NextResponse.json(
    {
      metadata: {
        error: 1,
        message: "ID Parameter Harus Angka",
      },
    },{
        status:400
    })
}
}

// Buat service get buat detail data

export const GET = async(request:NextRequest, props:{params: Promise<{idUser:string}>}) => {
  
  try{
    const params = await props.params;
    
  // Cek data username tersedia/tidak
  const cek = await prisma.tb_user.findUnique({
    where:{
      id: Number(params.idUser)
    },
  });

  // BUat kondisi jika data ditemukan
  if(!cek){
    // tampilkan respon api
    return NextResponse.json(
        {
          metadata: {
            error: 1,
            message: "Gagal Ditampilkan!!! Id User Tidak Ditemukan!!!",
          },
        },{
            status:404
        })
}

return NextResponse.json(
  {
      metadata: {
        error: 0,
        message: "Data Ditampilkan!!!",
      },
    dataUser:cek,
  },{
      status:200
  })
} catch(e:any){
  return NextResponse.json(
    {
      metadata: {
        error: 1,
        message: "ID Parameter Harus Angka",
      },
    },{
        status:400
    })
}
}


// Buat Service PUT

export const PUT = async(request:NextRequest, props:{params: Promise<{idUser:string}>}) => {
  try{
    const {namaValue, usernameValue,passwordValue} = await request.json()
    const params = await props.params;
    const salt = genSaltSync(10);
    
  // Cek data username tersedia/tidak
  const cek = await prisma.tb_user.findUnique({
    where:{
      id: Number(params.idUser)
    },
  });

  // BUat kondisi jika data ditemukan
  if(!cek){
    // tampilkan respon api
    return NextResponse.json(
        {
          metadata: {
            error: 1,
            message: "Gagal Update!!! Id User Tidak Ditemukan!!!",
          },
        },{
            status:404
        })
}

// Cek data username tersedia/tidak
const cekUsername = await prisma.tb_user.findMany({
  where:{
    username: usernameValue,
    NOT:{
      id: Number(params.idUser)
    }
  }
});

// BUat kondisi jika data ditemukan
if(cekUsername.length >= 1){
  // tampilkan respon api
  return NextResponse.json(
      {
        metadata: {
          error: 1,
          message: "Gagal Disimpan!!! Username Sudah digunakan!!!",
        },
      },{
          status:409
      })
}

const updateUser = await prisma.tb_user.update({
  where: {
    id: Number(params.idUser),
  },
  data: {
    nama: namaValue,
    username: usernameValue,
    password: hashSync(passwordValue, salt)
  },
})

return NextResponse.json(
  {
    metadata: {
      error: 0,
      message: "Berhasil DIUPDATE!!!",
    },
    dataUser:updateUser,
  },{
    status:200
  })

  }catch(e:any){
    return NextResponse.json(
      {
        metadata: {
          error: 1,
          message: "ID Parameter Harus Angka",
        },
      },{
          status:400
      })
  } 
}