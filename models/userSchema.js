import {hash,genSalt} from 'bcrypt';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
      userName:{
        type:String,
        required:true
      },
      password:{
        type:String,
        required:true
      },
      name:{
        type:String,
        required:true
      },
      gender:{
        type:String,
        required:true
      },
      dob:{
        type:Date,
        required:true
      },
      country:{
        type:String,
        required:true
      }
})

userSchema.pre('save',async function(next){
    const salt = await genSalt(10);
    this.password = await hash(this.password,salt);
    next();
})

export default mongoose.model('User',userSchema);