<script>
  let { data } = $props(); // Empfängt ein einzelnes Workout über data.workout
</script>

<h1>Workout Detail</h1>

<p><strong>Übung:</strong> {data.workout.exercise}</p>
<p><strong>Gewicht:</strong> {data.workout.weight} kg</p>
<p><strong>Wiederholungen:</strong> {data.workout.reps}</p>
<p><strong>Datum:</strong> {data.workout.date}</p>

{#if data.workout.notes}
  <p><strong>Notizen:</strong> {data.workout.notes}</p>
{/if}



