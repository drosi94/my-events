import React from 'react';
import ReactDOM from 'react-dom';
import {NavBar} from './NavBar';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';

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
    ReactDOM.render(<BrowserRouter><NavBar /></BrowserRouter>, container);
  });
});


it('renders navbar component with 2 lis', () => {
  act(() => {
    ReactDOM.render(<BrowserRouter><NavBar /></BrowserRouter>, container);
  });

  expect(
    container.querySelectorAll("li")
  ).toHaveLength(2);
});
