import type { BriefingScript } from "../../types";

export const level1Briefing: BriefingScript = {
  levelId: "grocery-run",
  messages: [
    {
      id: "l1-msg-1",
      sender: "mentor",
      text: "If you're really coming, grab СМЕТАНА on the way.",
      vocabWordIds: ["smetana"],
    },
    {
      id: "l1-msg-2",
      sender: "mentor",
      text: "And КЕФИР. The cold one, not the warm one. Disgusting.",
      vocabWordIds: ["kefir"],
    },
    {
      id: "l1-msg-3",
      sender: "mentor",
      text: "Also КОЛБАСА. You know what that is, right? ...you don't, do you.",
      vocabWordIds: ["kolbasa"],
    },
    {
      id: "l1-msg-4",
      sender: "mentor",
      text: "I can't believe I'm texting a man in cargo shorts about ПРОДУКТЫ.",
      vocabWordIds: ["produkty"],
    },
  ],
};

export const level2Briefing: BriefingScript = {
  levelId: "tea-emergency",
  messages: [
    {
      id: "l2-msg-1",
      sender: "mentor",
      text: "My kettle died. I need a new one but first I need ЧАЙ.",
      vocabWordIds: ["chai"],
    },
    {
      id: "l2-msg-2",
      sender: "mentor",
      text: "And МОЛОКО. Not that powdered stuff. Real МОЛОКО.",
      vocabWordIds: ["moloko"],
    },
    {
      id: "l2-msg-3",
      sender: "mentor",
      text: "Also САХАР. Two spoons minimum. Don't judge me.",
      vocabWordIds: ["sakhar"],
    },
    {
      id: "l2-msg-4",
      sender: "mentor",
      text: "Why am I trusting a man who brings a fanny pack to Eastern Europe with my tea supplies.",
      vocabWordIds: [],
    },
  ],
};

export const level3Briefing: BriefingScript = {
  levelId: "dinner-ingredients",
  messages: [
    {
      id: "l3-msg-1",
      sender: "mentor",
      text: "Fine. FINE. I'll cook. But you're getting РЫБА and you'll like it.",
      vocabWordIds: ["ryba"],
    },
    {
      id: "l3-msg-2",
      sender: "mentor",
      text: "I need МАСЛО. Real МАСЛО, not that spray nonsense.",
      vocabWordIds: ["maslo"],
    },
    {
      id: "l3-msg-3",
      sender: "mentor",
      text: "And КАРТОШКА. At least four. No, you can't substitute sweet potatoes.",
      vocabWordIds: ["kartoshka"],
    },
    {
      id: "l3-msg-4",
      sender: "mentor",
      text: "Get ХЛЕБ too. The dark one. Not whatever bleached thing you're imagining.",
      vocabWordIds: ["hleb"],
    },
    {
      id: "l3-msg-5",
      sender: "mentor",
      text: "If you bring back the wrong КАРТОШКА I will not be responsible for my reaction.",
      vocabWordIds: ["kartoshka"],
    },
  ],
};

export const level5Briefing: BriefingScript = {
  levelId: "saturday-morning",
  messages: [
    {
      id: "l5-msg-1",
      sender: "mentor",
      text: "It's Saturday. I'm making ЗАВТРАК. Get up.",
      vocabWordIds: ["zavtrak"],
    },
    {
      id: "l5-msg-2",
      sender: "mentor",
      text: "I need a clean ТАРЕЛКА. Don't bring me the cracked one.",
      vocabWordIds: ["tarelka"],
    },
    {
      id: "l5-msg-3",
      sender: "mentor",
      text: "And a ЛОЖКА. You know, the thing you eat with? Not your hands.",
      vocabWordIds: ["lozhka"],
    },
    {
      id: "l5-msg-4",
      sender: "mentor",
      text: "Also my ЧАШКА. The blue one. If you bring the wrong one I will know.",
      vocabWordIds: ["chashka"],
    },
    {
      id: "l5-msg-5",
      sender: "chad",
      text: "I know where cups are",
      vocabWordIds: [],
    },
    {
      id: "l5-msg-6",
      sender: "mentor",
      text: "You put your phone IN the cup yesterday. No you don't.",
      vocabWordIds: [],
    },
  ],
};

