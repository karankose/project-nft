import express from "express";
import { getStats ,inquireFormData} from "../controller/common.controller.js";
import checkBusinessEmail from "../middleWare/checkBusinessEmail.js";

const commonRouter  = express.Router();

commonRouter.get('/stats', getStats)
commonRouter.post('/inquiries',checkBusinessEmail,  inquireFormData );   



export default commonRouter;