import app from './src';
import { sequelize } from './src/models';

const PORT = process.env.PORT;

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .then(() => {
    app.listen(PORT, (err) => {
      if (err) {
        console.error('Error starting server:', err);
      } else {
        console.log(`Server is running on port ${PORT}`);
      }
    })
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  })