<script>
    document.addEventListener('DOMContentLoaded', () => {

        // Get all "navbar-burger" elements
        const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

        // Check if there are any navbar burgers
        if ($navbarBurgers.length > 0) {

            // Add a click event on each of them
            $navbarBurgers.forEach(el => {
                el.addEventListener('click', () => {

                    // Get the target from the "data-target" attribute
                    const target = el.dataset.target;
                    const $target = document.getElementById(target);

                    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                    el.classList.toggle('is-active');
                    $target.classList.toggle('is-active');

                });
            });
        }

    });
   

</script>


<nav class="navbar is-fixed-top has-background-black-bis" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
        <a class="navbar-item" href="index.php">
            <img id="logo" src="" class="h-60 mp-0" alt="logo">
        </a>

        <a role="button" class="navbar-burger has-text-white is-size-6-desktop is-size-3" aria-label="menu" aria-expanded="false" data-target="navbarBulma" style="align-self: center;">
            <em style="margin-top:10px;" class="wd-60 maxcon fas fa-bars"></em>
        </a>
    </div>
    <!-- DOIT: Reparar el responsive, posible problema -> "Los iconos! :C" -->
    <div id="navbarBulma" class="navbar-menu has-background-black-bis">
        <div class="navbar-end">
            <a class="navbar-item has-text-weight-medium has-text-white is-size-6-desktop is-size-3" href="index.php#">
                <em class="fas fa-home"></em>Inicio
            </a>

            <a class="navbar-item has-text-weight-medium has-text-white is-size-6-desktop is-size-3" href="index.php#servicio">
                <em class="fas fa-concierge-bell"></em>Servicios
            </a>

            <a class="navbar-item has-text-weight-medium has-text-white is-size-6-desktop is-size-3" href="index.php#contact">
                <em class="fas fa-info-circle"></em>Información
            </a>
            <a class="navbar-item has-text-weight-medium has-text-white is-size-6-desktop is-size-3" href="index.php#about">
                <em class="fas fa-comments"></em>Quienes Somos
            </a>
            <a class="navbar-item has-text-weight-medium has-text-white is-size-6-desktop is-size-3" href="index.php#myv">
                <em class="fas fa-star"></em>Misión y Visión
            </a>
            <a class="navbar-item has-text-weight-medium has-text-white is-size-6-desktop is-size-3" href="workwithus.php">
                <em class="fas fa-user-tie"></em>Trabaja con Nosotros
            </a>
        </div>
        <div class="navbar-end">

            <div class="navbar-item">

                <?php
                if (isset($_SESSION['id_role'])) {
                ?>
                    <img class="h-60 mr-15" src="<?php echo "sistema/" . $_SESSION['photo']; ?>" alt="photo">
                    <span class="is-in-nav is-size-6-desktop is-size-3 has-text-weight-bold"><?php echo $_SESSION['username']; ?></span>
            </div>
            <div class="navbar-item">
                <div class="buttons">
                    <a target="_blank" class="button is-primary-light is-size-6-desktop is-size-3" onclick="logout2();">
                        <em class="fas fa-sign-out-alt"></em>Cerrar Sesión
                    </a>
                </div>
            <?php
                } else { ?>
                <div class="buttons">
                    <a target="_blank" class="button is-primary-light is-size-6-desktop is-size-3" href="login.php">
                        <em class="fas fa-user"></em>Iniciar Sesión
                    </a>
                </div>
            <?php
                }

            ?>


            </div>
        </div>
    </div>
</nav>