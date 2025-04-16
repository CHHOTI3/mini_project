import express from "express"
import mongoose from "mongoose"
import bodyParser from  "express"
import userRouter from "./routes/user.js"
import recipeRouter from "./routes/recipe.js"
import cors from "cors"
const app = express()
app.use(bodyParser.json())
app.use(cors({
  origin: 'https://poonam-recipe-share.netlify.app',
  credentials: true
}));


app.get('/', (req, res) => {
  res.send('Hello World!')
}
)
//userRouter
app.use('/api', userRouter);

//recipeRouter
app.use('/api', recipeRouter);


mongoose
  .connect(
    "mongodb+srv://poonam2005sahu:rwJ4AOzT8HZuaMBO@cluster0.ltydckl.mongodb.net/",
    {
      dbName: "[cookTogether]",
    }
  )
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log(err.message));

const port = 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

// Username= poonam2005sahu
//Password= rwJ4AOzT8HZuaMBO
