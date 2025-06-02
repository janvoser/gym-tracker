<!--Workout erstellen-->
<script>
  let { data } = $props(); // Zugriff auf die geladenen Übungen
  const exercises = data.exercises || [];
  
  let selectedExerciseName = $state("");
  let selectedEquipment = $state("");
  let selectedExercise = $state(null);
  
  // Funktion: reagiert auf Änderung der Übungsauswahl
  function handleExerciseChange(event) {
    selectedExerciseName = event.target.value;
    selectedEquipment = "";
    
    // Suche das vollständige Übungsobjekt anhand des Namens
    if (selectedExerciseName) {
      selectedExercise = exercises.find(e => e.name === selectedExerciseName) || null;
    } else {
      selectedExercise = null;
    }
  }
</script>

<style>
  .form-container {
    max-width: 600px;
    margin: 3rem auto;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 1.5rem;
    color: white;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
  }

  .form-group {
    margin-bottom: 1.2rem;
  }

  label {
    display: block;
    margin-bottom: 0.3rem;
    font-weight: bold;
  }

  input,
  select,
  textarea {
    width: 100%;
    padding: 0.7rem;
    border-radius: 0.75rem;
    border: none;
    font-size: 1rem;
  }

  button {
    background-color: #ff4081;
    color: white;
    border: none;
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    border-radius: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  button:hover {
    background-color: #e73370;
  }

  .exercise-info {
    margin-top: 1rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 1rem;
    font-size: 0.95rem;
    line-height: 1.4;
  }

  .exercise-info strong {
    color: #ffc1d6;
  }

  .error-message {
    color: #ff6b6b;
    text-align: center;
    padding: 1rem;
    background: rgba(255, 107, 107, 0.1);
    border-radius: 1rem;
    margin-bottom: 1rem;
  }
</style>

<!-- Formular zum Erstellen eines neuen Workouts -->
<div class="form-container">
  {#if exercises.length === 0} 
    <div class="error-message">
      <strong>Keine Übungen gefunden!</strong><br>
      Bitte fügen Sie erst Übungen zur Datenbank hinzu.
    </div>
  {:else}
    <form method="POST">
      <!-- Übungsauswahl -->
      <div class="form-group">
        <label for="exercise">Übung:</label>
        <select name="exercise" id="exercise" bind:value={selectedExerciseName} onchange={handleExerciseChange} required>
          <option value="">Wähle eine Übung</option>
          {#each exercises as exercise}
            <option value={exercise.name}>{exercise.name}</option>
          {/each}
        </select>
      </div>

      <!-- Anzeige von Übungsdetails (Muskelgruppe, Beschreibung usw.) -->
      {#if selectedExercise}
        <div class="exercise-info">
          <div><strong>Muskelgruppe:</strong> {selectedExercise.muscleGroup || 'Nicht definiert'}</div>
          <div><strong>Equipment:</strong> {selectedExercise.equipment?.join(", ") || 'Nicht definiert'}</div>
          <div><strong>Beschreibung:</strong> {selectedExercise.description || 'Keine Beschreibung verfügbar'}</div>
        </div>

        <!-- Equipment-Auswahlfeld -->
        {#if selectedExercise.equipment && selectedExercise.equipment.length > 0}
          <div class="form-group">
            <label for="equipment">Verwendetes Equipment:</label>
            <select name="equipment" id="equipment" bind:value={selectedEquipment} required>
              <option value="">Wähle dein verwendetes Equipment</option>
              {#each selectedExercise.equipment as item}
                <option value={item}>{item}</option>
              {/each}
            </select>
          </div>
        {/if}
      {/if}

      <!-- Gewicht (in kg) -->
      <div class="form-group">
        <label for="weight">Gewicht (kg):</label>
        <input type="number" name="weight" id="weight" min="0" required />
      </div>

      <!-- Wiederholungen (z. B. "3x10") -->
      <div class="form-group">
        <label for="reps">Wiederholungen:</label>
        <input type="text" name="reps" id="reps" placeholder="z. B. 3x10" required />
      </div>

      <!-- Freitextnotizen -->
      <div class="form-group">
        <label for="notes">Notizen:</label>
        <textarea name="notes" id="notes" rows="2"></textarea>
      </div>

      <!-- Datumsauswahl -->
      <div class="form-group">
        <label for="date">Datum:</label>
        <input type="date" name="date" id="date" required />
      </div>

      <button type="submit">Workout speichern</button>
    </form>
  {/if}
</div>