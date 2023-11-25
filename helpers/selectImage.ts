export default function selectImage(imageArray: string []) {
  type variation = any
  if (imageArray.length < 4) {
    console.error('There are not enough images in the array.');
    return [];
  }

  const variations: variation = [];
  const usedIndexes = new Set();

  while (variations.length < 20) {
    const variation: any = [];
    usedIndexes.clear();

    while (variation.length < 4) {
      const randomIndex = Math.floor(Math.random() * imageArray.length);

      if (!usedIndexes.has(randomIndex)) {
        variation.push(imageArray[randomIndex]);
        usedIndexes.add(randomIndex);
      }
    }

    // Check if the generated variation already exists
    const exists = variations.some((v: any) => JSON.stringify(v) === JSON.stringify(variation));

    if (!exists) {
      variations.push(variation);
    }
  }

  return variations;
}