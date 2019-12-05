import {mock} from './mock';

import './api/catalog';
import './api/user';

mock.onAny().passThrough();
