import { Request , Response } from "express"
import { CreateUserServices, DeleteUsersServices, getAllUserDetailsServices, getAllUsersService,  getUserBylastNameServices,  getUserByUserIdService, UpdateUserServices } from "./users.service"
import { object } from "zod";

export const getAllUsers = async (req: Request, res: Response) => {
    const AllUsers = await getAllUsersService();
      try {
        if(AllUsers.length === 0 || !AllUsers) {
            res.status(500).json({message: "No Users Found!!"}); 
        }else{
            res.status(200).json({AllUsers ,message: "Users Fetched Succesfully!"});
        }
      } catch (error: any) {
        res.status(404).json({error: error.message || "Error occured could not fetch All Users"})        
      }
}

// Get User By id
export const GetUserById = async (req:Request, res:Response) => {
  const userId = parseInt(req.params.userId);
  if(isNaN(userId)){
    res.status(404).json("Enter a valid Id!! Id should be a number");
    return;
  }

  const userById = await getUserByUserIdService(userId);
  try {
    if(!userById){
        res.status(500).json({message: "No User with such UserId Was Found In Our Database!!"});
    }else{
        res.status(200).json({userById});
    }
  } catch (error:any) {
    res.status(404).json("Error Occured No Such userId Was Found ")
  }
} 

// Get User By Last Name
export const getUserByLastName = async (req:Request,res:Response) => {
    const lastName = req.query.lastName as string;
    if(!lastName){
        res.status(500).json({message: "LastName Parameters Are Required!"});
        return;
    }
    try {
        const userByLastName = await getUserBylastNameServices(lastName);
        if(userByLastName.length === 0 || !userByLastName){
            res.status(500).json({mesage: "No User With That Last Name Was Found!!!"})
        }else{
            res.status(200).json({userByLastName, message: "User Found Succesfully!!!"})
        }
    } catch (error: any) {
        res.status(404).json({error: error.message || "error occured while searching LastName!!!"})        
    }
}

// Create User
export const CreateNewUser = async( req:Request,res:Response) =>{
    const {firstName,lastName,email,password,contactPhone,address} = req.body;
    if(!firstName || !lastName || !email || !password || !contactPhone || !address){
        res.status(500).json({message: "All Fields Are Required!!"})
        return;
    }

    try {
        const results =await CreateUserServices({firstName,lastName,email,password,contactPhone,address});
        if(results.length === 0 || !results){
            res.status(500).json({message: "Failed to create User KIndly Try Again!!!"})
        }else{
            res.status(200).json({results})
        }
    } catch (error:any) {
        res.status(404).json({error:error.message || "Error occured creating user!!"});
    }

}

// Update Users
export const UpdateUser = async (req: Request, res: Response) =>{
    const userId = parseInt(req.params.userId);
    if(isNaN(userId)){
        res.status(400).json({error: "enter Valid UserId!!"})
        return;
    }

    const {firstName,lastName,password,contactPhone,address} = req.body;
    
    const updates:any = {};
    if(firstName !== undefined) updates.firstName = firstName;
    if(lastName !== undefined) updates.lastName = lastName;
    if(password !== undefined) updates.password = password;
    if(contactPhone !== undefined) updates.contactPhone = contactPhone;
    if(address !== undefined) updates.address = address;

    if(Object.keys(updates).length === 0){
        res.status(400).json({ error: "No valid fields provided for update" });
     return;
    }

    try {
    const result = await UpdateUserServices(userId,updates)
     res.status(200).json({ message: result, updatedFields: updates });
     return
  } catch (error: any) {
     res.status(500).json({ error: error.message || "Failed to update user" });
     return;
  }

}

// Delete User
export const DeleteUsers = async (req:Request, res:Response) => {
    const userId = parseInt(req.params.userId);
    if(isNaN(userId)){
        res.status(500).json({error: "Enter Valid Id "});
        return;
    }
    try {
       const DeleteUser = await DeleteUsersServices(userId);
       res.status(200).json({message: DeleteUser})
    } catch (error: any) {
        res.status(404).json({error: error.message || "Error Occured we could Not Delete User!!"});
    }
}

// Get All user details
export const AllUserDetails = async (req:Request,res:Response) => {
   const userId = parseInt(req.params.userId);
    if(isNaN(userId)){
        res.status(500).json({error: "Enter a Valid Id "});
        return;
    }
    
    try {
        const results = await getAllUserDetailsServices(userId);
        if(!results){
            res.status(500).json({message: "No user Details Foun For this User Id"});
        }
        else{
            res.status(200).json(results)
        }
    } catch (error: any) {
        res.status(404).json({error: error.message || "Error Occured we could NOt Fetch User Details!!"});               
    }
}