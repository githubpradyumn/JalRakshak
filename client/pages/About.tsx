import { Droplets, Users, Target, Award, Globe, Heart, Code, Database, Cloud, Shield, Zap, Leaf } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const glass = "rounded-2xl border border-black bg-white/20 shadow-xl ring-1 ring-black/20 backdrop-blur-md dark:border-white/10 dark:bg-white/10 dark:ring-white/10";

export default function About() {
  const developers = [
    {
      name: "Dr. Sarah Johnson",
      role: "Lead Water Engineer",
      expertise: "Hydrology & Water Management",
      experience: "15+ years",
      avatar: "👩‍🔬",
      description: "Expert in sustainable water systems and community water management."
    },
    {
      name: "Michael Chen",
      role: "Full-Stack Developer",
      expertise: "React, Node.js, Cloud Architecture",
      experience: "8+ years",
      avatar: "👨‍💻",
      description: "Passionate about building scalable web applications for environmental causes."
    },
    {
      name: "Dr. Priya Sharma",
      role: "Climate Data Scientist",
      expertise: "Meteorology & Data Analysis",
      experience: "12+ years",
      avatar: "👩‍💼",
      description: "Specializes in weather pattern analysis and climate impact assessment."
    },
    {
      name: "Alex Rodriguez",
      role: "UI/UX Designer",
      expertise: "User Experience & Design Systems",
      experience: "6+ years",
      avatar: "👨‍🎨",
      description: "Creates intuitive interfaces that make complex data accessible to everyone."
    },
    {
      name: "Dr. James Wilson",
      role: "Environmental Consultant",
      expertise: "Sustainability & Policy",
      experience: "20+ years",
      avatar: "👨‍🏫",
      description: "Advises on environmental policies and sustainable development practices."
    },
    {
      name: "Emma Thompson",
      role: "Community Outreach Coordinator",
      expertise: "Education & Community Engagement",
      experience: "10+ years",
      avatar: "👩‍🏫",
      description: "Bridges the gap between technology and community needs through education."
    }
  ];

  const projectStats = [
    { icon: Users, label: "Communities Served", value: "500+", color: "text-blue-600" },
    { icon: Droplets, label: "Water Saved (Liters)", value: "2.5M+", color: "text-cyan-600" },
    { icon: Globe, label: "Countries", value: "15+", color: "text-green-600" },
    { icon: Award, label: "Awards Won", value: "8", color: "text-purple-600" }
  ];

  return (
    <main className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="relative isolate mb-16">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_top_left,theme(colors.blue.200/.45),transparent_50%),radial-gradient(ellipse_at_bottom_right,theme(colors.blue.300/.3),transparent_40%)] dark:bg-[radial-gradient(ellipse_at_top_left,rgba(37,99,235,0.15),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(56,189,248,0.12),transparent_45%)]" />
        <div className="absolute -top-40 -left-40 -z-10 size-[36rem] rounded-full bg-blue-300/20 blur-3xl filter dark:bg-blue-500/10" />
        <div className="absolute -bottom-40 -right-40 -z-10 size-[36rem] rounded-full bg-cyan-300/15 blur-3xl filter dark:bg-cyan-400/10" />
        
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-900 dark:text-blue-100 mb-4">
            About JalRakshak
          </h1>
          <p className="text-lg text-blue-700 dark:text-blue-300 max-w-3xl mx-auto">
            Empowering communities worldwide to conserve groundwater through intelligent rainwater harvesting solutions
          </p>
        </div>
      </section>

      {/* Project Overview */}
      <section className="mb-16">
        <Card className={`${glass} transition hover:-translate-y-1 hover:shadow-2xl hover:ring-blue-300/40 hover:shadow-blue-500/20`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl text-blue-900 dark:text-blue-100">
              <Droplets className="h-6 w-6 text-blue-600" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-blue-800 dark:text-blue-200 text-lg leading-relaxed">
              JalRakshak is a comprehensive water management platform that combines cutting-edge technology with environmental science to help communities make informed decisions about rainwater harvesting. Our mission is to democratize access to water conservation tools and create a sustainable future for generations to come.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {projectStats.map((stat, index) => (
                <div key={index} className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <stat.icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                  <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{stat.value}</div>
                  <div className="text-sm text-blue-700 dark:text-blue-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Technology Stack */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-8 text-center">Our Technology</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Cloud, title: "Real-time Weather Data", desc: "Integration with meteorological APIs for accurate rainfall predictions" },
            { icon: Database, title: "Data Analytics", desc: "Advanced algorithms for water harvesting feasibility analysis" },
            { icon: Shield, title: "Secure Platform", desc: "Enterprise-grade security for user data and privacy protection" },
            { icon: Zap, title: "Fast Performance", desc: "Optimized for speed and reliability across all devices" },
            { icon: Globe, title: "Global Reach", desc: "Multi-language support and worldwide weather data coverage" },
            { icon: Leaf, title: "Sustainability Focus", desc: "Built with environmental impact and carbon footprint in mind" }
          ].map((tech, index) => (
            <Card key={index} className={`${glass} transition hover:-translate-y-1 hover:shadow-2xl hover:ring-blue-300/40 hover:shadow-blue-500/20`}>
              <CardContent className="p-6 text-center">
                <tech.icon className="h-12 w-12 mx-auto mb-4 text-blue-600 dark:text-blue-400" />
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">{tech.title}</h3>
                <p className="text-blue-700 dark:text-blue-300 text-sm">{tech.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Development Team */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-8 text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {developers.map((dev, index) => (
            <Card key={index} className={`${glass} transition hover:-translate-y-2 hover:shadow-2xl hover:ring-blue-300/40 hover:shadow-blue-500/20 group`}>
              <CardContent className="p-6 text-center">
                <div className="text-6xl mb-4">{dev.avatar}</div>
                <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-1">{dev.name}</h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">{dev.role}</p>
                <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">{dev.expertise}</p>
                <div className="text-xs text-blue-600 dark:text-blue-400 mb-3 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-full inline-block">
                  {dev.experience}
                </div>
                <p className="text-sm text-blue-800 dark:text-blue-200">{dev.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Impact Statement */}
      <section>
        <Card className={`${glass} transition hover:-translate-y-1 hover:shadow-2xl hover:ring-blue-300/40 hover:shadow-blue-500/20`}>
          <CardContent className="p-8 text-center">
            <Heart className="h-16 w-16 mx-auto mb-6 text-red-500" />
            <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-4">Our Impact</h2>
            <p className="text-lg text-blue-800 dark:text-blue-200 max-w-3xl mx-auto">
              Since our launch, JalRakshak has helped communities across 15+ countries save over 2.5 million liters of water through intelligent rainwater harvesting. We believe that technology should serve humanity and the planet, and we're committed to making water conservation accessible to everyone, everywhere.
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
