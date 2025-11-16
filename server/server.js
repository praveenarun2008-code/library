import express from 'express';
import cors from 'cors';
import mysql2 from "mysql2"

const app = express();
app.use(cors());
app.use(express.json());


//Connecting To Database
const db = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "PRAVEEN007",
  database: "library_users"
})
db.connect((err) => {
  if (err) {
    console.error("❌ DB Connection Failed:", err)
  } else {
    console.log("✅ Connected to MySQL Database")
  }
})

//login route
app.use("/login",async (req,res)=>{
    const {userid,password}=req.body;
    db.query("SELECT * FROM users_details WHERE userid = ? and password = ?",[userid,password],(err,result)=>{
        if(err)
            return res.status(500).json({message:"Server Error"})
        if(result.length===0){
            return res.status(401).json({message:"User ID not Found"})
        }
        const user=result[0];
        const isMatch = (password===user.password)
        if(!isMatch){
            return res.status(400).json({message:"Password Incorrect"});
        }

        return res.status(200).json({message:"Successfully Logged In",role:user.role})
    })
})

//register route
app.use("/register",async (req,res)=>{
    const {userid,password}=req.body;
    db.query("SELECT * FROM users_details WHERE userid = ?",[userid],(err,result)=>{
        if(err)
            return res.status(500).json({message:"Server Error"})
        if(result.length>0){
            return res.status(400).json({message:"User already exists"})
        }
        db.query("INSERT INTO users_details (userid,password,role) VALUES ( ? , ? , 'user' )",[userid,password],(err,result)=>{
            if(err)
                return res.status(500).json({message:"Server Error"})
            return res.status(200).json({message:"User Registered Successfully"})
        })
    })
})

//show books
app.use("/showbooks",(req,res)=>{
    db.query("SELECT id,book_name,book_price from book_details",(err,result)=>{
        if(err)
            return res.status(500).json({message:"Server Error"});
        return res.json(result);
    })
})


//add books
app.use("/addbooks",(req,res)=>{
    const {book_name,book_price} = req.body;

    const sql = "INSERT INTO book_details (book_name,book_price) VALUES (?,?)"

    db.query(sql,[book_name,book_price],(err)=>{
        if(err) return res.status(500).json(err);
        res.json({ message: "Book Added Successfully" })
    })
})

app.listen(8000)