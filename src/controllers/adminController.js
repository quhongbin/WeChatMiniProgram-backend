import { Op, where } from 'sequelize';
import User from '../models/User.js';
import { error } from 'console';

async function getAdminUser(req,res){
    // const{N,P} = req.body;
    // const adminName = N ? N : ''
    // const adminPasswd = P ? P :''
    const adminName = 'admin'
    const adminPasswd = 'admin'
    if (adminName==='') {
        return res.json({
            message:"no admin user name"
        })
    }
    if (adminPasswd==='') {
        return res.json({
            message:"no admin user password"
        })
    }
    const adminNameAuth = User.findOne({
        where:{
            user_name:{
                [Op.eq]:adminName,
            }
        }
    })
    return adminNameAuth
    // console.log(adminNameAuth)
}


User.create({user_name:"qu",user_passwd:"hb"})



export default getAdminUser;