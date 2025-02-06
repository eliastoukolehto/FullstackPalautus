import diagnosisService from "../services/diagnosisService";
import express from 'express';
//import { Diagnosis } from "../types"; using this gave lint errors

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnosisService.getDiagnoses());
});

export default router;