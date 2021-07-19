/**
 * @jest-environment jsdom
 */
import 'regenerator-runtime/runtime'


import { getDateDifference } from '../src/client/js/app'

test('Return current Date', () => {
    expect(getDateDifference).toBeDefined();
});