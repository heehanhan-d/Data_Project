import { model } from "mongoose";
import UserSchema from "../schemas/userSchema.js";

const User = model("users", UserSchema);

export default User;
