<script>
  import "./styles.css";
  let { children } = $props();
</script>

<style>
  .navbar {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(255, 64, 129, 0.9); /* Pink mit Transparenz */
    backdrop-filter: blur(10px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: calc(100% - 4rem);
    max-width: 1000px;
    padding: 0.8rem 2rem;
    border-radius: 1rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    z-index: 100;
    color: white;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
  }

  .nav-left {
    font-weight: bold;
    font-size: 1.2rem;
  }

  .nav-left a {
    color: white;
    text-decoration: none;
  }

  .nav-right a {
    color: white;
    text-decoration: none;
    margin-left: 1.5rem;
    transition: color 0.2s;
    font-weight: 500;
  }

  .nav-right a:hover {
    color: #ffe0ec;
  }

  main {
    padding-top: 120px;
    padding-left: 1rem;
    padding-right: 1rem;
  }
</style>

<!-- Moderne pinke Navbar -->
<div class="navbar">
  <div class="nav-left">
    <a href="/">GymTracker</a>
  </div>
  <div class="nav-right">
    <a href="/workouts">Workouts</a>
    <a href="/exercises">Übungen</a>
    <a href="/progress">Fortschritt</a>
    <a href="/workouts/create">Neues Workout</a>
  </div>
</div>

<!-- Seiteninhalt -->
<main>
  {@render children()}
</main>