class ApiResponse{
    constructor(statusCode,data,message="Success",errors=[]){
        this.statusCode=statusCode;
        this.data=data;
        this.message=message;
        
        this.success=statusCode<400;

    }
}