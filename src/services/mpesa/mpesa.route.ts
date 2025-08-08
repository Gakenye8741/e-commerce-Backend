import { Router } from "express";
import { initiatePayment, createQRCode, mpesaCallback } from "./mpesa.controller";
import { anyAuthenticatedUser } from "../../middleware/authBearer";


export const mpesaRouter = Router();

mpesaRouter.post("/initiate-payment", initiatePayment);
mpesaRouter.post("/generate-qr", anyAuthenticatedUser, createQRCode);
mpesaRouter.post("/callback", mpesaCallback);