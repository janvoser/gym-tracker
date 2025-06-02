import db from "$lib/db.js";

export async function load() {
  console.log("LADE WORKOUTS...");
  const workouts = await db.getWorkouts();
  console.log("Anzahl Workouts gefunden:", workouts.length);
  console.log("Alle Workouts:", workouts);
  return { workouts };
}