import logger from '#config/logger.js';
import { users } from '#models/user.model.js';
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import db from '#config/db.js';

export const hashPassword = async (password) =>{
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    logger.error('Error hashing password: ', error);
    throw new Error('Error hashing password', {
      cause: error
    });
  }
};

export const createUser = async({name,email,password,role = 'user'}) =>{
  try {
    const existingUser = db.select().from(users).where(eq(users.email,email)).limit(1);
    if(existingUser.length > 0) {
      throw new Error('User with this email already exists');
    }

    const passwordHash = await hashPassword(password);

    const [newUser] = await db
      .insert(users)
      .values({name,email,password:passwordHash,role})
      .returning({ id: users.id,name:users.name,email:users.email,role:users.role,created_at:users.created_at});

    logger.info(`User ${newUser.email} created successfully with ID ${newUser.id}`);

    return newUser;
  } catch (error) {
    logger.error('Error creating user: ', error);
    throw error;
  }
};