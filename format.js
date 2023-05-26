function addCommas(num) {
  if (num.length <= 3) return num
  let rem = num.length % 3
  if (rem == 0) rem = 3
  return num.slice(0, rem) + "," + addCommas(num.slice(rem))
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