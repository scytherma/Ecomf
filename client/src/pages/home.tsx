import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { 
  CheckCircle2, 
  Sparkles, 
  Users, 
  TrendingUp, 
  Clock, 
  Gift,
  ChevronDown,
  Play,
  Star,
  Award,
  BookOpen,
  Zap,
  Target,
  MessageCircle,
  Instagram,
  Facebook,
  Youtube,
  Mail,
  Phone,
  Loader2,
  Store,
  Lock,
  Megaphone,
  Rocket,
  Globe,
} from "lucide-react";
import { SiShopee, SiAmazon, SiTiktok } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertContactLeadSchema } from "@shared/schema";

import heroBanner from "@assets/fundo banner site ecomfy_1763876167157.png";
import mentorDiogo from "@assets/Mentor diogo_1763848325108.jpg";
import mentorOliveira from "@assets/MENTOR OLIVEIRAa_1763852347253.png";
import dashboardImage from "@assets/generated_images/E-commerce_sales_dashboard_interface_424066ef.png";
import learningImage from "@assets/generated_images/e-commerce_mastery_learning_journey_illustration.png";
import testimonialWoman from "@assets/generated_images/Student_testimonial_portrait_woman_f0a043ed.png";
import testimonialMan from "@assets/generated_images/Student_testimonial_portrait_man_ee5ff9bd.png";
import mercadoLivreLogo from "@assets/ml roc_1763860918953.png";
import mercadoLivreLogoColor from "@assets/420-4206772_mercado-livre-logo-mercadolibre-inc_1763877352782.png";
import ttkshpLogo from "@assets/ttkshp_1763877896397.png";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  initial: {},
  whileInView: {},
  viewport: { once: true },
};

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function Home() {
  const { toast } = useToast();
  const [isScrolling, setIsScrolling] = useState(false);
  
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);
  
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 34,
    seconds: 56,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const contactMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: (response: any) => {
      toast({
        title: "Mensagem enviada!",
        description: response.message || "Entraremos em contato em breve.",
        variant: "default",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao enviar mensagem",
        description: error.message || "Por favor, tente novamente.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate with Zod before sending
    const validation = insertContactLeadSchema.safeParse(formData);
    
    if (!validation.success) {
      const firstError = validation.error.errors[0];
      toast({
        title: "Erro de validação",
        description: firstError.message,
        variant: "destructive",
      });
      return;
    }
    
    contactMutation.mutate(validation.data);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            }
          }
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const platforms = [
    { 
      name: "Shopee", 
      icon: SiShopee, 
      color: "#EE4D2D",
      description: "Aprenda estratégias avançadas para dominar a Shopee e aumentar suas vendas"
    },
    { 
      name: "Mercado Livre", 
      image: mercadoLivreLogoColor,
      color: "#FFE600",
      description: "Técnicas comprovadas para se destacar no maior marketplace da América Latina"
    },
    { 
      name: "Amazon", 
      icon: SiAmazon, 
      color: "#FF9900",
      description: "Domine a Amazon Brasil e escale seu negócio com estratégias profissionais"
    },
    { 
      name: "TikTok Shop", 
      image: ttkshpLogo, 
      color: "#000000",
      description: "Aproveite a explosão do TikTok Shop e venda através de conteúdo viral"
    },
  ];

  const objectives = [
    "Identificar produtos vencedores com validação de mercado + análise de demanda comprovada",
    "Criar anúncios high-converting que geram 3-5x ROI com copywriting estratégico",
    "Dominar precificação psicológica + margem de lucro real (não é ganhar volume perdendo na margem)",
    "Escalar de R$ 5mil para R$ 100mil/mês com sistemas replicáveis e automáticos",
    "Otimizar logística, estoque inteligente e gestão de fornecedores para lucro máximo",
    "Construir marca irrefutável que fideliza clientes e gera vendas repetidas",
  ];

  const modules = [
    { 
      image: mercadoLivreLogo,
      title: "Mercado Livre Pro", 
      lessons: 18,
      description: "Do zero ao topo do ranking + anúncios que vendem sozinhos"
    },
    { 
      icon: SiShopee,
      title: "Shopee Expert", 
      lessons: 16,
      description: "Estratégias que explodiram sua loja de vendas"
    },
    { 
      icon: SiTiktok,
      title: "TikTok Shop Master", 
      lessons: 15,
      description: "Viralize produtos e fature 6 em 7 com lives e anúncios"
    },
    { 
      icon: SiAmazon,
      title: "Amazon Advanced", 
      lessons: 20,
      description: "Domine SEO Amazon + logística FBA Brasil que escala"
    },
    { 
      icon: Megaphone,
      title: "Conteúdo & Tráfego Multicanal", 
      lessons: 22,
      description: "Ads Shopee, ML, TikTok e Amazon + orgânico que converte"
    },
    { 
      icon: Rocket, 
      title: "Escala & Automação", 
      lessons: 14,
      description: "Seu e-commerce operando 24/7 com processos automatizados e crescimento escalável"
    },
  ];

  const bonuses = [
    { 
      title: "Lista de 500+ Produtos Testados", 
      value: "R$ 997",
      description: "Produtos validados com histórico de vendas comprovado"
    },
    { 
      title: "Suporte VIP no WhatsApp", 
      value: "R$ 497",
      description: "Tire dúvidas direto com nossa equipe de especialistas"
    },
    { 
      title: "Comunidade Exclusiva", 
      value: "R$ 397",
      description: "Network com outros empreendedores de sucesso"
    },
  ];

  const testimonials = [
    {
      name: "Juliana Santos",
      result: "R$ 45.000/mês",
      image: testimonialWoman,
      text: "Em 3 meses consegui atingir R$ 45 mil de faturamento mensal. Os mentores são incríveis!"
    },
    {
      name: "Carlos Eduardo",
      result: "R$ 82.000/mês",
      image: testimonialMan,
      text: "Sai do zero e hoje faturo mais de R$ 80 mil por mês. Melhor investimento que já fiz!"
    },
    {
      name: "Amanda Costa",
      result: "R$ 28.000/mês",
      image: testimonialWoman,
      text: "Larguei meu emprego CLT e hoje tenho liberdade financeira e de tempo com o e-commerce."
    },
  ];

  const faqs = [
    {
      question: "Preciso de experiência prévia para começar?",
      answer: "Não! O curso foi desenvolvido para iniciantes. Começamos do absoluto zero e te levamos até estratégias avançadas de forma gradual e didática."
    },
    {
      question: "Quanto tempo leva para ter os primeiros resultados?",
      answer: "Com dedicação, você pode fazer suas primeiras vendas em 15-30 dias. Temos alunos que começaram a vender já na segunda semana do curso."
    },
    {
      question: "Preciso de muito dinheiro para investir em estoque?",
      answer: "Não necessariamente! Ensinamos estratégias de dropshipping e low ticket que permitem começar com investimento mínimo."
    },
    {
      question: "O curso tem garantia?",
      answer: "Sim! Você tem 7 dias de garantia incondicional. Se não gostar por qualquer motivo, devolvemos 100% do seu investimento."
    },
    {
      question: "Como funciona o acesso ao curso?",
      answer: "O acesso é vitalício! Você poderá assistir as aulas quantas vezes quiser, no seu ritmo, de qualquer dispositivo."
    },
    {
      question: "Terei suporte dos mentores?",
      answer: "Sim! Você terá acesso ao grupo VIP no WhatsApp onde nossa equipe responde dúvidas diariamente."
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      
      {/* Hero Section */}
      <section className="relative w-full h-[773px] flex items-center justify-center overflow-hidden max-w-[1920px] mx-auto" style={{backgroundImage: `url(${heroBanner})`, backgroundSize: 'cover', backgroundPosition: 'left center', backgroundRepeat: 'no-repeat'}}>

        <div className="absolute bottom-32 left-48 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-row gap-4">
              <a href="https://pay.cakto.com.br/trrf6yf">
                <Button 
                  size="md"
                  className="px-6 py-3 text-base font-semibold bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-purple-500/50 transition-all duration-300 animate-pulse-glow"
                  data-testid="button-cta-hero"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Entrar para EcomFy agora
                </Button>
              </a>
              
              <Button 
                size="md"
                variant="outline"
                className="px-6 py-3 text-base font-semibold bg-white/10 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white/20"
                data-testid="button-whatsapp-hero"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Tirar duvidas no whatsApp
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Platform Showcase */}
      <section className="py-24 bg-[#292b2f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              Aprenda a Vender nas 4 Plataformas
            </h2>
            <p className="text-xl text-gray-400">
              Domine cada marketplace com estratégias específicas e comprovadas
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {platforms.map((platform, index) => (
              <motion.div
                key={platform.name}
                variants={staggerItem}
                transition={{ delay: index * 0.1 }}
                className="h-full"
              >
                <Card 
                  className="group bg-white/5 backdrop-blur-md border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 border-t-4 border-t-transparent hover:border-t-purple-500 h-full flex flex-col"
                  data-testid={`card-platform-${platform.name.toLowerCase().replace(' ', '-')}`}
                >
                  <CardContent className="p-8 text-center flex-1 flex flex-col justify-center">
                    <div className="mb-4 flex justify-center">
                      {platform.image ? (
                        <motion.img 
                          src={platform.image}
                          alt={`Logo do ${platform.name}`}
                          className="w-16 h-16 transition-all duration-300 object-contain"
                          animate={{ filter: isScrolling ? "grayscale(0%)" : "grayscale(100%)" }}
                          whileHover={{ filter: "grayscale(0%)" }}
                          initial={{ filter: "grayscale(100%)" }}
                        />
                      ) : platform.icon ? (
                        <motion.div
                          animate={{ filter: isScrolling ? "grayscale(0%)" : "grayscale(100%)" }}
                          whileHover={{ filter: "grayscale(0%)" }}
                          initial={{ filter: "grayscale(100%)" }}
                        >
                          <platform.icon 
                            className="w-16 h-16 transition-all duration-300"
                            style={{ color: platform.color }}
                          />
                        </motion.div>
                      ) : (
                        <div 
                          className="w-16 h-16 rounded-lg flex items-center justify-center text-2xl font-bold transition-all duration-300 grayscale group-hover:grayscale-0"
                          style={{ backgroundColor: platform.color, color: "#000" }}
                        >
                          ML
                        </div>
                      )}
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-white mb-3">
                      {platform.name}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {platform.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Course Objectives */}
      <section className="py-32 bg-[#292b2f] relative overflow-visible">
        <div className="absolute -top-64 -right-32 w-[700px] h-[700px] bg-purple-500/20 rounded-full blur-3xl pointer-events-none" style={{ zIndex: 0 }} aria-hidden="true" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <motion.div {...fadeInUp}>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
                O Que Você Vai Aprender
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Transforme-se em um especialista em e-commerce com nosso método passo a passo
              </p>
              
              <div className="space-y-4">
                {objectives.map((objective, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                    data-testid={`objective-${index}`}
                  >
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-4 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold group-hover:scale-110 transition-transform">
                            {index + 1}
                          </div>
                        </div>
                        <p className="text-gray-200 text-base leading-relaxed">
                          {objective}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              {...fadeInUp}
              className="relative h-96 flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-transparent rounded-xl" aria-hidden="true" />
              <img 
                src={learningImage} 
                alt="Ilustração de aprendizado em e-commerce com crescimento e desenvolvimento profissional" 
                className="w-full h-full object-cover rounded-xl shadow-2xl border border-white/10 relative z-10"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mentors Section */}
      <section className="py-24 bg-[#292b2f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              Conheça Seus Mentores
            </h2>
            <p className="text-xl text-gray-400">
              Aprenda com quem já percorreu o caminho do sucesso
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { 
                name: "Diogo", 
                title: "Especialista em Shopee e Mercado Livre",
                experience: "4 anos",
                sales: "R$ 100k/Mês",
                image: mentorDiogo
              },
              { 
                name: "Oliveira", 
                title: "Especialista em TikTok Shop e Amazon",
                experience: "5 anos",
                sales: "R$ 600k/Mês",
                image: mentorOliveira
              },
            ].map((mentor, index) => (
              <motion.div
                key={mentor.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card 
                  className="group bg-white/5 backdrop-blur-md border-white/10 hover:scale-102 transition-all duration-300 overflow-hidden"
                  data-testid={`card-mentor-${index}`}
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <img 
                        src={mentor.image} 
                        alt={`Foto profissional do mentor ${mentor.name}, ${mentor.title}`}
                        className="w-full h-96 object-cover group-hover:brightness-110 transition-all duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-purple-900/40 to-transparent" aria-hidden="true" />
                      
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="font-heading text-3xl font-bold text-white mb-2">
                          {mentor.name}
                        </h3>
                        <p className="text-purple-300 text-lg mb-4">
                          {mentor.title}
                        </p>
                        
                        <div className="flex gap-6">
                          <div>
                            <p className="text-gray-300 text-sm">Experiência</p>
                            <p className="text-white text-xl font-bold">{mentor.experience}</p>
                          </div>
                          <div>
                            <p className="text-gray-300 text-sm">Faturamento Gerado</p>
                            <p className="text-white text-xl font-bold">{mentor.sales}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Modules */}
      <section className="py-24 bg-[#292b2f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              Módulos do Curso
            </h2>
            <p className="text-xl text-gray-400">
              Mais de 150 aulas práticas divididas em 6 módulos completos
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {modules.map((module, index) => (
              <motion.div
                key={module.title}
                variants={staggerItem}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className="group bg-white/5 backdrop-blur-md border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 h-full"
                  data-testid={`card-module-${index}`}
                >
                  <CardContent className="p-8">
                    <div className="mb-4 h-12 flex items-center">
                      {module.image ? (
                        <img 
                          src={module.image}
                          alt={`Logo do ${module.title}`}
                          className="h-16 w-auto object-contain group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : module.icon ? (
                        <module.icon className="w-12 h-12 text-primary group-hover:scale-110 transition-transform duration-300" />
                      ) : null}
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-white mb-2">
                      {module.title}
                    </h3>
                    <p className="text-purple-400 text-sm mb-3">
                      {module.lessons} aulas
                    </p>
                    <p className="text-gray-400 leading-relaxed">
                      {module.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-32 bg-[#292b2f] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl -z-10" aria-hidden="true" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            {...fadeInUp}
            className="text-center mb-20"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-white to-purple-300 bg-clip-text text-transparent mb-4">
              O Que Está Incluso
            </h2>
            <p className="text-xl text-gray-300">
              Pacote Completo Para Seu Sucesso no E-Commerce
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { 
                item: "Comunidade Ecomfy", 
                description: "Conexão com outros empreendedores",
                icon: (
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                  </svg>
                )
              },
              { 
                item: "Suporte Individual", 
                description: "Mentores disponíveis quando você precisa",
                icon: (
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12h-8v-2h8v2zm0-4h-8V8h8v2z"/>
                  </svg>
                )
              },
              { 
                item: "+ de 40 Aulas em Vídeos", 
                description: "Conteúdo completo e atualizado sempre",
                icon: (
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                )
              },
              { 
                item: "Mentoria em Grupo", 
                description: "Sessões ao vivo com os especialistas",
                icon: (
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                  </svg>
                )
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                data-testid={`included-item-${index}`}
              >
                <Card className="group relative h-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-purple-500/50 transition-all duration-300 overflow-hidden hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" aria-hidden="true" />
                  
                  <CardContent className="p-6 relative z-10 flex flex-col h-full">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                    <h3 className="font-heading text-lg font-bold text-white mb-2">
                      {feature.item}
                    </h3>
                    <p className="text-purple-200 text-sm flex-grow">
                      {feature.description}
                    </p>
                    <div className="mt-4 pt-4 border-t border-purple-400/20 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-400" />
                      <span className="text-xs text-purple-300 font-medium">Incluído</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Exclusive Bonuses */}
      <section className="py-24 bg-[#292b2f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="text-center mb-16"
          >
            <Badge className="mb-8 px-6 py-2 text-sm font-semibold bg-primary animate-pulse-glow">
              <Gift className="w-4 h-4 mr-2" />
              Bônus Exclusivos
            </Badge>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              Receba Bônus Exclusivos
            </h2>
            <p className="text-xl text-gray-400">
              Ao entrar para EcomFy hoje, você levará gratuitamente benefícios Exclusivos
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {bonuses.map((bonus, index) => (
              <motion.div
                key={bonus.title}
                variants={staggerItem}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className="group bg-white/5 backdrop-blur-md border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 h-full relative overflow-hidden"
                  data-testid={`card-bonus-${index}`}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" aria-hidden="true" />
                  
                  <CardContent className="p-8 relative z-10">
                    <Gift className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="font-heading text-2xl font-bold text-white mb-3">
                      {bonus.title}
                    </h3>
                    <p className="text-purple-400 text-xl font-bold mb-4">
                      Valor: {bonus.value}
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      {bonus.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-[#292b2f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              Resultados Reais dos Nossos Alunos
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Mais de R$ 50 milhões em faturamento gerado
            </p>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 rounded-full">
              <TrendingUp className="w-6 h-6 text-white" />
              <span className="text-white text-2xl font-bold">R$ 50M+ em Vendas</span>
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                variants={staggerItem}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className="bg-white/5 backdrop-blur-md border-white/10 hover:scale-105 transition-all duration-300 h-full"
                  data-testid={`card-testimonial-${index}`}
                >
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <img 
                        src={testimonial.image} 
                        alt={`Foto de ${testimonial.name}, aluno(a) que alcançou ${testimonial.result}`}
                        className="w-16 h-16 rounded-full object-cover border-2 border-purple-500"
                      />
                      <div>
                        <h4 className="font-bold text-white text-lg">{testimonial.name}</h4>
                        <p className="text-primary font-semibold">{testimonial.result}</p>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-300 leading-relaxed italic">
                      "{testimonial.text}"
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-[#292b2f] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-transparent to-purple-600/10" aria-hidden="true" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            {...fadeInUp}
            className="text-center mb-12"
          >
            <Badge className="mb-4 px-6 py-2 text-sm font-semibold bg-primary animate-pulse-glow">
              <Clock className="w-4 h-4 mr-2" />
              Valor atual só até 31/12
            </Badge>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              Garanta Sua Vaga Agora
            </h2>
            <p className="text-xl text-gray-400">
              Oferta especial por tempo limitado
            </p>
          </motion.div>

          <motion.div
            {...fadeInUp}
          >
            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 backdrop-blur-md border-2 border-purple-500/50 shadow-2xl shadow-purple-500/30">
              <CardContent className="p-12">
                <div className="text-center mb-8">
                  <p className="text-gray-400 text-lg mb-2">De R$ 1.997,00 por apenas</p>
                  <div className="mb-4">
                    <span className="text-gray-500 line-through text-3xl">R$ 1.997,00</span>
                  </div>
                  <div className="mb-2">
                    <span className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      R$ 397
                    </span>
                  </div>
                  <p className="text-gray-300 text-xl">
                    ou <strong className="text-white">12x de R$ 46,16</strong>
                  </p>
                </div>

                <div className="space-y-3 flex flex-col items-center">
                  <a href="https://pay.cakto.com.br/trrf6yf" className="block">
                    <Button 
                      size="lg"
                      className="font-bold bg-primary hover:bg-primary/90 shadow-2xl hover:shadow-purple-500/50 animate-pulse-glow"
                      data-testid="button-cta-pricing"
                    >
                      <Sparkles className="mr-2 h-5 w-5" />
                      Quero meu lugar na EcomFy
                    </Button>
                  </a>
                  
                  <Button 
                    size="lg"
                    variant="outline"
                    className="font-semibold bg-green-600 hover:bg-green-700 text-white border-green-600"
                    data-testid="button-whatsapp-pricing"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Falar com Especialista EcomFy
                  </Button>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-gray-400 text-sm mb-4 flex items-center justify-center gap-2">
                    <Lock className="h-4 w-4 text-white" />
                    Garantia EcomFy · 7 dias ou seu dinheiro de volta
                  </p>
                  <div className="flex justify-center items-center gap-4 text-gray-500 text-xs">
                    <span>Aceitamos:</span>
                    <span>Cartão de Crédito</span>
                    <span>•</span>
                    <span>PIX</span>
                    <span>•</span>
                    <span>Boleto</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-[#292b2f]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-xl text-gray-400">
              Tire suas dúvidas sobre o curso
            </p>
          </motion.div>

          <motion.div
            {...fadeInUp}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-6 data-[state=open]:border-purple-500/50"
                  data-testid={`faq-item-${index}`}
                >
                  <AccordionTrigger className="text-left text-white hover:text-purple-400 text-lg font-semibold py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 text-base leading-relaxed pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 bg-[#292b2f]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              Ainda Tem Dúvidas?
            </h2>
            <p className="text-xl text-gray-400">
              Entre em contato conosco e nossa equipe responderá em breve
            </p>
          </motion.div>

          <motion.div
            {...fadeInUp}
          >
            <Card className="bg-white/5 backdrop-blur-md border-white/10">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="text-white font-semibold mb-2 block">
                      Nome Completo
                    </label>
                    <Input 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Digite seu nome"
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                      data-testid="input-name"
                      required
                      disabled={contactMutation.isPending}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-white font-semibold mb-2 block">
                        E-mail
                      </label>
                      <Input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="seu@email.com"
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                        data-testid="input-email"
                        required
                        disabled={contactMutation.isPending}
                      />
                    </div>
                    
                    <div>
                      <label className="text-white font-semibold mb-2 block">
                        WhatsApp
                      </label>
                      <Input 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="(11) 99999-9999"
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                        data-testid="input-phone"
                        required
                        disabled={contactMutation.isPending}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-white font-semibold mb-2 block">
                      Mensagem
                    </label>
                    <Textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Digite sua mensagem..."
                      rows={5}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 resize-none"
                      data-testid="textarea-message"
                      required
                      disabled={contactMutation.isPending}
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90"
                    data-testid="button-submit-contact"
                    disabled={contactMutation.isPending}
                  >
                    {contactMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Mail className="mr-2 h-5 w-5" />
                        Enviar Mensagem
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <p className="text-gray-400 mb-6">
                Transformando vidas através do e-commerce. Aprenda a vender nas maiores plataformas do Brasil.
              </p>
              <div className="flex gap-4">
                <a 
                  href="#" 
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
                  data-testid="link-instagram"
                >
                  <Instagram className="w-5 h-5 text-white" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
                  data-testid="link-facebook"
                >
                  <Facebook className="w-5 h-5 text-white" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
                  data-testid="link-youtube"
                >
                  <Youtube className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Links Rápidos</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                    Sobre o Curso
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                    Depoimentos
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                    Política de Privacidade
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                    Termos de Uso
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Contato</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-400">
                  <Mail className="w-5 h-5 text-purple-400" />
                  contato@ecomfy.com.br
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <Phone className="w-5 h-5 text-purple-400" />
                  (11) 99999-9999
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <MessageCircle className="w-5 h-5 text-purple-400" />
                  WhatsApp Business
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8">
            <p className="text-center text-gray-500 text-sm">
              © 2024 EcomFy. Todos os direitos reservados.
            </p>
            <p className="text-center text-gray-600 text-xs mt-2">
              Este site não é afiliado ao Facebook, Google, Shopee, Mercado Livre, Amazon ou TikTok. 
              Após fechar a compra neste site, você será direcionado para a plataforma de membros.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
