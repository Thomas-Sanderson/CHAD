import type { VocabPack } from "../../types";

export const level1VocabPack: VocabPack = {
  levelId: "grocery-run",
  words: [
    {
      id: "smetana",
      cyrillic: "СМЕТАНА",
      translation: "sour cream",
      matchesItemId: "smetana_tub",
      pronunciation: "smeh-TAH-nah",
    },
    {
      id: "kefir",
      cyrillic: "КЕФИР",
      translation: "fermented milk drink",
      matchesItemId: "kefir_bottle",
      pronunciation: "keh-FEER",
    },
    {
      id: "kolbasa",
      cyrillic: "КОЛБАСА",
      translation: "sausage/salami",
      matchesItemId: "kolbasa_link",
      pronunciation: "kahl-bah-SAH",
    },
    {
      id: "produkty",
      cyrillic: "ПРОДУКТЫ",
      translation: "groceries",
      matchesItemId: null,
      pronunciation: "prah-DOOK-tih",
    },
  ],
};

export const level2VocabPack: VocabPack = {
  levelId: "tea-emergency",
  words: [
    {
      id: "chai",
      cyrillic: "ЧАЙ",
      translation: "tea",
      matchesItemId: "chai_box",
      pronunciation: "CHAY",
    },
    {
      id: "moloko",
      cyrillic: "МОЛОКО",
      translation: "milk",
      matchesItemId: "moloko_carton",
      pronunciation: "mah-lah-KOH",
    },
    {
      id: "sakhar",
      cyrillic: "САХАР",
      translation: "sugar",
      matchesItemId: "sakhar_bag",
      pronunciation: "SAH-khar",
    },
  ],
};

export const level3VocabPack: VocabPack = {
  levelId: "dinner-ingredients",
  words: [
    {
      id: "ryba",
      cyrillic: "РЫБА",
      translation: "fish",
      matchesItemId: "ryba_fish",
      pronunciation: "RIH-bah",
    },
    {
      id: "maslo",
      cyrillic: "МАСЛО",
      translation: "butter",
      matchesItemId: "maslo_butter",
      pronunciation: "MAHS-lah",
    },
    {
      id: "kartoshka",
      cyrillic: "КАРТОШКА",
      translation: "potato",
      matchesItemId: "kartoshka",
      pronunciation: "kar-TOSH-kah",
    },
    {
      id: "hleb",
      cyrillic: "ХЛЕБ",
      translation: "bread",
      matchesItemId: "hleb_rye",
      pronunciation: "KHLYEB",
    },
  ],
};

export const level4VocabPack: VocabPack = {
  levelId: "the-apology",
  words: [
    {
      id: "konfeta",
      cyrillic: "КОНФЕТА",
      translation: "candy/chocolate",
      matchesItemId: "konfeta_candy",
      pronunciation: "kahn-FYEH-tah",
    },
    {
      id: "syr",
      cyrillic: "СЫР",
      translation: "cheese",
      matchesItemId: "syr_cheese",
      pronunciation: "SIHR",
    },
    {
      id: "yabloko",
      cyrillic: "ЯБЛОКО",
      translation: "apple",
      matchesItemId: "yabloko_apple",
      pronunciation: "YAH-blah-kah",
    },
  ],
};

// === Level 5 vocab ===
export const level5VocabPack: VocabPack = {
  levelId: "saturday-morning",
  words: [
    {
      id: "tarelka",
      cyrillic: "ТАРЕЛКА",
      translation: "plate",
      matchesItemId: "tarelka_plate",
      pronunciation: "tah-RYEL-kah",
    },
    {
      id: "lozhka",
      cyrillic: "ЛОЖКА",
      translation: "spoon",
      matchesItemId: "lozhka_spoon",
      pronunciation: "LOSH-kah",
    },
    {
      id: "chashka",
      cyrillic: "ЧАШКА",
      translation: "cup",
      matchesItemId: "chashka_cup",
      pronunciation: "CHASH-kah",
    },
    {
      id: "zavtrak",
      cyrillic: "ЗАВТРАК",
      translation: "breakfast",
      matchesItemId: null,
      pronunciation: "ZAHF-trahk",
    },
  ],
};

// === Level 6 vocab ===
export const level6VocabPack: VocabPack = {
  levelId: "the-market",
  words: [
    {
      id: "syr_market",
      cyrillic: "СЫР",
      translation: "cheese",
      matchesItemId: "syr_wheel",
      pronunciation: "SIHR",
    },
    {
      id: "ryba_market",
      cyrillic: "РЫБА",
      translation: "fish",
      matchesItemId: "ryba_smoked",
      pronunciation: "RIH-bah",
    },
    {
      id: "slivki",
      cyrillic: "СЛИВКИ",
      translation: "cream",
      matchesItemId: "slivki_jar",
      pronunciation: "SLEEF-kee",
    },
    {
      id: "grib",
      cyrillic: "ГРИБ",
      translation: "mushroom",
      matchesItemId: "grib_basket",
      pronunciation: "GREEB",
    },
  ],
};
