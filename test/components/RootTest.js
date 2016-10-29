/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

// Uncomment the following lines to use the react test utilities
// import React from 'react/addons';
// const TestUtils = React.addons.TestUtils;
import createComponent from 'helpers/shallowRenderHelper';

import Root from '../../src/scripts/Root';
import configureStore from '../../src/scripts/configureStore'


describe('RootComponent', () => {
  let RootComponent;

  beforeEach(() => {
    let store = configureStore();
    RootComponent = createComponent(Root, {store: store});
  });

  it('should be initialized', () => {
    expect(!!RootComponent.props.store).to.equal(true);
  });
});
