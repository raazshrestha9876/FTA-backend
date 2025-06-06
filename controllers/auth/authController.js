import * as authService from '../../services/authService.js';

export const register = async (req, res) => {
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
        const token = authService.generateToken(user._id);
        res.status(200).json({user, token});
    }catch(error){
        res.status(400).json({message: error.message});
    }
}

export const forgetPassword = async (req, res) => {
    try{
        await authService.forgetPassword(req.body.email);
        res.status(200).json({message: "Email sent successfully"});
    }catch(error){
        res.status(400).json({message: error.message});
    }
}

export const resetPassword = async (req, res) => {
    try{
        const user = await authService.resetPassword(req.params.token, req.body.password);
        const token = authService.generateToken(user._id);
        res.status(200).json({user, token});
    }catch(error){
        res.status(400).json({message: error.message});
    }
}