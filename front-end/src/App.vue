<template>
<div id="app">
  <div class="header">
    <div class="title">
      <h1>Christmas Gift Planner</h1>
    </div>
    <router-link to="/">
      <div class="logo">
        <img src="/gift-logo.png" width = 50%>
      </div>
    </router-link>
    <router-link class="pagelink" to="/Person">
      People
    </router-link>
    <router-link class="pagelink" to="/Gift">
      Gifts
    </router-link>
  </div>
  <div class="content">
    <router-view />
  </div>
  <div class="footer">
    <a href="https://github.com/allyseh/creative-proj-4">Github Repository</a>
  </div>
</div>
</template>

<style>
html {
  box-sizing: border-box;
}

body {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  background: #fff;
  padding: 0px;
  margin: 0px;
}

/* Header */
.header {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px 90px 0px 90px;
  background-color: #72FBA6;
  color: #1C454F;
}

.title {
  margin-top: 5px;
  margin-left: 300px;
  margin-right: 30px;
}

.title h1 {
  font-size: 30px;
}

.pagelink {
  margin-top: 10px;
  margin-right: 20px;
  color: #6BAC6A;
  font-size: 24px;
}

.content {
  padding: 20px 100px;
  min-height: 500px;
}

/* Footer */
.footer {
  height: 50px;
  padding: 20px 100px 0px 100px;
  background: #e3e3e3;
  font-size: 12px;
}

.footer a {
  color: #000;
}

h1 {
  font-size: 20px;
}

h2 {
  font-size: 14px;
}
</style>
