 const asyncHandler=(requestHandler)=>{
    return(req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((error)=>next(error))

    }
 }



// const asyncHandler=(func)=>()=>{}
// const asyncHandler=(func)=>async()=>{}  
    // All the above are different ways to define asyncHandler function  




// const asyncHandler=(fn)=> async(req,res,next)=>{
//     try{
//         await fn(req,res,next)

//     }catch(error){
//         res.status(error.code||500).json({
//             success:false,
//             message:error.message
//         })
//     }

// }

export default asyncHandler