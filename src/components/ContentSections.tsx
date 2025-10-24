import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Users, TrendingUp, Shield, Zap } from "lucide-react";

const ContentSections = () => {
  const sections = [
    {
      icon: Target,
      title: "Strategic Planning",
      description: "Develop comprehensive strategies that align with your business goals and market opportunities.",
      details: "Our expert team works closely with you to create actionable plans that drive sustainable growth and competitive advantage in your industry."
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Foster seamless communication and productivity across your entire organization.",
      details: "Utilize cutting-edge collaboration tools and methodologies to bring your team together, regardless of location, ensuring everyone works toward common objectives."
    },
    {
      icon: TrendingUp,
      title: "Business Growth",
      description: "Scale your operations efficiently while maintaining quality and customer satisfaction.",
      details: "Leverage data-driven insights and proven methodologies to expand your market reach, optimize operations, and accelerate revenue growth sustainably."
    },
    {
      icon: Shield,
      title: "Security & Compliance",
      description: "Protect your business assets with enterprise-grade security measures and compliance frameworks.",
      details: "Stay ahead of threats with robust security protocols, regular audits, and adherence to industry standards and regulations that safeguard your operations."
    },
    {
      icon: Zap,
      title: "Innovation & Technology",
      description: "Stay competitive with the latest technological advancements and innovative solutions.",
      details: "Transform your business with cutting-edge technologies, automation, and innovative approaches that streamline processes and create new opportunities."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Core Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive solutions designed to elevate your business to new heights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((section, index) => (
            <Card 
              key={index}
              className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <section.icon className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-2xl mb-2">{section.title}</CardTitle>
                <CardDescription className="text-base">
                  {section.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {section.details}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContentSections;
