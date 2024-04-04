import { createAdapter } from 'src/utils';

import { messagesDB } from './messages';
import { usersDB } from './users';

const messageAdapter = createAdapter(messagesDB);
const userAdapter = createAdapter(usersDB);

export { messageAdapter, userAdapter }