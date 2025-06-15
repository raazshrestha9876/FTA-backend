import * as authService from '../../services/auth/authService.js';
import { generateToken } from '../../utils/generateToken.js';

export const register = async (req, res) => {
    console.log(req.body);
    try{
        const user = await authService.register(req.body);
        res.status(201).json(user);;
    }catch(error){
        res.status(400).json({message: error.message});
    }
}

export const login = async (req, res) => {
    try{
        const user = await authService.login(req.body);
        const token = generateToken(user._id);
        res.status(200).json({message: "Login successfully", user, token});
    }catch(error){
        res.status(400).json({message: error.message});
    }
}

// export const forgetPassword = async (req, res) => {
//     try{
//         await authService.forgetPassword(req.body.email);
//         res.status(200).json({message: "Email sent successfully"});
//     }catch(error){
//         res.status(400).json({message: error.message});
//     }
// }

// export const resetPassword = async (req, res) => {
//     try{
//         const user = await authService.resetPassword(req.params.token, req.body.password);
//         const token = authService.generateToken(user._id);
//         res.status(200).json({user, token});
//     }catch(error){
//         res.status(400).json({message: error.message});
//     }
// }