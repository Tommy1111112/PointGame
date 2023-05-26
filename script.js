

let NUM = new ExpantaNum(10);
let NUMPC = new ExpantaNum(1);
let PG = true;

let upgrades = [
  {
    id: 1,
    title: "UPGRADE I",
    description: "2x Point",
    cost: new ExpantaNum(100),
    effect: new ExpantaNum(1),
    level: new ExpantaNum(0),
    costMultiplier: new ExpantaNum(5),
    effectMultiplier: new ExpantaNum(2)
  },
  {
    id: 2,
    title: "UPGRADE II",
    description: "2x Point",
    cost: new ExpantaNum(2000),
    effect: new ExpantaNum(1),
    level: new ExpantaNum(0),
    costMultiplier: new ExpantaNum(7),
    effectMultiplier: new ExpantaNum(2)
  },
  {
    id: 3,
    title: "UPGRADE III",
    description: "2.5x Point",
    cost: new ExpantaNum(45000),
    effect: new ExpantaNum(1),
    level: new ExpantaNum(0),
    costMultiplier: new ExpantaNum(9),
    effectMultiplier: new ExpantaNum(2.5)
  },
  {
    id: 4,
    title: "UPGRADE IV",
    description: "3x Point",
    cost: new ExpantaNum(125000),
    effect: new ExpantaNum(1),
    level: new ExpantaNum(0),
    costMultiplier: new ExpantaNum(11),
    effectMultiplier: new ExpantaNum(3)
  },
  {
    id: 5,
    title: "UPGRADE V",
    description: "5x Point",
    cost: new ExpantaNum(1e9),
    effect: new ExpantaNum(1),
    level: new ExpantaNum(0),
    costMultiplier: new ExpantaNum(13),
    effectMultiplier: new ExpantaNum(3)
  },
  {
    id: 6,
    title: "OP UPGRADE I",
    description: "15x Point",
    cost: new ExpantaNum(1e70),
    effect: new ExpantaNum(1),
    level: new ExpantaNum(0),
    costMultiplier: new ExpantaNum(1e7),
    effectMultiplier: new ExpantaNum(15)
  },
  {
    id: 7,
    title: "OP UPGRADE II",
    description: "27x Point",
    cost: new ExpantaNum(1e160),
    effect: new ExpantaNum(1),
    level: new ExpantaNum(0),
    costMultiplier: new ExpantaNum(1e15),
    effectMultiplier: new ExpantaNum(27)
  },
  {
    id: 8,
    title: "OP UPGRADE III",
    description: "45x Point",
    cost: new ExpantaNum(1e240),
    effect: new ExpantaNum(1),
    level: new ExpantaNum(0),
    costMultiplier: new ExpantaNum(1e70),
    effectMultiplier: new ExpantaNum(45)
  },
];

let ultraUpgrades = [
  {
    id: 1,
    title: "ULTRA UPGRADE I",
    description: "8x Point but reset normal upgrades",
    cost: new ExpantaNum(1e200),
    effect: new ExpantaNum(1),
    level: new ExpantaNum(0),
    costMultiplier: new ExpantaNum(1e10),
    effectMultiplier: new ExpantaNum(8)
  },
  {
    id: 2,
    title: "ULTRA UPGRADE II",
    description: "45x Point but reset normal upgrades",
    cost: new ExpantaNum("1e1700"),
    effect: new ExpantaNum(1),
    level: new ExpantaNum(0),
    costMultiplier: new ExpantaNum(1e10),
    effectMultiplier: new ExpantaNum(45)
  }
];



function loadPlayerData() {
  const savedData = localStorage.getItem('playerData');
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    NUM = new ExpantaNum(parsedData.NUM);
    NUMPC = new ExpantaNum(parsedData.NUMPC);
    for (let i = 0; i < upgrades.length; i++) {
      upgrades[i].level = new ExpantaNum(parsedData.upgrades[i].level);
      upgrades[i].cost = new ExpantaNum(parsedData.upgrades[i].cost);
      upgrades[i].effect = new ExpantaNum(parsedData.upgrades[i].effect);
      // Update HTML elements for upgrades
      UpdateUpgradeText(upgrades[i]);
	  
    }
    for (let i = 0; i < ultraUpgrades.length; i++) {
      ultraUpgrades[i].level = new ExpantaNum(parsedData.ultraUpgrades[i].level);
      ultraUpgrades[i].cost = new ExpantaNum(parsedData.ultraUpgrades[i].cost);
      ultraUpgrades[i].effect = new ExpantaNum(parsedData.ultraUpgrades[i].effect);
      // Update HTML elements for ultra upgrades
      UpdateUltraUpgradeText(ultraUpgrades[i]);
    }
    UpdateNUMTEXT(); // Update points display
  }
}

