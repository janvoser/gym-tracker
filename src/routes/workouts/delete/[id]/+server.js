import db from '$lib/db.js';

export async function DELETE({ params }) {
  const id = params.id;
  const result = await db.deleteWorkout(id);

  if (result) {
    return new Response(JSON.stringify({ success: true }), {
      status: 200
    });
  } else {
    return new Response(JSON.stringify({ success: false }), {
      status: 500
    });
  }
}