export const level6Briefing: BriefingScript = {
  levelId: "the-market",
  messages: [
    {
      id: "l6-msg-1",
      sender: "mentor",
      text: "We're going to the market. Try not to embarrass me.",
      vocabWordIds: [],
    },
    {
      id: "l6-msg-2",
      sender: "mentor",
      text: "I need СЫР from the dairy shop. The round one.",
      vocabWordIds: ["syr_market"],
    },
    {
      id: "l6-msg-3",
      sender: "mentor",
      text: "РЫБА from the fish stall. Smoked.",
      vocabWordIds: ["ryba_market"],
    },
    {
      id: "l6-msg-4",
      sender: "mentor",
      text: "СЛИВКИ from the dairy. Real cream, not that spray.",
      vocabWordIds: ["slivki"],
    },
    {
      id: "l6-msg-5",
      sender: "mentor",
      text: "And ГРИБ from the vegetable lady. She'll want you to ask nicely. IN RUSSIAN.",
      vocabWordIds: ["grib"],
    },
    {
      id: "l6-msg-6",
      sender: "chad",
      text: "How hard can it be",
      vocabWordIds: [],
    },
    {
      id: "l6-msg-7",
      sender: "mentor",
      text: "Famous last words.",
      vocabWordIds: [],
    },
  ],
};

export const level7Briefing: BriefingScript = {
  levelId: "up-the-street",
  messages: [
    {
      id: "l7-msg-1",
      sender: "mentor",
      text: "The neighborhood goes up now. Literally. СВЁКЛА is at the bakery on the lower street.",
      vocabWordIds: ["sveokla"],
    },
    {
      id: "l7-msg-2",
      sender: "mentor",
      text: "I also need СМЕТАНА and МАСЛО from the dairy. It's upstairs. You'll have to climb.",
      vocabWordIds: ["smetana_street", "maslo_street"],
    },
    {
      id: "l7-msg-3",
      sender: "mentor",
      text: "And ХЛЕБ. Obviously. The dark one. Don't bring me the wrong kind again.",
      vocabWordIds: ["hleb_street"],
    },
    {
      id: "l7-msg-4",
      sender: "chad",
      text: "How do I get upstairs",
      vocabWordIds: [],
    },
    {
      id: "l7-msg-5",
      sender: "mentor",
      text: "With your legs, Chad. There are stairs. Read the signs.",
      vocabWordIds: [],
    },
  ],
};

export const level8Briefing: BriefingScript = {
  levelId: "the-intersection",
  messages: [
    {
      id: "l8-msg-1",
      sender: "mentor",
      text: "Three floors this time. I need УКРОП. It's a green herb. Goes on fish.",
      vocabWordIds: ["ukrop"],
    },
    {
      id: "l8-msg-2",
      sender: "mentor",
      text: "And РЫБА from the fish shop. You know what fish looks like by now.",
      vocabWordIds: ["ryba_intersection"],
    },
    {
      id: "l8-msg-3",
      sender: "mentor",
      text: "ГРИБ from the produce stall. She locked the door again. You know what to do.",
      vocabWordIds: ["grib_intersection"],
    },
    {
      id: "l8-msg-4",
      sender: "chad",
      text: "I know what to do",
      vocabWordIds: [],
    },
    {
      id: "l8-msg-5",
      sender: "mentor",
      text: "You absolutely do not.",
      vocabWordIds: [],
    },
  ],
};

