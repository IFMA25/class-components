import React from 'react';
import { vi } from 'vitest';

export const searchDataMock = vi.fn();

export const CardListMock = React.forwardRef((props, ref) => {
  React.useImperativeHandle(ref, () => ({
    searchData: searchDataMock,
  }));

  return <div>CardList Mock</div>;
});

CardListMock.displayName = 'CardListMock';
