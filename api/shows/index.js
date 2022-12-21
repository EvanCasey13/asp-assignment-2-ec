import express from 'express';
import uniqid from 'uniqid'
import showModel from './showModel';
import asyncHandler from 'express-async-handler';
import { shows } from './showData';

const router = express.Router(); 

router.get('/', asyncHandler(async (req, res) => {
    const shows = await showModel.find();
    res.status(200).json(shows);
}));
  
// Get movie details
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const show = await showModel.findByShowDBId(id);
    if (show) {
        res.status(200).json(show);
    } else {
        res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});
    }
}));

export default router;