// recorrer todas las estrellas
// por cad estrella hacer un eventlistener de click
// cuando haga click al rating.value =  valor de la estrella que he clicado


(() => {
    const stars = document.querySelectorAll('.star')
    const input = document.querySelector('#rating')

    stars.forEach((star) => {
        star.addEventListener('click', (e) => {
            input.value = e.target.value
        })
    });
})()

