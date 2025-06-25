import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import connectToDb from './config/dbconn.js';
import router from './routes/userRoutes.js';
import courseRouters from './routes/courseRouters.js'
import errorMiddleware from './middleware/error.middleware.js';
import axios from 'axios'

const app = express();



connectToDb()
app.use(express.json()) //use for paras
app.use(express.urlencoded({
    extended:true
}))


app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization','Cookie'],

}))

app.use(cookieParser())

app.use(morgan('dev'))
 // ye morgan dependency se hum ye pta lga sakte hai ki mere website kaun se methods se access ho rhi hai


 const url = "https://lms-project123-1.onrender.com/ping"
const interval = 300000;
function reloadWebsite() {
  axios
    .get(url)
    .then((response) => {
      console.log("website reloded again");
    })
    .catch((error) => {
      console.error(`Error : ${error.message}`);
    });
}

setInterval(reloadWebsite, interval);
app.get("/", (req, res) => {
  res.send("hello world");
});

app.use('/ping' ,(req,res) =>{
    res.send('/pong')
})





app.use('/api/v1/user' , router)
app.use('/api/v1/course',courseRouters)






app.all('*' ,(req,res) =>{
    res.status(404).send('OPPS!! 404 page not found')
})

app.use(errorMiddleware)

export default app