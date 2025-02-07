import { NextResponse } from "next/server";
import pool from "../../../dbConfig/dbConfig"; // Adjust the path to your actual DB file

export async function GET(req) {
    try {
      const query = 'SELECT * FROM users';
      
      console.log("loading users...................")
      // Using async/await with the promise-based API
      const [results] = await pool.execute(query);  // execute returns results as an array
  
      return new NextResponse(JSON.stringify(results),{ status: 200,message: 'Retrived All the Users' });
    } catch (err) {
      console.error('Error fetching data:', err);
      return new NextResponse('Failed to fetch data', { status: 500 });
    }
}

export async function POST(req) {
    try {
      const { name, email, phone, dob, aadhaar, address } = await req.json();
      const query = `INSERT INTO users (name, email, phone, dob, aadhaar, addresS) VALUES (?, ?, ?, ?, ?, ?)`;
      
      console.log("adding user...................")
      // Using async/await with the promise-based API
      const [results] = await pool.execute(query,[name, email, phone, dob, aadhaar, address]);  // execute returns results as an array
  
      return new NextResponse(JSON.stringify(results),{ status: 201 ,message: 'created the Users' });
    } catch (err) {
      console.error('Error adding data:', err);
      return new NextResponse ('Failed to Add data', { status: 500 });
    }
  }