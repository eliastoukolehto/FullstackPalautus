import express from 'express';
import calculateBmi from './bmiCalculator';
import { isNotNumber } from './utils';
import calculateExercises from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = req.query.height;
  const weight = req.query.weight;
  if (isNotNumber(height) || isNotNumber(weight)) {
    res.send({
      error: "malformatted parameters"
    });
  } else {
    const bmi = calculateBmi(Number(height), Number(weight));
    res.send({
      weight: weight,
      height: height,
      bmi: bmi
    });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises } = req.body;
  const exercises_array = daily_exercises as number[];

  if (!target || !daily_exercises ) {
    res.status(400).send({ error: "parameters missing" });
  } else if (exercises_array.filter(isNotNumber).length > 0 || isNotNumber(target)) {
    res.status(400).send({ error: "malformatted parameters" });
  } else {
    const result = calculateExercises(exercises_array, Number(target));
    res.send({
      result
    });
  }
});


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
