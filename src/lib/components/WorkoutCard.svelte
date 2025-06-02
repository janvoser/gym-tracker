<script>
  let { workout, onDelete } = $props();
  let isOpen = $state(false);
  
  function toggle() {
    isOpen = !isOpen;
  }
  
  async function deleteWorkout() {
    const exerciseName = workout?.exercise || 'dieses Workout';
    const confirmed = confirm(`Workout "${exerciseName}" wirklich löschen?`);
    if (confirmed && workout?._id) {
      await onDelete(workout._id);
    }
  }
  
  // Hilfsfunktionen für saubere Checks
  function hasValidEquipment(workout) {
    return workout?.equipment && workout.equipment !== null && workout.equipment.trim() !== "";
  }
  
  function hasValidNotes(workout) {
    return workout?.notes && workout.notes.trim() !== "";
  }
  
  // Sichere Getter-Funktionen
  function getEquipment(workout) {
    return workout?.equipment || '';
  }
  
  function getNotes(workout) {
    return workout?.notes || '';
  }
</script>

<style>
  .card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(6px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 1rem;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    color: white;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }
  
  .card:hover {
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.2);
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .title {
    font-size: 1.3rem;
    font-weight: bold;
    color: #ff4081;
  }
  
  .date {
    font-size: 0.95rem;
    color: #ccc;
  }
  
  .details {
    margin-top: 1rem;
    font-size: 1rem;
    line-height: 1.6;
    color: #eee;
  }
  
  .label {
    font-weight: bold;
    color: #ffc1d6;
  }
  
  .delete-button {
    margin-top: 1.5rem;
    background-color: transparent;
    border: 2px solid #ff4081;
    color: #ff4081;
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .delete-button:hover {
    background-color: #ff4081;
    color: white;
  }

  .error-card {
    background: rgba(255, 107, 107, 0.1);
    border: 1px solid rgba(255, 107, 107, 0.3);
    color: #ff6b6b;
  }
</style>

<!-- Sicherheitscheck für workout-Objekt -->
{#if !workout}
  <div class="card error-card">
    <div class="header">
      <div class="title">Fehlerhafte Workout-Daten</div>
    </div>
  </div>
{/if}

{#if workout}
  <div class="card" on:click={toggle}>
    <div class="header">
      <div class="title">{workout?.exercise || 'Unbekannte Übung'}</div>
      <div class="date">{workout?.date || 'Kein Datum'}</div>
    </div>
    
    {#if isOpen}
      <div class="details">
        {#if workout?.muscleGroup}
          <div><span class="label">Muskelgruppe:</span> {workout?.muscleGroup}</div>
        {/if}
        
        {#if workout?.weight}
          <div><span class="label">Gewicht:</span> {workout?.weight} kg</div>
        {/if}
        
        {#if workout?.reps}
          <div><span class="label">Wiederholungen:</span> {workout?.reps}</div>
        {/if}
        
        {#if hasValidEquipment(workout)}
          <div><span class="label">Equipment:</span> {getEquipment(workout)}</div>
        {/if}
        
        {#if hasValidNotes(workout)}
          <div><span class="label">Notizen:</span> {getNotes(workout)}</div>
        {/if}
        
        <button class="delete-button" on:click|stopPropagation={deleteWorkout}>
          Workout löschen
        </button>
      </div>
    {/if}
  </div>
{/if}