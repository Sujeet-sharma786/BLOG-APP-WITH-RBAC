// src/utils/sanscript.js
// Basic rule-based transliterator from ITRANS-style Roman Hindi to Devanagari

export function transliterate(input) {
  const mapping = {
    'sh': 'श', 'chh': 'छ', 'ch': 'च', 'th': 'थ', 'dh': 'ध', 'ph': 'फ', 'bh': 'भ',
    'kh': 'ख', 'gh': 'घ', 'jh': 'झ', 'ṭh': 'ठ', 'ḍh': 'ढ',

    'aa': 'आ', 'ii': 'ई', 'ee': 'ई', 'uu': 'ऊ', 'oo': 'ऊ',
    'ai': 'ऐ', 'au': 'औ', 'a': 'अ', 'i': 'इ', 'u': 'उ', 'e': 'ए', 'o': 'ओ',

    'k': 'क', 'g': 'ग', 'c': 'क', 'j': 'ज', 't': 'त', 'd': 'द',
    'n': 'न', 'p': 'प', 'b': 'ब', 'm': 'म', 'y': 'य', 'r': 'र', 'l': 'ल',
    'v': 'व', 's': 'स', 'h': 'ह', 'ṅ': 'ङ', 'ñ': 'ञ',

    'ṃ': 'ं', 'ḥ': 'ः', 'ṁ': 'ं', '’': 'ऽ',

    ' ': ' ', ',': ',', '.': '.', '?': '?'
  };

  let result = '';
  let i = 0;
  const text = input.toLowerCase();

  while (i < text.length) {
    let match = '';
    let len = 0;

    for (let l = 3; l >= 1; l--) {
      const chunk = text.substr(i, l);
      if (mapping[chunk]) {
        match = mapping[chunk];
        len = l;
        break;
      }
    }

    if (match) {
      result += match;
      i += len;
    } else {
      result += text[i];
      i++;
    }
  }

  return result;
}
