<script lang="ts">
  import { onMount } from 'svelte';

  let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  let selectedDay = '';
  let weatherData: any = null;
  let loading = false;
  let errorMessage = '';

  // hakee valitulle päivälle
  async function fetchWeatherForDay(day: string) {
    selectedDay = day;
    loading = true;
    errorMessage = '';

    try {
      const latitude = 52.52;
      const longitude = 13.4050;

      // hakee säätiedot Open Meteo API:sta
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&timezone=Europe%2FBerlin`
      );

      // error viesti
      if (!response.ok) {
        throw new Error(`Failed to fetch weather data for ${day}`);
      }

      const data = await response.json();

      
      const dayIndex = days.indexOf(day);

      if (dayIndex !== -1) {
        
        weatherData = {
          maxTemp: data.daily.temperature_2m_max[dayIndex],
          minTemp: data.daily.temperature_2m_min[dayIndex]
        };
      }

      loading = false;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      errorMessage = `Failed to fetch weather data for ${day}`;
      loading = false;
    }
  }
</script>

<div>
  <!-- päivät nappuloina -->
  <div class="button-container">
    {#each days as day}
      <button on:click={() => fetchWeatherForDay(day)}>{day}</button>
    {/each}
  </div>

  <!-- lataus indigattori -->
  {#if loading}
    <p>Loading...</p>
  {/if}

  <!-- sää data valittuun päivään -->
  {#if weatherData}
    <p><strong>{selectedDay}</strong> weather:</p>
    <p>Max Temp: {weatherData.maxTemp}°C</p>
    <p>Min Temp: {weatherData.minTemp}°C</p>
  {/if}

  <!-- vika ilmoitus jos säätietoja ei saa -->
  {#if errorMessage}
    <p style="color: red;">{errorMessage}</p>
  {/if}
</div>

<style>

  .button-container {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 20%;
    right: 10px;
    gap: 10px;
    z-index: 1000;
  }

  /* nappula tyylittely */
  button {
    padding: 12px 20px;
    background-color: lightblue;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #4caf50;
    color: white;
  }

  /* tyylittely sää infolle */
  p {
    font-size: 18px;
    line-height: 1.5;
  }
</style>

