import db from "$lib/db.js";

export async function load({ params }) {
  const workout = await db.getWorkout(params.id);
  if (!workout) {
    return {
      status: 404,
      error: new Error("Workout nicht gefunden")
    };
  }
  return { workout };
}

