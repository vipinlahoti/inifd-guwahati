import { Programs } from '../../modules/programs/index.js';

Programs._ensureIndex({'status': 1});
Programs._ensureIndex({'status': 1, 'postedAt': 1});
