let NUM = new ExpantaNum(0);
let NUMPC = new ExpantaNum(1);

let upgrades = [
  {
    id: 1,
    title: "UPGRADE I",
    description: "2x Point",
    cost: new ExpantaNum(5),
    effect: new ExpantaNum(1),
    level: new ExpantaNum(0),
    costMultiplier: new ExpantaNum(5),
    effectMultiplier: new ExpantaNum(2)
  },
  {
    id: 2,
    title: "UPGRADE II",
    description: "2x Point",
    cost: new ExpantaNum(25),
    effect: new ExpantaNum(1),
    level: new ExpantaNum(0),
    costMultiplier: new ExpantaNum(5),
    effectMultiplier: new ExpantaNum(2)
  },
  {
    id: 3,
    title: "UPGRADE III",
    description: "2.5x Point",
    cost: new ExpantaNum(125),
    effect: new ExpantaNum(1),
    level: new ExpantaNum(0),
    costMultiplier: new ExpantaNum(7.5),
    effectMultiplier: new ExpantaNum(2.5)
  },
  {
    id: 4,
    title: "UPGRADE IV",
    description: "3x Point",
    cost: new ExpantaNum(625),
    effect: new ExpantaNum(1),
    level: new ExpantaNum(0),
    costMultiplier: new ExpantaNum(10),
    effectMultiplier: new ExpantaNum(3)
  }
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

function UpdateNUMTEXT() {
  document.getElementById('NUM').textContent = formatWithExponent(NUM);
}
function formatWithExponent(num) {
  // Convert the number to ExpantaNum for precision
  const expNum = new ExpantaNum(num);

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

function UpdateUpgradeText(upgrade) {
  let costElement = document.getElementById(`COSTUPG${upgrade.id}`);
  if (costElement) {
    costElement.textContent = formatWithExponent(upgrade.cost)
  }
}

UpdateNUMTEXT();

// Update upgrade text for each upgrade
for (let upgrade of upgrades) {
  UpdateUpgradeText(upgrade);
}