import MockAdapter from 'axios-mock-adapter';
import {instance} from '@/common/http';

export const mock = new MockAdapter(instance);

