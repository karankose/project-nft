import express from "express";
import { getStats ,inquireFormData} from "../controller/common.controller.js";

const commonRouter  = express.Router();

commonRouter.get('/stats', getStats)
commonRouter.post('/inquiries',inquireFormData );   



export default commonRouter;