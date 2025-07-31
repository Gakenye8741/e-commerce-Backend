import { desc, eq, ilike } from "drizzle-orm";
import db from "../../drizzle/db";
import { TInsertUser, TSelectUser, users } from "../../drizzle/schema";

// Function to Exclude PAssword
function excludePassword<T extends { password?: string }>(users: T): Omit<T, "password"> {
  const { password, ...rest } = users;
  return rest;
}

export const getAllUsersService = async ():Promise<Omit<TSelectUser ,'password'>[]> =>{
    const userLists = await db.query.users.findMany({
        orderBy: [desc(users.userId)]
    })
    return userLists.map(excludePassword);
}

export const getUserByUserIdService = async (userId: number): Promise<Omit<TSelectUser, 'password'> | undefined >=> {
  const UserListById = await db.query.users.findFirst({
    where: eq(users.userId,userId)
  });
  return UserListById ? excludePassword(UserListById): undefined;
}

// Search By Name
export const getUserBylastNameServices = async (lastName: string):Promise<Omit<TSelectUser, 'password'>[]> => {
  const results = await db.query.users.findMany({
    where: ilike(users.lastName, `%${lastName}%`)
  })
  return results.map(excludePassword)
}

// Geta all user details
export const getAllUserDetailsServices = async (userId: number):Promise<Omit<TSelectUser, 'password'> | undefined> => {
  const AlluserDetails = await db.query.users.findFirst({
    where: eq(users.userId, userId),
    with: {
      orders: true,
      reviews: true,
      payments: true,
      supportTickets: true,
      carts: true
    }, 
  })
  return AlluserDetails ? excludePassword(AlluserDetails): undefined;
}

// create User
export const CreateUserServices = async (user: TInsertUser):Promise<string> => {
  await db.insert(users).values(user).returning();
  return "user created Succesfully"
}

// Update User details 
export const UpdateUserServices = async (userId: number, user:Partial <TInsertUser>) => {
  await db.update(users).set(user).where(eq(users.userId, userId))
  return "User updated successfully 🔄";
}

// Delete User Details
export const DeleteUsersServices = async (userId: number):Promise<string> => {
  await db.delete(users).where(eq(users.userId, userId));
 return "User Deleted Succesfully                                                                                        "
}