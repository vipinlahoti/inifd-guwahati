// import { addCallback } from 'meteor/vulcan:core';

// function sortByNew (parameters, terms) {
//   return {
//     selector: parameters.selector, 
//     options: {...parameters.options, sort: {createdAt: 1}}
//   };
// }

// addCallback('reply.parameters', sortByNew);

// import Replies from './collection.js';

// // will be common to all other view unless specific properties are overwritten
// Replies.addDefaultView(function (terms) {
//   console.log('terms: ', terms);
  
//   return {
//     options: {
//       sort: { createdAt: 1 }
//     }
//   };
// });
