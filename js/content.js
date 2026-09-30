/* ============================================================================
   EDIT ME. Everything on the site comes from this one file.

   Structure
     intro     the front page (photo, bio, rotating "I build ..." words)
     nav       the four big buttons on the front page
     sections  the Experience and Projects pages, each a row of channels
     resume    the Resume channel (opened by the Resume button)

   A channel can have:
     media    what appears on the big screen in the channel:
                { type: "embed", url: "https://...", allow: "microphone" }  a live site
                { type: "pdf",   src: "assets/x.pdf" }                      a PDF
                { type: "image", src: "assets/x.jpg", alt: "..." }          a photo
                { type: "image", src: "...", fit: "scroll", label: "..." }  a tall image (poster) that scrolls
                null                                                        "coming soon" screen
     sections text blocks beside the screen: { title, text: [..] } or { title, list: [..] }
     tags     small labels ("built with")
     links    buttons. Leave url "" to show a disabled "add link" button.
     blurb    one line shown on the tile
     art      icon for the tile (see ART in main.js)     image   a photo for the tile
     badge    text for a small badge next to the title, e.g. "Coming soon"
     soon     for media: null, the message on the empty screen: { title, text }

   Some sites refuse to be embedded (X-Frame-Options / CSP). If a frame stays
   blank, that site blocks it. The "Open" button always works.
   ============================================================================ */

// Built-in placeholder screen for embeds you haven't filled in yet.
const demo = title => `demos/placeholder.html?title=${encodeURIComponent(title)}`;

