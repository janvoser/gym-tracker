import db from "$lib/db.js";

export async function load() {
  const workouts = await db.getWorkouts();
  const exercises = await db.getExercises();
  
  // Erstelle eine Liste aller einzigartigen Übungen aus den Workouts
  const uniqueExercises = [...new Set(workouts.map(w => w.exercise))];
  
  // Erstelle ein Objekt, das alle Workouts pro Übung gruppiert
  const progressData = {};
  for (const exercise of uniqueExercises) {
    const exerciseWorkouts = await db.getWorkoutsByExercise(exercise);
    if (exerciseWorkouts.length > 0) {
      progressData[exercise] = exerciseWorkouts;
    }
  }
  
  // Rückgabe der gruppierten Daten 
  return { 
    progressData,
    exercises 
  };
}