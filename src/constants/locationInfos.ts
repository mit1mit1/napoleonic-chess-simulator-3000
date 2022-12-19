import { Locations, type LocationInfo } from "@/types";

export const locationInfos: { [key in Locations]: LocationInfo | undefined } = {
  [Locations.ParisDistrict]: {
    nameEnglish: "Paris District",
    nameFrench: "Quartier de Parisien",
    cityCoordinates: {
      latitude: 23,
      longitude: 45,
    },
    cityHectares: 58,
    districtHectares: 108,
    subtitleEnglish: "Once opulent heart",
    subtitleFrench: "Un cœur autrefois opulent",
    descriptionEnglish:
      "Once a heart of opulence in the world, now destroyed by political infighting.",
    descriptionFrench:
      "Autrefois un cœur d'opulence dans le monde, aujourd'hui détruit par les luttes politiques intestines.",
    influenceAvailable: 20,
  },

  [Locations.AimensDistrict]: {
    nameEnglish: "Aimens District",
    nameFrench: "District d'Aimens",
    cityCoordinates: {
      latitude: 23,
      longitude: 45,
    },
    cityHectares: 58,
    districtHectares: 108,
    subtitleEnglish: "The agreeable land",
    subtitleFrench: "La terre agréable",
    descriptionEnglish: "Friendliest of the districts.",
    descriptionFrench: "Le plus amical des districts.",
    influenceAvailable: 40,
  },

  [Locations.RennesDistrictWest]: {
    nameEnglish: "Rennes District (West)",
    nameFrench: "District de Rennes (Ouest)",
    cityCoordinates: {
      latitude: 23,
      longitude: 45,
    },
    cityHectares: 58,
    districtHectares: 108,
    subtitleEnglish: "King of the North",
    subtitleFrench: "Roi du Nord",
    descriptionEnglish:
      "One of the only districts able to co-operate with another, perhaps because their fellows to the east share a title and green skin.",
    descriptionFrench:
      "L'un des seuls districts capables de coopérer, peut-être parce que leurs homologues de l'est partagent un titre et une peau verte.",
    influenceAvailable: 55,
  },

  [Locations.RennesDistrictEast]: {
    nameEnglish: "Rennes District (East)",
    nameFrench: "District de Rennes (Est)",
    cityCoordinates: {
      latitude: 23,
      longitude: 45,
    },
    cityHectares: 58,
    districtHectares: 108,
    subtitleEnglish: "Queen of the North",
    subtitleFrench: "Reine du Nord",
    descriptionEnglish:
      "One of the only districts able to co-operate, perhaps because their fellows to the west share a title and green skin.",
    descriptionFrench:
      "L'un des seuls districts capables de coopérer, peut-être parce que leurs homologues de l'ouest partagent un titre et une peau verte.",
    influenceAvailable: 55,
  },

  [Locations.PotiersDistrict]: {
    nameEnglish: "Potiers District",
    nameFrench: "Quartier des Potiers",
    cityCoordinates: {
      latitude: 23,
      longitude: 45,
    },
    cityHectares: 58,
    districtHectares: 108,
    subtitleEnglish: "Once opulent heart",
    subtitleFrench: "Le pays de la drogue",
    descriptionEnglish: "If you want to get high, this is the place.",
    descriptionFrench: "Si vous voulez vous défoncer, c'est l'endroit idéal.",
    influenceAvailable: 55,
  },

  [Locations.OrleansDistrict]: {
    nameEnglish: "Orleans District",
    nameFrench: "Le district d'Orléans",
    cityCoordinates: {
      latitude: 23,
      longitude: 45,
    },
    cityHectares: 45,
    districtHectares: 108,
    subtitleEnglish: "Blues capital of the old world",
    subtitleFrench: "Capitale du blues du vieux monde",
    descriptionEnglish:
      "Famous for it's swamps and guitars, Orleans is famous as the setting for Disney's \"The Princess and the Frog (2032)\".",
    descriptionFrench:
      'Célèbre pour ses marécages et ses guitares, Orléans est connu comme le décor du film de Disney "La Princesse et la Grenouille (2032)".',
    influenceAvailable: 50,
  },

  [Locations.BordeauxDistrict]: {
    nameEnglish: "Bordeaux District",
    nameFrench: "Quartier de Bordeaux",
    cityCoordinates: {
      latitude: 23,
      longitude: 45,
    },
    cityHectares: 58,
    districtHectares: 108,
    subtitleEnglish: "Castle capital",
    subtitleFrench: "Capitale du château",
    descriptionEnglish:
      "Did you know 'Bordeaux' is actually french for 'castle'? Hence the name of this district - it's full of ancient ruins.",
    descriptionFrench:
      'Saviez-vous que le mot "Bordeaux" signifie "château" en français ? D\'où le nom de ce quartier, qui regorge de ruines anciennes.',
    influenceAvailable: 55,
  },

  [Locations.TolouseDistrict]: {
    nameEnglish: "Tolouse District",
    nameFrench: "District de la Tolouse",
    cityCoordinates: {
      latitude: 23,
      longitude: 45,
    },
    cityHectares: 58,
    districtHectares: 108,
    subtitleEnglish: "Get ready to lose",
    subtitleFrench: "Préparez-vous à perdre",
    descriptionEnglish:
      "Or to pee, I'm not quite sure of the correct pronunciation.",
    descriptionFrench:
      "Ou pour faire pipi, je ne suis pas sûr de la prononciation correcte.",
    influenceAvailable: 55,
  },

  [Locations.MarsielleDistrict]: {
    nameEnglish: "Marsielle District",
    nameFrench: "District de Marsielle",
    cityCoordinates: {
      latitude: 23,
      longitude: 45,
    },
    cityHectares: 58,
    districtHectares: 108,
    subtitleEnglish: "Peak of philosophy",
    subtitleFrench: "Sommet de la philosophie",
    descriptionEnglish:
      "The site of the famous debate between Saint Paul and Plato, Marsielle has maintained it's reputation for robust debate ever since. ",
    descriptionFrench:
      "Le site du célèbre débat entre Saint Paul et Platon, Marsielle a maintenu sa réputation de débat robuste depuis lors. ",
    influenceAvailable: 55,
  },

  [Locations.ValenceDistrict]: {
    nameEnglish: "Valence District",
    nameFrench: "Quartier de Valence",
    cityCoordinates: {
      latitude: 23,
      longitude: 45,
    },
    cityHectares: 58,
    districtHectares: 108,
    subtitleEnglish: "Charged science",
    subtitleFrench: "La science en charges",
    descriptionEnglish: "After the bomb, nuclear chemistry flourished here",
    descriptionFrench: "Après la bombe, la chimie nucléaire a prospéré ici.",
    influenceAvailable: 55,
  },

  [Locations.LyonDistrict]: {
    nameEnglish: "Lyon District",
    nameFrench: "District de Lyon",
    cityCoordinates: {
      latitude: 23,
      longitude: 45,
    },
    cityHectares: 58,
    districtHectares: 108,
    subtitleEnglish: "Britannica's last foothold",
    subtitleFrench: "Le dernier pied de Britannica",
    descriptionEnglish:
      "In defense of their national animal, English troops invaded Lyon in 1750. As nations around the world fell into republicanism, Lyon remained faithful.",
    descriptionFrench:
      "Pour défendre leur animal national, les troupes anglaises envahissent Lyon en 1750. Alors que les nations du monde entier tombent dans le républicanisme, Lyon reste fidèle.",
    influenceAvailable: 55,
  },

  [Locations.DijonDistrict]: {
    nameEnglish: "Dijon District",
    nameFrench: "Le district de Dijon",
    cityCoordinates: {
      latitude: 80,
      longitude: 50,
    },
    cityHectares: 59,
    districtHectares: 160,
    subtitleEnglish: "Mustard and magic",
    subtitleFrench: "Moutarde et magie",
    descriptionEnglish:
      "Dijon is known for two things. One is the renowned Hermione ski scene, re-enacted by thousands of fans every April. The other is mustard production. No other district in the world produces mustard by waterfall. In fact, no other district in the world produces mustard, full stop.",
    descriptionFrench:
      "Dijon est connue pour deux choses. La première est la célèbre scène de ski d'Hermione, rejouée par des milliers de fans chaque année en avril. L'autre est la production de moutarde. Aucun autre district au monde ne produit de la moutarde en cascade. En fait, aucun autre district au monde ne produit de moutarde, point final.",
    influenceAvailable: 80,
  },

  [Locations.ReimsDistrict]: {
    nameEnglish: "Reims District",
    nameFrench: "Quartier Reims",
    cityCoordinates: {
      latitude: 23,
      longitude: 45,
    },
    cityHectares: 58,
    districtHectares: 108,
    subtitleEnglish: "Edge of the chasm",
    subtitleFrench: "Le bord du gouffre",
    descriptionEnglish: "Edge of the chasm - edge of the world.",
    descriptionFrench: "Le bord du gouffre - le bord du monde.",
    influenceAvailable: 55,
  },

  [Locations.None]: undefined,
};