window.SITE = {
  name: "Sidharth Rao",
  title: "Computer Engineering · Iowa State University",
  status: "Seeking full-time roles in software engineering & full-stack development",
  email: "sidharthprao@gmail.com",

  /* ----------------------------------------------------------- front page */
  intro: {
    greeting: "Hi, I'm",
    photo: "assets/sid.jpg",
    photoPos: "50% 30%",
    photoAlt: "Sidharth Rao in front of the Parthenon",
    build: ["embedded systems", "firmware", "computer vision", "full-stack apps"],
    bio: [
      "Welcome to my website! I'm a senior in Computer Engineering at Iowa State University, actively seeking full-time opportunities in embedded systems and firmware engineering, and open to roles across software engineering more broadly.",
      "My goal is to help bridge the gap between hardware and software to build more reliable systems and power the constantly improving field of technology and computing.",
    ],
    skills: ["Java", "TypeScript", "C", "Python", "SQL", "Git", "Ansible"],
    chips: ["Class of 2026", "Iowa State"],
  },

  nav: [
    { id: "experience", label: "Experience", caption: "Research & roles",  art: "briefcase", color: "#7a5ce0" },
    { id: "projects",   label: "Projects",   caption: "Things I've built", art: "folder",    color: "#2f80d1" },
    { id: "resume",     label: "Resume",     caption: "View or download",  art: "resume",    color: "#e2564c" },
    { id: "contact",    label: "Contact",    caption: "Say hello",         art: "mail",      color: "#1ea7e1" },
  ],

  // Shown in the Contact channel. Empty url = disabled "add link" button.
  links: [
    { label: "GitHub",   url: "https://github.com/sidrao4", handle: "@sidrao4" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/sidharthrao04/", handle: "in/sidharthrao04" },
    { label: "Resume",   url: "assets/resume.pdf", handle: "PDF" },
  ],

  /* ------------------------------------------------ Experience & Projects */
  sections: [
    {
      id: "experience",
      title: "Experience",
      blurb: "Research and work.",
      channels: [
        {
          id: "ara",
          title: "ARA Wireless Living Lab",
          subtitle: "Undergraduate research assistant",
          blurb: "Designed and built user equipment for a rural wireless research testbed.",
          meta: "May – Aug 2025",
          kind: "Experience",
          color: "#7a5ce0",
          art: "antenna",
          media: { type: "embed", url: "https://arawireless.org/", label: "arawireless.org" },
          sections: [
            { title: "Overview", text: [
              "Designed and built User Equipment (UE) units for the ARA Wireless Living Lab, using Git for version control, C for firmware development, and Jupyter notebooks for testing, which enabled deployment of several units and enhanced wireless connectivity and affordability for rural and agricultural users.",
            ] },
            { title: "Highlights", list: [
              "Reduced provisioning time for Linux-based User Equipment nodes by up to 70%, by authoring Ansible YAML playbooks that automated package installation and network configuration and standardized system images across a fleet of machines deployed in a distributed wireless testbed.",
              "Configured Quectel antennae using Linux's Minicom to establish communication with the Iowa State University ARA internal network.",
            ] },
          ],
          tags: ["Git", "C", "Jupyter", "Ansible", "Linux", "Quectel", "Minicom"],
          links: [{ label: "ARA Wireless Living Lab", url: "https://arawireless.org/" }],
        },
        {
          id: "coming-soon",
          title: "Coming Soon",
          subtitle: "More on the way",
          blurb: "More experience coming soon.",
          meta: "",
          kind: "Experience",
          color: "#8a9aa5",
          art: "plus",
          badge: "Coming soon",
          media: null,
          soon: { title: "Coming soon", text: "More experience will be added here." },
          sections: [
            { title: "Overview", text: ["More experience is coming soon. Check back later."] },
          ],
          tags: [],
          links: [],
        },
      ],
    },

    {
      id: "projects",
      title: "Projects",
      blurb: "Things I've built, from firmware to full-stack.",
      channels: [
        /* ---------------------------------------------------- MicroCART */
        {
          id: "microcart",
          title: "MicroCART",
          subtitle: "Senior design",
          blurb: "A semi-autonomous quadcopter that lands itself using computer vision.",
          meta: "Sep 2025 – May 2026",
          kind: "Project",
          color: "#2f80d1",
          image: "assets/microcart.jpg",
          imagePos: "50% 0%",
          media: { type: "image", fit: "scroll", src: "assets/microcart-poster.jpg", label: "microcart-poster.jpg", alt: "MicroCART senior design poster, team sdmay26-49" },
          sections: [
            { title: "Overview", text: [
              "Designed and developed a custom semi-autonomous quadcopter integrating a Raspberry Pi and camera module with a Crazyflie UAV platform, with optimized C-based firmware in a Linux virtual environment for real-time computer vision-based navigation.",
              "We aimed to develop a custom quadcopter with an onboard Raspberry Pi and camera, built on existing open-source firmware, to be used as an accessible research platform for small-scale aerial robotics.",
            ] },
            { title: "My role", text: [
              "As software lead, I designed and implemented the computer vision capabilities running on a Raspberry Pi Zero 2W mounted to the drone. That included ArUco marker detection using OpenCV, pose estimation relative to a landing target, and communicating flight commands to the Crazyflie flight controller over UART.",
            ] },
            { title: "Highlights", list: [
              "Achieved stable semi-autonomous flight with real-time vision-based navigation, improving the rate of safe landing by over 30% with C firmware that bridges a Raspberry Pi Zero to the Crazyflie UAV over a UART link and converts ArUco position data to setpoints for a custom PID controller.",
              "Engineered a custom quadcopter frame upgrade to improve structural robustness and flight performance, supporting additional onboard computing hardware.",
            ] },
            { title: "Requirements & constraints", list: [
              "All components must be able to communicate with each other.",
              "Stable flight must be achieved.",
              "The Raspberry Pi must be able to send and receive data in real time over UART.",
              "Must use Bitcraze's Crazyflie firmware, and communicate with the drone over CrazyRadio.",
              "Every added component must be compatible with the Crazyflie drone platform.",
            ] },
            { title: "Design approach", list: [
              "Build on the prior team's design and system.",
              "Fix the UVLO circuit from the prior team.",
              "Configure the Crazyflie for the OneShot protocol, and configure the ESC.",
              "Build a new quad and begin PID testing for flight.",
              "Attach the Pi and camera to the quad.",
              "Test Pi and Crazyflie communication, marker detection with the camera, and the landing sequence.",
            ] },
            { title: "Testing", list: [
              "Hardware: PCB circuit testing and analysis, ESC and motor functionality, PCB bring-up and validation, signal integrity verification.",
              "Software: ArUco detection, camera connectivity, and UART communication verification.",
            ] },
            { title: "Obstacles", text: [
              "ESC configuration, motor issues, the Crazyflie OneShot signal, UVLO circuit testing, system integration across all components, and getting the Pi mounted on the drone.",
            ] },
            { title: "Who it's for", text: [
              "Researchers and students interested in aerial robotics, and future senior design teams building on our design. It works as a proof of concept for delivery drones that autonomously land at a targeted location using computer vision, and it is open-ended for other uses once onboard compute and computer vision are added.",
            ] },
            { title: "What I've learned", text: [
              "Embedded firmware development, real-time computer vision with OpenCV, hardware/software communication protocols, and the challenges of deploying software on resource-constrained hardware, plus coordinating software requirements with hardware constraints on a multi-faceted team.",
            ] },
            { title: "Team", text: [
              "Team sdmay26-49: Sidharth Rao, Matthew Smosna, Advaith Thimmancherla and Leevon Stuckly. Faculty advisor and client: Phillip Jones.",
            ] },
          ],
          tags: ["C", "Python", "OpenCV", "Linux", "Raspberry Pi", "Crazyflie", "ArUco", "PID control", "UART"],
          links: [
            { label: "Full poster", url: "assets/microcart-poster.jpg" },
            { label: "Source code", url: "" },
          ],
        },

        /* -------------------------------------------------------- Verbatim */
        {
          id: "verbatim",
          title: "Verbatim Speech Helper",
          subtitle: "Full-stack web app",
          blurb: "A teleprompter that follows your voice instead of a timer.",
          meta: "Aug 2026",
          kind: "Project",
          color: "#e39a12",
          image: "assets/verbatim.jpg",
          imagePos: "50% 0%",
          media: {
            type: "embed",
            url: "https://speech-app-seven.vercel.app/",
            label: "speech-app-seven.vercel.app",
            allow: "microphone; camera; fullscreen; clipboard-write",
            note: "Speech recognition works in Chrome and Edge. Press Open for the full-page version.",
          },
          sections: [
            { title: "Overview", text: [
              "A teleprompter that follows you. It advances through your script by listening to what you actually say, at your own pace, instead of scrolling at a fixed speed. Paste a script or have one generated for you, read it aloud, and get your words-per-minute and completion stats when you're done.",
            ] },
            { title: "Highlights", list: [
              "Engineered a full-stack speech fluency app using TypeScript, FastAPI, and SQLite which deploys as 2 independently deployable services, exposing 8 REST endpoints for auth, content, and analytics.",
              "Eliminated over 90% of false-positive cursor jumps by developing a custom real-time LCS-based speech alignment algorithm that tracks natural speaking pace with fault tolerance, replacing a fixed-rate scrolling approach.",
              "Integrated an LLM API (Gemini) for on-demand content generation, capping usage to 5 requests/10 min per client to control costs on a public, unauthenticated endpoint.",
            ] },
            { title: "Also", list: [
              "Speech tracking runs on the browser's Web Speech API, and pauses rather than guessing forward if you go off-script.",
              "Optional accounts with a username and password or Google sign-in, plus saved script history and practice stats.",
              "Camera preview while you read, with the recording saved to your device.",
            ] },
            { title: "Good to know", text: [
              "Speech recognition needs Chrome or Edge.",
            ] },
          ],
          tags: ["TypeScript", "React", "Python", "FastAPI", "SQLite", "Railway", "Gemini API", "Web Speech API", "REST"],
          links: [
            { label: "Live site", url: "https://speech-app-seven.vercel.app/" },
            { label: "Source code", url: "https://github.com/sidrao4/SpeechApp" },
          ],
        },

        /* ------------------------------------------------ Job Aggregator */
        {
          id: "job-aggregator",
          title: "Job Aggregator",
          subtitle: "& resume matching",
          blurb: "Pulls in 50+ company job boards and ranks postings against my resume.",
          meta: "Sep 2026",
          kind: "Project",
          color: "#12a4a8",
          art: "search",
          media: null,
          sections: [
            { title: "Overview", text: [
              "A Spring Boot service that ingests 50+ company job boards by polling the public Greenhouse and Lever APIs on a schedule, normalizes everything into PostgreSQL, and ranks postings by how well they match a resume.",
            ] },
            { title: "Highlights", list: [
              "Built a Spring Boot service ingesting 50+ company job boards via scheduled REST polling of public Greenhouse and Lever APIs, normalizing data into PostgreSQL and Flyway-managed migrations.",
              "Developed a title-normalization pipeline that collapsed over 25% of duplicate listings across boards, using description similarity thresholds to consolidate reposts and duplicates.",
              "Implemented resume-to-posting matching using Gemini embeddings and cosine similarity to rank over 1000 postings by relevance.",
            ] },
          ],
          tags: ["Java", "Spring Boot", "PostgreSQL", "Flyway", "Docker", "Gemini embeddings", "Greenhouse API", "Lever API"],
          links: [{ label: "Source code", url: "" }],
        },

        /* ------------------------------------------------------ TuneFlow */
        {
          id: "tuneflow",
          title: "TuneFlow",
          subtitle: "Android app",
          blurb: "Share song recommendations with friends, powered by Spotify.",
          meta: "Aug – Nov 2024",
          kind: "Project",
          color: "#19a974",
          art: "music",
          media: null,
          sections: [
            { title: "Overview", text: [
              "TuneFlow is an Android app where you can see what songs your friends are recommending and get personalized suggestions pulled from Spotify based on that. We integrated with the Spotify Web API to pull in user data and generate recommendations, and it ended up boosting daily active users by 40%. The app has several screens I designed and built to keep the experience simple and easy to navigate.",
            ] },
            { title: "My role", text: [
              "I was the frontend developer: built all the screens in Java, hooked up the Spotify API using Volley for the network calls, and handled how recommendations were displayed. I also wrote unit tests with JUnit and Mockito and used Postman to test the API endpoints while building out the integration.",
            ] },
            { title: "Highlights", list: [
              "Increased daily active users by 40%, by developing an Android social-app frontend in Java that integrates the Spotify Web API via Volley for personalized recommendations.",
              "Designed multiple unique user interfaces, thoroughly tested using Postman, Mockito, and JUnit to increase user retention and returning users.",
            ] },
            { title: "What I learned", list: [
              "Building Android UIs in Java and working with XML layouts.",
              "Connecting to a real third-party API (Spotify) and navigating OAuth.",
              "Making async network requests with Volley.",
              "Writing unit tests and learning when mocking actually helps.",
              "Using Postman to debug API calls before wiring them into the app.",
            ] },
          ],
          tags: ["Java", "Android Studio", "Spotify Web API", "Volley", "Postman", "Mockito", "JUnit", "XML"],
          links: [{ label: "Source code", url: "" }],
        },
      ],
    },
  ],

  /* --------------------------------------------------------------- resume */
  resume: {
    id: "resume",
    title: "Resume",
    subtitle: "PDF",
    meta: "Education · experience · projects",
    kind: "Document",
    color: "#e2564c",
    art: "resume",
    media: { type: "pdf", src: "assets/resume.pdf", label: "resume.pdf" },
    sections: [
      { title: "Overview", text: ["My current resume: education, research experience, projects and skills."] },
      { title: "Education", list: [
        "B.S. Computer Engineering, Iowa State University (Ames, IA), Aug 2022 – May 2026.",
        "Dean's List: Fall 2022 – Fall 2023.",
      ] },
      { title: "Coursework", text: [
        "Data Structures, Design & Analysis of Algorithms, Differential Equations, Linear Algebra, Object-Oriented Programming, Database Management, Operating Systems: Principles.",
      ] },
    ],
    tags: ["Java", "TypeScript", "C", "Python", "SQL", "HTML/CSS", "Verilog", "XML", "Git", "Linux", "React", "Ansible", "LaTeX"],
    links: [{ label: "Download PDF", url: "assets/resume.pdf", download: "Sidharth_Rao_Resume.pdf" }],
  },
};
