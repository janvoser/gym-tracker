import db from '$lib/db.js';
import { redirect } from '@sveltejs/kit';

export async function load() {
  const exercises = await db.getExercises();
  return { exercises };
}

export const actions = {
  default: async ({ request }) => {
    console.log("🚀 WORKOUT WIRD ERSTELLT...");
    const formData = await request.formData();
    
    const newWorkout = {
      exercise: formData.get("exercise"),
      equipment: formData.get("equipment"),
      weight: Number(formData.get("weight")),
      reps: formData.get("reps"),
      notes: formData.get("notes"),
      date: formData.get("date")
    };

    console.log("📋 Formular Daten:", newWorkout);

    const exerciseFromDb = await db.getExercises();
    const matching = exerciseFromDb.find(e => e.name === newWorkout.exercise);
    if (matching) {
      newWorkout.muscleGroup = matching.muscleGroup;
      newWorkout.description = matching.description;
    }

    console.log("📋 Workout vor Speichern:", newWorkout);
    
    const result = await db.createWorkout(newWorkout);
    
    console.log("✅ Speicher-Ergebnis:", result);
    
    if (result) {
      console.log("✅ ERFOLG - Weiterleitung zu /workouts");
      throw redirect(303, '/workouts');
    } else {
      console.log("❌ FEHLER beim Speichern");
      return { success: false, error: "Fehler beim Speichern" };
    }
  }
};




