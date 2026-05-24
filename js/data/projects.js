window.PortfolioData = {
  categories: [
    { id: 'installation', label: 'Installation' },
    { id: 'web-based', label: 'Web Based' },
    { id: 'graphics', label: 'Graphics' },
  ],
  projects: [
    {
      id: 'though-their-voices-are-so-soft',
      title: 'Though their voices are so soft',
      year: '2025 Jan / sculpture + Projection',
      cat: 'installation',
      media: [
        { src: 'MNST8042.jpg', type: 'image' },
        { src: 'MNST8045.jpg', type: 'image' },
        { src: 'TTVASS_vid_1080.mp4', type: 'video' }
      ],
      desc: '<strong>Though Their Voices Are So Soft (2024, Mixed media, Variable installation, 35 × 30 × 20 in.)</strong><br><br>Though Their Voices Are So Soft grants plants the rights traditionally reserved for humans — to speak, to protest, to be heard. The Flower Robot, activated by the viewer, moves and emits a siren; the Fern-shaped Robot shakes a leaf inscribed with "RIGHT TO SPEAK." Quiet gestures, but insistent ones. The work asks who has historically held the authority to act and speak — and what we have refused to listen to.'
    },
    {
      id: 'goodnightbaby',
      title: 'Good Night, Baby. Do You Still Remember?',
      year: '2025 Jan',
      cat: 'installation',
      media: [
        { src: 'goodnight05.jpg', type: 'image' },
        { src: 'goodnight04.jpg', type: 'image' },
        { src: 'goodnight02.jpg', type: 'image' },
        { src: 'goodnight_1080.mp4', type: 'video' },
        { src: 'MNST8851.jpg', type: 'image' },
        { src: 'goodnight01_수정.jpg', type: 'image' }
      ],
      desc: `<strong>Good Night, Baby. Do You Still Remember? (Mixed media, Variable installation, 2025)</strong><br><br>Two cell-like sculptures, each housing a projector, cast personal video footage from the artist's own archive onto the surrounding space. One references the structure of a nerve cell; the other takes the shape of a speech bubble. The work began from a recurring experience: people from the distant past reappearing in dreams — old classmates, brief friendships, connections that had quietly faded. The piece holds space for what returns without being called back, and whether forgetting is ever really complete.`
    },
    {
      id: 'remapping-body',
      title: 'Remapping body',
      year: '2026 Jan',
      cat: 'web-based',
      media: [
        { src: 'remappingbodysequencefinal_1080.mp4', type: 'video' },
        { src: 'remappingbodyscreen_1080.mp4', type: 'video' },
        { src: 'Screenshot.png', type: 'image' }
      ],
      desc: '<strong>Remapping Body (p5.js, 2025)</strong><br><br>An interactive tool built in p5.js that imposes a computational grid onto the human figure. The body — a continuous, organic form — is divided into adjustable tiles (5–20 rows and columns), each swappable and recolorable via RGB sliders. Clicking individual tiles cycles through poses, producing bodies with multiplied limbs and disjointed silhouettes. The project began from a curiosity about re-sorting something inherently fluid: what remains when the body is treated as rearrangeable data, and what new forms emerge from its misalignment.'
    },
    {
      id: 'diagnosis-0-1',
      title: 'Diagnosis 0:1',
      year: '2025',
      cat: 'web-based',
      media: [
        { src: 'diagnosis_25mb.mp4', type: 'video' },
        { src: '01_.png', type: 'image' },
        { src: '02_.png', type: 'image' },
        { src: '03_.jpg', type: 'image' }
      ],
      desc: `<strong>Diagnosis 0:1 (p5.js, 2026)</strong><br><br>A time-based digital work built in p5.js. Circles repeatedly collide with rectangular boxes, breaking them into smaller fragments with each impact. When one sequence ends, its final state becomes the starting point for the next.<br><br>The work draws from Yi Sang’s poem and the idea of periodic boundary conditions, but approaches them through motion rather than direct illustration. Through repeated collision, overlap, and division, the piece creates a system that keeps changing without fully resolving.`
    },
    {
      id: 'take-it-to-go',
      title: 'Take It To Go!',
      year: '2025',
      cat: 'graphics',
      media: [
        { src: 'DS1_final_aftereffects_1080.mp4', type: 'video' },
        { src: 'takeittogo-04.jpg', type: 'image' },
        { src: 'takeittogo-03.jpg', type: 'image' },
        { src: 'takeittogo-02.jpg', type: 'image' },
        { src: 'takeittogo-01.jpg', type: 'image' }
      ],
      desc: `<strong>Take It To Go (Print / Campaign Design, 2025)</strong><br><br>A set of delivery package tags built around the social-media moment of Asian food. Each tag names a dish's origin and pairs it with one piece of music, literature, and visual art from its home country; a QR code leads to a landing page with expanded context and resource access. The tags are designed to be cut and kept as bookmarks — a way to extend their presence beyond the meal itself. The project uses the familiarity of takeout as an entry point for something less immediate: the history and aesthetic tradition behind what's being consumed, with the hope that a small object, handed over with an order, might stick around long enough to make that distance feel crossable.`
    },
    {
      id: 'the-piece-of-wild-things',
      title: 'The Piece of Wild Things',
      year: '2025',
      cat: 'graphics',
      media: [
        { src: 'wildthings_1080.mp4', type: 'video' },
        { src: 'XRshared-01.jpg', type: 'image' },
        { src: 'XRshared-02.jpg', type: 'image' }
      ],
      desc: `<strong>The Piece of Wild Things (AR Book, 2026)</strong><br><br>A visual annotation of Wendell Berry's poem "The Peace of Wild Things," with personal narratives written as footnotes throughout the printed book. Each page triggers an augmented reality layer when scanned: the first generates a branching structure that appears differently with every reading, while the rest unfold AR elements anchored to the text. Built using Mind AR for image tracking and A-Frame for 3D rendering. The project uses the footnote format — typically reserved for citations — to hold personal stories instead, positioning them where references would go but containing my own writing about growth and connection.`
    }
  ]
};
