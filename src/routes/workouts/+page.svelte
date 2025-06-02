<script>
  import WorkoutCard from '$lib/components/WorkoutCard.svelte';

  let { data } = $props();
  let workouts = $state(data.workouts || []);
  let sortNewestFirst = $state(true);
  let selectedExercise = $state("Alle"); // Übungs-Filter

  // Alle einzigartigen Übungen extrahieren
  const uniqueExercises = ["Alle", ...new Set(workouts.map(w => w.exercise).filter(e => e))].sort();

  // Vereinfachte Filter-Funktion
  function getSortedAndFilteredWorkouts() {
    if (!workouts || workouts.length === 0) {
      return [];
    }
    
    // Kopie erstellen
    let workoutsCopy = [...workouts];
    
    // 1. FILTERN nach Übung
    if (selectedExercise !== "Alle") {
      workoutsCopy = workoutsCopy.filter(workout => {
        return workout?.exercise === selectedExercise;
      });
    }
    
    // 2. SORTIEREN nach Datum
    workoutsCopy.sort((a, b) => {
      const dateA = a?.date || '2000-01-01';
      const dateB = b?.date || '2000-01-01';
      
      if (sortNewestFirst) {
        return dateB.localeCompare(dateA);
      } else {
        return dateA.localeCompare(dateB);
      }
    });
    
    return workoutsCopy;
  }

  // Direkter Aufruf statt $derived
  let filteredAndSortedWorkouts = $state([]);
  
  // Workouts aktualisieren wenn sich was ändert
  $effect(() => {
    filteredAndSortedWorkouts = getSortedAndFilteredWorkouts();
  });

  function toggleSort() {
    sortNewestFirst = !sortNewestFirst;
    filteredAndSortedWorkouts = getSortedAndFilteredWorkouts();
  }

  async function handleDelete(id) {
    if (!id) return;
    
    try {
      const res = await fetch(`/workouts/delete/${id}`, { method: 'DELETE' });
      const result = await res.json();
      if (result.success) {
        workouts = workouts.filter(w => w._id !== id);
        filteredAndSortedWorkouts = getSortedAndFilteredWorkouts();
      }
    } catch (error) {
      console.error("Fehler beim Löschen:", error);
    }
  }
</script>

<style>
  .container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem;
  }

  .header {
    margin-bottom: 2rem;
    text-align: center;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, #ff4081, #ffc1d6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .subtitle {
    color: #ccc;
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }

  .workout-count {
    background: rgba(255, 64, 129, 0.2);
    color: #ff4081;
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    font-size: 0.9rem;
    font-weight: bold;
    display: inline-block;
  }

  .controls {
    margin: 2rem 0;
    display: flex;
    justify-content: center;
    gap: 2rem;
    align-items: center;
    flex-wrap: wrap;
  }

  .sort-button {
    padding: 0.75rem 1.5rem;
    border-radius: 1rem;
    border: 2px solid #ff4081;
    background: transparent;
    color: #ff4081;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 500;
    font-size: 0.95rem;
  }

  .sort-button:hover {
    background: #ff4081;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(255, 64, 129, 0.3);
  }
  
  .exercise-filter {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
  
  .exercise-select {
    padding: 0.75rem 1.5rem;
    border-radius: 1rem;
    border: 2px solid #ff4081;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 500;
    min-width: 200px;
  }
  
  .exercise-select:hover {
    background: rgba(255, 64, 129, 0.2);
  }
  
  .exercise-select option {
    background: #222;
    color: white;
  }

  .no-workouts {
    text-align: center;
    padding: 4rem 2rem;
    color: #ccc;
    font-size: 1.2rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 1.5rem;
    margin: 2rem 0;
  }

  .no-workouts h3 {
    color: #ff4081;
    margin-bottom: 1rem;
  }

  .no-workouts a {
    color: #ff4081;
    text-decoration: none;
    font-weight: bold;
  }

  .no-workouts a:hover {
    text-decoration: underline;
  }

  .workout-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 2rem;
  }

  .filter-label {
    color: #ffc1d6;
    font-weight: bold;
    margin-right: 0.5rem;
  }

  .reset-button {
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    border: 2px solid #ff4081;
    background: transparent;
    color: #ff4081;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 500;
    font-size: 0.9rem;
  }

  .reset-button:hover {
    background: #ff4081;
    color: white;
  }
</style>

<div class="container">
  <div class="header">
    <h1>Workout Übersicht</h1>
    <p class="subtitle">Verwalten Sie Ihre Trainingseinheiten</p>
    <div class="workout-count">
      {filteredAndSortedWorkouts.length} Workouts 
      {selectedExercise !== "Alle" ? `- ${selectedExercise}` : ""}
    </div>
  </div>

  <div class="controls">
    <!-- Übungs-Filter Dropdown -->
    <div class="exercise-filter">
      <span class="filter-label">Übung:</span>
      <select 
        class="exercise-select" 
        bind:value={selectedExercise}
      >
        {#each uniqueExercises as exercise}
          <option value={exercise}>{exercise}</option>
        {/each}
      </select>
    </div>

    <!-- Sort Button -->
    <button onclick={toggleSort} class="sort-button">
      {sortNewestFirst ? 'Neueste zuerst' : 'Älteste zuerst'}
    </button>
  </div>

  <!-- Workout-Liste -->
  {#if filteredAndSortedWorkouts.length === 0}
    <div class="no-workouts">
      {#if selectedExercise === "Alle"}
        <h3> Noch keine Workouts vorhanden</h3>
        <p>Starten Sie Ihre Fitness-Reise!</p>
        <p><a href="/workouts/create">Erstellen Sie Ihr erstes Workout →</a></p>
      {:else}
        <h3> Keine {selectedExercise}-Workouts gefunden</h3>
        <p>Sie haben noch keine Workouts für diese Übung erstellt.</p>
        <p>
          <button class="reset-button" onclick={() => selectedExercise = "Alle"}>
            Alle Workouts anzeigen
          </button>
        </p>
      {/if}
    </div>
  {:else}
    <div class="workout-list">
      {#each filteredAndSortedWorkouts as workout}
        <WorkoutCard {workout} onDelete={handleDelete} />
      {/each}
    </div>
  {/if}
</div>