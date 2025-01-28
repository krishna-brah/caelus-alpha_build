// import { NextPage } from 'next';
// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { useRouter } from 'next/router';
// import Image from 'next/image';
// import Link from 'next/link';

// const fadeIn = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.6, ease: 'easeOut' }
//   }
// };

// const stagger = {
//   visible: {
//     transition: {
//       staggerChildren: 0.1
//     }
//   }
// };

// const WelcomePage: NextPage = () => {
//   const [email, setEmail] = useState('');
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
    
//     try {
//       // Store email in session/local storage or state management
//       localStorage.setItem('userEmail', email);
//       router.push('/profile-sort');
//     } catch (error) {
//       console.error('Error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="min-h-screen relative overflow-hidden">
//         {/* Full-screen Logo Background */}
//         <div className="fixed inset-0 w-full h-full">
//           <Image
//             src="/images/logo.webp"
//             alt="CÆLEUS Logo Background"
//             fill
//             className="object-cover object-center opacity-[0.15] scale-[3] transform rotate-12"
//             priority
//           />
//           <div className="absolute inset-0 bg-gradient-to-b from-cosmic-900/90 via-cosmic-900/85 to-cosmic-900/95" />
//         </div>

//         {/* Overlay Pattern */}
//         <div className="absolute inset-0 bg-[url('/patterns/stars.svg')] bg-repeat opacity-5" />

//         {/* Content */}
//         <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
//           <motion.div
//             initial="hidden"
//             animate="visible"
//             variants={stagger}
//             className="text-center"
//           >
//             {/* Main Title */}
//             <motion.div
//               variants={fadeIn}
//               className="text-center mb-16"
//             >

//               <h1 className="text-8xl sm:text-9xl md:text-[12rem] font-bold mb-8 font-space-grotesk tracking-tight relative [letter-spacing:-0.05em]">
//                 <Link href="/intro" className="text-white relative z-10 drop-shadow-lg hover:text-cosmic-400 transition-colors duration-200 cursor-pointer">
//                   CÆLEUS
//                 </Link>
//                 <div className="absolute inset-0 blur-3xl opacity-30 bg-gradient-cosmic scale-110" />
//               </h1>
//               <p className="text-2xl sm:text-3xl md:text-4xl text-cosmic-100 mb-8 font-space-grotesk tracking-wide drop-shadow-md">
//                 Join our sustainable fashion revolution
//               </p>
//               <p className="text-xl text-cosmic-50/90 max-w-3xl mx-auto font-inter leading-relaxed drop-shadow">
//                 Connect with designers, discover eco-friendly fabrics, and make a positive impact on the fashion industry.
//               </p>
//             </motion.div>

//             {/* Email Form */}
//             <motion.div
//               variants={fadeIn}
//               className="max-w-md mx-auto mb-24"
//             >
//               <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                   <div>
//                     <label
//                       htmlFor="email"
//                       className="block text-lg font-medium text-cosmic-100 mb-3 font-space-grotesk"
//                     >
//                       Enter your email to get started
//                     </label>
//                     <input
//                       id="email"
//                       name="email"
//                       type="email"
//                       required
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg 
//                         text-white placeholder-cosmic-300 focus:outline-none focus:ring-2 focus:ring-cosmic-500
//                         font-inter"
//                       placeholder="your@email.com"
//                     />
//                   </div>

//                   <button
//                     type="submit"
//                     disabled={loading}
//                     className="w-full px-6 py-4 text-lg font-semibold bg-gradient-to-r from-cosmic-500 to-cosmic-600 
//                       hover:from-cosmic-600 hover:to-cosmic-700 text-white rounded-xl transition-all duration-200 
//                       shadow-xl hover:shadow-cosmic-500/25 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100
//                       font-space-grotesk"
//                   >
//                     {loading ? (
//                       <div className="flex items-center justify-center">
//                         <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2" />
//                         Processing...
//                       </div>
//                     ) : (
//                       'Start Creating'
//                     )}
//                   </button>
//                 </form>
//               </div>
//             </motion.div>

//             {/* Features */}
//             <motion.div
//               variants={fadeIn}
//               className="grid grid-cols-1 md:grid-cols-3 gap-8"
//             >
//               {[
//                 {
//                   title: 'AI-Powered Design',
//                   description: 'Get intelligent suggestions and enhance your designs with our advanced AI assistant.',
//                   icon: '🤖',
//                   link: '/main-hub'
//                 },
//                 {
//                   title: 'Sustainable Focus',
//                   description: 'Access eco-friendly materials and sustainable practices for conscious creation.',
//                   icon: '🌱',
//                   link: '/fabric-gallery'
//                 },
//                 {
//                   title: 'Global Community',
//                   description: 'Connect with designers and creators who share your vision for sustainable fashion.',
//                   icon: '🌍',
//                   link: '/marketplace'
//                 }
//               ].map((feature) => (
//                 <div
//                   key={feature.title}
//                   className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 
//                     shadow-2xl hover:shadow-cosmic-500/20 transition-all duration-300 hover:-translate-y-1 
//                     group cursor-pointer"
//                   onClick={() => router.push(feature.link)}
//                 >
//                   <div className="text-5xl mb-6 animate-float group-hover:scale-110 transition-transform duration-300">
//                     {feature.icon}
//                   </div>
//                   <h3 className="text-2xl font-bold text-white mb-3 font-space-grotesk">
//                     {feature.title}
//                   </h3>
//                   <p className="text-cosmic-100/80 font-inter">
//                     {feature.description}
//                   </p>
//                 </div>
//               ))}
//             </motion.div>
//           </motion.div>
//         </div>
//       </main>
//     );
//   };



// export default WelcomePage;