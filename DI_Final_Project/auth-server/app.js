const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const userRouter = require('./routes/userRouter.js');
const {db} = require('./config/db.js')

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials:true,
    origin:['http://localhost:5173']
}));

const { PORT } = process.env;

app.listen(PORT || 5000, () => {
    console.log(`run on ${PORT || 5000}`);
})

app.use('/user',userRouter);

async function testConnection() {
try {
    const data = await db.raw('select version()')
    console.log(data.rows);
} catch (error) {
    console.log(error); 
}
}

testConnection()
