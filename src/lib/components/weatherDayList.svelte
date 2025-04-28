<script>
    let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  </script>
  
  <style>
    ul {
      list-style-type: none;
      padding: 0;
    }
    li {
      padding: 8px;
      background: #f0f0f0;
      margin-bottom: 4px;
      border-radius: 4px;
    }
  </style>
  
  <ul>
    {#each days as day}
      <li>{day}</li>
    {/each}
  </ul>
  