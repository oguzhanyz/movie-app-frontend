export function formatVotes(numVotes) {
  let num = parseInt(numVotes);
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + "M";
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed() + "K";
  } else {
    return num.toString();
  }
}
