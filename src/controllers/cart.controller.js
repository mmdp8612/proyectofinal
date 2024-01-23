import createError from 'http-errors';
import nodemailer from "nodemailer";
import { cartService } from "../services/CartService.js";
import { ticketService } from "../services/TicketService.js";

const transporter = nodemailer.createTransport({
    host: 'c2071475.ferozo.com', 
    port: 465, 
    secure: true,
    auth: {
      user: 'info@pandaweb.ar',
      pass: 'Mmdp@8612' 
    }
});

const createCart = async (req, res) => {
    try{
        const newCart = await cartService.createCart();
        return res.status(200).json({
            message: "Cart created!",
            cart: newCart
        })  
    }catch(error){
        return res.status(500).json({
            error: error.message
        })  
    }
}

const getProductsCart = async (req, res) => {
    const { cid } = req.params; 
    try{
        const productsCart = await cartService.getProductsCart(cid);
        return res.status(200).json(productsCart)  
    }catch(error){
        return res.status(404).json({
            error: error.message
        })  
    }
}

const addProductCart = async (req, res) => {
    const { cid, pid } = req.params;
    try{
        await cartService.addProductCart(cid, pid);
        return res.json({
            message: `Product added to cart succesfuly`
        });
    }catch(error){
        return res.status(500).json({
            error: error.message
        });  
    }
}

const updateProductsCart = async (req, res) => {
    const { cid } = req.params;
    try{
        await cartService.updateProductsCart(cid, req.body);
        return res.json({
            message: `Products updated  succesfuly`
        });
    }catch(error){
        return res.status(500).json({
            error: error.message
        });  
    }
}

const updateQuantityCart = async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    try{
        await cartService.updateQuantityCart(cid, pid, quantity);
        return res.json({
            message: `Product quantity update successfully`
        });
    }catch(error){
        return res.status(500).json({
            error: error.message
        });  
    }
}

const deleteProductCart = async (req, res) => {
    const { cid, pid } = req.params;
    try{
        await cartService.deleteProductCart(cid, pid);
        return res.json({
            message: `Product deleted at cart succesfuly`
        });
    }catch(error){
        return res.status(500).json({
            error: error.message
        });  
    }
}

const deleteAllProducts = async (req, res) => {
    const { cid } = req.params;
    try{
        await cartService.deleteAllProducts(cid);
        return res.json({
            message: `Products deleted at cart succesfuly`
        });
    }catch(error){
        return res.status(500).json({
            error: error.message
        });  
    }
}

const finalizePurchase = async (req, res) => {
    const { cid } = req.params;
    try{
        const totalPurchase = await cartService.finalizePurchase(cid);
        if(totalPurchase!==0){
            const data = {
                totalPurchase: totalPurchase,
                email: req.user.email
            };
            const newTicket = await ticketService.createTicket(data);

            const mailOptions = { 
                from: 'info@pandaweb.ar',
                to: req.user.email,
                subject: 'Compra Finalizada',
                html: `
                    <h4>Compra Finalizada</h4>
                    <hr>
                    <p>Fecha: ${newTicket.purchase_datetime}</p>
                    <p>Nro de Ticket: ${newTicket.code}</p>
                    <p>Usuario: ${req.user.email}</p>
                    <p>Monto Total: $ ${newTicket.amount}</p>
                `
            };
            
            transporter.sendMail(mailOptions, (error, info) => {});

            return res.status(200).json(newTicket);
        }else{
            return res.status(501).json({
                error: "No hay stock suficiente"
            })      
        }  
    }catch(error){
        return res.status(404).json({
            error: error.message
        })  
    }
}

export {
    createCart,
    getProductsCart,
    addProductCart,
    updateQuantityCart,
    updateProductsCart,
    deleteProductCart,
    deleteAllProducts,
    finalizePurchase
}