import type { VocabPack } from "../../types";

export const level1VocabPack: VocabPack = {
  levelId: "grocery-run",
  words: [
    {
      id: "smetana",
      script: "СМЕТАНА",
      translation: "sour cream",
      matchesItemId: "smetana_tub",
      pronunciation: "smeh-TAH-nah",
      ipa: "/smʲɪˈtanə/",
      hint: "The white goop. Goes on everything here.",
    },
    {
      id: "kefir",
      script: "КЕФИР",
      translation: "fermented milk drink",
      matchesItemId: "kefir_bottle",
      pronunciation: "keh-FEER",
      ipa: "/kʲɪˈfʲir/",
      hint: "Angry milk in a tall bottle. It fizzes.",
    },
    {
      id: "kolbasa",
      script: "КОЛБАСА",
      translation: "sausage/salami",
      matchesItemId: "kolbasa_link",
      pronunciation: "kahl-bah-SAH",
      ipa: "/kəlbɐˈsa/",
      hint: "The big meat tube. You know what it is.",
    },
    {
      id: "produkty",
      script: "ПРОДУКТЫ",
      translation: "groceries",
      matchesItemId: null,
      pronunciation: "prah-DOOK-tih",
      ipa: "/prɐˈduktɨ/",
    },
  ],
};

export const level2VocabPack: VocabPack = {
  levelId: "tea-emergency",
  words: [
    {
      id: "chai",
      script: "ЧАЙ",
      translation: "tea",
      matchesItemId: "chai_box",
      pronunciation: "CHAY",
      ipa: "/tɕaj/",
      hint: "The warm leaf water. A whole crisis over this.",
    },
    {
      id: "moloko",
      script: "МОЛОКО",
      translation: "milk",
      matchesItemId: "moloko_carton",
      pronunciation: "mah-lah-KOH",
      ipa: "/məlɐˈko/",
      hint: "Comes from a cow. Goes in the leaf water.",
    },
    {
      id: "sakhar",
      script: "САХАР",
      translation: "sugar",
      matchesItemId: "sakhar_bag",
      pronunciation: "SAH-khar",
      ipa: "/ˈsaxər/",
      hint: "The sweet stuff ants march in for.",
    },
  ],
};

export const level3VocabPack: VocabPack = {
  levelId: "dinner-ingredients",
  words: [
    {
      id: "ryba",
      script: "РЫБА",
      translation: "fish",
      matchesItemId: "ryba_fish",
      pronunciation: "RIH-bah",
      ipa: "/ˈrɨbə/",
      hint: "It swims. It smells. She wants you to cook it.",
    },
    {
      id: "maslo",
      script: "МАСЛО",
      translation: "butter",
      matchesItemId: "maslo_butter",
      pronunciation: "MAHS-lah",
      ipa: "/ˈmaslə/",
      hint: "The yellow slab. Makes everything better, apparently.",
    },
    {
      id: "kartoshka",
      script: "КАРТОШКА",
      translation: "potato",
      matchesItemId: "kartoshka",
      pronunciation: "kar-TOSH-kah",
      ipa: "/kɐrˈtoʂkə/",
      hint: "Grows underground. Half of Belarusian cuisine.",
    },
    {
      id: "hleb",
      script: "ХЛЕБ",
      translation: "bread",
      matchesItemId: "hleb_rye",
      pronunciation: "KHLYEB",
      ipa: "/xlʲep/",
      hint: "The dark one. Not the bleached kind.",
    },
  ],
};

export const level4VocabPack: VocabPack = {
  levelId: "the-apology",
  words: [
    {
      id: "konfeta",
      script: "КОНФЕТА",
      translation: "candy/chocolate",
      matchesItemId: "konfeta_candy",
      pronunciation: "kahn-FYEH-tah",
      ipa: "/kɐnˈfʲetə/",
      hint: "The sweet bribe. In a shiny wrapper.",
    },
    {
      id: "syr",
      script: "СЫР",
      translation: "cheese",
      matchesItemId: "syr_cheese",
      pronunciation: "SIHR",
      ipa: "/sɨr/",
      hint: "Holes optional. Smells intentional.",
    },
    {
      id: "yabloko",
      script: "ЯБЛОКО",
      translation: "apple",
      matchesItemId: "yabloko_apple",
      pronunciation: "YAH-blah-kah",
      ipa: "/ˈjabləkə/",
      hint: "Grows on a tree. Newton got bonked by one.",
    },
  ],
};

// === Level 5 vocab ===
export const level5VocabPack: VocabPack = {
  levelId: "saturday-morning",
  words: [
    {
      id: "tarelka",
      script: "ТАРЕЛКА",
      translation: "plate",
      matchesItemId: "tarelka_plate",
      pronunciation: "tah-RYEL-kah",
      ipa: "/tɐˈrʲelkə/",
      hint: "The flat round thing you eat off of.",
    },
    {
      id: "lozhka",
      script: "ЛОЖКА",
      translation: "spoon",
      matchesItemId: "lozhka_spoon",
      pronunciation: "LOSH-kah",
      ipa: "/ˈloʂkə/",
      hint: "Scoops soup. Not a fork, Chad.",
    },
    {
      id: "chashka",
      script: "ЧАШКА",
      translation: "cup",
      matchesItemId: "chashka_cup",
      pronunciation: "CHASH-kah",
      ipa: "/ˈtɕaʂkə/",
      hint: "You drink from it. Has a handle.",
    },
    {
      id: "zavtrak",
      script: "ЗАВТРАК",
      translation: "breakfast",
      matchesItemId: null,
      pronunciation: "ZAHF-trahk",
      ipa: "/ˈzaftrək/",
    },
  ],
};

