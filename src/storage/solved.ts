const KEY = 's';

export function getAllSolved(): Set<string> {
  const solved = localStorage.getItem(KEY);
  return solved ? new Set(JSON.parse(solved)) : new Set();
}

export function addSolved(id: string) {
  const solved = getAllSolved();
  solved.add(id);
  localStorage.setItem(KEY, JSON.stringify(Array.from(solved)));
}
