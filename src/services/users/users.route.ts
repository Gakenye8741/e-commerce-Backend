import { Router } from "express";
import { AllUserDetails, CreateNewUser, DeleteUsers, getAllUsers, GetUserById, getUserByLastName, UpdateUser } from "./users.controller";


const userRoutes = Router();

// Get All Users
userRoutes.get('/AllUsers',getAllUsers);

// Get User By Id
userRoutes.get('/User/:userId',GetUserById);

// Create user
userRoutes.post('/create-User',CreateNewUser);

// Search By Last Name
userRoutes.get('/search-user',getUserByLastName);

// Update User
userRoutes.put('/update-User/:userId',UpdateUser);

// Delete User
userRoutes.delete('/delete-User/:userId',DeleteUsers);

// AllUseer Details
userRoutes.get('/get-All-User-Details/:userId',AllUserDetails)

export default userRoutes;