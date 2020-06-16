import { IPerson } from 'src/types';

export async function getPersonsApi() {
  const res = await fetch('src/public/data/data.json');
  const data: IPerson[] = await res.json();
  await sleep(1000);
  return data;
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
