import React, { useEffect, useState } from 'react'
import axios from "axios"

function UserHome() {
  const [books,setBooks]=useState([]);
  const showBooks = async()=>{
    const res = await axios.get("http://localhost:8000/showbooks")
    setBooks(res.data)
  }
  useEffect(()=>{
    showBooks();
  },[])
  
  return (
    <div>
      <h2>Vankam da user</h2>
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

export default UserHome