// Save player data to localStorage
function savePlayerData() {
  const playerData = {
    NUM: NUM.toString(),
    NUMPC: NUMPC.toString(),
    upgrades: upgrades.map(upgrade => ({
      level: upgrade.level.toString(),
      cost: upgrade.cost.toString(),
      effect: upgrade.effect.toString()
    })),
    ultraUpgrades: ultraUpgrades.map(ultraUpgrade => ({
      level: ultraUpgrade.level.toString(),
      cost: ultraUpgrade.cost.toString(),
      effect: ultraUpgrade.effect.toString()
    }))
  };
  localStorage.setItem('playerData', JSON.stringify(playerData));
}


function GainNUM() {
  NUM = NUM.add(CalculateNUMPC());
  UpdateNUMTEXT();
  savePlayerData();
}

loadPlayerData();
for (let upgrade of upgrades) {
  UpdateUpgradeText(upgrade);
}

for (let ultraUpgrade of ultraUpgrades) {
  UpdateUltraUpgradeText(ultraUpgrade);
}
UpdateNUMTEXT();

function CalculateNUMPC() {
  let PC = new ExpantaNum(NUMPC);
  for (let upgrade of upgrades) {
    PC = PC.mul(upgrade.effect);
  }
  for (let ultraUpgrade of ultraUpgrades) {
	  PC = PC.mul(ultraUpgrade.effect);
  }
  return PC;
}

function BuyUpgrade(upgradeId) {
  let upgrade = upgrades.find(u => u.id === upgradeId);
  if (NUM.gte(upgrade.cost)) {
    NUM = NUM.sub(upgrade.cost);
    upgrade.cost = upgrade.cost.mul(upgrade.costMultiplier);
    upgrade.level = upgrade.level.add(1);
    upgrade.effect = upgrade.effect.mul(upgrade.effectMultiplier);
  }
  UpdateUpgradeText(upgrade);
  UpdateNUMTEXT();
}

function BuyUltraUpgrade(ultraUpgradeId) {
  let ultraUpgrade = ultraUpgrades.find(uu => uu.id === ultraUpgradeId);
  if (NUM.gte(ultraUpgrade.cost)) {
    NUM = new ExpantaNum(10);
	NUMPC = new ExpantaNum(1);
    ultraUpgrade.cost = ultraUpgrade.cost.mul(ultraUpgrade.costMultiplier);
    ultraUpgrade.level = ultraUpgrade.level.add(1);
    ultraUpgrade.effect = ultraUpgrade.effect.mul(ultraUpgrade.effectMultiplier);

    for (let i = 0; i < upgrades.length; i++) {
      upgrades[i].cost = upgrades[i].cost.div(upgrades[i].costMultiplier);
      upgrades[i].level = new ExpantaNum(0);
      upgrades[i].effect = new ExpantaNum(1);
      UpdateUpgradeText(upgrades[i]);
    }
  }
  savePlayerData();
  UpdateUltraUpgradeText(ultraUpgrade);
  UpdateNUMTEXT();
}

function UpdateNUMTEXT() {
	let unformatted = document.getElementById('NUM');
	if(unformatted != null) {
		let formatted = formatWithExponent(NUM);
		unformatted.textContent = formatted;
		
		
	}
}
		
function UpdateUpgradeText(upgrade) {
  let costElement = document.getElementById(`COSTUPG${upgrade.id}`);
  if (costElement) {
    costElement.textContent = formatWithExponent(upgrade.cost)
  }
}

function UpdateUltraUpgradeText(ultraUpgrade) {
  let costElement = document.getElementById(`COSTULTRAUPG${ultraUpgrade.id}`);
  if (costElement) {
    costElement.textContent = formatWithExponent(ultraUpgrade.cost)
  }
}


UpdateNUMTEXT();
for (let i = 0; i < upgrades.length; i++) {
    UpdateUpgradeText(upgrades[i]);
}