import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

// Buat Variabel prisma
const prisma = new PrismaClient()

// Buat service "Delete" (Parameter = id) tb_user

export const DELETE = async(request:NextRequest,{params}:{params:{idUser:string}})=>{

      // Cek data username tersedia/tidak
  const cek = await prisma.tb_user.findUnique({
    where:{
      id: Number(params.idUser)
    }
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
        message: "Data Berhasil Dihapus!!!",
      },
    },{
        status:200
    })


}