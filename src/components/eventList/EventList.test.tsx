import React from 'react';
import ReactDOM from 'react-dom';
import { act } from "react-dom/test-utils";

import { AllEvents } from './AllEvents';

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

it('renders allevents component without crashing', () => {
  act(() => {
    ReactDOM.render(<AllEvents />, container);
  });
});


it('renders allevents with one li for each event', () => {
  act(() => {
    ReactDOM.render(<AllEvents events={[{
    
      "id": 0,
      "isFree": true,
      "name": "CSS Grids: fact or fiction",
      "city": 9,
      "startDate": "2019-07-14T02:00:00+00:00",
      "endDate": "2019-07-14T03:00:00+00:00"
    },
    {
      "id": 1,
      "isFree": true,
      "name": "CSS Grids: fact or fiction",
      "city": 9,
      "startDate": "2019-07-14T02:00:00+00:00",
      "endDate": "2019-07-14T03:00:00+00:00"
    }]} />, container);
  });

  expect(
    container.querySelectorAll("li")
  ).toHaveLength(2);

});
