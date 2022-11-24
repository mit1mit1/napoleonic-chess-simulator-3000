const foundPrimes = [2, 3, 5, 7, 11, 13, 17, 19];

const getNextPrime = (foundPrimes: Array<number>) => {
  let checking = foundPrimes[foundPrimes.length - 1] + 2;
  while (foundPrimes.find((p) => checking % p === 0)) {
    checking = checking + 2;
  }
  return checking;
};

export const getNthPrime = (n: number) => {
  while (n >= foundPrimes.length) {
    foundPrimes.push(getNextPrime(foundPrimes));
  }
  return foundPrimes[n];
};
