import { isNotNumber } from "./utils";

const calculateBmi = (height: number, weight: number) : string  => {
  const bmi = weight/((height/100) ** 2);
  switch(true) {
    case bmi < 16:
      return 'underweight (severe)';
    case bmi < 17:
      return 'underweight (moderate)';
    case bmi < 18.5:
      return 'underweight (mild)';
    case bmi < 25:
      return 'normal range';
    case bmi < 30:
      return 'overweight';
    case bmi < 35:
      return 'obese (Class I)';
    case bmi < 40:
      return 'obese (Class II)';
    default:
      return 'obese (Class III)';
  }
  
};

if (require.main === module) {
  const height = Number(process.argv[2]);
  const weight = Number(process.argv[3]);

  if (isNotNumber(height) || isNotNumber(weight)) {
    console.log("input error");
  } else {
  console.log(calculateBmi(height, weight));
  }
}

export default calculateBmi;