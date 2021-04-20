class appError {
   public readonly message: string;
   public readonly statusCode: number;

   constructor(message: string, statusCode = 400 ){
      this.message = message;
      this.statusCode= statusCode; // caso não seja informado será o 400
   }
}

export default appError;
