const { connect, connection } = require('mongoose');

const connectionString = "mongodb://localhost:27017/SocialDistracting";

connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Mongoose connected to ' + connectionString);
})
.catch((err) => {
    console.error('Mongoose connection error: ' + err);
});