import db from "$lib/db.js";

export async function load({ params }) {
  const exercise = await db.getExercise(params.id);
  if (!exercise) {
    return {
      status: 404,
      error: new Error("Übung nicht gefunden")
    };
  }
  return { exercise };
}