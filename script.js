let NUM = new ExpantaNum(10);

let NUMPC = new ExpantaNum(1);

let upgrades = [
  {
    id: 1,
    title: "UPGRADE I",
    description: "2x Point",
    cost: new ExpantaNum(500),
    effect: new ExpantaNum(1),
    level: new ExpantaNum(0),
    costMultiplier: new ExpantaNum(5),
    effectMultiplier: new ExpantaNum(2)
  },
  {
    id: 2,
    title: "UPGRADE II",
    description: "2x Point",
    cost: new ExpantaNum(5000),
    effect: new ExpantaNum(1),
    level: new ExpantaNum(0),
    costMultiplier: new ExpantaNum(5),
    effectMultiplier: new ExpantaNum(2)
  },
  {
    id: 3,
    title: "UPGRADE III",
    description: "2.5x Point",
    cost: new ExpantaNum(60000),
    effect: new ExpantaNum(1),
    level: new ExpantaNum(0),
    costMultiplier: new ExpantaNum(7.5),
    effectMultiplier: new ExpantaNum(2.5)
  },
  {
    id: 4,
    title: "UPGRADE IV",
    description: "3x Point",
    cost: new ExpantaNum(150000),
    effect: new ExpantaNum(1),
    level: new ExpantaNum(0),
    costMultiplier: new ExpantaNum(10),
    effectMultiplier: new ExpantaNum(3)
  },
  {
    id: 5,
    title: "UPGRADE V",
    description: "5x Point",
    cost: new ExpantaNum(1e9),
    effect: new ExpantaNum(1),
    level: new ExpantaNum(0),
    costMultiplier: new ExpantaNum(10),
    effectMultiplier: new ExpantaNum(3)
  }
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
  },
];

function GainNUM() {
  NUM = NUM.add(CalculateNUMPC());
  UpdateNUMTEXT();
}

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

function formatWithExponent(NUM) {
  // Convert the number to ExpantaNum for precision
  const expNum = new ExpantaNum(NUM);

  // Check if the number is already in scientific notation
  if (expNum.gte("0")) {
    return expNum.toExponential(3);
  }

  // Determine the exponent
  const exponent = expNum.log10().floor();

  // Calculate the mantissa (coefficient) and format it
  const mantissa = expNum.div(ExpantaNum.pow(10, exponent));
  const formattedMantissa = mantissa.toFixed(3);

  // Format the final number with the "10^" notation
  return `${formattedMantissa} * 10^${exponent}`;
}

function BuyUltraUpgrade(ultraUpgradeId) {
  let ultraUpgrade = ultraUpgrades.find(uu => uu.id === ultraUpgradeId);
  if (NUM.gte(ultraUpgrade.cost)) {
    NUM = NUM.sub(ultraUpgrade.cost);
    ultraUpgrade.cost = ultraUpgrade.cost.mul(ultraUpgrade.costMultiplier);
    ultraUpgrade.level = ultraUpgrade.level.add(1);
    ultraUpgrade.effect = ultraUpgrade.effect.mul(ultraUpgrade.effectMultiplier);
  }
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

// Update upgrade text for each upgrade
for (let upgrade of upgrades) {
  UpdateUpgradeText(upgrade);
}

for (let ultraUpgrade of ultraUpgrades) {
  UpdateUltraUpgradeText(ultraUpgrade);
}