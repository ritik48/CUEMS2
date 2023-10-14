const currentPage = window.location.pathname;

const navlinks = document.querySelectorAll('.nav-link');
const navitems = document.querySelectorAll('.nav-item');
const letters = 'abcdefghijklmnopqrstuvwxyz';

// if(currentPage === '/events') {
//     let typed = new Typed('.auto-input', {
//         strings: ['creative', 'imaginative', 'innovative'],
//         typeSpeed: 100,
//         backSpeed: 100,
//         loop: true
// })
// }

navlinks.forEach(link => {
    link.addEventListener('mouseover', (event) => {
        let count = 0;
        let interval = setInterval(() => {
            link.innerHTML = String(link.innerHTML).split("")
                .map((letter, index) => {
                    if (index < count) {
                        return String(event.target.dataset.value)[index];
                    }

                    return letters[Math.floor(Math.random() * 26)]
                })
                .join("");

            if (count >= String(event.target.dataset.value).length) {
                clearInterval(interval);
            }
            count += 0.7;
        }, 30)
    })
});

navitems.forEach((ele) => {
    if(ele.classList.contains('selected') && ele.classList.remove('selected'));
    console.log(ele.getAttribute('href'), '   ', currentPage);
    if(ele.getAttribute('href') === currentPage) {
        ele.classList.add('selected');
    }
})
