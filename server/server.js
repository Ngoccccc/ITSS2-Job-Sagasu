const dotenv = require('dotenv');
const express = require('express');
// const unless = require('express-unless');
// const passport=require("passport")
const mongoose = require('mongoose');
const cors = require('cors');
const userRoute = require('./routes/userRoute');
const postApplyRoute = require('./routes/postApplyRoute');
// const listRoute = require('./routes/listRoute');
// const cardRoute = require('./routes/cardRoute');
const auth = require('./middlewares/auth');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// AUTH VERIFICATION AND UNLESS

app.use(
	auth.verifyToken.unless({
		path: [
			{ url: '/user/login', method: ['POST'] },
			{ url: '/user/register', method: ['POST'] },
			{ url: '/user/get-user-with-email', method: ['POST'] },
			{ url: '/post/create', method: ['POST'] },
		],
	})
);

//MONGODB CONNECTION

mongoose.Promise = global.Promise;
mongoose
	.connect(process.env.MONGO_URL)
	.then(() => {
		console.log('Database connection is succesfull!');
	})
	.catch((err) => {
		console.log(`Database connection failed!`);
		console.log(`Details : ${err}`);
	});

//ROUTES

app.use('/user', userRoute);
app.use('/post', postApplyRoute);
// app.use('/list', listRoute);
// app.use('/card', cardRoute);

app.listen(process.env.PORT, () => {
	console.log(`Server is online! Port: ${process.env.PORT}`);
});
