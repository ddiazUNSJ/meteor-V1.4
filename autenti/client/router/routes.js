
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

Router.route('/invoice', function () {
    this.render('invoice');
});

Router.route('/otro', function () {
    this.render('otro');
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

