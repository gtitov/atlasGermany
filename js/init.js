// Materialize features initialization
M.AutoInit();
document.addEventListener('DOMContentLoaded', function () {
    // Slider
    var sliders = document.querySelector('#slider');
    var instances_s = M.Sidenav.init(sliders, { edge: 'right' });
});
