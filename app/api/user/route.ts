import { metadata } from "@/app/layout";
import { PrismaClient } from "@prisma/client";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

// Buat variabel prisma
const prisma = new PrismaClient();

// Buat fungsi get
export const GET = async () => {
    // ambil data dari database
  const view = await prisma.tb_user.findMany({});

// jika data tidak ada 
if(view.length == 0){
    // tampilkan respon api
    return NextResponse.json(
        {
          metadata: {
            error: 1,
            message: "Data User Tidak Ditemukan",
          },
        },{
            status:404
        })
}
// tampilkan respon api
  return NextResponse.json(
    {
      metadata: {
        error: 0,
        message: null,
      },
      dataUser: view,
    },
    {
      status: 200,
    }
  );
};
