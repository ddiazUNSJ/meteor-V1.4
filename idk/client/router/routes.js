
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

Router.route('private', function () {
    this.render('private');
});

Router.route('/otro', function () {
    this.render('otro');
});

Router.route('/subirImages', function () {
    this.render('subirImages');
});
Router.route('/login3', function () {
    this.render('login3');
});

Router.route('/loginTwo', {
    name: 'loginTwo',
    template: 'loginTwo',
    layoutTemplate: 'blankLayout',
});


Router.route('/entrar', {
    name: 'entrar',
    template: 'login',
    layoutTemplate: 'blankLayout',
});

// Router.route('/landing', function () {
//     this.render('landing');
//     this.layout('blankLayout')
// });
Router.route('/', {
    name: 'landing',
    template: 'landing',
    layoutTemplate: 'landingLayout',
});

// Router.route('/private', {
//     name: 'signin',
//     template: 'login',
//     layoutTemplate: 'blankLayout',
// });

// Router.route('/login', {
//     name: 'login2',
//     template: 'login',
//     layoutTemplate: 'blankLayout',
// });

/*Router.map(function() {
    this.route('private');
    this.route('otro');
    this.route('subirImages');
    this.route('login3');
    this.route('loginTwo', { layoutTemplate: 'blankLayout',});
    this.route('signin', { template: 'login' ,layoutTemplate: 'blankLayout',});
});
*/
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

