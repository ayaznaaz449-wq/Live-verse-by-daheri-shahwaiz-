window.LIFEVERSE_DATA = {
  worlds: [
    {
      id: "human",
      icon: "🧬",
      title: "Human Body",
      tag: "ANATOMY LAB",
      description: "Explore body systems, organs, bones, muscles and how the human body works.",
      glow: "#55e4e8",
      count: "12 body systems",
      facts: [
        ["Brain & nervous system", "Coordinates thoughts, senses, movement and automatic body functions."],
        ["Heart & circulation", "The heart pumps blood through vessels to transport oxygen and nutrients."],
        ["Lungs & breathing", "The lungs exchange oxygen and carbon dioxide between air and blood."],
        ["Digestive system", "Breaks food into nutrients the body can absorb and use."],
        ["Skeleton & muscles", "Support, protect and move the body."],
        ["Kidneys & urinary system", "Filter blood, balance fluids and remove waste in urine."]
      ],
      summary: "A guided overview of major human body systems. Select a system to read its role and related health topics.",
      emojiBig: "🧍"
    },
    {
      id: "animals",
      icon: "🦁",
      title: "Animal Kingdom",
      tag: "WILDLIFE WORLD",
      description: "Discover mammals, birds, reptiles, amphibians, insects and other animals.",
      glow: "#ffb45c",
      count: "6 major groups",
      facts: [
        ["Mammals", "Warm-blooded vertebrates that feed their young with milk."],
        ["Birds", "Feathered animals; most have wings and lay eggs."],
        ["Reptiles", "Includes snakes, turtles, lizards and crocodilians."],
        ["Amphibians", "Many live part of their lives in water and part on land."],
        ["Invertebrates", "Animals without a backbone, including insects, spiders and octopuses."],
        ["Adaptations", "Body features and behaviours that help animals survive."]
      ],
      summary: "Browse animal groups, habitats, diets, adaptations and anatomy notes.",
      emojiBig: "🦁"
    },
    {
      id: "fish",
      icon: "🐠",
      title: "Fish & Ocean Life",
      tag: "AQUA EXPLORER",
      description: "Explore sharks, rays, reef fish, freshwater species and deep-sea life.",
      glow: "#57a8ff",
      count: "Freshwater & marine",
      facts: [
        ["Sharks and rays", "Cartilaginous fishes whose skeletons are made mostly of cartilage."],
        ["Bony fish", "Most fish species have skeletons made largely of bone."],
        ["Gills", "Extract dissolved oxygen from water."],
        ["Fins", "Help with movement, steering and balance."],
        ["Freshwater habitats", "Rivers, lakes, streams and wetlands host many fish species."],
        ["Marine habitats", "Oceans, reefs and deep seas support diverse life."]
      ],
      summary: "Learn about fish anatomy, gills, fins and aquatic habitats.",
      emojiBig: "🐠"
    },
    {
      id: "dinosaurs",
      icon: "🦖",
      title: "Dinosaur Era",
      tag: "PREHISTORIC WORLD",
      description: "Meet prehistoric animals through fossils and scientific reconstructions.",
      glow: "#a9e76b",
      count: "Fossils & reconstructions",
      facts: [
        ["Tyrannosaurus rex", "A large predatory dinosaur known from fossils."],
        ["Triceratops", "A horned, plant-eating dinosaur with a large frill."],
        ["Stegosaurus", "A plant-eating dinosaur with plates along its back."],
        ["Velociraptor", "A relatively small feathered dinosaur."],
        ["Fossil evidence", "Bones, footprints and other traces help scientists study extinct life."],
        ["Scientific uncertainty", "Some details of colour and behaviour remain estimates."]
      ],
      summary: "Explore dinosaurs, fossil evidence, diet and scientific reconstructions.",
      emojiBig: "🦖"
    },
    {
      id: "dragons",
      icon: "🐉",
      title: "Fantasy Creatures",
      tag: "IMAGINATION LAB",
      description: "Explore fictional dragon anatomy, wings, flight and imaginary biology.",
      glow: "#c28aff",
      count: "Fictional anatomy",
      facts: [
        ["Dragon skeleton", "A fictional design, not real anatomy."],
        ["Wings and flight", "Explore the physics questions a large flying creature would face."],
        ["Fire breathing", "A fantasy feature; real animals do not breathe fire."],
        ["Claws and teeth", "Compare fictional designs with real animal adaptations."],
        ["World builder", "Create a creature profile with habitat, diet and special abilities."],
        ["Science vs fantasy", "Separate imaginary ideas from established biology."]
      ],
      summary: "A creative fantasy section. Dragons are fictional creatures.",
      emojiBig: "🐉"
    },
    {
      id: "micro",
      icon: "🔬",
      title: "Cells & Microscopic Life",
      tag: "MICRO WORLD",
      description: "Learn about cells, bacteria, viruses and the tiny systems that shape life.",
      glow: "#f47bbd",
      count: "Cells & microbes",
      facts: [
        ["Animal cells", "Cells contain structures that perform essential jobs."],
        ["Bacteria", "Single-celled organisms; many are harmless or helpful."],
        ["Viruses", "Infectious agents that replicate inside host cells."],
        ["DNA", "Carries genetic instructions in living organisms."],
        ["Immune system", "Recognises and responds to many pathogens."],
        ["Microscopes", "Reveal structures too small to see with the naked eye."]
      ],
      summary: "A beginner-friendly introduction to cells, microorganisms, DNA and immunity.",
      emojiBig: "🔬"
    }
  ],

  diseases: [
    {
      name: "Type 2 diabetes",
      type: "lifestyle",
      organ: "Blood sugar regulation",
      cause: "The body becomes resistant to insulin or does not make enough insulin.",
      symptoms: "Increased thirst, urination, tiredness and blurred vision; some people have no symptoms.",
      prevention: "Healthy routines and screening for people at increased risk can help.",
      care: "Diagnosis uses blood tests. Consult a qualified healthcare professional.",
      emoji: "🩸"
    },
    {
      name: "Asthma",
      type: "respiratory",
      organ: "Airways in the lungs",
      cause: "Airway inflammation and sensitivity can cause asthma symptoms.",
      symptoms: "Wheezing, coughing, chest tightness and shortness of breath.",
      prevention: "Identify personal triggers, avoid smoke and follow a clinician-provided action plan.",
      care: "A healthcare professional can assess symptoms and recommend treatment.",
      emoji: "🫁"
    },
    {
      name: "Tuberculosis (TB)",
      type: "infection",
      organ: "Often the lungs",
      cause: "Caused by bacteria and can spread through the air from a person with infectious TB.",
      symptoms: "Persistent cough, fever, night sweats and weight loss.",
      prevention: "Early diagnosis and completing prescribed treatment help reduce spread.",
      care: "TB requires professional testing and prescribed antibiotics.",
      emoji: "🦠"
    },
    {
      name: "Malaria",
      type: "infection",
      organ: "Liver and red blood cells",
      cause: "Caused by parasites transmitted mainly through infected Anopheles mosquitoes.",
      symptoms: "Fever, chills, headache and fatigue.",
      prevention: "Use recommended mosquito protection and preventive measures.",
      care: "Prompt testing and medical treatment are important.",
      emoji: "🦟"
    },
    {
      name: "Hypertension",
      type: "lifestyle",
      organ: "Blood vessels and heart",
      cause: "Genetics, age, diet, activity and other health conditions can contribute.",
      symptoms: "Often has no symptoms, so blood pressure checks are important.",
      prevention: "Regular activity, balanced eating and reducing excess salt can help.",
      care: "Diagnosis and treatment require clinical assessment.",
      emoji: "❤️"
    },
    {
      name: "Influenza (flu)",
      type: "infection",
      organ: "Respiratory system",
      cause: "A contagious illness caused by influenza viruses.",
      symptoms: "Fever, cough, sore throat, body aches and fatigue.",
      prevention: "Vaccination when recommended, hand hygiene and ventilation can help.",
      care: "People at higher risk or with severe symptoms should contact a healthcare professional.",
      emoji: "🤧"
    },
    {
      name: "Iron-deficiency anaemia",
      type: "lifestyle",
      organ: "Red blood cells",
      cause: "Can result from low iron intake, blood loss or poor absorption.",
      symptoms: "Tiredness, weakness, dizziness or shortness of breath.",
      prevention: "A balanced diet may help; prevention depends on the underlying cause.",
      care: "Blood tests can confirm anaemia and iron status.",
      emoji: "🩸"
    },
    {
      name: "Pneumonia",
      type: "respiratory",
      organ: "Lungs",
      cause: "An infection caused by bacteria, viruses or, less commonly, fungi.",
      symptoms: "Cough, fever, chest pain or difficulty breathing.",
      prevention: "Recommended vaccines, hand hygiene and avoiding tobacco smoke may help.",
      care: "Breathing difficulty or severe illness requires urgent medical care.",
      emoji: "🫁"
    },
    {
      name: "Coronary artery disease",
      type: "lifestyle",
      organ: "Heart",
      cause: "Plaque can build up in the arteries supplying the heart.",
      symptoms: "May cause chest discomfort or shortness of breath.",
      prevention: "Manage risk factors with medical guidance and avoid tobacco.",
      care: "Possible heart attack symptoms require emergency medical care.",
      emoji: "💓"
    },
    {
      name: "Dengue",
      type: "infection",
      organ: "Whole body",
      cause: "A virus transmitted by infected Aedes mosquitoes.",
      symptoms: "Fever, headache, body aches and rash.",
      prevention: "Reduce mosquito breeding sites and protect against bites.",
      care: "Seek medical advice. Severe abdominal pain, bleeding or persistent vomiting needs urgent assessment.",
      emoji: "🦟"
    },
    {
      name: "Allergies",
      type: "respiratory",
      organ: "Immune system",
      cause: "The immune system reacts to substances such as pollen or certain foods.",
      symptoms: "Sneezing, itchy eyes, rash or other symptoms.",
      prevention: "Avoid known triggers when practical.",
      care: "Breathing difficulty or swelling of the tongue or throat is an emergency.",
      emoji: "🌼"
    },
    {
      name: "Kidney stones",
      type: "lifestyle",
      organ: "Kidneys and urinary tract",
      cause: "Minerals and salts form hard deposits in the urinary system.",
      symptoms: "Severe side or back pain, blood in urine or nausea.",
      prevention: "Adequate fluid intake may reduce risk for many people.",
      care: "Severe pain, fever or difficulty passing urine needs medical assessment.",
      emoji: "🫘"
    }
  ],

  creatures: [
    {
      id: "human",
      name: "Human",
      emoji: "🧍",
      class: "Mammal",
      breathing: "Lungs",
      skeleton: "Bony internal skeleton",
      heart: "4 chambers",
      diet: "Omnivore",
      movement: "Usually walks on two legs"
    },
    {
      id: "lion",
      name: "Lion",
      emoji: "🦁",
      class: "Mammal",
      breathing: "Lungs",
      skeleton: "Bony internal skeleton",
      heart: "4 chambers",
      diet: "Carnivore",
      movement: "Walks on four legs"
    },
    {
      id: "dolphin",
      name: "Dolphin",
      emoji: "🐬",
      class: "Mammal",
      breathing: "Lungs; breathes at surface",
      skeleton: "Bony internal skeleton",
      heart: "4 chambers",
      diet: "Mostly fish and squid",
      movement: "Swims with tail flukes"
    },
    {
      id: "shark",
      name: "Shark",
      emoji: "🦈",
      class: "Cartilaginous fish",
      breathing: "Gills",
      skeleton: "Mostly cartilage",
      heart: "2 main chambers",
      diet: "Varies by species",
      movement: "Swims with fins and tail"
    },
    {
      id: "goldfish",
      name: "Goldfish",
      emoji: "🐠",
      class: "Bony fish",
      breathing: "Gills",
      skeleton: "Bony internal skeleton",
      heart: "2 main chambers",
      diet: "Omnivore; varies by life stage",
      movement: "Swims with fins and tail"
    },
    {
      id: "eagle",
      name: "Eagle",
      emoji: "🦅",
      class: "Bird",
      breathing: "Lungs with air sacs",
      skeleton: "Lightweight bony skeleton",
      heart: "4 chambers",
      diet: "Mostly meat",
      movement: "Flies and walks"
    },
    {
      id: "snake",
      name: "Snake",
      emoji: "🐍",
      class: "Reptile",
      breathing: "Lungs",
      skeleton: "Many vertebrae and ribs",
      heart: "Usually 3 chambers",
      diet: "Carnivore",
      movement: "Slithers"
    },
    {
      id: "frog",
      name: "Frog",
      emoji: "🐸",
      class: "Amphibian",
      breathing: "Lungs and skin; tadpoles use gills",
      skeleton: "Bony internal skeleton",
      heart: "3 chambers",
      diet: "Many adults eat insects",
      movement: "Hops and swims"
    },
    {
      id: "trex",
      name: "T. rex",
      emoji: "🦖",
      class: "Extinct dinosaur",
      breathing: "Details inferred from fossil relatives",
      skeleton: "Bony skeleton known from fossils",
      heart: "Not directly known from fossils",
      diet: "Carnivore",
      movement: "Walked on two legs"
    },
    {
      id: "dragon",
      name: "Fantasy Dragon",
      emoji: "🐉",
      class: "Fictional creature",
      breathing: "Imaginary design",
      skeleton: "Fictional design",
      heart: "Fictional design",
      diet: "Depends on the story",
      movement: "Imaginary flight"
    }
  ],

  quiz: [
    {
      q: "Which organ pumps blood around the human body?",
      answers: ["Lungs", "Heart", "Kidneys", "Stomach"],
      correct: 1,
      why: "The heart pumps blood through the circulatory system."
    },
    {
      q: "Most fish breathe in water using…",
      answers: ["Lungs", "Skin only", "Gills", "Feathers"],
      correct: 2,
      why: "Gills extract dissolved oxygen from water."
    },
    {
      q: "Which of these is a mammal?",
      answers: ["Shark", "Dolphin", "Trout", "Octopus"],
      correct: 1,
      why: "Dolphins breathe air with lungs and nurse their young."
    },
    {
      q: "What causes malaria?",
      answers: [
        "A parasite transmitted by mosquitoes",
        "Cold air",
        "A vitamin deficiency",
        "A fungus in food"
      ],
      correct: 0,
      why: "Malaria is caused by Plasmodium parasites."
    },
    {
      q: "What is the best description of a dragon in this project?",
      answers: [
        "A real animal",
        "A type of dinosaur",
        "A fictional creature",
        "A fish"
      ],
      correct: 2,
      why: "Dragons are fantasy creatures, not real scientific species."
    }
  ]
};
