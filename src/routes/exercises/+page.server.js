import db from "$lib/db.js";

export async function load() {
  const exercises = await db.getExercises();
  return { exercises }; // Diese Übungen werden an die +page.svelte weitergegeben
}