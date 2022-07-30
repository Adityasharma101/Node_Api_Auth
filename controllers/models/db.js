const Sequelize = require('sequelize');
require('dotenv').config();

// STARTING NEW SEQUELIZE 
const db = new Sequelize({
    database:process.env.DB_NAME,
    username:process.env.USER,
    password:process.env.USER_PASS,
    dialect:'mysql'
})

//CREATING ARTICLES SCHEMA
const articleSchema= db.define('articles',{
    id:{
        type:Sequelize.DataTypes.INTEGER,
        primaryKey:true
    },
    name:{
        type:Sequelize.DataTypes.STRING(255),
        allowNull:true

    },
    story_title:{
        type:Sequelize.DataTypes.STRING(255),
        allowNull:true
    },
    comment:{
        type:Sequelize.DataTypes.INTEGER,
        allowNull:true
    }
}) 


//CREATING USERS SCHEMA
const userSchema= db.define('users',{
    id: {
        type:Sequelize.DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
      },
    name:{
        type:Sequelize.DataTypes.STRING(255),
        allowNull:false,
    },
    email:{
        type:Sequelize.DataTypes.STRING(255),
        allowNull:false,
    
    },
    password:{
        type:Sequelize.DataTypes.STRING(1024),
        allowNull:false
    }
})


//CREATING BOARD SCHMEA
const boardSchema= db.define('boards',{
    id:{
        type:Sequelize.DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    stage:{
        type:Sequelize.DataTypes.INTEGER,
        allowNull: false,
        defaultValue:1,
    },
    title:{
        type:Sequelize.DataTypes.STRING(200),
    }
})  

// db.authenticate();
// async function board(){
//     await db.sync()
// }
// board();

// SYNCING THE DATABASE TO THE SYSTEM 
// db.sync({force:true})
//   .then((result) => {
//     console.log("heyy im connected");
//   })
//   .catch((err) => {
//     console.log(err);
// });




//EXPORTING THE SCHEMAS 
module.exports= {
    articleSchema,boardSchema,userSchema,db
};  