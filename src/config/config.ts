import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: string | number;
  database: {
    host: string;
    port: number;
    name: string;
    user: string;
    password: string;
  };
  jwt: {
    secret: string;
    expiresIn: string;
  };
}

const config: Config = {
  port: process.env.PORT || 3000,
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    name: process.env.DB_NAME || 'todo_db',
    user: process.env.DB_USER || 'sam_local_code',
    password: process.env.DB_PASSWORD || 'passwd',
  },
  jwt: {
    secret: process.env.JWT_SECRET || '4c6e8b1d9f3a2b5c7d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },
};

export default config;