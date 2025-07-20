import React from 'react';
import { searchDataMock } from './SearchDataMock';

export const CardListMock = React.forwardRef((props, ref) => {
  React.useImperativeHandle(ref, () => ({
    searchData: searchDataMock,
  }));

  return <div>CardList Mock</div>;
});

CardListMock.displayName = 'CardListMock';
