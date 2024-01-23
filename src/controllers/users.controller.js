import fs from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import { usersService } from "../services/UsersServices.js";

const transporter = nodemailer.createTransport({
    host: 'c2071475.ferozo.com', 
    port: 465, 
    secure: true,
    auth: {
      user: 'info@pandaweb.ar',
      pass: 'Mmdp@8612' 
    }
});

const documents = async (req, res) => {
    const { uid } = req.params;
    try{
        const user = await usersService.uploadDocuments(uid, req.files);
        return res.status(200).json({
            success: true,
            message: 'File uploaded successfully!'
        });
    }catch(error){
        res.status(404).json({error: error.message});   
    }
}

const deleteDocument = async (req, res) => {
    const { uid, filename } = req.params;
    try{
        const deletedDocument = await usersService.deleteDocument(uid, filename);
        if(deletedDocument){
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = dirname(__filename);
            const filePath = path.join(__dirname, '../uploads/documents', filename);
            await fs.access(filePath); 
            await fs.unlink(filePath);
            return res.status(200).json({
                success: true,
                message: 'File deleted successfully!'
            });
        }
    }catch(error){
        res.status(404).json({error: error.message});   
    }
}

const profile = async (req, res) => {
    const { uid } = req.params;
    try{
        const user = await usersService.uploadProfile(uid, req.file);
        return res.status(200).json({
            success: true,
            message: 'File uploaded successfully!',
            filename: req.file.originalname    
        });
    }catch(error){
        res.status(404).json({error: error.message});   
    }
}

const premium = async (req, res) => {
    const { uid } = req.params;
    try{
        const user = await usersService.premium(uid);
        if(user){
            return res.status(200).json({
                success: true,
                message: 'User converted to premium!'
            });
        }
    }catch(error){
        res.status(404).json({error: error.message});   
    }
}

const getAllUsers = async (req, res) => {
    try{
        const users = await usersService.getAllUsers();
        return res.status(200).json(users);
    }catch(error){
        res.status(404).json({error: error.message});   
    }
}

const deleteUsers = async (req, res) => {
    try{
        const { mensaje, correosElectronicos } = await usersService.deleteUsers();
        correosElectronicos.map(email => {
            const mailOptions = {
                from: 'info@pandaweb.ar',
                to: email,
                subject: 'Cuenta eliminada',
                html: `
                    <h4>Cuenta eliminada</h4>
                    <p>Su cuenta ha sido eliminada por no tener actividad en las ultimas 48 Hs.</p>
                `
            };
            transporter.sendMail(mailOptions, (error, info) => {});
        });

        return res.status(200).json({
            success: true,
            message: mensaje,
            deletedAccounts: correosElectronicos
        });
    }catch(error){
        res.status(404).json({error: error.message});   
    }
}

export {
    documents,
    profile,
    premium,
    deleteDocument,
    getAllUsers,
    deleteUsers
}