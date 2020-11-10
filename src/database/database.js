const mongoose = require('mongoose')

mongoose.connect(process.env.URL_DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(db => console.log('Database is connected to', db.connection.host))
    .catch(err => console.error(err));