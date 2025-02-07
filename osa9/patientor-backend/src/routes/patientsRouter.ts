import express from "express";
import patientsService from '../services/patientService';
import { toNewPatient } from "../utils";
import { z } from 'zod';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getPatientsSafe());
});

router.get('/:id', (req, res) => {
  const patient = patientsService.findById(req.params.id);
  if (patient === undefined) {
    res.status(400).send({ error: 'invalid patient id' });
  } else {
    res.send(patient);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientsService.addPatient(newPatient);
    res.json(addedPatient);

  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'unknown error' });
    }
  }
});

export default router;