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
      ipa: "/smʲɪˈtanə/",
    },
    {
      id: "kefir",
      cyrillic: "КЕФИР",
      translation: "fermented milk drink",
      matchesItemId: "kefir_bottle",
      pronunciation: "keh-FEER",
      ipa: "/kʲɪˈfʲir/",
    },
    {
      id: "kolbasa",
      cyrillic: "КОЛБАСА",
      translation: "sausage/salami",
      matchesItemId: "kolbasa_link",
      pronunciation: "kahl-bah-SAH",
      ipa: "/kəlbɐˈsa/",
    },
    {
      id: "produkty",
      cyrillic: "ПРОДУКТЫ",
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
      cyrillic: "ЧАЙ",
      translation: "tea",
      matchesItemId: "chai_box",
      pronunciation: "CHAY",
      ipa: "/tɕaj/",
    },
    {
      id: "moloko",
      cyrillic: "МОЛОКО",
      translation: "milk",
      matchesItemId: "moloko_carton",
      pronunciation: "mah-lah-KOH",
      ipa: "/məlɐˈko/",
    },
    {
      id: "sakhar",
      cyrillic: "САХАР",
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
      cyrillic: "РЫБА",
      translation: "fish",
      matchesItemId: "ryba_fish",
      pronunciation: "RIH-bah",
      ipa: "/ˈrɨbə/",
    },
    {
      id: "maslo",
      cyrillic: "МАСЛО",
      translation: "butter",
      matchesItemId: "maslo_butter",
      pronunciation: "MAHS-lah",
      ipa: "/ˈmaslə/",
    },
    {
      id: "kartoshka",
      cyrillic: "КАРТОШКА",
      translation: "potato",
      matchesItemId: "kartoshka",
      pronunciation: "kar-TOSH-kah",
      ipa: "/kɐrˈtoʂkə/",
    },
    {
      id: "hleb",
      cyrillic: "ХЛЕБ",
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
      cyrillic: "КОНФЕТА",
      translation: "candy/chocolate",
      matchesItemId: "konfeta_candy",
      pronunciation: "kahn-FYEH-tah",
      ipa: "/kɐnˈfʲetə/",
    },
    {
      id: "syr",
      cyrillic: "СЫР",
      translation: "cheese",
      matchesItemId: "syr_cheese",
      pronunciation: "SIHR",
      ipa: "/sɨr/",
    },
    {
      id: "yabloko",
      cyrillic: "ЯБЛОКО",
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
      cyrillic: "ТАРЕЛКА",
      translation: "plate",
      matchesItemId: "tarelka_plate",
      pronunciation: "tah-RYEL-kah",
      ipa: "/tɐˈrʲelkə/",
    },
    {
      id: "lozhka",
      cyrillic: "ЛОЖКА",
      translation: "spoon",
      matchesItemId: "lozhka_spoon",
      pronunciation: "LOSH-kah",
      ipa: "/ˈloʂkə/",
    },
    {
      id: "chashka",
      cyrillic: "ЧАШКА",
      translation: "cup",
      matchesItemId: "chashka_cup",
      pronunciation: "CHASH-kah",
      ipa: "/ˈtɕaʂkə/",
    },
    {
      id: "zavtrak",
      cyrillic: "ЗАВТРАК",
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
      cyrillic: "СЫР",
      translation: "cheese",
      matchesItemId: "syr_wheel",
      pronunciation: "SIHR",
      ipa: "/sɨr/",
    },
    {
      id: "ryba_market",
      cyrillic: "РЫБА",
      translation: "fish",
      matchesItemId: "ryba_smoked",
      pronunciation: "RIH-bah",
      ipa: "/ˈrɨbə/",
    },
    {
      id: "slivki",
      cyrillic: "СЛИВКИ",
      translation: "cream",
      matchesItemId: "slivki_jar",
      pronunciation: "SLEEF-kee",
      ipa: "/ˈslʲifkʲi/",
    },
    {
      id: "grib",
      cyrillic: "ГРИБ",
      translation: "mushroom",
      matchesItemId: "grib_basket",
      pronunciation: "GREEB",
      ipa: "/grʲip/",
    },
  ],
};
