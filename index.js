const dotenv = require('dotenv')
const { Sequelize } = require('sequelize');
const express = require('express'); 
const passport = require('passport');

const userController = require('./routes/user')
const productController = require('./routes/product')

const app = express()

dotenv.config();

console.log('DB Name:', process.env.DBName);
console.log('DB Login:', process.env.DBLogin);
console.log('DB Password:', process.env.DBPassword);

const sequelize = new Sequelize('DZ_JS', 'test1', '',  {
    host: 'localhost',
    dialect: 'mssql',
    port: 1433,
    dialectOptions: {
      options: {
          trustedConnection: true 
      }
  }
  });


async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Соединение успешно установлено.');
        await sequelize.sync({ force: true });
        console.log('Таблицы созданы или обновлены');
    } catch (error) {
        console.error('Невозможно установить соединение:', error);
    }
}

testConnection();


app.use(passport.initialize())


require('./middlewear/passport')(passport)



app.use('/api/auth', userController);
app.use('/api/product', productController)


app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(4000, ()=>console.log('Server started on 4000!!!'));