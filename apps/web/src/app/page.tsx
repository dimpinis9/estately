import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Landing() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        {/* Header */}
        <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-primary/20 dark:border-primary/30 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm px-10 py-3">
          <div className="flex items-center gap-4">
            <div className="size-8 bg-gradient-to-br from-primary to-pink-500 rounded-lg flex items-center justify-center text-white">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 2v8L8 8l2-2V2h6l-2 2 2 2v8l-2-2 2 2v8h-6v-6H4v6H2V2h8z" />
              </svg>
            </div>
            <h2 className="text-text-light dark:text-text-dark text-xl font-bold">
              Estately
            </h2>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a
              className="text-muted-light dark:text-muted-dark hover:text-primary dark:hover:text-text-dark text-sm font-medium"
              href="#"
            >
              Search
            </a>
            <a
              className="text-muted-light dark:text-muted-dark hover:text-primary dark:hover:text-text-dark text-sm font-medium"
              href="#"
            >
              Buy
            </a>
            <a
              className="text-muted-light dark:text-muted-dark hover:text-primary dark:hover:text-text-dark text-sm font-medium"
              href="#"
            >
              Rent
            </a>
            <a
              className="text-muted-light dark:text-muted-dark hover:text-primary dark:hover:text-text-dark text-sm font-medium"
              href="#"
            >
              Sell
            </a>
            <a
              className="text-muted-light dark:text-muted-dark hover:text-primary dark:hover:text-text-dark text-sm font-medium"
              href="#"
            >
              Mortgage
            </a>
            <a
              className="text-muted-light dark:text-muted-dark hover:text-primary dark:hover:text-text-dark text-sm font-medium"
              href="#"
            >
              Agent Finder
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Button
              asChild
              className="bg-primary text-white font-bold transition-transform duration-300 hover:scale-105"
            >
              <Link href="/register">Sign up</Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="bg-primary/20 dark:bg-primary/30 text-primary dark:text-text-dark border-primary/30 font-bold transition-transform duration-300 hover:scale-105"
            >
              <Link href="/login">Log in</Link>
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex flex-1 flex-col items-center">
          <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <section className="relative py-24 sm:py-32 flex items-center justify-center text-center">
              <div
                className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `linear-gradient(rgba(25, 16, 34, 0.8) 0%, rgba(25, 16, 34, 0.9) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBCc4M2yUpYRN-V6qx3BajCrsbUE3OpgfWdE5uS7tt66rfcbJWrth0nrxwOAfkdNm709Iiu9tXurDJAMDUOLz6iK5GNE6mQjj3_xgeNUsQNc00na-hoLtBYWHtxD5SHiOttUowWfSA_hgDk7ieFZrmaVpMpNzi92sL4rC8wbvpAjBBp49j_UgUV18UzqYomWhngwMVqfDQrAUSX-zo1IFkwILGAohXsS2y7nobe1Kmqo_TkDu1-_5wDcFsROAJRV0OPqFkIQ1YVuIY")`,
                }}
              ></div>
              <div className="absolute inset-0 -z-20 h-full w-full bg-background-dark [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
              <div className="flex flex-col gap-8 items-center max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-400">
                  Find your perfect place with Estately
                </h1>
                <p className="text-lg md:text-xl text-gray-300 dark:text-gray-400 max-w-2xl">
                  Discover your dream home with our innovative real estate
                  platform. Explore listings, connect with agents, and secure
                  your future.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button
                    asChild
                    className="bg-primary text-white font-bold shadow-lg shadow-primary/30 transition-transform duration-300 hover:scale-105 h-12 px-6"
                  >
                    <Link href="/register">Get Started</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-white/10 dark:bg-white/20 text-white font-bold backdrop-blur-sm border border-white/20 transition-transform duration-300 hover:scale-105 hover:bg-white/20 h-12 px-6"
                  >
                    <Link href="/dashboard">Explore Listings</Link>
                  </Button>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="py-20 sm:py-28">
              <div className="flex flex-col gap-4 text-center mb-12">
                <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-text-light dark:text-text-dark">
                  Feature Highlights
                </h2>
                <p className="text-lg text-muted-light dark:text-muted-dark max-w-3xl mx-auto">
                  Our platform offers a comprehensive suite of tools to help you
                  find, buy, and manage your dream home.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="flex flex-col gap-4 rounded-xl border border-primary/20 dark:border-primary/30 bg-primary/10 dark:bg-primary/20 p-6 text-center items-center transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2">
                  <div className="flex items-center justify-center size-16 rounded-full bg-gradient-to-br from-primary to-pink-500 text-white mb-4">
                    <svg
                      className="w-8 h-8"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2L2 7v10c0 5.55 3.84 9.29 9 10 5.16-.71 9-4.45 9-10V7l-10-5z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-text-light dark:text-text-dark">
                    Extensive Property Listings
                  </h3>
                  <p className="text-muted-light dark:text-muted-dark">
                    Access thousands of up-to-date property listings across the
                    nation, with detailed information and high-quality images.
                  </p>
                </div>
                <div className="flex flex-col gap-4 rounded-xl border border-primary/20 dark:border-primary/30 bg-primary/10 dark:bg-primary/20 p-6 text-center items-center transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2">
                  <div className="flex items-center justify-center size-16 rounded-full bg-gradient-to-br from-primary to-pink-500 text-white mb-4">
                    <svg
                      className="w-8 h-8"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-text-light dark:text-text-dark">
                    Advanced Search Filters
                  </h3>
                  <p className="text-muted-light dark:text-muted-dark">
                    Refine your search with advanced filters, including price
                    range, property type, size, and more, to find the perfect
                    match.
                  </p>
                </div>
                <div className="flex flex-col gap-4 rounded-xl border border-primary/20 dark:border-primary/30 bg-primary/10 dark:bg-primary/20 p-6 text-center items-center transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2">
                  <div className="flex items-center justify-center size-16 rounded-full bg-gradient-to-br from-primary to-pink-500 text-white mb-4">
                    <svg
                      className="w-8 h-8"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-6h8v-2c0-1.32.94-2.5 2.24-2.82L15 7.1c.64-.16 1.31-.1 1.91.22L19 8.5c.48.31.77.83.77 1.39V13h2v5H4z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-text-light dark:text-text-dark">
                    Expert Agent Network
                  </h3>
                  <p className="text-muted-light dark:text-muted-dark">
                    Connect with experienced real estate agents who can guide
                    you through the buying process and provide expert advice.
                  </p>
                </div>
              </div>
            </section>

            {/* Dashboard Preview */}
            <section className="py-20 sm:py-28 text-center">
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-text-light dark:text-text-dark mb-12">
                Dashboard Preview
              </h2>
              <div className="relative aspect-[4/3] rounded-xl shadow-2xl shadow-primary/20 overflow-hidden group">
                <div
                  className="absolute inset-0 bg-center bg-no-repeat bg-cover rounded-xl"
                  style={{
                    backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuA7od_xlKCNLUdMi36a5Wu5k2_GwgbDRvpjGxjo_nZZCHTO3j2EYp2TI0UkS_spKFWE8a2VvBMguBypOo5Yfg9uMOcLSwCsEa8F4-npcnBxdfgHpLqsnDo8Cl7vP9bp209iO2vTix7Zc57kw5ejJlQmHuuuu2Ga3h19qqfdAf-zHAavFoeQ5grMc0_b-QL1ewZjz8Eh_JPQRA7rsqXOJeGVwC1Ba0Z83RDcM6h6-3VCSiQRrPtL2jag2Qw7-6G9JgMO6jAm_ySSne8")`,
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute inset-0 ring-1 ring-inset ring-primary/20 rounded-xl"></div>
              </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 sm:py-28">
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-center text-text-light dark:text-text-dark mb-12">
                What Our Clients Say
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="flex flex-col gap-4 rounded-xl border border-primary/20 dark:border-primary/30 bg-surface-light dark:bg-surface-dark p-6">
                  <div className="flex items-center gap-4">
                    <div className="relative size-12">
                      <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12"
                        style={{
                          backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCAh943nouZzmsub70jVHRqCGX-3nKFcJJf0u-Q4HrNBRMOo7cKycdQyEDqzRGmbmwvStTUOZZk56ewrEDpU-wyXKUH-YGwh-k2DwD9KCCyNh0XsRPWo0FGeezSLNgf02wIvYrDmr9kfXhtXBvdniwlxOnf9Z6Ai6dvWxVyuZwqpuByQhjyp5-2nRwVIb3bGLw7EznQ23vMpvRUl2ZBrtH-Go_RyHjc9rdFDuyaAObkftwU--Rvkhnibw_Mi2eQbOYdiFpdjoRC1kQ")`,
                        }}
                      ></div>
                      <div className="absolute inset-0 rounded-full ring-2 ring-offset-2 ring-offset-surface-light dark:ring-offset-surface-dark ring-primary"></div>
                    </div>
                    <div>
                      <p className="text-text-light dark:text-text-dark font-semibold">
                        Sophia Carter
                      </p>
                      <p className="text-muted-light dark:text-muted-dark text-sm">
                        2023-08-15
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1 text-primary">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-muted-light dark:text-muted-dark">
                    "Estately made finding my new home a breeze! The search
                    filters are incredibly detailed, and I found my dream house
                    in no time."
                  </p>
                </div>
                <div className="flex flex-col gap-4 rounded-xl border border-primary/20 dark:border-primary/30 bg-surface-light dark:bg-surface-dark p-6">
                  <div className="flex items-center gap-4">
                    <div className="relative size-12">
                      <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12"
                        style={{
                          backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBEQ_W4ZD8AbezA2vuc5qEEPBDQa52t6ahTIhLL2vizd8VmvPiiflgVvREY-L021iPlaalhjOCu-muH6qgmnbggu4QXjfHB7ntpcO0aAK8L2JnKdBaGCodICSL-bWrvCKkzbgQCvmWXeflvkz8hAUf1HjpHMVwnWe5BU5VY_TUzvvul3i4HCJIDXQXE_z2wjcXGbPMzLQHia_y-4eOwTzF_KsaEZf4t4mAHNcuP4iAZVJme2_cp0fU9-B7e6O8ANyGkmSAGxzE9ur0")`,
                        }}
                      ></div>
                      <div className="absolute inset-0 rounded-full ring-2 ring-offset-2 ring-offset-surface-light dark:ring-offset-surface-dark ring-primary"></div>
                    </div>
                    <div>
                      <p className="text-text-light dark:text-text-dark font-semibold">
                        Ethan Bennett
                      </p>
                      <p className="text-muted-light dark:text-muted-dark text-sm">
                        2023-09-22
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1 text-primary">
                    {[...Array(4)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                    <svg
                      className="w-5 h-5 text-muted-light dark:text-muted-dark"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                  <p className="text-muted-light dark:text-muted-dark">
                    "The agent I connected with through Estately was fantastic.
                    They were knowledgeable and helped me navigate the buying
                    process smoothly."
                  </p>
                </div>
                <div className="flex flex-col gap-4 rounded-xl border border-primary/20 dark:border-primary/30 bg-surface-light dark:bg-surface-dark p-6">
                  <div className="flex items-center gap-4">
                    <div className="relative size-12">
                      <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12"
                        style={{
                          backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCFjwq5wvr23ch3rFQ0eojm_s01kp9ot8leSy4SYif03xvNId0FFVw__1dI1hFhWReVK_6mVqVqjhNuBaJnuPWuujdP4giaTTbbSxhAEC668MRuxiNAg6fFs8hk2ST4deO09dxBfQNcssqoBxk-EKv6W2FPqOqzvRhCxUfmK7-1Y7O_GiEcgoE8gtuDGFv_dFhV8KtBlIGmqm8eVA5XROrtZZGCxN-LHD4YIwFf-KwN64Ll0fWifgYX6fiF70Jn7v_U3WAUnWa4xRo")`,
                        }}
                      ></div>
                      <div className="absolute inset-0 rounded-full ring-2 ring-offset-2 ring-offset-surface-light dark:ring-offset-surface-dark ring-primary"></div>
                    </div>
                    <div>
                      <p className="text-text-light dark:text-text-dark font-semibold">
                        Olivia Hayes
                      </p>
                      <p className="text-muted-light dark:text-muted-dark text-sm">
                        2023-10-10
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1 text-primary">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-muted-light dark:text-muted-dark">
                    "I love the user-friendly interface and the wealth of
                    information available on each listing. Estately is a
                    game-changer for real estate."
                  </p>
                </div>
              </div>
            </section>

            {/* Pricing */}
            <section className="py-20 sm:py-28">
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-center text-text-light dark:text-text-dark mb-12">
                Choose Your Plan
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                <div className="flex flex-col gap-6 rounded-xl border border-primary/20 dark:border-primary/30 bg-surface-light dark:bg-surface-dark p-8 transition-all duration-300 hover:border-primary">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold text-text-light dark:text-text-dark">
                      Basic
                    </h3>
                    <p className="flex items-baseline gap-2">
                      <span className="text-5xl font-extrabold text-text-light dark:text-text-dark tracking-tight">
                        Free
                      </span>
                      <span className="text-muted-light dark:text-muted-dark">
                        /month
                      </span>
                    </p>
                  </div>
                  <Button className="w-full bg-primary/20 dark:bg-primary/30 text-primary dark:text-text-dark font-bold transition-transform duration-300 hover:scale-105">
                    Get Started
                  </Button>
                  <ul className="flex flex-col gap-3 text-muted-light dark:text-muted-dark">
                    <li className="flex items-center gap-3">
                      <svg
                        className="w-5 h-5 text-primary"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                      Access to basic listings
                    </li>
                    <li className="flex items-center gap-3">
                      <svg
                        className="w-5 h-5 text-primary"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                      Limited search filters
                    </li>
                    <li className="flex items-center gap-3">
                      <svg
                        className="w-5 h-5 text-primary"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                      Community support
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col gap-6 rounded-xl border-2 border-primary bg-primary/10 dark:bg-primary/20 p-8 relative shadow-2xl shadow-primary/30 transform scale-105">
                  <div className="absolute top-0 right-8 -translate-y-1/2">
                    <p className="text-white text-xs font-bold leading-normal tracking-[0.015em] rounded-full bg-primary px-4 py-1 text-center">
                      Popular
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold text-text-light dark:text-text-dark">
                      Premium
                    </h3>
                    <p className="flex items-baseline gap-2">
                      <span className="text-5xl font-extrabold text-text-light dark:text-text-dark tracking-tight">
                        $19
                      </span>
                      <span className="text-muted-light dark:text-muted-dark">
                        /month
                      </span>
                    </p>
                  </div>
                  <Button className="w-full bg-primary text-white font-bold transition-transform duration-300 hover:scale-105">
                    Upgrade
                  </Button>
                  <ul className="flex flex-col gap-3 text-muted-light dark:text-muted-dark">
                    <li className="flex items-center gap-3">
                      <svg
                        className="w-5 h-5 text-primary"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                      Access to all listings
                    </li>
                    <li className="flex items-center gap-3">
                      <svg
                        className="w-5 h-5 text-primary"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                      Advanced search filters
                    </li>
                    <li className="flex items-center gap-3">
                      <svg
                        className="w-5 h-5 text-primary"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                      Priority support
                    </li>
                    <li className="flex items-center gap-3">
                      <svg
                        className="w-5 h-5 text-primary"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                      Agent matching
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col gap-6 rounded-xl border border-primary/20 dark:border-primary/30 bg-surface-light dark:bg-surface-dark p-8 transition-all duration-300 hover:border-primary">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold text-text-light dark:text-text-dark">
                      Pro
                    </h3>
                    <p className="flex items-baseline gap-2">
                      <span className="text-5xl font-extrabold text-text-light dark:text-text-dark tracking-tight">
                        $49
                      </span>
                      <span className="text-muted-light dark:text-muted-dark">
                        /month
                      </span>
                    </p>
                  </div>
                  <Button className="w-full bg-primary/20 dark:bg-primary/30 text-primary dark:text-text-dark font-bold transition-transform duration-300 hover:scale-105">
                    Upgrade
                  </Button>
                  <ul className="flex flex-col gap-3 text-muted-light dark:text-muted-dark">
                    <li className="flex items-center gap-3">
                      <svg
                        className="w-5 h-5 text-primary"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                      Everything in Premium
                    </li>
                    <li className="flex items-center gap-3">
                      <svg
                        className="w-5 h-5 text-primary"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                      24/7 dedicated support
                    </li>
                    <li className="flex items-center gap-3">
                      <svg
                        className="w-5 h-5 text-primary"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                      Personalized agent
                    </li>
                    <li className="flex items-center gap-3">
                      <svg
                        className="w-5 h-5 text-primary"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                      Exclusive market reports
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 sm:py-28">
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary via-purple-600 to-pink-600 p-12 sm:p-20 text-center flex flex-col items-center">
                <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/10 rounded-full opacity-50"></div>
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full opacity-50"></div>
                <div className="flex flex-col gap-6 items-center z-10">
                  <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                    Ready to find your dream home?
                  </h2>
                  <p className="text-lg text-white/80 max-w-2xl">
                    Sign up today and start exploring the possibilities with
                    Estately.
                  </p>
                  <Button
                    asChild
                    className="bg-white text-primary font-bold shadow-lg transition-transform duration-300 hover:scale-105 h-12 px-6"
                  >
                    <Link href="/register">Get Started Now</Link>
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-primary/10 dark:bg-primary/20 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-4">
                <div className="size-8 bg-gradient-to-br from-primary to-pink-500 rounded-lg flex items-center justify-center text-white">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M10 2v8L8 8l2-2V2h6l-2 2 2 2v8l-2-2 2 2v8h-6v-6H4v6H2V2h8z" />
                  </svg>
                </div>
                <h2 className="text-text-light dark:text-text-dark text-xl font-bold">
                  Estately
                </h2>
              </div>
              <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                <a
                  className="text-muted-light dark:text-muted-dark hover:text-primary dark:hover:text-text-dark text-sm"
                  href="#"
                >
                  About
                </a>
                <a
                  className="text-muted-light dark:text-muted-dark hover:text-primary dark:hover:text-text-dark text-sm"
                  href="#"
                >
                  Contact
                </a>
                <a
                  className="text-muted-light dark:text-muted-dark hover:text-primary dark:hover:text-text-dark text-sm"
                  href="#"
                >
                  Terms of Service
                </a>
                <a
                  className="text-muted-light dark:text-muted-dark hover:text-primary dark:hover:text-text-dark text-sm"
                  href="#"
                >
                  Privacy Policy
                </a>
              </nav>
              <div className="flex justify-center gap-6">
                <a
                  className="text-muted-light dark:text-muted-dark hover:text-primary dark:hover:text-text-dark"
                  href="#"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.46,6.56 C21.76,6.84 20.99,7.04 20.19,7.14 C21.03,6.63 21.68,5.82 21.99,4.86 C21.2,5.32 20.35,5.67 19.45,5.88 C18.7,5.08 17.65,4.5 16.46,4.5 C14.2,4.5 12.36,6.34 12.36,8.6 C12.36,8.92 12.4,9.23 12.46,9.53 C9.01,9.36 5.96,7.73 3.9,5.29 C3.53,5.92 3.32,6.66 3.32,7.45 C3.32,8.85 4.04,10.09 5.12,10.79 C4.47,10.77 3.86,10.59 3.33,10.32 C3.33,10.34 3.33,10.35 3.33,10.37 C3.33,12.32 4.74,13.94 6.6,14.32 C6.27,14.41 5.91,14.46 5.54,14.46 C5.28,14.46 5.02,14.43 4.77,14.38 C5.29,15.96 6.78,17.11 8.54,17.14 C7.15,18.23 5.4,18.88 3.5,18.88 C3.17,18.88 2.85,18.86 2.54,18.82 C4.32,19.98 6.42,20.66 8.68,20.66 C16.45,20.66 20.38,14.28 20.38,8.9 C20.38,8.71 20.38,8.53 20.37,8.34 C21.17,7.79 21.88,7.1 22.46,6.56 Z" />
                  </svg>
                </a>
                <a
                  className="text-muted-light dark:text-muted-dark hover:text-primary dark:hover:text-text-dark"
                  href="#"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      clipRule="evenodd"
                      d="M22,12C22,6.48,17.52,2,12,2S2,6.48,2,12c0,4.84,3.44,8.87,8,9.8V15H8v-3h2V9.5C10,7.57,11.57,6,13.5,6H16v3h-1.5c-1,0-1.5,0.7-1.5,1.5V12h3l-0.5,3H13v6.95C18.05,21.45,22,17.19,22,12Z"
                      fillRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  className="text-muted-light dark:text-muted-dark hover:text-primary dark:hover:text-text-dark"
                  href="#"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      clipRule="evenodd"
                      d="M12,2C8.74,2,8.33,2.02,7.05,2.09C5.77,2.16,4.9,2.32,4.14,2.63C3.39,2.93,2.93,3.39,2.63,4.14C2.32,4.9,2.16,5.77,2.09,7.05C2.02,8.33,2,8.74,2,12s0.02,3.67,0.09,4.95c0.07,1.28,0.23,2.15,0.54,2.91c0.3,0.75,0.75,1.21,1.5,1.5c0.76,0.31,1.63,0.47,2.91,0.54C8.33,21.98,8.74,22,12,22s3.67,-0.02,4.95,-0.09c1.28,-0.07,2.15,-0.23,2.91,-0.54c0.75,-0.3,1.21,-0.75,1.5,-1.5c0.31,-0.76,0.47,-1.63,0.54,-2.91C21.98,15.67,22,15.26,22,12s-0.02,-3.67,-0.09,-4.95c-0.07,-1.28,-0.23,-2.15,-0.54,-2.91c-0.3,-0.75,-0.75,-1.21,-1.5,-1.5c-0.76,-0.31,-1.63,-0.47,-2.91,-0.54C15.67,2.02,15.26,2,12,2zM12,4c3.26,0,3.64,0.01,4.9,0.07c1.1,0.06,1.66,0.23,2.04,0.39c0.47,0.19,0.78,0.42,1.1,0.73c0.31,0.31,0.54,0.63,0.73,1.1c0.16,0.38,0.32,0.94,0.39,2.04C21.99,8.36,22,8.74,22,12s-0.01,3.64,-0.07,4.9c-0.06,1.1,-0.23,1.66,-0.39,2.04c-0.19,0.47,-0.42,0.78,-0.73,1.1c-0.31,0.31,-0.63,0.54,-1.1,0.73c-0.38,0.16,-0.94,0.32,-2.04,0.39C15.64,21.99,15.26,22,12,22s-3.64,-0.01,-4.9,-0.07c-1.1,-0.06,-1.66,-0.23,-2.04,-0.39c-0.47,-0.19,-0.78,-0.42,-1.1,-0.73c-0.31,-0.31,-0.54,-0.63,-0.73,-1.1c-0.16,-0.38,-0.32,-0.94,-0.39,-2.04C2.01,15.64,2,15.26,2,12s0.01,-3.64,0.07,-4.9c0.06,-1.1,0.23,-1.66,0.39,-2.04C2.65,4.59,2.88,4.28,3.2,3.96C3.5,3.65,3.82,3.42,4.29,3.23C4.67,3.07,5.23,2.91,6.33,2.84C7.64,2.01,8,2,12,2zM12,7.25c-2.62,0,-4.75,2.13,-4.75,4.75S9.38,16.75,12,16.75s4.75,-2.13,4.75,-4.75S14.62,7.25,12,7.25zM12,14.75c-1.52,0,-2.75,-1.23,-2.75,-2.75s1.23,-2.75,2.75,-2.75s2.75,1.23,2.75,2.75S13.52,14.75,12,14.75zM18.75,6.5a1.25,1.25,0,1,1,-2.5,0a1.25,1.25,0,0,1,2.5,0z"
                      fillRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div className="mt-8 border-t border-primary/20 dark:border-primary/30 pt-8 text-center text-sm text-muted-light dark:text-muted-dark">
              <p>© 2024 Estately. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
