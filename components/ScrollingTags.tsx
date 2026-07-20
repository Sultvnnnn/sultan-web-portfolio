"use client";

export default function ScrollingTags() {
  const tags = [
    "Artificial Intelligence",
    "Data Science",
    "Machine Learning",
    "Software Engineering",
    "Web Development",
    "Data Engineering",
    "Data Enthusiast",
    "RAG",
    "LLM",
    "Prompt Engineering",
    "Python",
  ];

  return (
    <div className="relative w-full mb-8 overflow-hidden font-sans group">
      <style jsx>{`
        .mask-gradient {
          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            black 15%,
            black 85%,
            transparent
          );
          mask-image: linear-gradient(
            to right,
            transparent,
            black 15%,
            black 85%,
            transparent
          );
        }
        .animate-scroll {
          animation: scroll 25s linear infinite;
        }
        .group:hover .animate-scroll {
          animation-play-state: paused;
        }
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            /* Bergeser tepat 50% dari total lebar kontainer */
            transform: translateX(-50%);
          }
        }
      `}</style>

      {/* Main Container */}
      <div className="mask-gradient w-full">
        {/* Track Animasi */}
        <div className="flex w-max animate-scroll">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-2 pr-2" aria-hidden={i === 1}>
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-4 py-1.5 rounded-full text-xs md:text-sm whitespace-nowrap transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 cursor-default border border-transparent dark:border-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
