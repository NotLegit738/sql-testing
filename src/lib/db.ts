import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DATABASE_HOST || '87.76.199.91',
  port: parseInt(process.env.DATABASE_PORT || '3306'),
  user: process.env.DATABASE_USER || 'mysql',
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME || 'mysql-database-yy8twvyr7uvifkdksdvrgxp8',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function query(sql: string, params?: any[]) {
  try {
    const [results] = await pool.execute(sql, params);
    return results;
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Database operation failed');
  }
}

export async function initializeDatabase() {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS staff_applications (
      id INT AUTO_INCREMENT PRIMARY KEY,
      full_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      discord_username VARCHAR(255) NOT NULL,
      age INT NOT NULL,
      country VARCHAR(255) NOT NULL,
      timezone VARCHAR(255) NOT NULL,
      position VARCHAR(255) NOT NULL,
      staff_experience TEXT,
      hosting_experience TEXT,
      why_join TEXT NOT NULL,
      why_select TEXT NOT NULL,
      contribution TEXT NOT NULL,
      availability VARCHAR(255) NOT NULL,
      hours_per_week VARCHAR(255) NOT NULL,
      previous_positions TEXT,
      additional_information TEXT,
      agreement BOOLEAN NOT NULL,
      status ENUM('pending', 'reviewing', 'accepted', 'rejected') DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_email (email),
      INDEX idx_status (status),
      INDEX idx_created_at (created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;

  try {
    await query(createTableSQL);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
}

export default pool;