export const level9Briefing: BriefingScript = {
  levelId: "the-other-side",
  messages: [
    {
      id: "l9-msg-1",
      sender: "mentor",
      text: "Four levels. The whole neighborhood. I need ТВОРОГ from the dairy. Third floor.",
      vocabWordIds: ["tvorog"],
    },
    {
      id: "l9-msg-2",
      sender: "mentor",
      text: "СОСИСКИ from the butcher. Second floor. Locked, obviously.",
      vocabWordIds: ["sosiski"],
    },
    {
      id: "l9-msg-3",
      sender: "mentor",
      text: "СВЁКЛА from the produce. Ground floor. You just learned this word.",
      vocabWordIds: ["sveokla_return"],
    },
    {
      id: "l9-msg-4",
      sender: "mentor",
      text: "And КЕФИР. You remember КЕФИР from day one, right? ...right?",
      vocabWordIds: ["kefir_return"],
    },
    {
      id: "l9-msg-5",
      sender: "chad",
      text: "The fizzy milk",
      vocabWordIds: [],
    },
    {
      id: "l9-msg-6",
      sender: "mentor",
      text: "...okay. Maybe there's hope for you. Maybe.",
      vocabWordIds: [],
    },
  ],
};

// === Level 10 briefing — The Shop Names ===
export const level10Briefing: BriefingScript = {
  levelId: "the-shop-names",
  messages: [
    {
      id: "l10-msg-1",
      sender: "mentor",
      text: "You know the items. Now learn where they come from. First: РЫБА.",
      vocabWordIds: ["ryba_shops"],
    },
    {
      id: "l10-msg-1b",
      sender: "mentor",
      text: "РЫБНАЯ. The fish shop. Read the sign above the door.",
      vocabWordIds: ["rybnaya"],
    },
    {
      id: "l10-msg-2",
      sender: "mentor",
      text: "Next: ХЛЕБ. You know this word by now.",
      vocabWordIds: ["hleb_shops"],
    },
    {
      id: "l10-msg-2b",
      sender: "mentor",
      text: "ПЕКАРНЯ. The bakery. The shops have names for a reason.",
      vocabWordIds: ["pekarnya"],
    },
    {
      id: "l10-msg-3",
      sender: "mentor",
      text: "And МАСЛО. Yellow slab. You've bought it before.",
      vocabWordIds: ["maslo_shops"],
    },
    {
      id: "l10-msg-3b",
      sender: "mentor",
      text: "МОЛОЧНАЯ. The dairy. You've been in there. You just didn't read the sign.",
      vocabWordIds: ["molochnaya"],
    },
    {
      id: "l10-msg-4",
      sender: "mentor",
      text: "Every МАГАЗИН in this city has a name. Learn them or wander forever.",
      vocabWordIds: ["magazin"],
    },
    {
      id: "l10-msg-5",
      sender: "chad",
      text: "I can figure out store names",
      vocabWordIds: [],
    },
    {
      id: "l10-msg-6",
      sender: "mentor",
      text: "You couldn't figure out a door lock two levels ago.",
      vocabWordIds: [],
    },
  ],
};

