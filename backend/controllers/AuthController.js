require("dotenv").config();
const bcrypt = require('bcrypt');
const UserModel = require("../models/UserModel");
const apiResponse = require("../helpers/ApiResponse");
const jwt = require("jsonwebtoken");
const { createnewaccnt } = require("../hedera_controllers/Authentication");

exports.register = async (req, res)=>{
    try{
        const {password, mobile} = req.body;
        console.log("Headers: ", req.headers);
        let user = await UserModel.findOne({mobile:mobile});
        if(user){
            return apiResponse.errorResponse(req, res, "User already exists");
        }
        else{
            user = new UserModel({
                password,
                mobile
            })

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            
            
            const response = await createnewaccnt(mobile);
            console.log("response from smart contracts: ", response);

            user.accountId = response.AccountId;
            user.privateKey = response.PrivateKey;

            user.portfolios_bought = [];
            user.portfolios_owned = [];

            const token = jwt.sign(
                { user_id: user._id, mobile, accountId:user.accountId, privateKey: user.privateKey},
                process.env.TOKEN_KEY,
                {
                  expiresIn: "2h",
                }
            );

            user.token = token;

            await user.save();
            
            return apiResponse.successResponseWithData(req, res, "User Created", user);
        }
    }
    catch(err){
        console.log("Error while registering User: "+ err);
        return apiResponse.errorResponse(req, res, err.message);
    }
}

exports.login = async (req, res)=>{
    try{
        const {mobile, password} = req.body;

        const user = await UserModel.findOne({mobile:mobile});
        
        if(!user){
            return apiResponse.errorResponse(req, res, "User not found");
        }
        
        console.log("Password from login body: ", password);

        console.log("Password from User Model: ", mobile);
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
            return apiResponse.errorResponse(req, res, "Incorrect Password");
        }

        const token = jwt.sign(
            { user_id: user._id, mobile },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
        );

        user.token = token;

        await user.save();


        return apiResponse.successResponseWithData(req, res, "Valid User", user);
    }
    catch(err){
        console.log("Error while loginin the user: "+err);

        return apiResponse.errorResponse(req, res, err.message);
    }
}
