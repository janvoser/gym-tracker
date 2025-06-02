<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
    
    let { data } = $props();
    let selectedExercise = $state("");
    let chartContainer;
    let width = 800;
    let height = 400;
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    
    // Alle verfügbaren Übungen aus den Workouts
    const availableExercises = Object.keys(data.progressData);
    
    // Chart-Update-Funktion
    function updateChart() {
      if (!selectedExercise || !chartContainer) return;
      
      // Clear previous chart
      d3.select(chartContainer).selectAll("*").remove();
      
      const workouts = data.progressData[selectedExercise];
      if (!workouts || workouts.length === 0) return;
      
      // Daten vorbereiten
      const chartData = workouts.map(w => ({
        date: new Date(w.date),
        weight: w.weight,
        reps: w.reps
      }));
      
      // SVG Setup
      const svg = d3.select(chartContainer)
        .append("svg")
        .attr("width", width)
        .attr("height", height);
      
      const g = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
      
      // Scales
      const xScale = d3.scaleTime()
        .domain(d3.extent(chartData, d => d.date))
        .range([0, width - margin.left - margin.right]);
      
      const yScale = d3.scaleLinear()
        .domain([0, d3.max(chartData, d => d.weight) * 1.1])
        .range([height - margin.top - margin.bottom, 0]);
      
      // Line generator
      const line = d3.line()
        .x(d => xScale(d.date))
        .y(d => yScale(d.weight))
        .curve(d3.curveMonotoneX);
      
      // Add X axis
      g.append("g")
        .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
        .call(d3.axisBottom(xScale)
          .tickFormat(d3.timeFormat("%d.%m")))
        .append("text")
        .attr("x", width - margin.left - margin.right)
        .attr("y", -5)
        .attr("text-anchor", "end")
        .style("fill", "#fff")
        .text("Datum");
      
      // Add Y axis
      g.append("g")
        .call(d3.axisLeft(yScale))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 15)
        .attr("text-anchor", "end")
        .style("fill", "#fff")
        .text("Gewicht (kg)");
      
      // Style axes
      g.selectAll(".domain, .tick line")
        .style("stroke", "#666");
      g.selectAll(".tick text")
        .style("fill", "#ccc");
      
      // Add gradient
      const gradient = svg.append("defs")
        .append("linearGradient")
        .attr("id", "line-gradient")
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", 0).attr("y1", yScale(0))
        .attr("x2", 0).attr("y2", yScale(d3.max(chartData, d => d.weight)));
      
      gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#ff4081")
        .attr("stop-opacity", 0.2);
      
      gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#ff4081")
        .attr("stop-opacity", 0.8);
      
      // Add area under line
      const area = d3.area()
        .x(d => xScale(d.date))
        .y0(height - margin.top - margin.bottom)
        .y1(d => yScale(d.weight))
        .curve(d3.curveMonotoneX);
      
      g.append("path")
        .datum(chartData)
        .attr("fill", "url(#line-gradient)")
        .attr("d", area);
      
      // Add the line
      g.append("path")
        .datum(chartData)
        .attr("fill", "none")
        .attr("stroke", "#ff4081")
        .attr("stroke-width", 3)
        .attr("d", line);
      
      // Add dots for each workout
      g.selectAll(".dot")
        .data(chartData)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("cx", d => xScale(d.date))
        .attr("cy", d => yScale(d.weight))
        .attr("r", 5)
        .attr("fill", "#ff4081")
        .style("cursor", "pointer")
        .on("mouseover", function(event, d) {
          // Tooltip
          const tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0)
            .style("position", "absolute")
            .style("background", "rgba(0,0,0,0.8)")
            .style("color", "white")
            .style("padding", "10px")
            .style("border-radius", "5px")
            .style("pointer-events", "none");
          
          tooltip.transition()
            .duration(200)
            .style("opacity", .9);
          
          tooltip.html(`
            <strong>${d.date.toLocaleDateString('de-DE')}</strong><br/>
            Gewicht: ${d.weight} kg<br/>
            Wiederholungen: ${d.reps}
          `)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function() {
          d3.selectAll(".tooltip").remove();
        });
    }
    
    // Update chart when exercise changes
    $effect(() => {
      if (selectedExercise) {
        updateChart();
      }
    });
    
    onMount(() => {
      // Initial chart render if exercise selected
      if (selectedExercise) {
        updateChart();
      }
    });
  </script>
  
  <style>
    .container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 2rem;
      color: white;
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
    
    .exercise-selector {
      text-align: center;
      margin-bottom: 2rem;
    }
    
    select {
      padding: 0.8rem 1.5rem;
      border-radius: 1rem;
      border: 2px solid #ff4081;
      background: rgba(255, 255, 255, 0.1);
      color: white;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    select:hover {
      background: rgba(255, 64, 129, 0.2);
    }
    
    select option {
      background: #222;
      color: white;
    }
    
    .chart-container {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 1.5rem;
      padding: 2rem;
      margin: 2rem 0;
      min-height: 450px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .no-data {
      text-align: center;
      color: #ccc;
      font-size: 1.1rem;
    }
    
    .stats-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
      margin-top: 2rem;
    }
    
    .stat-card {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 1rem;
      padding: 1.5rem;
      text-align: center;
    }
    
    .stat-label {
      color: #ccc;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
    }
    
    .stat-value {
      font-size: 2rem;
      font-weight: bold;
      color: #ff4081;
    }
    
    .stat-change {
      font-size: 0.9rem;
      margin-top: 0.5rem;
    }
    
    .positive {
      color: #4caf50;
    }
    
    .negative {
      color: #f44336;
    }
  </style>
  
  <div class="container">
    <div class="header">
      <h1>Fortschritts-Tracker</h1>
      <p class="subtitle">Verfolgen Sie Ihre Kraftsteigerung über die Zeit</p>
    </div>
    
    <div class="exercise-selector">
      <select bind:value={selectedExercise}>
        <option value="">Wähle eine Übung</option>
        {#each availableExercises as exercise}
          <option value={exercise}>{exercise}</option>
        {/each}
      </select>
    </div>
    
    <div class="chart-container">
      {#if selectedExercise}
        <div bind:this={chartContainer}></div>
      {:else}
        <div class="no-data">
          <p>Bitte wählen Sie eine Übung aus, um Ihren Fortschritt zu sehen.</p>
        </div>
      {/if}
    </div>
    
    {#if selectedExercise && data.progressData[selectedExercise]}
      {@const workouts = data.progressData[selectedExercise]}
      {@const firstWorkout = workouts[0]}
      {@const lastWorkout = workouts[workouts.length - 1]}
      {@const improvement = ((lastWorkout.weight - firstWorkout.weight) / firstWorkout.weight * 100).toFixed(1)}
      
      <div class="stats-container">
        <div class="stat-card">
          <div class="stat-label">Anzahl Workouts</div>
          <div class="stat-value">{workouts.length}</div>
        </div>
        
        <div class="stat-card">
          <div class="stat-label">Startgewicht</div>
          <div class="stat-value">{firstWorkout.weight} kg</div>
          <div class="stat-change">{new Date(firstWorkout.date).toLocaleDateString('de-DE')}</div>
        </div>
        
        <div class="stat-card">
          <div class="stat-label">Aktuelles Gewicht</div>
          <div class="stat-value">{lastWorkout.weight} kg</div>
          <div class="stat-change">{new Date(lastWorkout.date).toLocaleDateString('de-DE')}</div>
        </div>
        
        <div class="stat-card">
          <div class="stat-label">Steigerung</div>
          <div class="stat-value">{improvement}%</div>
          <div class="stat-change" class:positive={improvement > 0} class:negative={improvement < 0}>
            {improvement > 0 ? '+' : ''}{lastWorkout.weight - firstWorkout.weight} kg
          </div>
        </div>
      </div>
    {/if}
  </div>