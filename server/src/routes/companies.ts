import express from 'express';
import { body, validationResult } from 'express-validator';
import { runQuery, getAll, getOne } from '../database/connection';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { Company } from '../types';

const router = express.Router();

// Get all companies
router.get('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const companies = await getAll('SELECT * FROM companies ORDER BY name ASC');
    res.json(companies);
  } catch (error) {
    console.error('Get companies error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get company by ID
router.get('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const company = await getOne('SELECT * FROM companies WHERE id = ?', [req.params.id]);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.json(company);
  } catch (error) {
    console.error('Get company error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new company
router.post('/', [
  authenticateToken,
  body('name').trim().isLength({ min: 1 }),
  body('email').optional().isEmail().normalizeEmail(),
  body('website').optional().isURL()
], async (req: AuthRequest, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name, website, industry, size, phone, email,
      address, city, state, zipCode, country, notes
    } = req.body;

    const result = await runQuery(`
      INSERT INTO companies (name, website, industry, size, phone, email, address, city, state, zipCode, country, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [name, website, industry, size, phone, email, address, city, state, zipCode, country, notes]);

    const newCompany = await getOne('SELECT * FROM companies WHERE id = ?', [result.id]);
    
    // Log activity
    await runQuery(`
      INSERT INTO activities (type, description, companyId, userId)
      VALUES (?, ?, ?, ?)
    `, ['company_created', `Company "${name}" was created`, result.id, req.user.id]);

    res.status(201).json(newCompany);
  } catch (error) {
    console.error('Create company error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update company
router.put('/:id', [
  authenticateToken,
  body('name').trim().isLength({ min: 1 }),
  body('email').optional().isEmail().normalizeEmail(),
  body('website').optional().isURL()
], async (req: AuthRequest, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name, website, industry, size, phone, email,
      address, city, state, zipCode, country, notes
    } = req.body;

    const result = await runQuery(`
      UPDATE companies 
      SET name = ?, website = ?, industry = ?, size = ?, phone = ?, email = ?,
          address = ?, city = ?, state = ?, zipCode = ?, country = ?, notes = ?,
          updatedAt = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [name, website, industry, size, phone, email, address, city, state, zipCode, country, notes, req.params.id]);

    if (result.changes === 0) {
      return res.status(404).json({ message: 'Company not found' });
    }

    const updatedCompany = await getOne('SELECT * FROM companies WHERE id = ?', [req.params.id]);
    
    // Log activity
    await runQuery(`
      INSERT INTO activities (type, description, companyId, userId)
      VALUES (?, ?, ?, ?)
    `, ['company_updated', `Company "${name}" was updated`, req.params.id, req.user.id]);

    res.json(updatedCompany);
  } catch (error) {
    console.error('Update company error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete company
router.delete('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const company = await getOne('SELECT name FROM companies WHERE id = ?', [req.params.id]);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    const result = await runQuery('DELETE FROM companies WHERE id = ?', [req.params.id]);
    
    // Log activity
    await runQuery(`
      INSERT INTO activities (type, description, userId)
      VALUES (?, ?, ?)
    `, ['company_deleted', `Company "${company.name}" was deleted`, req.user.id]);

    res.json({ message: 'Company deleted successfully' });
  } catch (error) {
    console.error('Delete company error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;