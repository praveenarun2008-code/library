import React, { useState,useEffect } from 'react'
import axios from "axios"

function AdminHome() {
  const [books,setBooks]=useState([]);
  const [bookname,setBookname]=useState("")
  const [bookprice,setBookprice]=useState("");

  const addBooks = async (e)=>{
    e.preventDefault();
    await axios.post("http://localhost:8000/addbooks", { book_name:bookname, book_price:bookprice });
    alert("Book Added Successfully!");
    setBookname("");
    setBookprice("");
    showBooks();
  }
  const showBooks = async(e)=>{
    const res = await axios.get("http://localhost:8000/showbooks")
    setBooks(res.data)
  }
  useEffect(()=>{
    showBooks();
  },[])

  return (
    <div>
       <h2>Vankam da admin</h2>
       <div className='border border-red-500 p-10 w-max  mx-auto'>
          <form onSubmit={addBooks}>
            <input  type="text" value={bookname} onChange={(e)=>setBookname(e.target.value)} placeholder='Enter book Name'/>
            <input type="number" value={bookprice} onChange={(e)=>setBookprice(e.target.value)} placeholder='Enter Book Price' />
            <button type="submit" >Add Book</button>
          </form>
                
        </div>
        <div style={{display:"flex"}}>
        {books.map((b,i)=>(
            <div key={i} style={{width:"max-content",margin:"50px",padding:"50px",border:"1px solid black"}}>
                <div>
                    <h2 className="">{b.book_name}</h2>
                    <p>${b.book_price}</p>
                </div>
                <button>Buy Now</button>
            </div>
          ))}
      </div>
    </div>
  )
}

export default AdminHome
