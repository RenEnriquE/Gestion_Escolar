// Unit 4: Wild Animals — oraciones para completar (It is / It has / It hasn't / It can / It can't)
// Cada frase: [animal, tipo, respuesta correcta, [alternativas incorrectas]]
// Las alternativas incorrectas son siempre claramente falsas para ese animal.
export const INICIO = {
  is:    "It is",
  has:   "It has",
  hasnt: "It hasn't",
  can:   "It can",
  cant:  "It can't",
};

export const FRASES = [
  // It has ___
  ["owl",      "has", "wings",    ["antlers", "trunk", "mane"]],
  ["condor",   "has", "feathers", ["fur", "trunk", "antlers"]],
  ["condor",   "has", "wings",    ["antlers", "trunk", "mane"]],
  ["flamingo", "has", "beak",     ["mane", "antlers", "whiskers"]],
  ["penguin",  "has", "wings",    ["mane", "antlers", "trunk"]],
  ["huemul",   "has", "antlers",  ["wings", "beak", "trunk"]],
  ["bear",     "has", "claws",    ["wings", "beak", "trunk"]],
  ["bear",     "has", "fur",      ["feathers", "beak", "wings"]],
  ["puma",     "has", "whiskers", ["wings", "antlers", "trunk"]],
  ["puma",     "has", "claws",    ["feathers", "beak", "wings"]],
  ["fox",      "has", "tail",     ["wings", "beak", "antlers"]],
  ["fox",      "has", "fur",      ["feathers", "beak", "wings"]],
  ["giraffe",  "has", "legs",     ["wings", "beak", "feathers"]],
  ["koala",    "has", "fur",      ["wings", "feathers", "beak"]],
  ["whale",    "has", "tail",     ["legs", "wings", "feathers"]],
  ["fish",     "has", "tail",     ["legs", "wings", "fur"]],
  ["skunk",    "has", "tail",     ["wings", "beak", "antlers"]],
  ["guanaco",  "has", "fur",      ["feathers", "wings", "beak"]],

  // It hasn't ___
  ["penguin",  "hasnt", "fur",      ["wings", "beak", "feathers"]],
  ["owl",      "hasnt", "fur",      ["wings", "feathers", "beak"]],
  ["bear",     "hasnt", "feathers", ["fur", "claws", "ears"]],
  ["condor",   "hasnt", "fur",      ["wings", "feathers", "beak"]],
  ["giraffe",  "hasnt", "wings",    ["legs", "tail", "ears"]],
  ["fox",      "hasnt", "wings",    ["tail", "fur", "ears"]],
  ["flamingo", "hasnt", "fur",      ["wings", "feathers", "legs"]],

  // It can ___
  ["owl",      "can", "fly",  ["swim", "climb"]],
  ["condor",   "can", "fly",  ["swim", "climb"]],
  ["penguin",  "can", "swim", ["fly", "climb"]],
  ["whale",    "can", "swim", ["run", "fly", "climb"]],
  ["fish",     "can", "swim", ["run", "fly", "climb"]],
  ["giraffe",  "can", "run",  ["fly", "climb"]],

  // It can't ___
  ["penguin",  "cant", "fly", ["swim", "jump"]],
  ["whale",    "cant", "fly", ["swim", "jump"]],
  ["bear",     "cant", "fly", ["swim", "climb", "run"]],
  ["fox",      "cant", "fly", ["run", "jump"]],
  ["puma",     "cant", "fly", ["run", "jump", "climb"]],
  ["koala",    "cant", "fly", ["climb", "swim"]],
  ["guanaco",  "cant", "fly", ["run", "jump"]],
  ["huemul",   "cant", "fly", ["run", "swim", "jump"]],

  // It is ___
  ["giraffe",  "is", "tall",    ["small", "chubby", "sleepy"]],
  ["flamingo", "is", "thin",    ["chubby", "dangerous"]],
  ["whale",    "is", "big",     ["small", "thin"]],
  ["koala",    "is", "sleepy",  ["fast", "dangerous", "tall"]],
  ["bear",     "is", "strong",  ["small", "thin"]],
  ["puma",     "is", "fast",    ["slow", "chubby"]],
  ["fox",      "is", "small",   ["big", "tall", "slow"]],
  ["condor",   "is", "big",     ["small", "chubby"]],
  ["penguin",  "is", "chubby",  ["thin", "dangerous"]],
  ["skunk",    "is", "small",   ["big", "tall"]],
  ["guanaco",  "is", "fast",    ["slow", "sleepy"]],
];
