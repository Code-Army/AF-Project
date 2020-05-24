import React, { Component } from 'react';


// import './css/css/bootstrap.min.css'
import logo from './img/logo.png'
import './css/adminlte.css'
class Dash extends Component {

    render(){
        return(
          <div>
              <div class="wrapper">


                  <nav class="main-header navbar navbar-expand navbar-white navbar-light">

                      <ul class="navbar-nav">

                      </ul>


                      <form class="form-inline ml-3">
                          <div class="input-group input-group-sm">
                              <input class="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search"/>
                                  <div class="input-group-append">
                                      <button class="btn btn-navbar" type="submit">
                                          <i class="fas fa-search"></i>
                                      </button>
                                  </div>
                          </div>
                      </form>

                  </nav>


                  <aside class="main-sidebar sidebar-dark-primary elevation-4">

                      <a href="index3.html" class="brand-link">
                          <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3"
                              />
                              <span class="brand-text font-weight-light">PVT</span>
                      </a>


                      <div class="sidebar">

                          <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                              <div class="image">
                                  <img src="dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image"/>
                              </div>
                              <div class="info">
                                  <a href="#" class="d-block">Alexander Pierce</a>
                              </div>
                          </div>


                          <nav class="mt-2">
                              <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">


                                  <li class="nav-item">
                                      <a href="pages/widgets.html" class="nav-link">
                                          <i class="nav-icon fas fa-th"></i>
                                          <p>
                                              Dashboard
                                              <span class="right badge badge-danger"></span>
                                          </p>
                                      </a>
                                  </li>


                                  <li class="nav-item">
                                      <a href="pages/widgets.html" class="nav-link">
                                          <i class="nav-icon fas fa-th"></i>
                                          <p>
                                              Widgets
                                              <span class="right badge badge-danger"></span>
                                          </p>
                                      </a>
                                  </li>



                              </ul>
                          </nav>

                      </div>

                  </aside>


                  <div class="content-wrapper">

                      <div class="content-header">
                          <div class="container-fluid">
                              <div class="row mb-2">
                                  <div class="col-sm-6">
                                      <h1 class="m-0 text-dark">Dashboard</h1>
                                  </div>
                                  <div class="col-sm-6">
                                      <ol class="breadcrumb float-sm-right">
                                          <li class="breadcrumb-item"><a href="#">Home</a></li>
                                          <li class="breadcrumb-item active">Dashboard v1</li>
                                      </ol>
                                  </div>
                              </div>
                          </div>
                      </div>

                      <section class="content">
                          <div class="container-fluid">



                          </div>
                      </section>

                  </div>

                  <footer class="main-footer">
                      <strong>Copyright &copy; 2014-2019 <a href="http://adminlte.io">AdminLTE.io</a>.</strong>
                      All rights reserved.
                      <div class="float-right d-none d-sm-inline-block">
                          <b>Version</b> 3.0.4
                      </div>
                  </footer>


                  <aside class="control-sidebar control-sidebar-dark">

                  </aside>

              </div>

          </div>

        )
    }
}

export default Dash;