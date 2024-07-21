<script>
  // Your script logic here
  
  
</script>

<div id="header-div">
  <div id="left-header">
    <a href="../index.html"><img id="logo" src="/assets/light-mode-logo.jpg" alt="light mode logo" loading="lazy"></a>
    <a href="../index.html"><img id="logo-dark" src="/assets/dark-mode-logo.webp" alt="dark mode logo" loading="lazy"></a>
    <a href="/merch/merch.html"><h4>Merch</h4></a>
    <a href="/spotify/spotify.html"><h4>Spotify</h4></a>
  </div>
  <div id="right-header">
    <a href="../index.html"><h4>Login</h4></a>
    <a href="../index.html"><h4>Cart</h4></a>
    <button id="dark-mode-toggle">Dark Mode</button>
  </div>
</div>

<style>
  #header-div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px; /* You can change this to your desired background color */
  }

  #left-header a,
  #right-header a {
    margin: 0 10px;
    text-decoration: none;
    color: inherit; /* Keeps the text color same as parent element */
  }

  #left-header h1 {
    margin-right: 20px;
  }

  #right-header {
    display: flex;
  }
  img {
    height: 100px;
    width: 100px;
  }
</style>
