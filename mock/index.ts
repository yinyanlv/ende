import {mock} from './mock';

import './api/user';
import './api/catalog';
import './api/usage';

mock.onAny().passThrough();
