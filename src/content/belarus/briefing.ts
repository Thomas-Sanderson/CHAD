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
