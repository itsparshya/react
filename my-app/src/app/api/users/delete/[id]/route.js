import pool from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";

export async function DELETE(req,{params}) {
  try {
   // const { id} = await req.json();
      const id  =await params.id;
    console.log("id to delete",id);
    const query = "DELETE FROM users WHERE id = ?";

   const result=await pool.execute(query, [id]);
    if (result.affectedRows === 0) {
      return new NextResponse("User not found", { status: 404 });
    }
    return new NextResponse(
      JSON.stringify({ message: "User deleted successfully" }),
      { status: 200 }
    );  
  } catch (error) {
    console.log(error.message);
    return new NextResponse("Failed to delete data", { status: 500 });
  } 
}
