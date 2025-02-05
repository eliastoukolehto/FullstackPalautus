import { isNotNumber } from "./utils";


const calculateExercises = (hours: number[], target: number) : object => {
  const ratingCalculator = (average: number, target: number) : number => {
    const diff = average-target;
    switch (true) {
      case diff < -1:
        return 1;
      case diff < 0:
        return 2;
      default:
        return 3;
    }
  };
  const ratingDescriber = (rating: number) : string => {
    switch (true) {
      case (rating == 1):
        return 'falling behind';
      case (rating == 2):
          return 'not too bad but could be better';
      default:
        return 'target reached';
    }
  };

  const average = hours.reduce((a, b) => a + b, 0) / hours.length;
  const rating = ratingCalculator(average, target);

  const results: Results = {
    periodLength: hours.length,
    trainingDays: hours.filter(h => h !== 0).length,
    success: average > target,
    rating: ratingCalculator(average, target),
    ratingDescription: ratingDescriber(rating),
    target: target,
    average: hours.reduce((a, b) => a + b, 0) / hours.length,
  };

  return results;
};

interface Results {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

if (require.main === module) {
  const target = Number(process.argv[2]);
  const hours = process.argv.slice(3).map(a => Number(a));
  if (hours.filter(isNotNumber).length > 0 || isNotNumber(target)) {
    console.log('input error');
  } else {
    console.log(calculateExercises (hours, target));
  }
}

export default calculateExercises;