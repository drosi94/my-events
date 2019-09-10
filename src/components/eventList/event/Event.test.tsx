import React from 'react';
import ReactDOM from 'react-dom';
import Event from './Event';
import { act } from 'react-dom/test-utils';

let container: HTMLDivElement;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  ReactDOM.unmountComponentAtNode(container);
  container.remove();
});

it('renders event component without crashing', () => {
  act(() => {
    ReactDOM.render(<Event event={{
        "id": 0,
        "isFree": true,
        "name": "CSS Grids: fact or fiction",
        "city": 9,
        "startDate": "2019-07-14T02:00:00+00:00",
        "endDate": "2019-07-14T03:00:00+00:00"
      }}/>, container);
  });
});

