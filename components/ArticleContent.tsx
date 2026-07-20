export default function ArticleContent() {
  return (
    <article className="prose prose-base md:prose-xl dark:prose-invert font-lora text-gray-800 dark:text-gray-200 max-w-none">
      <p className="lead text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 md:mb-10">
        Mahasiswa Informatika yang fokus mengembangkan keterampilan praktis di
        bidang Kecerdasan Buatan dan Sains Data untuk memecahkan masalah nyata
        dan menyiapkan karier masa depan.
      </p>

      {/* Work Experiences */}
      <h3 className="font-lora font-bold text-xl md:text-2xl mt-10 md:mt-12 mb-4 text-gray-900 dark:text-white">
        Work Experiences
      </h3>
      <div className="mb-10 text-sm md:text-base">
        <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
          <span className="font-bold text-base md:text-lg text-gray-900 dark:text-white">
            Studio Yoga meMULAi
            <br className="hidden md:block" />
            <p className="text-gray-600 dark:text-gray-400 font-medium mt-1 md:mt-0 md:mb-3">
              Software Engineer Intern
            </p>
          </span>
          <span className="text-gray-500 dark:text-gray-400 text-xs md:text-sm mt-2 md:mt-0 text-left md:text-right">
            Feb 2026 - May 2026
            <br className="hidden md:block" />
            <span className="md:hidden"> | </span>Jakarta, Indonesia (Remote)
          </span>
        </div>
        <ul className="list-disc pl-4 md:pl-5 space-y-2 text-gray-700 dark:text-gray-300 mt-4 md:mt-0">
          <li>
            Membangun pipeline Retrieval-Augmented Generation (RAG) menggunakan
            Supabase dengan ekstensi pgvector...
          </li>
          <li>
            Merancang dan mengelola struktur data pada Content Management System
            (CMS)...
          </li>
          <li>
            Mengembangkan backend service mandiri berbasis Node.js (Baileys)...
          </li>
          <li>
            Mengintegrasikan Large Language Model (LLM) Anthropic Claude...
          </li>
          <li>
            Berkolaborasi dalam pengembangan arsitektur sistem end-to-end
            menggunakan ekosistem Next.js dan Vercel...
          </li>
        </ul>
      </div>

      {/* Education */}
      <h3 className="font-lora font-bold text-xl md:text-2xl mt-10 md:mt-12 mb-4 text-gray-900 dark:text-white">
        Education
      </h3>
      <div className="mb-10 text-sm md:text-base">
        <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
          <h4 className="font-bold text-base md:text-lg text-gray-900 dark:text-white">
            Institut Teknologi Tangerang Selatan
          </h4>
          <span className="text-gray-500 dark:text-gray-400 text-xs md:text-sm mt-1 md:mt-0">
            Sep 2024 - Sep 2028 (Expected)
          </span>
        </div>
        <p className="text-gray-700 dark:text-gray-300 mt-1">
          Bachelor of Informatics, 3.90/4.00
        </p>
      </div>

      {/* Organisational Experience */}
      <h3 className="font-lora font-bold text-xl md:text-2xl mt-10 md:mt-12 mb-4 text-gray-900 dark:text-white">
        Organisational Experience
      </h3>
      <div className="mb-10 text-sm md:text-base">
        <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
          <h4 className="font-bold text-base md:text-lg text-gray-900 dark:text-white">
            Coding Camp by DBS Foundation x Dicoding Indonesia
          </h4>
          <span className="text-gray-500 dark:text-gray-400 text-xs md:text-sm mt-1 md:mt-0">
            Feb 2026 - Jul 2026
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-400 font-medium mb-2">
          Data Science Awardee & Capstone Data Scientist
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4 md:mb-3 text-sm">
          Program bootcamp intensif untuk mencetak talenta digital melalui
          pembelajaran end-to-end dan proyek kolaboratif.
        </p>
        <ul className="list-disc pl-4 md:pl-5 space-y-2 text-gray-700 dark:text-gray-300">
          <li>
            Menyelesaikan bootcamp intensif Data Science dan meraih sertifikat
            kompetensi teknis.
          </li>
          <li>
            Berkolaborasi dalam tim untuk merancang sistem rekomendasi berbasis
            kecerdasan buatan (context-aware)...
          </li>
          <li>
            Meraih skor Peer Review sempurna (100) atas kontribusi teknis...
          </li>
        </ul>
      </div>

      {/* Skills & Projects */}
      <h3 className="font-lora font-bold text-xl md:text-2xl mt-10 md:mt-12 mb-4 text-gray-900 dark:text-white">
        Skills, Projects & Achievements
      </h3>
      <div className="mb-10 text-sm md:text-base space-y-6">
        <div>
          <h4 className="font-bold text-gray-900 dark:text-white">
            DeepWell - Mental Health & Lifestyle Correlation Analysis System
            (2026)
          </h4>
          <p className="text-gray-700 dark:text-gray-300 mt-1">
            Membangun pipeline data end-to-end (data wrangling, cleaning, SMOTE
            untuk class imbalance) menggunakan Python...
          </p>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 dark:text-white">
            SkyBite - Weather-Based Food Recommendation System (2026)
          </h4>
          <p className="text-gray-700 dark:text-gray-300 mt-1">
            Merancang arsitektur client-server dengan FastAPI (backend) dan
            Next.js (frontend) yang mengintegrasikan data cuaca real-time...
          </p>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 dark:text-white">
            Public Perception Analysis of Christopher Nolan - IMDB 50K Sentiment
            Analysis (2025)
          </h4>
          <p className="text-gray-700 dark:text-gray-300 mt-1">
            Mengolah dan membersihkan dataset IMDB 50K, menerapkan LLM IBM
            Granite untuk klasifikasi opini...
          </p>
        </div>
      </div>
    </article>
  );
}
