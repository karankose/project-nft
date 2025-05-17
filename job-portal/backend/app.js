import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db/db.connect.js';
import router from '../backend/routes/user.route.js'
import jobRouter from './routes/job.route.js';
import geminiRouter from './routes/gemini.route.js';
import recruiterRouter from './routes/recruiter.route.js';
import adminRouter from './routes/admin.route.js';
import commonRouter from './routes/common.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;


app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cors());

connectDB();



app.get('/',(req , res , next)=>{
    res.send('hello server');
})
app.use('/api/user', router);
app.use('/api/jobs',jobRouter)
app.use('/api/resume',geminiRouter)
app.use('/api/recruiter',recruiterRouter)
app.use("/admin",adminRouter)
app.use('/api',commonRouter)




app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
    
})