import React from 'react';
import { render } from '@testing-library/react';
import Navbar from '../Navbar';

fit('if title is correct', () => {
  const { getByTestId } = render(<Navbar />);
  const title = getByTestId('title');
  expect(title.innerHTML).toContain('Github Search');
});
