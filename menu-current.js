// Transcribed from the two photographed customer menu pages supplied on 2026-09-30.
// The lettered choices and prices repeat across every noodle, rice and sauce dish.
(() => {
  "use strict";

  const mainChoices = [
    ["a", "Hühnerfleisch", 9],
    ["b", "Knusprige Hähnchenbrust", 10],
    ["c", "Knuspriger Hähnchenschenkel", 10],
    ["d", "Ente", 12],
    ["e", "Garnelen", 12],
    ["f", "Rindfleisch", 10],
    ["g", "Schweinefleisch", 9],
    ["h", "Tofu", 9],
    ["i", "Vegetarisch", 8],
    ["j", "Gebackener Lachs", 15]
  ];
  const options = () => mainChoices.map(([code, name, price]) => ({ code, name, price }));
  const dish = (code, name, description) => ({ code: String(code), name, description, options: options() });
  const starter = (code, name, price, portion = "", description = "") => ({
    code: String(code), name, price, portion, description
  });

  window.TOKYSEN_MENU.sections = [
    {
      id: "vorspeisen",
      title: "SUPPEN UND VORSPEISEN",
      categories: [{
        id: "suppen-und-vorspeisen",
        title: "Suppen und Vorspeisen",
        items: [
          starter(1, "Vietnam-Frühlingsrollen", 5, "2 Stück"),
          starter(2, "Mini Frühlingsrollen", 4, "6 Stück"),
          starter(3, "Wantan gebacken", 5),
          starter(4, "Ebi Tempura", 6),
          starter(5, "Sauer-Scharf-Suppe", 4),
          starter(6, "Hühnersuppe", 5),
          starter(7, "Hühner-Garnelen-Entensuppe", 6),
          starter(8, "Kokossuppe", 6, "", "Huhn, Garnelen, Ente"),
          starter(9, "Miso Suppe", 4),
          starter(10, "Seetang-Salat", 6)
        ]
      }]
    },
    {
      id: "hauptgerichte",
      title: "WARMSPEISEN",
      categories: [
        {
          id: "nudeln-und-reis",
          title: "Nudeln und Reis",
          items: [
            dish(20, "Pho Xao", "Vietnamesische Nudeln, wahlweise mit:"),
            dish(30, "Mi Xao", "Vietnamesische Nudeln, wahlweise mit:"),
            dish(40, "Mi Tom Xao", "Vietnamesische Nudeln, wahlweise mit:"),
            dish(50, "Com Rang", "Gebratener Reis, wahlweise mit:"),
            dish(60, "My Xao", "China-Nudeln, wahlweise mit:"),
            dish(70, "Udon", "Japan-Nudeln, wahlweise mit:")
          ]
        },
        {
          id: "wok-gemuese",
          title: "Wok Gemüse",
          description: "Basis: Wok-Gemüse, wahlweise mit:",
          items: [
            dish(80, "Mango-Sauce", "Wok-Gemüse mit Mango-Sauce, wahlweise mit:"),
            dish(81, "Erdnuss-Sauce", "Wok-Gemüse mit Erdnuss-Sauce, wahlweise mit:"),
            dish(83, "Teriyaki-Sauce", "Wok-Gemüse mit Teriyaki-Sauce, wahlweise mit:"),
            dish(84, "Hoisin-Sauce", "Wok-Gemüse mit Hoisin-Sauce, wahlweise mit:"),
            dish(85, "Gelb-Curry", "Wok-Gemüse mit gelbem Curry, wahlweise mit:"),
            dish(86, "Rot-Curry", "Wok-Gemüse mit rotem Curry, wahlweise mit:"),
            dish(87, "Süß-Sauer-Sauce", "Wok-Gemüse mit Süß-Sauer-Sauce, wahlweise mit:"),
            dish(88, "Tomaten-Sauce", "Wok-Gemüse mit Tomaten-Sauce, wahlweise mit:")
          ]
        }
      ]
    }
  ];

  // The photographed pages provide no allergen legend or item allergen codes.
  window.TOKYSEN_MENU.additives_and_allergens = {};
  window.TOKYSEN_MENU.allergen_notice =
    "Für diese Speisekarte liegen keine Allergenangaben vor. Bitte fragen Sie vor der Bestellung beim Restaurant nach Zutaten und Allergenen.";
})();
