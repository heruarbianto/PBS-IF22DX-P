import { PrismaClient } from "@prisma/client";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { NextResponse } from "next/server";

 export const prisma = new PrismaClient()


//  Buat rspon untuk "User Tidak Ditemukan"

export const getResponseUserNotFound =()=>{

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
    // Buat enkripsi BCry

export const setBcrypt =(password:string)=>{
    const salt = genSaltSync(10);
    return hashSync(password, salt)
}