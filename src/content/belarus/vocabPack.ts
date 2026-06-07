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
    },
    {
      id: "kefir",
      script: "КЕФИР",
      translation: "fermented milk drink",
      matchesItemId: "kefir_bottle",
      pronunciation: "keh-FEER",
      ipa: "/kʲɪˈfʲir/",
    },
    {
      id: "kolbasa",
      script: "КОЛБАСА",
      translation: "sausage/salami",
      matchesItemId: "kolbasa_link",
      pronunciation: "kahl-bah-SAH",
      ipa: "/kəlbɐˈsa/",
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
    },
    {
      id: "moloko",
      script: "МОЛОКО",
      translation: "milk",
      matchesItemId: "moloko_carton",
      pronunciation: "mah-lah-KOH",
      ipa: "/məlɐˈko/",
    },
    {
      id: "sakhar",
      script: "САХАР",
      translation: "sugar",
      matchesItemId: "sakhar_bag",
      pronunciation: "SAH-khar",
      ipa: "/ˈsaxər/",
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
    },
    {
      id: "maslo",
      script: "МАСЛО",
      translation: "butter",
      matchesItemId: "maslo_butter",
      pronunciation: "MAHS-lah",
      ipa: "/ˈmaslə/",
    },
    {
      id: "kartoshka",
      script: "КАРТОШКА",
      translation: "potato",
      matchesItemId: "kartoshka",
      pronunciation: "kar-TOSH-kah",
      ipa: "/kɐrˈtoʂkə/",
    },
    {
      id: "hleb",
      script: "ХЛЕБ",
      translation: "bread",
      matchesItemId: "hleb_rye",
      pronunciation: "KHLYEB",
      ipa: "/xlʲep/",
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
    },
    {
      id: "syr",
      script: "СЫР",
      translation: "cheese",
      matchesItemId: "syr_cheese",
      pronunciation: "SIHR",
      ipa: "/sɨr/",
    },
    {
      id: "yabloko",
      script: "ЯБЛОКО",
      translation: "apple",
      matchesItemId: "yabloko_apple",
      pronunciation: "YAH-blah-kah",
      ipa: "/ˈjabləkə/",
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
    },
    {
      id: "lozhka",
      script: "ЛОЖКА",
      translation: "spoon",
      matchesItemId: "lozhka_spoon",
      pronunciation: "LOSH-kah",
      ipa: "/ˈloʂkə/",
    },
    {
      id: "chashka",
      script: "ЧАШКА",
      translation: "cup",
      matchesItemId: "chashka_cup",
      pronunciation: "CHASH-kah",
      ipa: "/ˈtɕaʂkə/",
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
    },
    {
      id: "ryba_market",
      script: "РЫБА",
      translation: "fish",
      matchesItemId: "ryba_smoked",
      pronunciation: "RIH-bah",
      ipa: "/ˈrɨbə/",
    },
    {
      id: "slivki",
      script: "СЛИВКИ",
      translation: "cream",
      matchesItemId: "slivki_jar",
      pronunciation: "SLEEF-kee",
      ipa: "/ˈslʲifkʲi/",
    },
    {
      id: "grib",
      script: "ГРИБ",
      translation: "mushroom",
      matchesItemId: "grib_basket",
      pronunciation: "GREEB",
      ipa: "/grʲip/",
    },
  ],
};