// === Level 11 briefing — The Far Side ===
export const level11Briefing: BriefingScript = {
  levelId: "the-far-side",
  messages: [
    {
      id: "l11-msg-1",
      sender: "mentor",
      text: "New neighborhood. I need СОСИСКИ. You remember — thin sausages.",
      vocabWordIds: ["sosiski_farside"],
    },
    {
      id: "l11-msg-1b",
      sender: "mentor",
      text: "МЯСНАЯ. The butcher. Red sign. You can't miss it.",
      vocabWordIds: ["myasnaya"],
    },
    {
      id: "l11-msg-2",
      sender: "mentor",
      text: "And СВЁКЛА. Purple root. You know this one.",
      vocabWordIds: ["sveokla_farside"],
    },
    {
      id: "l11-msg-2b",
      sender: "mentor",
      text: "ОВОЩНАЯ. The produce shop. She locked the door. Obviously.",
      vocabWordIds: ["ovoshchnaya"],
    },
    {
      id: "l11-msg-3",
      sender: "mentor",
      text: "I also need АСПИРИН. The white box with the green cross.",
      vocabWordIds: ["aspirin_farside"],
    },
    {
      id: "l11-msg-3b",
      sender: "mentor",
      text: "АПТЕКА sells it. You've walked past that green cross for nine levels.",
      vocabWordIds: ["apteka"],
    },
    {
      id: "l11-msg-4",
      sender: "mentor",
      text: "This whole РЫНОК is starting to feel like home. Whether you like it or not.",
      vocabWordIds: ["rynok"],
    },
    {
      id: "l11-msg-5",
      sender: "chad",
      text: "I know this city",
      vocabWordIds: [],
    },
    {
      id: "l11-msg-6",
      sender: "mentor",
      text: "You know three streets. Don't get ahead of yourself.",
      vocabWordIds: [],
    },
  ],
};

// === Level 12 briefing — The Full Map ===
export const level12Briefing: BriefingScript = {
  levelId: "the-full-map",
  messages: [
    {
      id: "l12-msg-1",
      sender: "mentor",
      text: "You know this city now. I want a ПИРОЖОК. The golden baked one.",
      vocabWordIds: ["pirozhok"],
    },
    {
      id: "l12-msg-1b",
      sender: "mentor",
      text: "КАФЕ on the corner. Go inside. Order it like a real person.",
      vocabWordIds: ["kafe"],
    },
    {
      id: "l12-msg-2",
      sender: "mentor",
      text: "I also need a КОНВЕРТ. White. Sealed. Don't ask what's in it.",
      vocabWordIds: ["konvert"],
    },
    {
      id: "l12-msg-2b",
      sender: "mentor",
      text: "ПОЧТА. Blue sign. You've walked past it since level six.",
      vocabWordIds: ["pochta"],
    },
    {
      id: "l12-msg-3",
      sender: "mentor",
      text: "And a МОНЕТА from the jar on the counter. Don't make it weird.",
      vocabWordIds: ["moneta"],
    },
    {
      id: "l12-msg-3b",
      sender: "mentor",
      text: "БАНК. It sounds the same in English. You'll figure it out.",
      vocabWordIds: ["bank"],
    },
    {
      id: "l12-msg-4",
      sender: "mentor",
      text: "You've learned this whole ГОРОД. Every corner. Every sign. Maybe you're not hopeless after all.",
      vocabWordIds: ["gorod"],
    },
    {
      id: "l12-msg-5",
      sender: "chad",
      text: "I know every street",
      vocabWordIds: [],
    },
    {
      id: "l12-msg-6",
      sender: "mentor",
      text: "...I know you do. That's the terrifying part.",
      vocabWordIds: [],
    },
  ],
};

export const level4Briefing: BriefingScript = {
  levelId: "the-apology",
  messages: [
    {
      id: "l4-msg-1",
      sender: "mentor",
      text: "I am not speaking to you.",
      vocabWordIds: [],
    },
    {
      id: "l4-msg-2",
      sender: "mentor",
      text: "...",
      vocabWordIds: [],
    },
    {
      id: "l4-msg-3",
      sender: "mentor",
      text: "Fine. If you want to FIX this, bring me КОНФЕТА.",
      vocabWordIds: ["konfeta"],
    },
    {
      id: "l4-msg-4",
      sender: "mentor",
      text: "And СЫР. The good kind. If you bring processed cheese I will block your number.",
      vocabWordIds: ["syr"],
    },
    {
      id: "l4-msg-5",
      sender: "mentor",
      text: "Also ЯБЛОКО. I don't know why. I just want one.",
      vocabWordIds: ["yabloko"],
    },
    {
      id: "l4-msg-6",
      sender: "mentor",
      text: "This is not forgiveness. This is a list.",
      vocabWordIds: [],
    },
  ],
};
