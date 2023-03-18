import { Schema, mongoose } from "mongoose";
import Inc from "mongoose-sequence";

const AutoIncrement = Inc(mongoose);


const UserSchema = new Schema(
  {
    name: { type: String },
    password: { type: String },
    email: { type: String, unique: true },
    phoneNumber: { type: String },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true, collection: "users" },
);
UserSchema.plugin(AutoIncrement, { inc_field: "userId" });
export default UserSchema;


