require("dotenv").config();
var Airtable = require("airtable");
var base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN }).base(
  process.env.BASE_ID
);
const matchSpe = (type, feelings, trust, wait, why) => {
  let matching = {
    Neuropsychologie: 0,
    "Psychologie de l’éducation": 0,
    "Psychologie clinique": 0,
    Addictologie: 0,
    "Psychologie de adolescent/enfant": 0,
    Psychotraumatologie: 0,
    "Psychologie du travail": 0,
    Hypnothérapie: 0,
    "Psychologie des troubles alimentaires": 0,
    "Orientation professionnelle": 0,
    "Thérapie EMDR": 0,
    "Thérapie de couple": 0,
    "Thérapie familiale": 0,
  };
  const countWait = {};

  for (const element of wait) {
    if (countWait[element]) {
      delete countWait[element];
    } else {
      countWait[element] = 1;
    }
  }
  for (const property in countWait) {
    switch (property) {
      case "Parler à quelqu'un":
        matching["Neuropsychologie"] -= 5;
        matching["Psychologie de l’éducation"] += 2;
        matching["Psychologie clinique"] += 3;
        matching["Addictologie"] += 1;
        matching["Psychotraumatologie"] += 2;
        matching["Psychologie du travail"] += 3;
        matching["Hypnothérapie"] -= 2;
        matching["Psychologie des troubles alimentaires"] += 2;
        break;
      case "Explorer mon passé":
        matching["Neuropsychologie"] -= 5;
        matching["Psychologie de l’éducation"] += 2;
        matching["Psychologie clinique"] += 3;
        matching["Psychotraumatologie"] += 3;
        matching["Psychologie du travail"] += 2;
        matching["Psychologie des troubles alimentaires"] += 3;
        break;
      case "M'aider à me remettre en question":
        matching["Neuropsychologie"] -= 2;
        matching["Psychologie de l’éducation"] += 2;
        matching["Psychologie clinique"] += 3;
        matching["Addictologie"] += 1;
        matching["Psychotraumatologie"] += 2;
        matching["Psychologie du travail"] += 2;
        matching["Hypnothérapie"] -= 1;
        matching["Psychologie des troubles alimentaires"] += 2;
        matching["Orientation professionnelle"] += 3;
        break;
      case "Soulager des émotions difficiles":
        matching["Neuropsychologie"] -= 3;
        matching["Psychologie de l’éducation"] += 2;
        matching["Psychologie clinique"] += 3;
        matching["Psychotraumatologie"] += 3;
        matching["Psychologie du travail"] += 2;
        matching["Hypnothérapie"] += 2;
        matching["Psychologie des troubles alimentaires"] += 2;
        matching["Thérapie EMDR"] += 4;
        break;
      case "Fixer des objectifs et les réaliser":
        matching["Psychologie de l’éducation"] += 2;
        matching["Psychologie clinique"] += 3;
        matching["Addictologie"] += 2;
        matching["Psychotraumatologie"] += 1;
        matching["Psychologie du travail"] += 2;
        matching["Hypnothérapie"] -= 1;
        matching["Psychologie des troubles alimentaires"] += 3;
        matching["Orientation professionnelle"] += 3;
        break;
      case "Je n'en ai pas":
        matching["Neuropsychologie"] -= 4;
        matching["Psychologie de l’éducation"] -= 2;
        matching["Psychologie clinique"] += 4;
        matching["Addictologie"] -= 3;
        matching["Thérapie EMDR"] -= 3;
        break;
    }
  }

  const countFeelings = {};

  for (const element of feelings) {
    if (countFeelings[element]) {
      delete countFeelings[element];
    } else {
      countFeelings[element] = 1;
    }
  }
  for (const property in countFeelings) {
    switch (property) {
      case "Je me sens plutôt bien":
        matching["Neuropsychologie"] -= 2;
        matching["Psychologie clinique"] += 4;
        break;
      //- case "Je me sens stressée":
      //   matching["Neuropsychologie"] -= 5;
      //   matching["Psychologie de l’éducation"] += 2;
      //   matching["Psychologie clinique"] += 3;
      //   matching["Psychotraumatologie"] += 3;
      //   matching["Psychologie du travail"] += 2;
      //   matching["Psychologie des troubles alimentaires"] += 3;
      //   break;
      case "Je me sens déprimé.e":
        matching["Psychologie clinique"] += 3;
        matching["Addictologie"] += 1;
        matching["Psychotraumatologie"] += 2;
        matching["Psychologie du travail"] += 2;
        matching["Hypnothérapie"] += 2;
        matching["Psychologie des troubles alimentaires"] += 2;
        break;
      case "Je me sens anxieux.se et submergé.e":
        matching["Psychologie de l’éducation"] += 2;
        matching["Psychologie clinique"] += 3;
        matching["Addictologie"] += 1;
        matching["Psychotraumatologie"] += 2;
        matching["Psychologie du travail"] += 3;
        matching["Hypnothérapie"] += 2;
        matching["Psychologie des troubles alimentaires"] += 2;
        matching["Thérapie EMDR"] += 2;
        break;
      case "Je me sens épuisé.e":
        matching["Neuropsychologie"] += 5;
        matching["Psychologie de l’éducation"] -= 3;
        matching["Psychologie clinique"] -= 3;
        matching["Addictologie"] += 2;
        matching["Psychotraumatologie"] -= 3;
        matching["Psychologie du travail"] -= 2;
        matching["Hypnothérapie"] -= 3;
        matching["Psychologie des troubles alimentaires"] -= 3;
        matching["Thérapie EMDR"] -= 4;
        break;
    }
  }
  const countWhy = {};

  for (const element of why) {
    if (countWhy[element]) {
      delete countWhy[element];
    } else {
      countWhy[element] = 1;
    }
  }

  //Individuel
  if (type === "Individuel") {
    for (const property in countWhy) {
      switch (property) {
        case "Prendre confiance en moi":
          matching["Neuropsychologie"] -= 5;
          matching["Psychologie clinique"] += 3;
          matching["Addictologie"] -= 3;
          matching["Psychologie du travail"] += 1;
          matching["Hypnothérapie"] -= 2;
          matching["Psychologie des troubles alimentaires"] += 2;
          matching["Thérapie EMDR"] -= 3;
          matching["Thérapie familiale"] -= 5;
          break;
        case "Gérer des difficultés liées au travail":
          matching["Psychologie de l’éducation"] += 4;
          matching["Psychologie clinique"] += 3;
          matching["Addictologie"] -= 1;
          matching["Psychologie du travail"] += 5;
          matching["Hypnothérapie"] += 2;
          matching["Psychologie des troubles alimentaires"] -= 5;
          matching["Orientation professionnelle"] += 5;
          matching["Thérapie familiale"] -= 5;
          break;
        case "Être accompagner pour faire mon deuil":
          matching["Neuropsychologie"] -= 4;
          matching["Psychologie de l’éducation"] -= 4;
          matching["Psychologie clinique"] += 3;
          matching["Addictologie"] -= 3;
          matching["Psychotraumatologie"] += 2;
          matching["Psychologie du travail"] -= 3;
          matching["Psychologie des troubles alimentaires"] -= 5;
          matching["Thérapie EMDR"] += 2;
          matching["Thérapie familiale"] -= 5;
          break;
        case "Accepter et gérer un traumatisme":
          matching["Neuropsychologie"] -= 4;
          matching["Psychologie de l’éducation"] -= 2;
          matching["Psychologie clinique"] += 3;
          matching["Addictologie"] -= 3;
          matching["Psychotraumatologie"] += 5;
          matching["Psychologie du travail"] -= 2;
          matching["Hypnothérapie"] += 3;
          matching["Psychologie des troubles alimentaires"] += 2;
          matching["Thérapie EMDR"] += 5;
          matching["Thérapie familiale"] -= 5;
          break;
        case "Améliorer et comprendre mes habitudes et troubles alimentaires":
          matching["Neuropsychologie"] -= 3;
          matching["Psychologie de l’éducation"] -= 5;
          matching["Psychologie clinique"] += 2;
          matching["Addictologie"] -= 5;
          matching["Psychologie du travail"] -= 5;
          matching["Hypnothérapie"] += 3;
          matching["Psychologie des troubles alimentaires"] += 5;
          matching["Thérapie familiale"] -= 5;
          break;
        case "Me libérer d'une addiction":
          matching["Neuropsychologie"] -= 3;
          matching["Psychologie de l’éducation"] -= 5;
          matching["Psychologie clinique"] += 2;
          matching["Addictologie"] += 5;
          matching["Psychologie du travail"] -= 5;
          matching["Hypnothérapie"] += 3;
          matching["Psychologie des troubles alimentaires"] += 2;
          matching["Thérapie familiale"] -= 5;
          break;
        case "Soigner une dépression":
          matching["Neuropsychologie"] -= 2;
          matching["Psychologie de l’éducation"] -= 2;
          matching["Psychologie clinique"] += 3;
          matching["Addictologie"] -= 1;
          matching["Psychologie du travail"] += 2;
          matching["Thérapie EMDR"] += 1;
          matching["Thérapie familiale"] -= 5;
          break;
        case "M'aider à trouver mon identité/orientation sexuelle":
          matching["Neuropsychologie"] -= 5;
          matching["Psychologie de l’éducation"] -= 5;
          matching["Psychologie clinique"] += 3;
          matching["Addictologie"] -= 5;
          matching["Psychologie du travail"] -= 5;
          matching["Hypnothérapie"] -= 3;
          matching["Psychologie des troubles alimentaires"] -= 5;
          matching["Thérapie familiale"] -= 5;
          break;
        case "Apprendre à construire et maintenir des relations":
          matching["Psychologie clinique"] += 3;
          matching["Addictologie"] -= 1;
          matching["Psychologie du travail"] += 2;
          matching["Psychologie des troubles alimentaires"] -= 2;
          matching["Thérapie familiale"] -= 5;
          break;
        case "Soulager et comprendre mes douleurs chroniques":
          matching["Psychologie de l’éducation"] -= 5;
          matching["Psychologie clinique"] += 4;
          matching["Addictologie"] -= 1;
          matching["Psychotraumatologie"] -= 2;
          matching["Psychologie du travail"] -= 5;
          matching["Hypnothérapie"] += 2;
          matching["Thérapie familiale"] -= 5;
          break;
        case "Gagner en concentration":
          matching["Neuropsychologie"] += 3;
          matching["Psychologie de l’éducation"] += 3;
          matching["Psychologie clinique"] += 3;
          matching["Addictologie"] += 2;
          matching["Psychotraumatologie"] -= 2;
          matching["Psychologie du travail"] += 1;
          matching["Hypnothérapie"] -= 2;
          matching["Psychologie des troubles alimentaires"] -= 2;
          matching["Thérapie familiale"] -= 5;
          break;
        case "M'aider à gérer un problème familiale":
          matching["Neuropsychologie"] -= 4;
          matching["Psychologie de l’éducation"] -= 4;
          matching["Psychologie clinique"] += 3;
          matching["Addictologie"] -= 4;
          matching["Psychotraumatologie"] -= 4;
          matching["Psychologie du travail"] -= 4;
          matching["Hypnothérapie"] -= 4;
          matching["Psychologie des troubles alimentaires"] -= 4;
          matching["Orientation professionnelle"] -= 4;
          matching["Thérapie EMDR"] -= 3;
          matching["Thérapie familiale"] += 4;
          break;
        case "Soigner un/des TOC":
          matching["Neuropsychologie"] += 2;
          matching["Psychologie de l’éducation"] -= 3;
          matching["Psychologie clinique"] += 3;
          matching["Addictologie"] -= 2;
          matching["Psychotraumatologie"] -= 2;
          matching["Psychologie du travail"] -= 2;
          matching["Hypnothérapie"] += 4;
          matching["Psychologie des troubles alimentaires"] -= 1;
          matching["Thérapie familiale"] -= 5;
          break;
        case "Comprendre mes troubles du sommeil":
          matching["Psychologie de l’éducation"] -= 2;
          matching["Psychologie clinique"] += 3;
          matching["Psychologie des troubles alimentaires"] -= 1;
          matching["Orientation professionnelle"] -= 3;
          matching["Thérapie familiale"] -= 4;
          break;
        case "Bien m’orienter professionnellement":
          matching["Neuropsychologie"] -= 3;
          matching["Psychologie de l’éducation"] -= 4;
          matching["Addictologie"] -= 4;
          matching["Psychotraumatologie"] -= 2;
          matching["Psychologie du travail"] += 4;
          matching["Psychologie des troubles alimentaires"] -= 4;
          matching["Orientation professionnelle"] += 5;
          break;
        case "Faire face à un grand changement":
          matching["Neuropsychologie"] -= 3;
          matching["Psychologie clinique"] += 2;
          matching["Addictologie"] -= 3;
          matching["Psychotraumatologie"] -= 2;
          matching["Psychologie des troubles alimentaires"] -= 3;
          matching["Thérapie EMDR"] -= 3;
          break;
      }
    }
  } //Type enfants
  else if (type === "Enfant") {
    for (const property in countWhy) {
      switch (property) {
        case "Problème de gestion de ses émotions":
          matching["Neuropsychologie"] -= 4;
          matching["Psychologie de l’éducation"] -= 2;
          matching["Psychologie clinique"] += 4;
          matching["Psychologie du travail"] -= 2;
          matching["Hypnothérapie"] += 2;
          matching["Psychologie des troubles alimentaires"] -= 3;
          matching["Orientation professionnelle"] -= 2;
          matching["Thérapie EMDR"] -= 3;
          matching["Thérapie familiale"] += 1;
          break;
        case "Difficulté à créer ou maintenir des relations":
          matching["Neuropsychologie"] -= 4;
          matching["Psychologie de l’éducation"] -= 2;
          matching["Psychologie clinique"] += 4;
          matching["Psychologie du travail"] -= 2;
          matching["Psychologie des troubles alimentaires"] -= 4;
          matching["Orientation professionnelle"] -= 2;
          matching["Thérapie EMDR"] -= 4;
          matching["Thérapie familiale"] += 3;
          break;
        case "Changement de comportement":
          matching["Neuropsychologie"] -= 4;
          matching["Psychologie de l’éducation"] -= 3;
          matching["Psychologie clinique"] += 4;
          matching["Psychotraumatologie"] += 1;
          matching["Psychologie du travail"] -= 3;
          matching["Psychologie des troubles alimentaires"] -= 4;
          matching["Orientation professionnelle"] -= 3;
          matching["Thérapie EMDR"] -= 4;
          matching["Thérapie familiale"] += 3;
          break;
        case "Problème scolaire":
          matching["Neuropsychologie"] -= 4;
          matching["Psychologie de l’éducation"] += 5;
          matching["Psychologie clinique"] += 3;
          matching["Psychotraumatologie"] += 2;
          matching["Psychologie du travail"] += 5;
          matching["Hypnothérapie"] += 3;
          matching["Psychologie des troubles alimentaires"] -= 4;
          matching["Orientation professionnelle"] += 5;
          matching["Thérapie EMDR"] -= 3;
          matching["Thérapie familiale"] += 1;
          break;
        case "Gestion d'évènements stressants ou tristes":
          matching["Neuropsychologie"] -= 4;
          matching["Psychologie de l’éducation"] -= 2;
          matching["Psychologie clinique"] += 3;
          matching["Psychotraumatologie"] += 4;
          matching["Psychologie du travail"] -= 2;
          matching["Psychologie des troubles alimentaires"] -= 3;
          matching["Orientation professionnelle"] -= 2;
          matching["Thérapie EMDR"] += 3;
          matching["Thérapie familiale"] += 1;
          break;
        case "Difficulté à se concentrer":
          matching["Neuropsychologie"] += 3;
          matching["Psychologie clinique"] += 3;
          matching["Psychotraumatologie"] -= 4;
          matching["Psychologie des troubles alimentaires"] -= 4;
          matching["Thérapie EMDR"] -= 3;
          matching["Thérapie familiale"] -= 4;
          break;
        case "Manque de confiance en soi":
          matching["Neuropsychologie"] -= 4;
          matching["Psychologie clinique"] += 4;
          matching["Psychotraumatologie"] -= 2;
          matching["Hypnothérapie"] -= 2;
          matching["Psychologie des troubles alimentaires"] -= 3;
          matching["Thérapie EMDR"] -= 3;
          matching["Thérapie familiale"] += 2;
          break;
        case "Symptômes dépressifs ou anxieux":
          matching["Neuropsychologie"] -= 4;
          matching["Psychologie de l’éducation"] -= 2;
          matching["Psychologie clinique"] += 4;
          matching["Psychologie du travail"] -= 2;
          matching["Hypnothérapie"] += 3;
          matching["Psychologie des troubles alimentaires"] -= 3;
          matching["Orientation professionnelle"] -= 2;
          matching["Thérapie EMDR"] -= 3;
          matching["Thérapie familiale"] += 2;
          break;
        case "Gestion des peurs et phobies":
          matching["Neuropsychologie"] -= 4;
          matching["Psychologie de l’éducation"] -= 4;
          matching["Psychologie clinique"] += 3;
          matching["Psychologie du travail"] -= 4;
          matching["Hypnothérapie"] += 5;
          matching["Psychologie des troubles alimentaires"] -= 3;
          matching["Orientation professionnelle"] -= 4;
          matching["Thérapie EMDR"] += 1;
          matching["Thérapie familiale"] -= 3;
          break;
        case "Autre":
          matching["Neuropsychologie"] -= 4;
          matching["Psychologie de l’éducation"] -= 3;
          matching["Psychologie clinique"] += 3;
          matching["Psychotraumatologie"] -= 2;
          matching["Psychologie du travail"] -= 3;
          matching["Hypnothérapie"] -= 3;
          matching["Orientation professionnelle"] -= 3;
          break;
        case "Retards moteurs ou de communication":
          matching["Neuropsychologie"] += 3;
          matching["Psychologie clinique"] += 2;
          matching["Thérapie EMDR"] -= 3;
          matching["Thérapie familiale"] += 2;
          break;
      }
    }
  } //Type Couples
  else {
    for (const property in countWhy) {
      switch (property) {
        case "Problèmes de communication":
          matching["Psychologie clinique"] += 4;
          matching["Psychotraumatologie"] -= 4;
          matching["Hypnothérapie"] += 2;
          matching["Thérapie EMDR"] += 3;
          matching["Thérapie familiale"] -= 2;
          break;
        case "Problèmes dans nos relations intimes":
          matching["Psychologie clinique"] += 4;
          matching["Psychotraumatologie"] -= 4;
          matching["Hypnothérapie"] += 2;
          matching["Thérapie familiale"] -= 2;
          break;
        case "Gestion d'une infidélité":
          matching["Psychologie clinique"] += 4;
          matching["Psychotraumatologie"] += 3;
          matching["Hypnothérapie"] += 2;
          matching["Thérapie EMDR"] += 3;
          matching["Thérapie familiale"] -= 2;
          break;
        case "Gestion du stress financier":
          matching["Psychologie clinique"] += 4;
          matching["Psychotraumatologie"] -= 4;
          matching["Thérapie familiale"] -= 2;
          break;
        case "Parentalité":
          matching["Psychologie clinique"] += 4;
          matching["Psychotraumatologie"] -= 4;
          matching["Hypnothérapie"] += 2;
          matching["Thérapie familiale"] += 2;
          break;
        case "Manque de confiance en l'autre":
          matching["Psychologie clinique"] += 4;
          matching["Psychotraumatologie"] -= 4;
          matching["Hypnothérapie"] += 2;
          matching["Thérapie EMDR"] += 3;
          matching["Thérapie familiale"] -= 2;
          break;
        case "Autre":
          matching["Psychologie clinique"] += 3;
          matching["Psychotraumatologie"] -= 4;
          matching["Hypnothérapie"] -= 2;
          matching["Thérapie EMDR"] -= 2;
          matching["Thérapie familiale"] -= 2;
          break;
        case "Préfère ne pas dire":
          matching["Psychologie clinique"] += 4;
          matching["Psychotraumatologie"] -= 4;
          matching["Hypnothérapie"] -= 2;
          matching["Thérapie EMDR"] -= 2;
          matching["Thérapie familiale"] -= 2;
          break;
      }
    }
  }

  if (trust === "Non") {
    matching["Thérapie EMDR"] += 4;
    matching["Hypnothérapie"] += 3;
  }

  var val = -100;
  var speci = "";
  for (const property in matching) {
    if (matching[property] > val) {
      val = matching[property];
      speci = property;
    }
  }
  return speci;
};

