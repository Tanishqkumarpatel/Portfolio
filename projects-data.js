// Detailed projects data for the portfolio
const projectsData = [
  {
    id: "canvas-ai",
    title: "Canvas AI",
    category: "web",
    subtitle: "AI-Powered Study Companion",
    date: "June 2026",
    github: "https://github.com/Tanishqkumarpatel/Canvas_AI",
    demo: "https://canvasai-devtanuteam.vercel.app",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "NextAuth.js", "PostgreSQL", "Google Gemini API", "Supabase"],
    metrics: {
      "AI Engine": "Gemini 3.1 Flash Lite",
      "Security": "AES-256-GCM Encryption",
      "Database": "Serverless Supabase/Neon"
    },
    shortDesc: "A multi-modal course document analyzer and study companion that generates quizzes and flashcards.",
    overview: "Canvas AI is a serverless full-stack web application designed to help university students analyze their course documents and generate structured study materials. By integrating the Google Gen AI SDK, it performs base64 multi-modal analysis on PDFs, PPTXs, and DOCXs. The application secures critical external LMS tokens using authenticated AES-256-GCM encryption at rest and manages user files using recursive directory traversal on Supabase Storage.",
    starBullets: [
      "Engineered a multi-modal course document analyzer using the @google/genai SDK (Gemini 3.1/2.5 Flash Lite), mapping file extensions (PDF, PPTX, DOCX) to correct MIME-types to compile inline data parts for real-time document analysis.",
      "Designed structured JSON output schemas using Gemini's responseJsonSchema constraints to guarantee type-safe quiz and flashcard generation, eliminating client-side parsing failures.",
      "Implemented robust AES-256-GCM symmetric encryption using Node's crypto module to securely store university Canvas LMS API credentials, utilizing server-side environment variables and unique initialization vectors."
    ],
    interviewQAs: [
      {
        q: "How did you handle multi-modal files when querying the Gemini API?",
        a: "We built a custom node service that takes the files uploaded to Supabase Storage, fetches them as ArrayBuffers, and converts them into Base64 strings. Along with the Base64 data, we detect the file extension and supply the correct MIME type (e.g., application/pdf). We then pass this data as an inlineData object in the content parts array to the Gemini SDK. This allows the model to process the actual text and structure of the document directly, alongside the user's prompt."
      },
      {
        q: "Why did you choose AES-256-GCM over other encryption algorithms like AES-256-CBC?",
        a: "AES-256-GCM (Galois/Counter Mode) is an authenticated encryption algorithm, meaning it provides both confidentiality (encryption) and integrity/authenticity (verification). Unlike CBC mode, GCM generates an authentication tag during encryption. When decrypting, we verify this tag. If the encrypted token has been tampered with in the database, decryption will fail immediately. This prevents bit-flipping attacks and ensures that we only decrypt authentic API keys."
      },
      {
        q: "How does your recursive folder traversal work in Supabase Storage?",
        a: "Since cloud storage buckets are flat namespaces, we created a utility called listAllFiles. It calls Supabase's list API. If an item returned has no ID, it represents a folder. The function then recursively lists items under that folder path, merging folders and sub-files into a structured hierarchy tree. This is passed to the client-side React sidebar to show nested folders."
      }
    ]
  },
  {
    id: "shell",
    title: "Unix Shell in C",
    category: "systems",
    subtitle: "Custom Interactive Command Line",
    date: "June 2026",
    github: "https://github.com/Tanishqkumarpatel/shell",
    demo: null,
    tech: ["C", "POSIX API", "Linux", "GDB", "Makefiles"],
    metrics: {
      "Orphan/Zombie Prevention": "Zero leak",
      "Memory Footprint": "Dynamic / Lightweight",
      "Diagnostics": "ANSI-Colored error mapping"
    },
    shortDesc: "A custom interactive UNIX command-line interpreter implementing process lifecycle management and dynamic memory allocation.",
    overview: "Built a fully functional Unix shell from first principles in C, conforming to POSIX standards. The project implements a Read-Eval-Print Loop (REPL) structure, handling dynamic command parsing, child process creation, program binary substitution, parent synchronization, and standard system error mapping.",
    starBullets: [
      "Accomplished custom Unix process orchestration as measured by zero orphan/zombie process creation across test suites, developing a parent-child execution model using POSIX APIs (fork, execvp, waitpid).",
      "Engineered a dynamic memory allocation strategy for shell command input and token parsing using character-by-character buffer expansion (realloc scaling), eliminating fixed-buffer limits and process crashes.",
      "Built a resilient command execution loop handling empty inputs and invalid binaries gracefully, mapping kernel-level failure states using errno to return user-friendly, ANSI-colored diagnostics."
    ],
    interviewQAs: [
      {
        q: "Can you walk me through the lifecycle of a command execution in your shell?",
        a: "1. Read (read_command): Prints a prompt, flushes stdout, and reads input character-by-character into a dynamically allocated buffer (resizing via realloc if input exceeds 1024 bytes).\n2. Parse (get_arguments): Tokenizes the command by whitespace delimiters using strtok(). The arguments are stored in a dynamically growing array of pointers (char**), ending with a NULL pointer.\n3. Execute (execute): Checks for built-ins (like exit). For system utilities, it forks a child process using fork(). The child calls execvp() to run the binary, while the parent calls waitpid() to synchronize and block until the child finishes.\n4. Cleanup & Loop: Control returns to the parent, which frees the buffers and loops back to print the next prompt."
      },
      {
        q: "What is the difference between fork() and execvp(), and why do we use them together?",
        a: "fork() creates a new process by duplicating the parent, returning 0 in the child and the child's PID in the parent. execvp() does not create a process; instead, it replaces the entire address space of the current process with the target binary. We use them together because if we called execvp() directly in the shell parent process, the shell would be overwritten and exit when the command finished. Spawning a child via fork() and calling execvp() inside the child allows the command to run in isolation while the shell parent survives."
      }
    ]
  },
  {
    id: "http-server",
    title: "C++ HTTP Server",
    category: "systems",
    subtitle: "Multithreaded Server & Finance Tracker",
    date: "June 2026",
    github: "https://github.com/Tanishqkumarpatel/HTTP_Server",
    demo: null,
    tech: ["C++", "BSD Sockets", "Multithreading", "HTML", "CSS", "JavaScript", "Linux", "GDB"],
    metrics: {
      "Concurrency": "Pre-allocated Thread Pool",
      "HTTP Compliance": "HTTP/1.1 RFC Parser",
      "Data Integrity": "Mutex-Guarded CRUD"
    },
    shortDesc: "A high-performance C++ multithreaded HTTP server and REST API featuring a custom TCP socket network engine.",
    overview: "Developed a low-level HTTP/1.1 server from scratch in C++17. It manages concurrent connections using a custom thread pool rather than a thread-per-connection design, preventing resource exhaustion. It implements an RFC-compliant HTTP parser, a regex-based request router with dynamic path parameter extraction, and a thread-safe in-memory transaction datastore.",
    starBullets: [
      "Engineered a high-performance multithreaded HTTP server in C++17 from scratch, utilizing a pre-allocated thread pool (std::thread) with std::mutex and std::condition_variable synchronization to handle concurrent TCP socket connections.",
      "Developed a low-level network engine using POSIX sockets (sys/socket.h), configuring socket reuse options (SO_REUSEADDR), binding to network interfaces, and managing non-blocking connection dispatch.",
      "Authored a robust HTTP/1.1 protocol parser, implementing strict header verification checks (method verification, Host header check, bad format detection) resulting in clean compliance with HTTP/1.1 standards."
    ],
    interviewQAs: [
      {
        q: "Why did you use a pre-allocated Thread Pool instead of creating a thread per connection?",
        a: "Creating a thread for every single TCP connection introduces significant operating system overhead (allocating kernel stack, thread creation syscalls) and exposes the server to denial-of-service/resource-exhaustion attacks. A pre-allocated thread pool creates a fixed number of worker threads (usually bound to CPU cores). These threads block on a condition variable waiting for work in a synchronized queue. When a connection is accepted, it is pushed to the queue and a worker is notified. This bounds CPU and memory usage, making the server highly resilient."
      },
      {
        q: "What is the purpose of SO_REUSEADDR in your socket configuration?",
        a: "When a socket closes, it enters the TIME_WAIT state in the operating system kernel to ensure any lingering packets in the network are discarded. If you try to restart the server immediately, bind() will fail with an 'Address already in use' error. Setting SO_REUSEADDR via setsockopt allows the socket to bypass this check and bind to the port immediately, making local debugging and deployments much faster."
      },
      {
        q: "How does your regex router extract parameters like IDs from paths?",
        a: "The router stores routes as a list of structs containing the HTTP method, a std::regex pattern (e.g. '^/transactions/(\\d+)$'), and a handler function. When a request matches the method and pattern, we pass a std::smatch object to std::regex_match. The match object captures subgroups (like the numeric digits). We extract these captured strings and map them into a request parameter map (e.g., req.params['id'] = '42') before invoking the handler."
      }
    ]
  },
  {
    id: "sudoku-solver",
    title: "WASM Sudoku Solver",
    category: "systems",
    subtitle: "C Engine to WebAssembly Integration",
    date: "May 2026",
    github: "https://github.com/Tanishqkumarpatel/Sudoku",
    demo: "https://tanishqkumarpatel.github.io/Sudoku",
    tech: ["C", "WebAssembly", "Emscripten", "HTML", "CSS", "JavaScript"],
    metrics: {
      "Speedup": "33,750x faster execution",
      "Search Steps": "Reduced from 2.6B to 122",
      "Replay Buffer": "3.2 MB Frame Buffer"
    },
    shortDesc: "An optimized C-based Sudoku solver compiled to WebAssembly, featuring a dynamic visual backtracking replay.",
    overview: "This project features an interactive browser-based Sudoku visualization powered by a C-compiled solver engine running on WebAssembly. The core backtracking solver was optimized using constraint satisfaction heuristics (Minimum Remaining Values), and data sharing is managed through Emscripten's linear memory heap.",
    starBullets: [
      "Optimized a C-based Sudoku solver using the Minimum Remaining Values (MRV) heuristic, reducing search steps on complex configurations from 2.6 billion to 122 iterations, representing a 33,750x execution speedup (from 226s to 0.024s).",
      "Designed and implemented WebAssembly cross-language IPC by allocating linear heap space using _malloc, writing to Emscripten's HEAP32 typed array, and releasing pointers via _free.",
      "Solved browser thread blocking during animation loops by engineering a historical replay buffer in C that logs board configurations, allowing instant C solving followed by step-by-step JS animation."
    ],
    interviewQAs: [
      {
        q: "How does the Minimum Remaining Values (MRV) heuristic improve performance so drastically?",
        a: "Plain DFS backtracking scans cells sequentially (top-left to bottom-right). If it makes a mistake in cell 2, it might explore billions of invalid sub-trees before backtracking. MRV is a constraint satisfaction heuristic. It scans the open cells and selects the one with the fewest valid options (the most constrained cell). If a cell has only 1 possible number, it fills it immediately. If a cell has 0 possible numbers, it backtracks immediately. This allows the search tree to prune invalid branches early, reducing steps from 2.6 billion to 122."
      },
      {
        q: "How do you pass data between JavaScript and WebAssembly?",
        a: "JavaScript and WASM share a unified linear memory heap. Since we cannot pass complex JS arrays directly to C functions, we allocate memory in the WASM heap using Module._malloc(boardSize * 4). We then copy the board's integers from JS into this memory using Module.HEAP32.set(boardData, pointer / 4). We pass this pointer as an integer argument to the C solver function. After solving, JS reads the updated board from the same HEAP32 offset, and finally releases the memory using Module._free(pointer) to prevent memory leaks."
      }
    ]
  },
  {
    id: "mnist-classifier",
    title: "MNIST Digit Classifier",
    category: "ai-ml",
    subtitle: "From-Scratch NumPy Neural Network",
    date: "May 2026",
    github: "https://github.com/Tanishqkumarpatel/MNIST",
    demo: "https://huggingface.co/spaces/devtanu/mnist-digit-classifier",
    tech: ["Python", "NumPy", "Flask", "Docker", "Jupyter", "GitHub Actions"],
    metrics: {
      "Test Accuracy": "97.86% on MNIST",
      "Architecture": "784-512-256-128-10",
      "Optimization": "Mini-batch Size 32"
    },
    shortDesc: "A 4-layer Feed-Forward Neural Network implemented from scratch in NumPy with vectorization, deployed as a containerized Flask app.",
    overview: "Implemented a complete multilayer perceptron neural network from first principles using only Python and NumPy. The codebase implements vectorized forward/backward propagation, He weight initialization, learning rate sweeps, and a numerically stable softmax activation function to classify handwritten digits. Deployed using Docker on Hugging Face Spaces.",
    starBullets: [
      "Designed and implemented a 4-layer deep neural network (784-512-256-128-10) using only NumPy and raw matrix calculus, achieving a 97.86% test accuracy on the MNIST dataset.",
      "Mitigated numerical instability (NaN errors) and vanishing gradients by implementing a numerically stable Softmax activation and Kaiming (He) weight initialization from scratch.",
      "Developed a robust preprocessing pipeline using PIL (grayscale, Lanczos resampling, bounding box cropping, and center-of-mass translation) to match real-world canvas drawings to MNIST dimensions."
    ],
    interviewQAs: [
      {
        q: "Why does subtracting the maximum in Softmax prevent overflow without changing the output?",
        a: "Exponentials grow extremely fast. If a neural network outputs a pre-activation value of 1000, e^1000 results in floating-point overflow (Infinity/NaN). If we subtract a constant C from all elements in the Softmax vector, we mathematically scale the numerators and denominators equally (since e^(x-c) = e^x * e^-c). By setting C = max(z), the largest element becomes e^0 = 1, and all other elements are negative (exponentiated to values between 0 and 1). This guarantees numerical stability while preserving exact probability distributions."
      },
      {
        q: "Explain He (Kaiming) weight initialization and why it is necessary.",
        a: "If we initialize weights too large, the activations in deeper layers grow exponentially, causing gradients to explode. If we initialize them too small, activations shrink to zero, causing vanishing gradients. Kaiming initialization draws weights from a normal distribution with mean 0 and standard deviation sqrt(2 / n_in), where n_in is the number of input units in the previous layer. This mathematically keeps the variance of the activations constant across all layers, allowing signals to propagate through deep networks without vanishing or exploding."
      }
    ]
  },
  {
    id: "astrobase",
    title: "AstroBase Database",
    category: "academic",
    subtitle: "Astronomical Database App (CPSC 304)",
    date: "April 2026",
    github: "https://github.com/Tanishqkumarpatel/AstroBase",
    demo: null,
    tech: ["Node.js", "Express", "JavaScript", "Oracle DB", "SQL"],
    metrics: {
      "Schema Design": "Boyce-Codd Normal Form (BCNF)",
      "Security": "Strict SQL Input Binding",
      "Query Engine": "Dynamic Multi-Condition Filters"
    },
    shortDesc: "A full-stack relational database application for space exploration modeling, normalized to BCNF and secured against SQL injection.",
    overview: "Built as part of UBC's relational databases course (CPSC 304), AstroBase manages space missions, celestial bodies, and space agency details. The database schema features class hierarchies and was normalized to BCNF (resolving physics-driven redundancies). The application features a dynamic condition query builder, sanitized to prevent SQL injection.",
    starBullets: [
      "Collaborated on designing and normalizing a complex Oracle Database schema to Boyce-Codd Normal Form (BCNF), isolating physical formulas (Mass-Radius-Gravity dependencies) to eliminate redundancy anomalies.",
      "Built a dynamic multi-condition search engine in Express using strict query parameter binding and input type verification to prevent SQL injection vulnerabilities.",
      "Enforced advanced database constraints using foreign keys, nested checks, and subclass relationships (Celestial Body subclasses) with ON DELETE CASCADE and ON DELETE SET NULL triggers."
    ],
    interviewQAs: [
      {
        q: "How did you normalize physics formulas into BCNF?",
        a: "In our Celestial Body table, we initially wanted to store mass, radius, and gravity. However, surface gravity is a physical formula (g = G*M/R^2). This creates dependencies like (mass, radius) -> gravity, violating BCNF because they are not superkeys. To solve this, we isolated these attributes into a separate MassRadiusGravity table. The Celestial Body table now references this table via foreign keys. This eliminated update anomalies where mass and radius could be updated without recalculating gravity."
      },
      {
        q: "How did you prevent SQL injection in your dynamic search engine?",
        a: "When users dynamically add query conditions (e.g. field = 'Astrophysics' OR work_experience > 5), we parse these rows on the server. Instead of concatenating the user input directly into the SQL string, we assign unique bind keys (e.g. :val0, :val1). We append these keys to the SQL query and pass the actual user input as a separate bind parameters object to the Oracle database driver. The driver sends the query and parameters separately, ensuring the input is treated strictly as data and never compiled as SQL command logic."
      }
    ]
  },
  {
    id: "mybooks",
    title: "MyBooks Collector",
    category: "academic",
    subtitle: "Personal Book Manager (CPSC 210)",
    date: "July 2024",
    github: "https://github.com/Tanishqkumarpatel/MyBooks",
    demo: null,
    tech: ["Java", "Swing (GUI)", "JSON Persistence", "JUnit 5"],
    metrics: {
      "Code Coverage": "Comprehensive Unit Testing",
      "Data Visualization": "Custom Graphics2D Engine",
      "UI Pattern": "Model-View Event Binding"
    },
    shortDesc: "A Java desktop book collection and reading habits tracking application, featuring custom graphics and JSON serialization.",
    overview: "Developed as a software construction project at UBC, MyBooks provides a clean OOP design to model, filter, and track reading metrics. It features a custom Java 2D graphics dashboard that dynamically draws bar graphs of reading progress, disk persistence using JSON file streaming, and rigorous JUnit testing.",
    starBullets: [
      "Designed a cohesive object-oriented domain model in Java utilizing encapsulation, inheritance, and collection operations, fully covered by JUnit 5 unit tests.",
      "Engineered an interactive desktop application using the Java Swing framework, implementing layout managers and asynchronous event-driven models (ActionListeners) to refresh UI states.",
      "Built a custom data visualization dashboard from scratch by overriding Java 2D paintComponent APIs, computing dynamic coordinates to render scaled bar graphs of reading ratios."
    ],
    interviewQAs: [
      {
        q: "Why did you choose an ArrayList over a HashSet to store books in a collection?",
        a: "An ArrayList maintains the insertion order, which is critical for showing the user their recently added books. It also permits duplicate entries (e.g., if a user has two different physical copies of the same book with different reading statuses, notes, or editions). A HashSet removes duplicates and doesn't guarantee ordering unless complex custom comparator/equals overrides are written. The ArrayList was the most natural fit for a structured list UI."
      },
      {
        q: "How did you manage coordinates scaling in your custom Java 2D Bar Chart component?",
        a: "In the overridden paintComponent method, the panel height and width can change dynamically if the user resizes the window. I calculated the bar heights relative to the maximum count of books. First, we determine the maximum value in the category, then we scale: barHeight = (value / maxValue) * maxHeight. We draw the rectangles using graphics2d.fillRect(x, y - barHeight, barWidth, barHeight). This guarantees that the graph is always fully visible and scales smoothly upon resizing."
      }
    ]
  }
];

// Helper data for courses
const coursesData = [
  { code: "CPSC 317", name: "Computer Networking", topics: "TCP/IP, HTTP, DNS, Socket programming, Routing, Network Security" },
  { code: "CPSC 213", name: "Computer Systems", topics: "C & x86 Assembly, memory models, pointers, stack/heap, threads, I/O" },
  { code: "CPSC 221", name: "Algorithms & Data Structures", topics: "Trees, graphs, hash tables, sorting, recursion, Big-O complexity" },
  { code: "CPSC 320", name: "Algorithm Design", topics: "Dynamic programming, greedy algorithms, divide & conquer, NP-completeness" },
  { code: "CPSC 304", name: "Relational Databases", topics: "ER modeling, Relational Algebra, SQL (DDL/DML), Normalization (BCNF)" },
  { code: "CPSC 210", name: "Software Construction", topics: "Object-Oriented Design, Java, Design Patterns, JUnit testing, Swing GUI" }
];
