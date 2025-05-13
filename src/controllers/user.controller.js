import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import{User} from "../models/user.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser=asyncHandler(async(req,res)=>{
    // get user details from frontend
    // validatation-not empty
    // check if user already exists:username ya fir email se check kar skte hai
    // check for images , check for avatar and cover image
    // upload them to cloudinary, avatar

    //create user object - create entry in db(.create)
    // remove password and refresh token field from the response
    // check for user creation
    // return success response
    // return error response 

    const {fullName,username,email,password,avatar: avatarFromBody,coverImage}=req.body
    console.log("email",email);
    if ([fullName,email,username,password].some((field)=>field?.trim()===")")
    ) {
      throw new ApiError("All fields are required",400)
    }
//validation
   const existedUser= User.findOne({$or:[{ username },{ email } ]})
    if(existedUser){
      throw new ApiError("User with email or username already exists",409)
    }

   const avatarLocalPath= req.files?.avatar[0]?.path;
   const coverImageLocalPath= req.files?.coverImage[0]?.path

   if (!avatarLocalPath) {
    throw new ApiError(400,"Avatar file is required")
   }
   
  const uploadedAvatar = await uploadOnCloudinary(avatarLocalPath)

  const uploadedcoverImage = await uploadOnCloudinary(coverImageLocalPath)

  if(!uploadedAvatar){
        throw new ApiError(400,"Avatar file is required")

  }
  const user=await User.create({
    fullName,
    avatar: uploadedAvatar?.url||"",
    coverImage: uploadedcoverImage?.url||"",
    email,
    password,
    username: username.toLowerCase(),

  })
  const createdUser = await User.findById(user._id).select("-password -refreshToken")
  if (!createdUser) {
    throw new ApiError(400, "User creation failed")
  }

  return res.status(201).json(
    new ApiResponse(200,createdUser,"User created successfully")
    
  )



})

export {registerUser}