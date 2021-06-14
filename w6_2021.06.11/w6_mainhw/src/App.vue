<template>
 <div class="wrap">
    <div id="nav">
    <nav class="navbar navbar-expand-lg navbar-light bg-light px-3">
      <a class="navbar-brand" href="#">首頁</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/about" class="nav-link">關於我們</router-link>
          </li>
          <li class="nav-item active">
            <router-link to="/ProductsList" class="nav-link">產品列表</router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Dropdown
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Something else here</a>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
          </li>
        </ul>
         <form class="form-inline d-flex">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
          <ul class="navbar-nav ms-auto">
            <li>
              <router-link to="/cart" class="nav-link">
                 <font-awesome-icon icon="shopping-cart" />
              </router-link>
            </li>
            <li>
               <router-link to="/login" class="nav-link">登入</router-link>
            </li>
            <li>
               <router-link to="/loginBack" class="nav-link">後台登入</router-link>
            </li>
          </ul>
      </div>
    </nav>
    <router-view></router-view>
  </div>
 </div>
</template>

<style lang="scss">
@import "bootstrap";
</style>
