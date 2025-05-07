import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";



    // Configuration
    cloudinary.config({ 
        cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
        api_key:process.env.CLOUDINARY_API_KEY, 
        api_secret:process.env.CLOUDINARY_API_SECRET,// Click 'View API Keys' above to copy your API secret
    });
        
        // // Upload an image
        //   await cloudinary.v2.uploader
        //    .upload(
        //        'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
        //            public_id: 'shoes',
        //        }
        //    )
        //    .catch((error) => {
        //        console.log(error);
        //    });
        
        // console.log(uploadResult);
        
        const uploadOnCloudinary=async(localFilePath)=>{
            try{
                if(!localFilePath){
                    return null;
                }
                const uploadResult=await cloudinary.uploader.upload
                (localFilePath,{
                    
                    resource_type:"auto",
                })
                // file has been uploaded successfully
                console.log("File uploaded successfully ",uploadResult.url);
                return uploadResult;


            }catch(error){
               fs.unlinkSync(localFilePath)
               // remove the locally saved file as the upload operation got faailed
               return null;
            }

        }

export default uploadOnCloudinary;