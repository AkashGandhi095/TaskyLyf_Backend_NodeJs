const readWriteData = require('./../util/readWriteFile.js')
const UserAuthData = require('./../model/UserAuthData.js')
const randomUUID  = require('crypto')

exports.registerUser = async (req , res) => {
    const reqBody = req.body
    const userData = await readWriteData.readUsersData()
    console.log(userData.length)
    const newUser = new UserAuthData(reqBody.userName , reqBody.password , randomUUID.randomUUID())
    const findUser = userData.find(it => it.userName === newUser.userName)

    if(findUser) {
        console.log("user already exists")
        return res.json({
            message : "UserName already exists , try with other user name",
            status : 0,
            data : {},
        })
    } else {
        console.log("user not exists , add to db")
        userData.push(newUser)
        await readWriteData.writeUsersData(userData)
    }

    res.json({
        message : "Account Registered Successfully!!",
        status : 1 , 
        data : newUser ,
    })

}

exports.checkUserReqBody = (req , res , next) => {
    const reqBody = req.body
    console.log(reqBody)
    if(!reqBody.userName || !reqBody.password) {
        const msg = !reqBody.userName ? "User name required for registeration!!" : "Password required for registeration!!"
        console.log(msg)
        return res.json({
            message : msg , 
            status : 400
        })
    }

    next()
}
