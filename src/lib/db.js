import { MongoClient, ObjectId } from "mongodb";
import { MONGODB_URI } from "$env/static/private";

const client = new MongoClient(MONGODB_URI);
await client.connect();
const db = client.db("gymtracker");

//////////////////////////////////////////
// Workouts
//////////////////////////////////////////

async function getWorkouts() {
  try {
    const collection = db.collection("workouts");
    const workouts = await collection.find({}).toArray();
    workouts.forEach((w) => (w._id = w._id.toString()));
    return workouts;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function getWorkout(id) {
  try {
    const collection = db.collection("workouts");
    const workout = await collection.findOne({ _id: new ObjectId(id) });
    if (workout) workout._id = workout._id.toString();
    return workout;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function createWorkout(workout) {
  try {
    const collection = db.collection("workouts");
    const result = await collection.insertOne(workout);
    return result.insertedId.toString();
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function updateWorkout(workout) {
  try {
    const id = workout._id;
    delete workout._id;
    const collection = db.collection("workouts");
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: workout }
    );
    return result.matchedCount > 0 ? id : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function deleteWorkout(id) {
  try {
    const collection = db.collection("workouts");
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0 ? id : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

//////////////////////////////////////////
// Exercises (Übungen)
//////////////////////////////////////////

async function getExercises() {
  try {
    const collection = db.collection("exercises");
    const exercises = await collection.find({}).toArray();
    exercises.forEach((e) => (e._id = e._id.toString()));
    return exercises;
  } catch (error) {
    console.log(error);
    return [];
  }
}

// NEU: Einzelne Übung abrufen
async function getExercise(id) {
  try {
    const collection = db.collection("exercises");
    const exercise = await collection.findOne({ _id: new ObjectId(id) });
    if (exercise) exercise._id = exercise._id.toString();
    return exercise;
  } catch (error) {
    console.log(error);
    return null;
  }
}

//////////////////////////////////////////
// Progress Tracking
//////////////////////////////////////////

async function getWorkoutsByExercise(exerciseName) {
  try {
    const collection = db.collection("workouts");
    const workouts = await collection
      .find({ exercise: exerciseName })
      .sort({ date: 1 })
      .toArray();
    workouts.forEach((w) => (w._id = w._id.toString()));
    return workouts;
  } catch (error) {
    console.log(error);
    return [];
  }
}

// Export aller Funktionen
export default {
  getWorkouts,
  getWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout,
  getExercises,
  getExercise, // NEU hinzugefügt
  getWorkoutsByExercise
};