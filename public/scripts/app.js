import Sammy from 'sammy';
import template from 'template';
import cookies from 'scripts/utils/cookies.js';
import popup from 'scripts/utils/pop-up.js';
import 'jquery';
import Tether from 'tether';
import 'bootstrap';
import 'slick';

/* Controllers */
import UserController from 'scripts/controllers/UserController.js';
// import BookController from 'scripts/controllers/bookController.js';
import IndexController from 'scripts/controllers/IndexController.js';
import HomeController from 'scripts/controllers/HomeController.js';
import ContactController from 'scripts/controllers/ContactController.js';
import LoginController from 'scripts/controllers/LoginController.js';
import RegisterController from 'scripts/controllers/RegisterController.js';
import AboutController from 'scripts/controllers/AboutController.js';
import GamesController from 'scripts/controllers/GamesController.js';
import NewsController from 'scripts/controllers/NewsController.js';

/* Create controller instance */
let UserContr = new UserController();
// let BC = new BookController();
let IndexContr = new IndexController();
let HomeContr = new HomeController();
let ContactContr = new ContactController();
let LoginContr = new LoginController();
let RegisterContr = new RegisterController();
let AboutContr = new AboutController();
let GamesContr = new GamesController();
let NewsContr = new NewsController();

let app = new Sammy('#sammy-app');

// /* books events */
// app.bind('click', function(ev) {
//     if (ev.target.id === 'search-btn') {
//         let searchedQuery = $('#search-value').val();
//         if (searchedQuery !== '') {
//             app.setLocation(`#search/${searchedQuery}&${1}&false`);
//         } else {
//             app.setLocation(`#books/page/1`);
//         }
//     }
// });

// app.bind('click', function(ev) {
//     if (ev.target.className === 'page-link') {
//         let element = $(ev.target);

//         $('.pagination').find('a').removeClass('active');
//         element.addClass('active');

//         var body = $("html, body");
//         body.stop().animate({ scrollTop: 0 }, '500', 'swing', function() {});
//     }
// });

// app.bind('click', function(ev) {
//     if (ev.target.id === 'add-to-cart-btn') {
//         let element = $(ev.target),
//             bookId = element.attr('book-target');

//         BC.get(bookId).then(data => {
//             let cartInfo = JSON.parse(sessionStorage.getItem('cart')) || [];
//             cartInfo.push(data[0]);
//             sessionStorage.setItem('cart', JSON.stringify(cartInfo));

//             let currentAmount = +$('.total').html().substring(1),
//                 newAMount = (currentAmount + data[0]._price).toFixed(2);
//             $('.total').html(`$${newAMount}`);

//         });
//     }
// });

// app.bind('click', function(ev) {
//     if (ev.target.id === 'like-btn') {
//         let element = $(ev.target),
//             currentLikes = element.children('#likes').text().substr(2, 1),
//             link = window.location.hash,
//             slash = link.indexOf('/'),
//             bookId = link.substring(slash + 1);

//         BC.edit().increaseLikes(bookId, +currentLikes + 1)
//             .then(success => {
//                 if (success === 1) {
//                     return element.children('#likes').text(`( ${+currentLikes + 1} )`);
//                 }
//                 console.log('DB update fail');
//             });
//     }
// });

// app.before({ except: { path: ['#/', '#login', '#register'] } }, context => {
//     if (!cookies.get('user')) {
//         popup.alert('You must first login to view our catalogue.')
//         context.redirect('#Login');
//         return false;
//     }

//     $('#menu-user-login').hide();
//     $('#menu-user-register').hide();
//     $('#menu-user-logout').show();

//     context.isLogedin = true;
//     context.userType = cookies.get('user-type');
//     let adminNavItem = $('#admin-nav-item');

//     if (context.userType === 'admin') {
//         adminNavItem.show();
//     } else {
//         adminNavItem.hide();
//     }
// });

// Login Click
app.bind('click', function(ev) {
    if (ev.target.id === 'btn-login') {
        app.setLocation(`#login/`);
    }
});

// Register Click
app.bind('click', function(ev) {
    if (ev.target.id === 'btn-register') {
        app.setLocation(`#register/`);
    }
});

