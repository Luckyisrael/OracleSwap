const BASE_URL = 'https://hermes.pyth.network/v2/updates/price/latest';

export const PRICE_IDS = {
  'BSOL/USD': '0x89875379e70f8fbadc17aef315adf3a8d5d160b811435537e03c97e8aac97d9c',
  'SOL/USD': '0xef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d',
  'MSOL/USD': '0xc2289a6a43d2ce91c6f55caec370f4acc38a2ed477f58813334c6d03749ff2a4',
  'JITOSOL/USD': '0x67be9f519b95cf24338801051f9a808eff0a578ccb388db73b7f6fe1de019ffb',
  'STSOL/USD': '0xa1a6465f4c2ebf244c31d80bc95c27345a3424e428c2def33eced9e90d3f701b',
};

const fetchPrice = async ({ to, from }: { to: string; from: string }) => {
  const url = `${BASE_URL}?ids%5B%5D=${PRICE_IDS[to]}&ids%5B%5D=${PRICE_IDS[from]}`;
  console.log('Swap URl: ', url)
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.parsed;
};

const fetchAllPrices = async () => {
  const ids = Object.values(PRICE_IDS).join('&ids%5B%5D=');
  const url = `${BASE_URL}?ids%5B%5D=${ids}`;
  console.log('Fetching URL:', url);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.parsed;
};

export { fetchPrice, fetchAllPrices };
