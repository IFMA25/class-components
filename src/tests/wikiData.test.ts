import fetchWikidataInfo from '@utils/wikiData';
import { describe, it, expect, vi } from 'vitest';

const mockData = {
  entities: {
    Q123: {
      claims: {
        P36: [
          {
            mainsnak: {
              datavalue: { value: { id: 'Q456' } },
            },
          },
        ],
        P1082: [
          {
            mainsnak: {
              datavalue: { value: { amount: '1234567' } },
            },
          },
        ],
      },
    },
  },
};

const mockCapitalData = {
  entities: {
    Q456: {
      labels: {
        en: { value: 'Test Capital' },
      },
    },
  },
};

describe('fetchWikidataInfo', () => {
  it('return capitalName и population', async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({ json: () => mockData })
      .mockResolvedValueOnce({ json: () => mockCapitalData });

    const result = await fetchWikidataInfo('Q123');

    expect(result).toEqual({
      capitalName: 'Test Capital',
      population: 1234567,
    });
  });

  it('return null', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      json: () => ({ entities: { Q999: {} } }),
    });

    const result = await fetchWikidataInfo('Q999');

    expect(result).toEqual({ capitalName: null, population: null });
  });
});
