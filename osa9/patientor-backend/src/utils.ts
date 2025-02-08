import { Gender, HealthCheckRating, NewEntry, NewPatient } from "./types";
import { z } from 'zod';

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender:  z.nativeEnum(Gender),
  occupation: z.string(),
});

export const newBaseEntrySchema = z.object({
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional()
});

export const healthCheckEntrySchema = newBaseEntrySchema.extend({
  type: z.literal('HealthCheck'),
  healthCheckRating: z.nativeEnum(HealthCheckRating)
});

export const hospitalEntrySchema = newBaseEntrySchema.extend({
  type: z.literal('Hospital'),
  discharge: z.object({
    date: z.string().date(),
    criteria: z.string()
  })
});

export const occupationalHealthcareSchema = newBaseEntrySchema.extend({
  type: z.literal('OccupationalHealthcare'),
  employerName: z.string(),
  sickLeave: z.object({
    startDate: z.string(),
    endDate: z.string()
  }).optional()
});

export const newEntrySchema = z.union([
  healthCheckEntrySchema, 
  hospitalEntrySchema, 
  occupationalHealthcareSchema
]);


export const toNewPatient = (object: unknown): NewPatient => {
  return NewPatientSchema.parse(object);
};

export const toNewEntry = (object: unknown): NewEntry => {
  return newEntrySchema.parse(object);
};

