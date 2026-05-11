import type { BriefingScript } from "../../types";

export const level1Briefing: BriefingScript = {
  levelId: "coffee-run",
  messages: [
    {
      id: "l1-msg-1",
      sender: "anya",
      text: "You said you'd bring ቡና. I'm holding you to that.",
      vocabWordIds: ["buna"],
    },
    {
      id: "l1-msg-2",
      sender: "anya",
      text: "And ወተት. For the ቡና. You can't have one without the other.",
      vocabWordIds: ["wetet", "buna"],
    },
    {
      id: "l1-msg-3",
      sender: "anya",
      text: "Also ዳቦ. The round kind. Don't bring me sliced bread, Chad.",
      vocabWordIds: ["dabo"],
    },
    {
      id: "l1-msg-4",
      sender: "anya",
      text: "And ስኳር. Three spoons. I'm not negotiating.",
      vocabWordIds: ["sukwar"],
    },
    {
      id: "l1-msg-5",
      sender: "anya",
      text: "The ቡና ቤት is across town. Try not to get hit by a taxi.",
      vocabWordIds: ["buna"],
    },
  ],
};

export const level2Briefing: BriefingScript = {
  levelId: "market-day",
  messages: [
    {
      id: "l2-msg-1",
      sender: "anya",
      text: "I'm making ሽሮ ወጥ tonight. That means you're going to Merkato.",
      vocabWordIds: ["shiro"],
    },
    {
      id: "l2-msg-2",
      sender: "anya",
      text: "I need በርበሬ. The good kind from the spice row. Not tourist በርበሬ.",
      vocabWordIds: ["berbere"],
    },
    {
      id: "l2-msg-3",
      sender: "anya",
      text: "And ቅቤ. Spiced ቅቤ if they have it. Don't come back with margarine.",
      vocabWordIds: ["qibe"],
    },
    {
      id: "l2-msg-4",
      sender: "anya",
      text: "Also ቲማቲም. Fresh ones, not bruised. You know the difference, right? ...you don't.",
      vocabWordIds: ["timatim"],
    },
    {
      id: "l2-msg-5",
      sender: "anya",
      text: "Merkato is the largest open market in Africa. Try not to get lost. Actually, you'll get lost.",
      vocabWordIds: [],
    },
  ],
};

export const level3Briefing: BriefingScript = {
  levelId: "the-dinner",
  messages: [
    {
      id: "l3-msg-1",
      sender: "anya",
      text: "People are coming for dinner. I need እንጀራ. A lot of እንጀራ.",
      vocabWordIds: ["injera"],
    },
    {
      id: "l3-msg-2",
      sender: "anya",
      text: "And ምስር. Red ምስር. For the wot. Don't bring me green lentils.",
      vocabWordIds: ["miser"],
    },
    {
      id: "l3-msg-3",
      sender: "anya",
      text: "Also ቀይ ስር. It's a beetroot. It's purple. You can do this.",
      vocabWordIds: ["qey_sir"],
    },
    {
      id: "l3-msg-4",
      sender: "anya",
      text: "And ቃሪያ. The green pepper. Not hot pepper. GREEN pepper. Different thing entirely.",
      vocabWordIds: ["karya"],
    },
    {
      id: "l3-msg-5",
      sender: "anya",
      text: "If you mess up this dinner I will never forgive you. That's not a metaphor.",
      vocabWordIds: [],
    },
  ],
};

export const level4Briefing: BriefingScript = {
  levelId: "buna-ceremony",
  messages: [
    {
      id: "l4-msg-1",
      sender: "anya",
      text: "My grandmother is performing the coffee ceremony today.",
      vocabWordIds: [],
    },
    {
      id: "l4-msg-2",
      sender: "anya",
      text: "I need the ጀበና. The clay one. With the straw lid. Don't drop it.",
      vocabWordIds: ["jebena"],
    },
    {
      id: "l4-msg-3",
      sender: "anya",
      text: "And ርኩብ. Small handleless cups. At least four. They're fragile, Chad.",
      vocabWordIds: ["rekbot"],
    },
    {
      id: "l4-msg-4",
      sender: "anya",
      text: "ዕጣን for the incense. The frankincense kind. You'll know by the smell.",
      vocabWordIds: ["itan"],
    },
    {
      id: "l4-msg-5",
      sender: "anya",
      text: "And ቆሎ. Roasted barley. For snacking during the ceremony.",
      vocabWordIds: ["kolo"],
    },
    {
      id: "l4-msg-6",
      sender: "anya",
      text: "This ceremony is sacred. Three rounds. You don't leave early. You don't complain. You just drink.",
      vocabWordIds: [],
    },
  ],
};
