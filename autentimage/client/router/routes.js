
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
    layoutTemplate: 'mainLayout',
    notFoundTemplate: 'notFound'
 });

Router.route('private', function () {
    this.render('private');
});

Router.route('dpersonal', function () {
    this.render('dpersonal');
});

Router.route('reg', function () {
    this.render('Register2');
});


Router.route('/invoice', function () {
    this.render('invoice');
});

Router.route('/subirfoto', function () {
    this.render('subirfoto');
});

Router.route('/', {
    name: 'landing',
    template: 'landing',
    layoutTemplate: 'landingLayout',
});


Router.route('/sign-out', {
    name: 'signOut',
    onBeforeAction: function () {
        AccountsTemplates.logout();
        this.redirect('/');
    }
});

//Autorizacion , va entrar solo si esta logeado 

Router.plugin('ensureSignedIn', {
  only: ['private', 'invoice']
});

