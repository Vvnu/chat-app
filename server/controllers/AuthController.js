import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import { compare } from "bcrypt";
import { get } from "mongoose";
import {rename, renameSync, unlink, unlinkSync} from "fs";
import fs from "fs";

import path from "path";


const maxAge = 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds

const createToken = (email, userId) => {
    return jwt.sign({ email, userId }, process.env.JWT_KEY, { expiresIn: maxAge });
};

export const signup = async (request, response, next) => {
    try {
        const { email, password } = request.body;
        if (!email || !password) {
            return response.status(400).send("Email and password are required");
        }
        
        const user = await User.create({ email, password });
        response.cookie("jwt", createToken(email, user.id), {
            maxAge,
            secure: true, // Set to true if using HTTPS
            sameSite: "None", // Adjust as needed
        });
        return response.status(201).json({
            user: {
                id: user.id,
                email: user.email,
                profileSetup: user.profileSetup,
            }
        });
    } catch (error) {
        console.log(error);
        
        // Handle duplicate email error
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
            return response.status(400).send("User with this email already exists");
        }
        
        return response.status(500).send("Internal server error");
    }
};

export const login = async (request, response, next) => {
    try {
        const { email, password } = request.body;
        if (!email || !password) {
            return response.status(400).send("Email and password are required");
        }
        
        // FIXED: Only search by email, not email AND password
        const user = await User.findOne({ email });
        if (!user) {
            return response.status(404).send("User with this Email not found");
        }
        
        const auth = await compare(password, user.password);
        if (!auth) {
            return response.status(400).send("Password is Incorrect");
        }
        
        response.cookie("jwt", createToken(email, user.id), {
            maxAge,
            secure: true, // Set to true if using HTTPS
            sameSite: "None", // Adjust as needed
        });
        
        return response.status(200).json({
            user: {
                id: user.id,
                email: user.email,
                profileSetup: user.profileSetup,
                firstName: user.firstName,
                lastName: user.lastName,
                image: user.image,
                color: user.color,
            }
        });
    } catch (error) {
        console.log(error);
        return response.status(500).send("Internal server error");
    }
};

export const getUserInfo = async (request, response, next) => {
    try {
        const userData = await User.findById(request.userId);
        if (!userData) {
            return response.status(404).send("User with given id is not found");
        }   
        return response.status(200).json({
           
                id: userData.id,
                email: userData.email,
                profileSetup: userData.profileSetup,
                firstName: userData.firstName,
                lastName: userData.lastName,
                image: userData.image,
                color: userData.color,
        });
    } catch (error) {
        console.log(error);
        return response.status(500).send("Internal server error");
    }
};



export const updateProfile = async (request, response, next) => {
    try {
        const {userId} =request;
        const { firstName, lastName, color } = request.body;
        if (!firstName || !lastName ) {
            return response.status(404).send("User with given id is not found");
        }

        const userData = await User.findByIdAndUpdate(
            userId,
            { firstName, lastName, color, profileSetup: true },
            { new: true,runValidators: true }
        );   

        return response.status(200).json({
           
                id: userData.id,
                email: userData.email,
                profileSetup: userData.profileSetup,
                firstName: userData.firstName,
                lastName: userData.lastName,
                image: userData.image,
                color: userData.color,
        });
    } catch (error) {
        console.log(error);
        return response.status(500).send("Internal server error");
    }
};
export const addProfileImage = async (request, response, next) => {
    try {
        if (!request.file) {
            return response.status(400).send("File is required");
        }

        const date = Date.now();
        // Correctly join paths using "path.join"
        let fileName = path.join("uploads", "profiles", date + "_" + request.file.originalname);

        // Move the file to new location
        fs.renameSync(request.file.path, fileName);

        const updatedUser = await User.findByIdAndUpdate(
            request.userId,
            { image: fileName },
            { new: true, runValidators: true }
        );

        return response.status(200).json({
            image: updatedUser.image,
        });
    } catch (error) {
        console.log(error);
        return response.status(500).send("Internal server error");
    }
};




export const removeProfileImage = async (request, response, next) => {
    try {
        const {userId} =request;
        const user = await User.findById(userId);
        if (!user) {
            return response.status(404).send("User with given id is not found");
        }
        if (user.image) {
            unlinkSync(user.image);
        }
        user.image = null;
        await user.save(); 

        return response.status(200).send("Profile image removed successfully");
    } catch (error) {
        console.log(error);
        return response.status(500).send("Internal server error");
    }
};

