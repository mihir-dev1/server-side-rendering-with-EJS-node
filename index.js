const express = require('express');
const { connectMongoDB } = require('./config/connection');
const URLRouter = require('./routers/url');
const staticRouter = require('./routers/staticRouter');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

mongodb://localhost:27017/urlShortener

connectMongoDB('mongodb://localhost:27017/urlShortener').then(() => {
    console.log('Connected to MongoDB');
}
).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
});

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use('/api/urls', URLRouter);
app.use('/', staticRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})