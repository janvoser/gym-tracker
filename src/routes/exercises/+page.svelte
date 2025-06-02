<script>
  let { data } = $props();
  let exercises = $state(data.exercises || []);
  let selectedFilter = $state("Alle");
  
  const filterOptions = ["Alle", "Push", "Pull", "Beine", "Sonstiges"];
  
  // Mapping der Muskelgruppen zu Kategorien
  const categoryMap = {
    "Brust": "Push",
    "Schultern": "Push",
    "Trizeps": "Push",
    "Rücken": "Pull",
    "Bizeps": "Pull",
    "Beine": "Beine",
    "Quadrizeps": "Beine",
    "Beinbeuger": "Beine",
    "Gluteus": "Beine",
    "Waden": "Beine"
  };
  
  // Funktion um Kategorie für eine Übung zu bestimmen
  function getExerciseCategory(exercise) {
    const muscleGroup = exercise.muscleGroup || "";
    for (const [muscle, category] of Object.entries(categoryMap)) {
      if (muscleGroup.includes(muscle)) {
        return category;
      }
    }
    return "Sonstiges";
  }
  
  // Gefilterte Übungen
  function getFilteredExercises() {
    if (selectedFilter === "Alle") {
      return exercises;
    }
    
    return exercises.filter(exercise => {
      const category = getExerciseCategory(exercise);
      return category === selectedFilter;
    });
  }
  
  let filteredExercises = $state([]);
  
  $effect(() => {
    filteredExercises = getFilteredExercises();
  });
  
  function setFilter(filter) {
    selectedFilter = filter;
  }
</script>

<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .header {
    text-align: center;
    margin-bottom: 3rem;
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
  }
  
  .exercise-count {
    background: rgba(255, 64, 129, 0.2);
    color: #ff4081;
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    font-size: 0.9rem;
    font-weight: bold;
    display: inline-block;
    margin-top: 1rem;
  }
  
  .controls {
    margin: 2rem 0;
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    align-items: center;
    flex-wrap: wrap;
  }
  
  .filter-section {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
  
  .filter-label {
    color: #ffc1d6;
    font-weight: bold;
    margin-right: 0.5rem;
  }
  
  .filter-button {
    padding: 0.6rem 1.2rem;
    border-radius: 1rem;
    border: 2px solid #ff4081;
    background: transparent;
    color: #ff4081;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 500;
    font-size: 0.9rem;
  }
  
  .filter-button.active {
    background: #ff4081;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(255, 64, 129, 0.3);
  }
  
  .filter-button:hover {
    background: #ff4081;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(255, 64, 129, 0.3);
  }
  
  .exercises-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
  }
  
  .exercise-card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 1rem;
    padding: 1.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
    color: white;
    text-decoration: none;
    display: block;
    text-align: center;
  }
  
  .exercise-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(255, 64, 129, 0.3);
    border-color: #ff4081;
  }
  
  .exercise-name {
    font-size: 1.1rem;
    font-weight: bold;
    color: #ff4081;
    margin-bottom: 0.5rem;
  }
  
  .category-badge {
    font-size: 0.75rem;
    padding: 0.2rem 0.6rem;
    border-radius: 0.8rem;
    font-weight: bold;
    background: rgba(255, 255, 255, 0.1);
    color: #ffc1d6;
    display: inline-block;
  }
  
  .category-badge.push {
    background: rgba(255, 107, 107, 0.2);
    color: #ff6b6b;
  }
  
  .category-badge.pull {
    background: rgba(107, 203, 255, 0.2);
    color: #6bcbff;
  }
  
  .category-badge.beine {
    background: rgba(144, 255, 107, 0.2);
    color: #90ff6b;
  }
  
  .no-exercises {
    text-align: center;
    padding: 4rem 2rem;
    color: #ccc;
    font-size: 1.2rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 1.5rem;
    margin: 2rem 0;
  }
  
  .no-exercises h3 {
    color: #ff4081;
    margin-bottom: 1rem;
  }
</style>

<div class="container">
  <div class="header">
    <h1>Übungskatalog</h1>
    <p class="subtitle">Alle verfügbaren Übungen im Überblick</p>
    <div class="exercise-count">
      {filteredExercises.length} {selectedFilter !== "Alle" ? selectedFilter + "-" : ""}Übungen
    </div>
  </div>
  
  <div class="controls">
    <div class="filter-section">
      <span class="filter-label">Filter:</span>
      {#each filterOptions as filter}
        <button 
          class="filter-button" 
          class:active={selectedFilter === filter}
          onclick={() => setFilter(filter)}
        >
          {filter}
        </button>
      {/each}
    </div>
  </div>
  
  {#if filteredExercises.length === 0}
    <div class="no-exercises">
      <h3>🔍 Keine {selectedFilter}-Übungen gefunden</h3>
      <p>Keine Übungen in dieser Kategorie vorhanden.</p>
    </div>
  {:else}
    <div class="exercises-grid">
      {#each filteredExercises as exercise}
        {@const category = getExerciseCategory(exercise)}
        <a href="/exercises/{exercise._id}" class="exercise-card">
          <h3 class="exercise-name">{exercise.name}</h3>
          <span class="category-badge {category.toLowerCase()}">{category}</span>
        </a>
      {/each}
    </div>
  {/if}
</div>