const getPsy = async (req, res, next) => {
  const {
    type,
    budget,
    feelings,
    handi,
    like,
    lgbt,
    postal,
    remote,
    trust,
    wait,
    why,
  } = req.body;
  var spec = matchSpe(type, feelings, trust, wait, why);
  //Must filter on(code postal, budget, like, remote)
  res.json({ test: "result" });

  let data;
  let tel = "Non";
  let lg = false;
  if (remote === true) {
    tel = "Oui";
  }
  if (lgbt === "Oui") {
    lg = true;
  }
  try {
    if (type === "Individuel") {
      data = await base("Psychologues")
        .select({
          filterByFormula: `AND(FIND('${spec}',{Spécialités & Thérapies}) > 0, FIND('${tel}',{Remote}) > 0)`,
          fields: [
            "Nom",
            "Prénom",
            "Code postal",
            "Spécialités & Thérapies",
            "Tarif pour une séance",
            "Genre",
            "Acces handicapé",
            "LGBT+ friendly",
            "Photo de profil",
            "Adresse du cabinet",
            "Lien site UpCare",
            "Téléconsultation",
          ],
        })
        .firstPage();
    } else if (type === "Enfant") {
      data = await base("Psychologues")
        .select({
          filterByFormula: `AND(FIND('${spec}', {Spécialités & Thérapies})>0, FIND("Psychologie de l'enfant", {Spécialités & Thérapies})>0, FIND('${tel}',{Remote}) > 0)`,
          fields: [
            "Nom",
            "Prénom",
            "Code postal",
            "Spécialités & Thérapies",
            "Tarif pour une séance",
            "Genre",
            "Acces handicapé",
            "LGBT+ friendly",
            "Photo de profil",
            "Adresse du cabinet",
            "Lien site UpCare",
            "Téléconsultation",
          ],
        })
        .firstPage();
    } else {
      data = await base("Psychologues")
        .select({
          filterByFormula: `AND(FIND('${spec}', {Spécialités & Thérapies})>0, FIND("Thérapie de couple", {Spécialités & Thérapies})>0, FIND('${tel}',{Remote}) > 0)`,
          fields: [
            "Nom",
            "Prénom",
            "Code postal",
            "Spécialités & Thérapies",
            "Tarif pour une séance",
            "Genre",
            "Acces handicapé",
            "LGBT+ friendly",
            "Photo de profil",
            "Adresse du cabinet",
            "Lien site UpCare",
            "Téléconsultation",
          ],
        })
        .firstPage();
    }
  } catch (error) {
    console.log(error);
  }
  let result = [];
  for (let prop in data) {
    let note = 0;
    delete data[prop]._table;
    delete data[prop]._rawJson;
    delete data[prop].id;
    if (data[prop].fields["Tarif pour une séance"] <= budget) {
      note += 5;
    }
    if (data[prop].fields["Code postal"] === postal) {
      note += 4;
    }
    if (data[prop].fields["Genre"] === like) {
      note += 3;
    }
    if (data[prop].fields["Acces handicapé"] === handi) {
      note += 2;
    }
    if (data[prop].fields["LGBT+ friendly"] === lg) {
      note += 1;
    }
    data[prop].fields.note = note;
    result.push(data[prop].fields);
  }
  result = result.sort((a, b) => b.note - a.note).slice(0, 3);
  console.log(result);
  res.json({ test: "result" });
};

const sub = async (req, res, next) => {
  const { mail, age, sexe, postal, psy, type, dure } = req.body;
  let data;
  try {
    data = await base("Formulaire").create(
      {
        Mail: mail,
        Age: Number(age),
        Genre: sexe,
        "Code Postal": postal,
        Psychologues: psy,
        Qui: type,
        Couple: dure,
      },
      function (err, records) {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
  res.json({
    message: "Done",
  });
};

exports.getPsy = getPsy;
exports.sub = sub;
