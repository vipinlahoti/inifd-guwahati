Package.describe({
  name: 'inifd',
  version: '0.0.1'
});

Package.onUse(function (api) {
  api.versionsFrom('METEOR@1.5.2');

  api.use([
    'http',
    'promise',
    'fourseven:scss@4.12.0',

    'vulcan:core@=1.16.0',
    'vulcan:accounts@=1.16.0',
    'vulcan:email@=1.16.0',
    'vulcan:forms@=1.16.0',
    'vulcan:forms-upload@=1.16.0',
    'vulcan:events@=1.16.0',
    'vulcan:events-ga@=1.16.0',
    'vulcan:admin@=1.16.0',
    'vulcan:cloudinary@=1.16.0',
  ]);

  // api.addAssets([
  //   'lib/assets/images/stackoverflow.png',
  //   'lib/assets/images/telescope.png'
  // ], ['client']);

  api.addAssets([
    'lib/server/emails/templates/common/test.handlebars',
    'lib/server/emails/templates/common/wrapper.handlebars',
    'lib/server/emails/templates/comments/newComment.handlebars',
    'lib/server/emails/templates/comments/newReply.handlebars',
    'lib/server/emails/templates/posts/newPendingPost.handlebars',
    'lib/server/emails/templates/posts/newPost.handlebars',
    'lib/server/emails/templates/posts/postApproved.handlebars',
    // 'lib/server/emails/templates/instances/newPendingInstance.handlebars',
    // 'lib/server/emails/templates/instances/newInstance.handlebars',
    // 'lib/server/emails/templates/instances/instanceApproved.handlebars',
    'lib/server/emails/templates/users/accountApproved.handlebars',
    'lib/server/emails/templates/users/newUser.handlebars',
  ], ['server']);

  api.addFiles([
    'lib/styles/main.scss',
  ], ['client']);

  api.mainModule('lib/server/main.js', 'server');
  api.mainModule('lib/client/main.js', 'client');
});
