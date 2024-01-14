const { randomUUID } = require('crypto')

const names = [
  'Time', 'Past', 'Future', 'Dev', 'Fly', 'Flying', 'Soar', 'Soaring', 'Power', 'Falling', 'Fall', 'Jump', 'Cliff', 'Mountain', 'Rend', 'Red', 'Blue', 'Green', 'Yellow', 'Gold', 'Demon', 'Demonic', 'Panda', 'Cat', 'Kitty', 'Kitten', 'Zero', 'Memory', 'Trooper', 'XX', 'Bandit', 'Fear', 'Light', 'Glow', 'Tread', 'Deep', 'Deeper', 'Deepest',
  'Mine', 'Your', 'Worst', 'Enemy', 'Hostile', 'Force', 'Video', 'Game', 'Donkey', 'Mule', 'Colt', 'Cult', 'Cultist', 'Magnum', 'Gun', 'Assault', 'Recon', 'Trap', 'Trapper', 'Redeem', 'Code', 'Script', 'Writer', 'Near', 'Close', 'Open', 'Cube', 'Circle',
  'Geo', 'Genome', 'Germ', 'Spaz', 'Shot', 'Echo', 'Beta', 'Alpha', 'Gamma', 'Omega', 'Seal', 'Squid', 'Money', 'Cash', 'Lord', 'King', 'Duke', 'Rest', 'Fire', 'Flame', 'Morrow', 'Break', 'Breaker', 'Numb', 'Ice', 'Cold', 'Rotten', 'Sick', 'Sickly', 'Janitor', 'Camel', 'Rooster',
  'Sand', 'Desert', 'Dessert', 'Hurdle', 'Racer', 'Eraser', 'Erase', 'Big', 'Small', 'Short', 'Tall', 'Sith', 'Bounty', 'Hunter', 'Cracked', 'Broken', 'Sad', 'Happy', 'Joy', 'Joyful', 'Crimson', 'Destiny', 'Deceit', 'Lies', 'Lie', 'Honest', 'Destined', 'Bloxxer', 'Hawk', 'Eagle', 'Hawker', 'Walker',
  'Zombie', 'Sarge', 'Capt', 'Captain', 'Punch', 'One', 'Two', 'Uno', 'Slice', 'Slash', 'Melt', 'Melted', 'Melting', 'Fell', 'Wolf', 'Hound', 'Legacy', 'Sharp', 'Dead', 'Mew', 'Chuckle', 'Bubba', 'Bubble', 'Sandwich', 'Smasher', 'Extreme', 'Multi', 'Universe', 'Ultimate', 'Death', 'Ready', 'Monkey', 'Elevator', 'Wrench', 'Grease', 'Head', 'Theme', 'Grand', 'Cool', 'Kid', 'Boy', 'Girl', 'Vortex', 'Paradox'
];

function getRandomArrayElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomName() {
  return getRandomArrayElement(names);
};

function getRandomAddress() {
  return `ul.${getRandomName()} ${Math.round(Math.random() * 100)}`
}

function getRandomDate() {
  const start = new Date('2020-01-01').getTime();
  const end = new Date().getTime();
  const randomDate = new Date(start + Math.random() * (end - start));
  return randomDate.toISOString().slice(0, 19).replace('T', ' ');
}

const teamIds = []

for (let i = 0; i < 50; i++) {
  const teamId = randomUUID();
  teamIds.push(teamId);
  console.log(
    `INSERT INTO teams (id, name) VALUES ("${teamId}", "${getRandomName() + getRandomName()}");`
  );
}

const playerIds = []

for (let i = 0; i < 100; i++) {
  const playerId = randomUUID();
  playerIds.push(playerId);
  console.log(
    `INSERT INTO players (id, first_name, last_name, number, team_id) VALUES
    ("${playerId}", "${getRandomName()}", "${getRandomName()}", ${Math.round(Math.random() * 10)}, "${getRandomArrayElement(teamIds)}");`
  )
}

const matchIds = []

for (let i = 0; i < 15; i++) {
  const matchId = randomUUID();
  matchIds.push(matchId);
  console.log(
    `INSERT INTO matches (id, address, occurs_at) VALUES
    ("${matchId}", "${getRandomAddress()}", "${getRandomDate()}");`
  )
}
const teamMatchesSet = new Set()
for (let i = 0; i < matchIds.length * teamIds.length * 2; i++) {
  const teamId = getRandomArrayElement(teamIds);
  const matchId = getRandomArrayElement(matchIds);
  if (teamMatchesSet.has(teamId + matchId)) {
    continue;
  }
  teamMatchesSet.add(teamId + matchId)

  console.log(
    `INSERT INTO team_matches (team_id, match_id) VALUES
    ("${teamId}", "${matchId}");`
  )
}

const playerMatchesSet = new Set()

for (let i = 0; i < matchIds.length * playerIds.length * 5; i++) {
  const playerId = getRandomArrayElement(playerIds);
  const matchId = getRandomArrayElement(matchIds);

  if (playerMatchesSet.has(matchId + playerId)) {
    continue;
  }

  playerMatchesSet.add(matchId + playerId)

  console.log(
    `INSERT INTO player_matches (player_id, match_id) VALUES
    ("${playerId}", "${matchId}");`
  )
}