app.get('#/', function(con) {

    IndexContr.index(con)
        .then(() => {
            SetActiveLink('/');
        });

    // BC.getRandom()
    //     .then((book) => {
    //         BC.attachToTemplate(book, 'home')
    //             .then(html => {
    //                 con.swap(html);
    //             });
    //     });
});

app.get('#home/', function(con) {
    HomeContr.index(con)
        .then(() => {
            SetActiveLink('home/');
        });
});

app.get('#contact/', function(con) {
    ContactContr.index(con)
        .then(() => {
            SetActiveLink('contact/');
        });
});

// app.get('#login/', function(con) {
//     LoginContr.index(con)
//         .then(() => {
//             SetActiveLink('/login');
//         });
// });

/* Register user */
app.get('#register/', con => {
    RegisterContr.index(con)
        .then(() => {
            SetActiveLink('register/');
        });
});

app.post('#register/', con => {
    UserContr.add(con);
});

/* Login user */
app.get('#login/', con => {
    LoginContr.index(con)
        .then(() => {
            SetActiveLink('login/');
        });
});

app.post('#login', con => {
    UserContr.login(con);
});

/* Logout user */
app.get("#logout", con => {
    UserContr.logout(con);
});

app.get("#about/", con => {
    AboutContr.index(con)
        .then(() => {
            SetActiveLink('about/');
        });
});

app.get('#games/page/?:page', con => {
    let page = +con.params.page;
    GamesContr.index(page)
        .then(html => {
            con.swap(html);
            SetActiveLink('games/page/1');
        });
});

app.get('#news/page/?:page', con => {
    let page = +con.params.page;
    NewsContr.index(page)
        .then(html => {
            con.swap(html);
            SetActiveLink('news/page/1');
        });
});

app.get('#users/page/?:page', con => {
    // let page = +con.params.page;
    UsersContr.index(con)
        .then(html => {
            con.swap(html);
            SetActiveLink('users/page/1');
        });
});

/* Run Sammy js */
app.run('#/');

$(document).ready(function() {
    var nav = $('#main-nav');
    var navBtn = $('#nav-btn');

    nav.on('click', 'a', ev => {
        var element = $(ev.target);

        nav.find('a').removeClass('active');
        element.addClass('active');
    });

    navBtn.on('click', ev => {
        var element = $(ev.target);
        $('#main-nav-wrap').css('width', '25% !important');
    });

    //rotation speed and timer
    var speed = 5000;

    var run = setInterval(rotate, speed);
    var slides = $('.slide');
    var container = $('#slides ul');
    var elm = container.find(':first-child').prop("tagName");
    var item_width = container.width();
    var previous = 'prev'; //id of previous button
    var next = 'next'; //id of next button
    slides.width(item_width); //set the slides to the correct pixel width
    container.parent().width(item_width);
    container.width(slides.length * item_width); //set the slides container to the correct total width
    container.find(elm + ':first').before(container.find(elm + ':last'));
    resetSlides();

    //if user clicked on prev button
    $('#slides a').click(function(e) {
        //slide the item

        if (container.is(':animated')) {
            return false;
        }
        if (e.target.id == previous) {
            container.stop().animate({
                'left': 0
            }, 1500, function() {
                container.find(elm + ':first').before(container.find(elm + ':last'));
                resetSlides();
            });
        }

        if (e.target.id == next) {
            container.stop().animate({
                'left': item_width * -2
            }, 1500, function() {
                container.find(elm + ':last').after(container.find(elm + ':first'));
                resetSlides();
            });
        }

        //cancel the link behavior      
        return false;

    });

    //if mouse hover, pause the auto rotation, otherwise rotate it  
    container.parent().mouseenter(function() {
        clearInterval(run);
    }).mouseleave(function() {
        run = setInterval(rotate, speed);
    });


    function resetSlides() {
        //and adjust the container so current is in the frame
        container.css({
            'left': -1 * item_width
        });
    }

    function rotate() {
        $('#next').click();
    }

});

function SetActiveLink(name) {
    var nav = $('#main-nav');
    nav.find('a').removeClass('active');

    nav.find('a[href="#' + name + '"]').addClass('active');
}