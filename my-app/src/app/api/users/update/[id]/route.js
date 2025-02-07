import pool from "@/dbConfig/dbConfig"; // Adjust the path to your actual DB file
import { NextResponse } from "next/server";

export async function PUT(req) {
  
  try {
    const { id, name, email, phone, dob, aadhaar, address } = await req.json();
  console.log(id, name, email, phone, dob, aadhaar, address);
  console.log("updaing user...................");
  const query = `UPDATE users SET name = ?, email = ?, phone = ?, dob = ?, aadhaar = ?, address = ? WHERE id = ?`;

    pool.execute(query, [name, email, phone, dob, aadhaar, address, id]);
    return new NextResponse(
      JSON.stringify({ message: "User updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding data:", error);
    return new NextResponse("Failed to update data", { status: 500 });
  }
}
