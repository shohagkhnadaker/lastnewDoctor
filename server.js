const app=require('./app')

const connectDb=require('./config/mongodb')
connectDb()

const PORT=5000

app.listen(PORT,()=>{
    console.log(`server is running at http://localhost:${5000}`);
})

