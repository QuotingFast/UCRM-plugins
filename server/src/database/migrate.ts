import { runQuery } from './connection';
import fs from 'fs';
import path from 'path';

const createTables = async () => {
  try {
    // Create data directory if it doesn't exist
    const dataDir = path.join(__dirname, '../../data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Users table
    await runQuery(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        role TEXT DEFAULT 'user',
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Companies table
    await runQuery(`
      CREATE TABLE IF NOT EXISTS companies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        website TEXT,
        industry TEXT,
        size TEXT,
        phone TEXT,
        email TEXT,
        address TEXT,
        city TEXT,
        state TEXT,
        zipCode TEXT,
        country TEXT,
        notes TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Contacts table
    await runQuery(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        email TEXT,
        phone TEXT,
        title TEXT,
        companyId INTEGER,
        address TEXT,
        city TEXT,
        state TEXT,
        zipCode TEXT,
        country TEXT,
        notes TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (companyId) REFERENCES companies (id)
      )
    `);

    // Leads table
    await runQuery(`
      CREATE TABLE IF NOT EXISTS leads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        email TEXT,
        phone TEXT,
        company TEXT,
        title TEXT,
        source TEXT,
        status TEXT DEFAULT 'new',
        value DECIMAL(10,2),
        notes TEXT,
        assignedTo INTEGER,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (assignedTo) REFERENCES users (id)
      )
    `);

    // Deals table
    await runQuery(`
      CREATE TABLE IF NOT EXISTS deals (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        value DECIMAL(10,2) NOT NULL,
        stage TEXT DEFAULT 'prospecting',
        probability INTEGER DEFAULT 10,
        closeDate DATE,
        contactId INTEGER,
        companyId INTEGER,
        assignedTo INTEGER,
        notes TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (contactId) REFERENCES contacts (id),
        FOREIGN KEY (companyId) REFERENCES companies (id),
        FOREIGN KEY (assignedTo) REFERENCES users (id)
      )
    `);

    // Tasks table
    await runQuery(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        dueDate DATETIME,
        priority TEXT DEFAULT 'medium',
        status TEXT DEFAULT 'pending',
        assignedTo INTEGER,
        contactId INTEGER,
        companyId INTEGER,
        dealId INTEGER,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (assignedTo) REFERENCES users (id),
        FOREIGN KEY (contactId) REFERENCES contacts (id),
        FOREIGN KEY (companyId) REFERENCES companies (id),
        FOREIGN KEY (dealId) REFERENCES deals (id)
      )
    `);

    // Activities table
    await runQuery(`
      CREATE TABLE IF NOT EXISTS activities (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT NOT NULL,
        description TEXT NOT NULL,
        contactId INTEGER,
        companyId INTEGER,
        dealId INTEGER,
        userId INTEGER,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (contactId) REFERENCES contacts (id),
        FOREIGN KEY (companyId) REFERENCES companies (id),
        FOREIGN KEY (dealId) REFERENCES deals (id),
        FOREIGN KEY (userId) REFERENCES users (id)
      )
    `);

    // Create default admin user
    await runQuery(`
      INSERT OR IGNORE INTO users (email, password, firstName, lastName, role)
      VALUES ('admin@crm.com', '$2a$10$XQDxQ9jJ1YzQoQ7Y8zY8O.8Qx9H9Y8Y8Y8Y8Y8Y8Y8Y8Y8Y8Y8Y8Y8', 'Admin', 'User', 'admin')
    `);

    console.log('Database tables created successfully!');
  } catch (error) {
    console.error('Error creating tables:', error);
  }
};

createTables();