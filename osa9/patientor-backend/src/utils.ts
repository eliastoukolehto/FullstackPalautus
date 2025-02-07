import { Gender, NewPatient } from "./types";
import { z } from 'zod';

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender:  z.nativeEnum(Gender),
  occupation: z.string(),
});

/* const baseEntrySchema = z.object({

})
 */

export const toNewPatient = (object: unknown): NewPatient => {
  return NewPatientSchema.parse(object);
};

/* const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseString = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error('Incorrect text data ' + text);
  }
  return text;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect gender ' + gender);
  }
  return gender;
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    const newPatient: NewPatient = {
      name: parseString(object.name),
      dateOfBirth: parseString(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation)
    };
    return newPatient;
  }
  
  throw new Error('Incorrect data: some fields are missing');
}; */