import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import ScanPage from './ScanPage';
test('should contain the heading 1', () => {
  const { getByText } = render(
    <Router>
      <HomePage />
    </Router>
  );
  expect(getByText('GoodEats')).toBeInTheDocument();
});

test('should contain the subtext', () => {
  const { getByText } = render(
    <Router>
      <HomePage />
    </Router>
  );
  expect(getByText('Scan your fruit to determine their freshness')).toBeInTheDocument();
});

test('scan button works', () => {
  const { getByText } = render(
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/scan" element={<ScanPage />} /> */}
      </Routes>
    </Router>
  );
  fireEvent.click(getByText('Click to start scanning'));
  expect(getByText('Scan Page Content')).toBeInTheDocument();
});