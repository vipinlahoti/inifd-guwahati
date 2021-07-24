import { runCallbacksAsync } from 'meteor/vulcan:core';
import escapeStringRegexp from 'escape-string-regexp';
import { Picker } from 'meteor/meteorhacks:picker';
import { Tickets } from '../../modules/tickets/index.js';

Picker.route('/out', ({ query}, req, res, next) => {
  if (query.url) { // for some reason, query.url doesn't need to be decoded
    /*
    If the URL passed to ?url= is in plain text, any hash fragment
    will get stripped out.
    So we search for any ticket whose URL contains the current URL to get a match
    even without the hash
    */

    try {

      const ticket = Tickets.findOne({url: {$regex: escapeStringRegexp(query.url)}}, {sort: {postedAt: -1, createdAt: -1}});

      if (ticket) {
        const ip = req.headers && req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        runCallbacksAsync('tickets.click.async', ticket, ip);

        res.writeHead(301, {'Location': query.url});
        res.end();
      } else {
        // don't redirect if we can't find a ticket for that link
        res.end(`Invalid URL: ${query.url}`);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('// /out error');
      // eslint-disable-next-line no-console
      console.log(error);
      // eslint-disable-next-line no-console
      console.log(query);
    }
  } else {
    res.end("Please provide a URL");
  }
});
