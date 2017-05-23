
// Router.configure({
//     layoutTemplate: 'masterLayout',
//     loadingTemplate: 'loading',
//     notFoundTemplate: 'pageNotFound',
//     yieldTemplates: {
//         nav: {to: 'nav'},
//         footer: {to: 'footer2'},
//     }
// });

// Router.configure({
//     layoutTemplate: 'mainLayout',
//     loadingTemplate: 'loading',
//     notFoundTemplate: 'notFound',
//     yieldTemplates: {
//         nav: {to: 'nav'},
//         footer: {to: 'footer'},
//     }
// });

Router.configure({
    layoutTemplate: 'layout2',
    notFoundTemplate: 'notFound'
 });

// Router.route('/', function () {
//     this.render('home');
// });


// Router.route('/landing', function () {
//     this.render('landing');
//     this.layout('blankLayout')
// });
Router.route('/', {
    name: 'landing',
    template: 'landing',
    layoutTemplate: 'landingLayout',
});

// Router.route('/sign-in', {
//     name: 'signin',
//     template: 'login',
//     layoutTemplate: 'blankLayout',
// });

// Router.route('/login', {
//     name: 'login2',
//     template: 'login',
//     layoutTemplate: 'blankLayout',
// });

Router.map(function() {
///    this.route('landing', { path: '/',layoutTemplate: 'landingLayout',});
    this.route('private');
    this.route('otro');
    this.route('subirImages');
    this.route('login3');
    this.route('loginTwo', { layoutTemplate: 'blankLayout',});
    this.route('signin', { template: 'login' ,layoutTemplate: 'blankLayout',});
});

Router.route('/sign-out', {
    name: 'signOut',
    onBeforeAction: function () {
        AccountsTemplates.logout();
        this.redirect('/');
    }
});

//Autorizacion 

Router.plugin('ensureSignedIn', {
  only: ['private', 'subirImages']
});

