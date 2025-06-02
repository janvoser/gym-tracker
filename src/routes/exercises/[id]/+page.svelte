<script>
    let { data } = $props();
    let exercise = data.exercise;
    
    // Mapping für Übungsbilder basierend auf dem Namen
    const exerciseImages = {
      "Bankdrücken": "/images/bankdruecken.jpg",
      "Beinpresse": "/images/beinpresse.jpg", 
      "Dips": "/images/dips.jpg",
      "Crunches": "/images/crunches.jpg",
      "Wadenheben": "/images/wadenheben.jpg",
      "Seitheben": "/images/seitheben.jpg",
      "Vorgebeugtes Seitheben": "/images/vorgebeugtesseitheben.jpg",
      "Kniebeugen": "/images/kniebeugen.jpg",
      "Kreuzheben": "/images/kreuzheben.jpg",
      "Latzug": "/images/latzug.jpg",
      "Rudern sitzend": "/images/rudern.jpg",
      "Schulterdrücken": "/images/schulterdruecken.jpg",
      "Klimmzüge": "/images/klimmzuege.jpg",
      "Trizepsdrücken am Kabel": "/images/trizepsdruecken.jpg",
      "Schrägbankdrücken": "/images/schraegbankdruecken.jpg",
      "Beinstrecker": "/images/beinstrecker.jpg",
      "Butterfly": "/images/butterfly.jpg",
      "Bizepscurls": "/images/bizepscurls.jpg",
      "Beinbeuger liegend": "/images/beinbeuger.jpg"
    };
    
    function getExerciseImage(name) {
      return exerciseImages[name] || "/exercises/default.jpg";
    }
    
    // Kategorie bestimmen
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
    
    function getCategory() {
      const muscleGroup = exercise?.muscleGroup || "";
      for (const [muscle, category] of Object.entries(categoryMap)) {
        if (muscleGroup.includes(muscle)) {
          return category;
        }
      }
      return "Sonstiges";
    }
  </script>
  
  <style>
    .container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 2rem;
    }
    
    .back-link {
      display: inline-block;
      color: #ff4081;
      text-decoration: none;
      margin-bottom: 2rem;
      font-weight: 500;
      transition: all 0.3s ease;
    }
    
    .back-link:hover {
      transform: translateX(-5px);
    }
    
    .exercise-detail {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 1.5rem;
      overflow: hidden;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
    }
    
    .exercise-image {
      width: 100%;
      height: 400px;
      object-fit: cover;
      background: #000;
    }
    
    .exercise-content {
      padding: 2.5rem;
      color: white;
    }
    
    .exercise-header {
      margin-bottom: 2rem;
      display: flex;
      justify-content: space-between;
      align-items: start;
      flex-wrap: wrap;
      gap: 1rem;
    }
    
    .exercise-title {
      font-size: 2.5rem;
      color: #ff4081;
      margin: 0;
    }
    
    .category-badge {
      font-size: 1rem;
      padding: 0.5rem 1rem;
      border-radius: 1rem;
      font-weight: bold;
      background: rgba(255, 255, 255, 0.1);
      color: #ffc1d6;
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
    
    .info-section {
      margin-bottom: 2rem;
    }
    
    .info-label {
      font-weight: bold;
      color: #ffc1d6;
      margin-bottom: 0.5rem;
      font-size: 1.1rem;
    }
    
    .info-value {
      color: #eee;
      line-height: 1.6;
      font-size: 1rem;
    }
    
    .equipment-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.8rem;
      margin-top: 0.5rem;
    }
    
    .equipment-tag {
      background: rgba(255, 64, 129, 0.2);
      color: #ff4081;
      padding: 0.5rem 1rem;
      border-radius: 1rem;
      font-size: 0.95rem;
    }
    
    .error-message {
      text-align: center;
      padding: 4rem 2rem;
      color: #ff6b6b;
      font-size: 1.2rem;
    }
  </style>
  
  <div class="container">
    <a href="/exercises" class="back-link">← Zurück zur Übersicht</a>
    
    {#if exercise}
      <div class="exercise-detail">
        <img 
          src={getExerciseImage(exercise.name)} 
          alt={exercise.name}
          class="exercise-image"
        />
        
        <div class="exercise-content">
          <div class="exercise-header">
            <h1 class="exercise-title">{exercise.name}</h1>
            <span class="category-badge {getCategory().toLowerCase()}">{getCategory()}</span>
          </div>
          
          <div class="info-section">
            <div class="info-label">Muskelgruppe:</div>
            <div class="info-value">{exercise.muscleGroup || 'Nicht angegeben'}</div>
          </div>
          
          {#if exercise.description}
            <div class="info-section">
              <div class="info-label">Beschreibung:</div>
              <div class="info-value">{exercise.description}</div>
            </div>
          {/if}
          
          {#if exercise.equipment && exercise.equipment.length > 0}
            <div class="info-section">
              <div class="info-label">Benötigtes Equipment:</div>
              <div class="equipment-list">
                {#each exercise.equipment as item}
                  <span class="equipment-tag">{item}</span>
                {/each}
              </div>
            </div>
          {/if}
        </div>
      </div>
    {:else}
      <div class="error-message">
        <h2>Übung nicht gefunden</h2>
        <p>Die gesuchte Übung existiert nicht.</p>
      </div>
    {/if}
  </div>