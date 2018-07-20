process.env.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/mern';
// process.env.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://m001-student:m001-mongodb-basics@sandbox-shard-00-00-q1rhu.mongodb.net:27017/mern?ssl=true&authSource=admin';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.PORT = process.env.PORT || 3000;
