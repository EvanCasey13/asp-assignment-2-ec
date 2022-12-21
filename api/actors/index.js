import express from 'express';
import uniqid from 'uniqid'
import actorModel from './actorModel';
import asyncHandler from 'express-async-handler';
import { actors } from './actorsData';

const router = express.Router(); 

// Get all actors
router.get('/', asyncHandler(async (req, res) => {
    const actors = await actorModel.find();
    res.status(200).json(actors);
}));

// Get actor details
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const actor = await actorModel.findByActorDBId(id);
    if (actor) {
        res.status(200).json(actor);
    } else {
        res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});
    }
}));

export default router;