// === Level 6 vocab ===
export const level6VocabPack: VocabPack = {
  levelId: "the-market",
  words: [
    {
      id: "syr_market",
      script: "СЫР",
      translation: "cheese",
      matchesItemId: "syr_wheel",
      pronunciation: "SIHR",
      ipa: "/sɨr/",
      hint: "The big wheel kind this time. Fancy.",
    },
    {
      id: "ryba_market",
      script: "РЫБА",
      translation: "fish",
      matchesItemId: "ryba_smoked",
      pronunciation: "RIH-bah",
      ipa: "/ˈrɨbə/",
      hint: "Smoked this time. Still smells.",
    },
    {
      id: "slivki",
      script: "СЛИВКИ",
      translation: "cream",
      matchesItemId: "slivki_jar",
      pronunciation: "SLEEF-kee",
      ipa: "/ˈslʲifkʲi/",
      hint: "Rich, white, comes in a jar. For fancy people.",
    },
    {
      id: "grib",
      script: "ГРИБ",
      translation: "mushroom",
      matchesItemId: "grib_basket",
      pronunciation: "GREEB",
      ipa: "/grʲip/",
      hint: "Grows in the forest. Comes in a basket. Don't eat the wrong one.",
    },
  ],
};

// === Level 7 vocab ===
export const level7VocabPack: VocabPack = {
  levelId: "up-the-street",
  words: [
    {
      id: "sveokla",
      script: "СВЁКЛА",
      translation: "beetroot",
      matchesItemId: "sveokla_beet",
      pronunciation: "SVYOK-la",
      ipa: "/ˈsvʲɵklə/",
      hint: "Purple. Stains everything. Makes borscht that color.",
    },
    {
      id: "smetana_street",
      script: "СМЕТАНА",
      translation: "sour cream",
      matchesItemId: "smetana_tub",
      pronunciation: "smeh-TAH-nah",
      ipa: "/smʲɪˈtanə/",
      hint: "You've seen this before. The white goop.",
    },
    {
      id: "hleb_street",
      script: "ХЛЕБ",
      translation: "bread",
      matchesItemId: "hleb_rye",
      pronunciation: "KHLYEB",
      ipa: "/xlʲep/",
      hint: "The dark one again. You know this.",
    },
    {
      id: "maslo_street",
      script: "МАСЛО",
      translation: "butter",
      matchesItemId: "maslo_butter",
      pronunciation: "MAHS-lah",
      ipa: "/ˈmaslə/",
      hint: "Yellow. In foil. You literally bought this before.",
    },
  ],
};

// === Level 8 vocab ===
export const level8VocabPack: VocabPack = {
  levelId: "the-intersection",
  words: [
    {
      id: "ukrop",
      script: "УКРОП",
      translation: "dill",
      matchesItemId: "ukrop_bunch",
      pronunciation: "oo-KROP",
      ipa: "/ʊˈkrop/",
      hint: "Feathery green herb. Goes on everything here. EVERYTHING.",
    },
    {
      id: "ryba_intersection",
      script: "РЫБА",
      translation: "fish",
      matchesItemId: "ryba_smoked",
      pronunciation: "RIH-bah",
      ipa: "/ˈrɨbə/",
      hint: "Still smells. Still has fins. You know this word by now.",
    },
    {
      id: "grib_intersection",
      script: "ГРИБ",
      translation: "mushroom",
      matchesItemId: "grib_basket",
      pronunciation: "GREEB",
      ipa: "/grʲip/",
      hint: "Forest fungus. You bought these last time. Remember?",
    },
  ],
};

// === Level 9 vocab ===
export const level9VocabPack: VocabPack = {
  levelId: "the-other-side",
  words: [
    {
      id: "tvorog",
      script: "ТВОРОГ",
      translation: "cottage cheese / quark",
      matchesItemId: "tvorog_tub",
      pronunciation: "TVOH-rog",
      ipa: "/ˈtvorək/",
      hint: "White, grainy, in a tub. Not sour cream. Different tub.",
    },
    {
      id: "sosiski",
      script: "СОСИСКИ",
      translation: "frankfurters / small sausages",
      matchesItemId: "sosiski_pack",
      pronunciation: "sah-SEES-kee",
      ipa: "/sɐˈsʲiskʲɪ/",
      hint: "Thin sausages in a pack. Not колбаса. Smaller.",
    },
    {
      id: "sveokla_return",
      script: "СВЁКЛА",
      translation: "beetroot",
      matchesItemId: "sveokla_beet",
      pronunciation: "SVYOK-la",
      ipa: "/ˈsvʲɵklə/",
      hint: "Purple root. You just learned this. Don't forget already.",
    },
    {
      id: "kefir_return",
      script: "КЕФИР",
      translation: "fermented milk drink",
      matchesItemId: "kefir_bottle",
      pronunciation: "keh-FEER",
      ipa: "/kʲɪˈfʲir/",
      hint: "Tall bottle. Fizzy milk. Level one vocabulary, Chad.",
    },
  ],
};
