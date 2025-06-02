<style>
  .hero {
    background: url('/images/gym-background.jpg') no-repeat center center;
    background-size: cover;
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    text-align: center;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
  }

  .overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(2px);
  }

  .content {
    position: relative;
    z-index: 1;
    max-width: 700px;
    padding: 2rem;
  }

  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  .cta {
    background-color: #ff4081;
    color: white;
    padding: 1rem 2rem;
    font-size: 1.2rem;
    border: none;
    border-radius: 1rem;
    text-decoration: none;
    transition: 0.2s;
  }

  .cta:hover {
    background-color: #e73370;
  }
</style>

<div class="hero">
  <div class="overlay"></div>
  <div class="content">
    <h1>Willkommen zurück, Jan!</h1>
    <p>Dein stärkstes Ich beginnt genau hier.</p>
    <a href="/workouts/create" class="cta">Workout starten</a>
  </div>
</div>


