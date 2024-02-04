import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService {
    pool: Pool;

    constructor() {
        this.pool = new Pool({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: Number(process.env.DB_PORT),
        });
    }
}
