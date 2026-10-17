// Warm dishes: customer menu photos supplied on 2026-09-30.
// Sushi: customer menu photo supplied on 2026-10-17.
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
    },
    {
      id: "sushi",
      title: "SUSHI",
      categories: [
        {
          id: "nigiri", title: "Nigiri", portion: "2 Stück",
          items: [
            starter("T1", "Sake", 4, "", "Lachs"),
            starter("T2", "Maguro", 4.5, "", "Thunfisch"),
            starter("T3", "Ebi", 4.5, "", "Garnelen"),
            starter("T4", "Unagi", 4, "", "Aal"),
            starter("T5", "Tamago", 3, "", "Eier"),
            starter("T6", "Schinken", 3, "", "Schinken"),
            starter("T7", "Avocado", 3, "", "Avocado"),
            starter("T8", "Papaya", 3, "", "Papaya"),
            starter("T9", "Tintenfisch", 3, "", "Tintenfisch"),
            starter("T10", "Flambierter Lachs", 6, "", "Mit Avocado")
          ]
        },
        {
          id: "maki", title: "Maki", portion: "6 Stück",
          items: [
            starter("O1", "Sake", 4, "", "Lachs"),
            starter("O2", "Tuna", 4.5, "", "Thunfisch"),
            starter("O3", "Ebi", 4.5, "", "Gekochte Garnelen"),
            starter("O4", "Unagi", 4, "", "Gegrillter Aal"),
            starter("O5", "Kani", 4, "", "Krebsfleisch"),
            starter("O6", "Schinken", 4, "", "Schweinefleisch"),
            starter("O7", "Ente", 4, "", "Entenfleisch"),
            starter("O8", "Avocado", 4, "", "Avocado"),
            starter("O9", "Papaya", 3, "", "Papaya"),
            starter("O10", "Kappa", 3, "", "Gurke"),
            starter("O11", "Oshinko", 4, "", "Rettich"),
            starter("O12", "Eier", 3, "", "Gebratene Eier")
          ]
        },
        {
          id: "crispy-maki", title: "Crispy Maki",
          items: [
            starter("K1", "Sake", 5, "", "Lachs"),
            starter("K2", "Tuna", 5.5, "", "Thunfisch"),
            starter("K3", "Ebi", 5, "", "Garnelen"),
            starter("K4", "Eier", 4, "", "Eier")
          ]
        },
        {
          id: "sashimi", title: "Sashimi",
          items: [
            starter("Y1", "Lachs Sashimi", 7, "", "Lachs"),
            starter("Y2", "Thunfisch Sashimi", 8, "", "Thunfisch"),
            starter("Y3", "Lachs-Thunfisch Sashimi", 8, "", "Lachs · Thunfisch")
          ]
        },
        {
          id: "uramaki-u", title: "Uramaki · U1–U14",
          items: [
            starter("U1", "Lachs Avocado", 7, "", "Lachs · Avocado"),
            starter("U2", "Lachs Avocado Frischkäse", 7.5, "", "Lachs · Avocado · Frischkäse"),
            starter("U3", "Lachs Avocado Frischkäse Fischrogen", 8, "", "Lachs · Avocado · Frischkäse · Fischrogen"),
            starter("U4", "Lachs Papaya", 7, "", "Lachs · Papaya"),
            starter("U5", "Thunfisch Avocado", 7, "", "Thunfisch · Avocado"),
            starter("U6", "Thunfisch Avocado Frischkäse", 8.5, "", "Thunfisch · Avocado · Frischkäse"),
            starter("U7", "Lachs Thunfisch Ebi", 10, "", "Lachs · Thunfisch · Ebi"),
            starter("U8", "Surimi Avocado", 7, "", "Surimi · Avocado"),
            starter("U9", "Frittierte Garnelen", 8, "", "Frittierte Garnelen · Gurke · Frischkäse · Avocado"),
            starter("U10", "Gebackene Garnelen Avocado", 8.5, "", "Gebackene Garnelen · Avocado · Gurke · Frischkäse"),
            starter("U11", "Ente Avocado", 7, "", "Ente · Avocado · Gurke · Frischkäse"),
            starter("U12", "Schinken Schweinefleisch Avocado", 7, "", "Schinken · Schweinefleisch · Avocado"),
            starter("U13", "Gebratene Eier Avocado", 7, "", "Gebratene Eier · Avocado"),
            starter("U14", "Rucola Avocado", 7, "", "Rucola · Avocado · Gurke · Frischkäse")
          ]
        },
        {
          id: "uramaki-m", title: "Uramaki · M1–M7",
          items: [
            starter("M1", "Lachs Avocado", 8, "", "Lachs · Avocado"),
            starter("M2", "Lachs Avocado Gurke", 8.5, "", "Lachs · Avocado · Gurke"),
            starter("M3", "Lachs Avocado", 9, "", "Lachs · Avocado"),
            starter("M4", "Frischkäse Fischrogen", 8, "", "Frischkäse · Fischrogen"),
            starter("M5", "Lachs Papaya", 8, "", "Lachs · Papaya"),
            starter("M6", "Thunfisch Avocado", 8.5, "", "Thunfisch · Avocado"),
            starter("M7", "Thunfisch Avocado Frischkäse", 8.5, "", "Thunfisch · Avocado · Frischkäse")
          ]
        },
        {
          id: "special-roll", title: "Special Roll",
          items: [
            starter("S1", "Lucky Rolls", 14, "", "Lachs · Thunfisch · Avocado · Mango · Frischkäse; umhüllt mit flambiertem Lachs"),
            starter("S2", "Sake Mango", 12, "", "Lachs · Avocado · Mango · Rucola · Frischkäse; umhüllt mit Avocado"),
            starter("S3", "Gebackene Garnelen Papaya", 14, "", "Gebackene Garnelen · Papaya · Frischkäse; umhüllt mit Lachs"),
            starter("S4", "Vegan", 12, "", "Tofutaschen · Rucola · Mango · Frischkäse; umhüllt mit Avocado")
          ]
        },
        {
          id: "crispy-rolls", title: "Crispy Rolls",
          items: [
            starter("C1", "Crispy Hähnchen", 10, "", "Hähnchenfilet · Avocado · Gurke · Frischkäse"),
            starter("C2", "Crispy Ente", 10, "", "Entenfilet · Avocado · Gurke · Frischkäse"),
            starter("C3", "Crispy panierte Garnelen", 11, "", "Panierte Garnelen · Gurke · Avocado · Frischkäse"),
            starter("C4", "Crispy Lachs Thunfisch", 10, "", "Lachs · Thunfisch · Avocado · Mango · Frischkäse")
          ]
        },
        {
          id: "sushi-sandwich", title: "Sushi Sandwich",
          items: [
            starter("SS1", "Lachs Sandwich", 12, "", "Lachs · Avocado · Rettich · Karotte"),
            starter("SS2", "Thunfisch Sandwich", 12, "", "Thunfisch · Avocado · Rettich · Karotte")
          ]
        },
        {
          id: "sushi-menues", title: "Menü Sushi",
          // M1/M2 also appear under Uramaki in the source; category IDs keep carts distinct.
          items: [
            starter("M1", "Sushi-Menü 1", 10, "", "3 Maki: 6 Stück Lachs · 6 Stück Thunfisch · 3 Stück Avocado · 3 Stück Gurke"),
            starter("M2", "Sushi-Menü 2", 16, "", "2 Maki: 3 Stück Lachs · 3 Stück Avocado · 3 Stück Thunfisch · 3 Stück Gurke; 1 Uramaki Lachs Avocado Frischkäse · 1 Nigiri Lachs · 1 Nigiri Thunfisch · 1 Nigiri Ebi")
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
