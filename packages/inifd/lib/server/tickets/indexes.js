import { Tickets } from '../../modules/tickets/index.js';

Tickets._ensureIndex({'status': 1, 'isFuture': 1});
Tickets._ensureIndex({'status': 1, 'isFuture': 1, 'postedAt': 1});
