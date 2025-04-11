import { User } from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// User Register
export const register = async (req, res) => {
  const { name, gmail, password } = req.body;
  console.log("Register Request Body:", req.body);

  try {
    let user = await User.findOne({ gmail });

    if (user) {
      return res.status(200).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, gmail, password: hashedPassword });

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

//User Login
export const login = async (req, res) => {
    const {gmail, password} = req.body
    console.log(req.body);
    try{

        let user = await User.findOne({gmail})

        if(!user) return res.json({message: "User not exists"})

            const validPass = await bcrypt.compare(password, user.password);

        if (!validPass) return res.json({message: "Invalid password"});

        const token = jwt.sign({userId:user._id},"!@#$%^&*()",{expiresIn:"1d"})

        res.json({message:`Welcome ${user.name}`,token})

    }catch(error){
        res.json({message: error.message})
    
    }
}

//User Profile
export const profile = async (req, res) => {
  res.json({ user: req.user });
}
