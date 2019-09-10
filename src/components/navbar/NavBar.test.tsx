import React from 'react';
import ReactDOM from 'react-dom';
import {NavBar} from './NavBar';
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

it('renders navbar component without crashing', () => {
  act(() => {
    ReactDOM.render(<NavBar />, container);
  });
});


it('renders navbar component with 2 lis', () => {
  act(() => {
    ReactDOM.render(<NavBar />, container);
  });

  expect(
    container.querySelectorAll("li")
  ).toHaveLength(2);
});
