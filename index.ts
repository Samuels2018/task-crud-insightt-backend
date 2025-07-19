import app from './src';


app.listen(3000, (err) => {
  if (err) {
    console.error('Error starting server:', err);
  } else {
    console.log('Server is running on port 3000');
  }
})