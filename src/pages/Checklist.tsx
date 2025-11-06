import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertCircle, Info, Mail, ArrowRight } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { useLanguage } from '@/contexts/LanguageContext';

interface Question {
  id: number;
  question: { en: string; es: string };
  options: { en: string[]; es: string[] };
  points: number[];
}

const questions: Question[] = [
  {
    id: 1,
    question: {
      en: "How do you currently manage your business data?",
      es: "¿Cómo gestionas actualmente los datos de tu negocio?"
    },
    options: {
      en: [
        "Mostly paper-based or minimal digital records",
        "Mix of spreadsheets and some basic software",
        "Multiple software tools that don't connect",
        "Integrated business management system"
      ],
      es: [
        "Principalmente en papel o registros digitales mínimos",
        "Mezcla de hojas de cálculo y software básico",
        "Múltiples herramientas de software que no se conectan",
        "Sistema integrado de gestión empresarial"
      ]
    },
    points: [0, 1, 2, 3]
  },
  {
    id: 2,
    question: {
      en: "How quickly can you access critical business metrics (revenue, inventory, cash flow)?",
      es: "¿Qué tan rápido puedes acceder a métricas críticas del negocio (ingresos, inventario, flujo de caja)?"
    },
    options: {
      en: [
        "Takes several days or more",
        "Takes a few hours with manual work",
        "Available within an hour",
        "Real-time or instant access"
      ],
      es: [
        "Toma varios días o más",
        "Toma unas pocas horas con trabajo manual",
        "Disponible en una hora",
        "Acceso en tiempo real o instantáneo"
      ]
    },
    points: [0, 1, 2, 3]
  },
  {
    id: 3,
    question: {
      en: "How often do data entry errors cause problems in your business?",
      es: "¿Con qué frecuencia los errores de entrada de datos causan problemas en tu negocio?"
    },
    options: {
      en: [
        "Very frequently (daily/weekly)",
        "Regularly (monthly)",
        "Occasionally (quarterly)",
        "Rarely or never"
      ],
      es: [
        "Muy frecuentemente (diario/semanal)",
        "Regularmente (mensual)",
        "Ocasionalmente (trimestral)",
        "Rara vez o nunca"
      ]
    },
    points: [0, 1, 2, 3]
  },
  {
    id: 4,
    question: {
      en: "Do your systems communicate with each other automatically?",
      es: "¿Tus sistemas se comunican entre sí automáticamente?"
    },
    options: {
      en: [
        "No, everything is manual transfer",
        "Some basic connections with frequent issues",
        "Most systems connect but require monitoring",
        "Fully integrated with automatic data flow"
      ],
      es: [
        "No, todo es transferencia manual",
        "Algunas conexiones básicas con problemas frecuentes",
        "La mayoría de los sistemas se conectan pero requieren monitoreo",
        "Totalmente integrado con flujo automático de datos"
      ]
    },
    points: [0, 1, 2, 3]
  },
  {
    id: 5,
    question: {
      en: "How do you handle customer relationship management?",
      es: "¿Cómo manejas la gestión de relaciones con clientes?"
    },
    options: {
      en: [
        "Email inbox and memory",
        "Spreadsheets or basic contact list",
        "Dedicated CRM but underutilized",
        "Robust CRM fully integrated with sales process"
      ],
      es: [
        "Bandeja de entrada de correo y memoria",
        "Hojas de cálculo o lista básica de contactos",
        "CRM dedicado pero subutilizado",
        "CRM robusto totalmente integrado con proceso de ventas"
      ]
    },
    points: [0, 1, 2, 3]
  },
  {
    id: 6,
    question: {
      en: "How secure is your business data?",
      es: "¿Qué tan seguros están los datos de tu negocio?"
    },
    options: {
      en: [
        "Minimal security measures in place",
        "Basic password protection only",
        "Good security but no regular audits",
        "Comprehensive security with regular updates and audits"
      ],
      es: [
        "Medidas de seguridad mínimas implementadas",
        "Solo protección básica con contraseña",
        "Buena seguridad pero sin auditorías regulares",
        "Seguridad integral con actualizaciones y auditorías regulares"
      ]
    },
    points: [0, 1, 2, 3]
  },
  {
    id: 7,
    question: {
      en: "Can you easily forecast future business performance?",
      es: "¿Puedes pronosticar fácilmente el desempeño futuro del negocio?"
    },
    options: {
      en: [
        "No, we react to what happens",
        "Basic estimates based on past performance",
        "Some forecasting tools but not comprehensive",
        "Advanced analytics with accurate predictions"
      ],
      es: [
        "No, reaccionamos a lo que sucede",
        "Estimaciones básicas basadas en rendimiento pasado",
        "Algunas herramientas de pronóstico pero no integrales",
        "Análisis avanzado con predicciones precisas"
      ]
    },
    points: [0, 1, 2, 3]
  },
  {
    id: 8,
    question: {
      en: "How much time does your team spend on manual, repetitive tasks?",
      es: "¿Cuánto tiempo pasa tu equipo en tareas manuales y repetitivas?"
    },
    options: {
      en: [
        "More than 50% of their time",
        "30-50% of their time",
        "10-30% of their time",
        "Less than 10% - most processes are automated"
      ],
      es: [
        "Más del 50% de su tiempo",
        "30-50% de su tiempo",
        "10-30% de su tiempo",
        "Menos del 10% - la mayoría de procesos están automatizados"
      ]
    },
    points: [0, 1, 2, 3]
  },
  {
    id: 9,
    question: {
      en: "How do you back up your business data?",
      es: "¿Cómo respaldas los datos de tu negocio?"
    },
    options: {
      en: [
        "No regular backup system",
        "Manual backups done irregularly",
        "Automated backups but not tested",
        "Automated, tested, and stored in multiple locations"
      ],
      es: [
        "Sin sistema regular de respaldo",
        "Respaldos manuales hechos irregularmente",
        "Respaldos automatizados pero no probados",
        "Automatizado, probado y almacenado en múltiples ubicaciones"
      ]
    },
    points: [0, 1, 2, 3]
  },
  {
    id: 10,
    question: {
      en: "How well do your current systems support business growth?",
      es: "¿Qué tan bien tus sistemas actuales apoyan el crecimiento del negocio?"
    },
    options: {
      en: [
        "They're holding us back",
        "They work now but won't scale",
        "They can handle some growth",
        "Fully scalable and ready for expansion"
      ],
      es: [
        "Nos están frenando",
        "Funcionan ahora pero no escalarán",
        "Pueden manejar algo de crecimiento",
        "Totalmente escalables y listos para expansión"
      ]
    },
    points: [0, 1, 2, 3]
  }
];

const Checklist = () => {
  const { t, language } = useLanguage();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  useSEO({
    title: "Systems Assessment - Free Evaluation | Stratum PR",
    description: "Take our free 10-question systems assessment to discover how well your technology supports your business goals.",
    keywords: "systems assessment, technology readiness, business systems evaluation, digital readiness checklist",
    canonical: "https://www.stratumpr.com/checklist",
    ogType: "website"
  }, "checklist");

  const handleAnswer = (points: number) => {
    setAnswers({ ...answers, [currentQuestion]: points });
    // No auto-advance - user clicks "Next" button
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    return Object.values(answers).reduce((sum, val) => sum + val, 0);
  };

  const getScoreCategory = (score: number) => {
    if (score <= 10) return 'critical';
    if (score <= 18) return 'needs-improvement';
    if (score <= 24) return 'good';
    return 'excellent';
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setEmailError(null);

    try {
      const { sendChecklistResults } = await import('@/services/resend');
      
      await sendChecklistResults(email, calculateScore(), language as 'en' | 'es');
      
      setEmailSubmitted(true);
      setEmailError(null);
    } catch (error: any) {
      console.error('Error submitting email:', error);
      
      // Show helpful error message to user
      let errorMessage = language === 'es'
        ? 'No se pudo enviar el correo. Por favor, inténtalo de nuevo o contacta a soporte.'
        : 'Failed to send email. Please try again or contact support.';
      
      if (error?.message?.includes('not configured') || error?.message?.includes('RESEND_API_KEY')) {
        errorMessage = language === 'es'
          ? 'El servicio de correo no está configurado. Por favor contacta a soporte.'
          : 'Email service is not configured. Please contact support.';
      } else if (error?.message?.includes('domain') || error?.message?.includes('not verified')) {
        errorMessage = language === 'es'
          ? 'El dominio de correo no está verificado. Por favor contacta a soporte.'
          : 'Email domain not verified. Please contact support.';
      } else if (error?.message) {
        errorMessage = error.message;
      }
      
      setEmailError(errorMessage);
      setEmailSubmitted(false); // Don't mark as submitted if there's an error
    } finally {
      setSubmitting(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setEmail('');
    setEmailSubmitted(false);
  };

  const score = calculateScore();
  const scoreCategory = getScoreCategory(score);
  const progress = ((currentQuestion + (showResults ? 1 : 0)) / questions.length) * 100;

  return (
    <div className="pt-[50px]">
      {/* Hero Section */}
      <section className="relative pt-8 pb-6 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="absolute inset-0">
          <img 
            src="/img/topographic-linear-background.jpg" 
            alt="" 
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-secondary/40"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-telegraf font-bold text-2xl md:text-3xl text-white drop-shadow-lg mb-3">
            {language === 'en' ? 'Systems Assessment' : 'Evaluación de Sistemas'}
          </h1>
          <p className="font-telegraf text-base md:text-lg text-white/90 drop-shadow-md leading-relaxed max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Take our free 10-question assessment to discover how well your technology supports your business goals.'
              : 'Realiza nuestra evaluación gratuita de 10 preguntas para descubrir qué tan bien tu tecnología apoya tus objetivos empresariales.'}
          </p>
        </div>
      </section>

      {/* Quiz Section */}
      <section className="py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {!showResults ? (
            <Card className="shadow-xl">
              <CardContent className="p-4 sm:p-6">
                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between mb-1.5">
                    <span className="font-telegraf text-xs sm:text-sm text-gray-600">
                      {language === 'en' ? 'Question' : 'Pregunta'} {currentQuestion + 1} / {questions.length}
                    </span>
                    <span className="font-telegraf text-xs sm:text-sm text-gray-600">
                      {Math.round(progress)}%
                    </span>
                  </div>
                  <Progress value={progress} className="h-1.5" />
                </div>

                {/* Single Question Display */}
                <div className="mb-4">
                  <h2 className="font-telegraf font-bold text-lg sm:text-xl text-primary mb-4">
                    {questions[currentQuestion].question[language]}
                  </h2>

                  <RadioGroup 
                    value={answers[currentQuestion]?.toString() || ''}
                    onValueChange={(value) => {
                      handleAnswer(parseInt(value));
                      // Auto-advance to next question after short delay
                      setTimeout(() => {
                        if (currentQuestion < questions.length - 1) {
                          setCurrentQuestion(currentQuestion + 1);
                        } else {
                          setShowResults(true);
                        }
                      }, 300);
                    }}
                  >
                    {questions[currentQuestion].options[language].map((option, index) => (
                      <div key={index} className="flex items-center space-x-3 mb-2 p-3 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-all cursor-pointer">
                        <RadioGroupItem value={questions[currentQuestion].points[index].toString()} id={`q${currentQuestion}-${index}`} />
                        <Label 
                          htmlFor={`q${currentQuestion}-${index}`}
                          className="font-telegraf text-sm text-gray-700 cursor-pointer flex-1"
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                    className="font-telegraf"
                  >
                    ← {language === 'en' ? 'Previous' : 'Anterior'}
                  </Button>
                  <Button
                    onClick={() => {
                      if (answers[currentQuestion] !== undefined && currentQuestion < questions.length - 1) {
                        setCurrentQuestion(currentQuestion + 1);
                      } else if (answers[currentQuestion] !== undefined && currentQuestion === questions.length - 1) {
                        setShowResults(true);
                      }
                    }}
                    disabled={answers[currentQuestion] === undefined}
                    className="font-telegraf bg-primary hover:bg-primary-800 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    {language === 'en' ? 'Next' : 'Siguiente'} →
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
              {/* Results Card */}
              <Card className="shadow-2xl">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h2 className="font-telegraf font-bold text-3xl text-primary mb-4">
                      {language === 'en' ? 'Your Systems Assessment Score' : 'Tu Puntuación de Evaluación de Sistemas'}
                    </h2>
                    <div className="inline-block">
                      <div className="text-6xl font-bold text-primary mb-2">{score}/30</div>
                      <Progress value={(score / 30) * 100} className="h-3 w-64" />
                    </div>
                  </div>

                  {/* Score Interpretation */}
                  <div className={`p-6 rounded-lg mb-6 ${
                    scoreCategory === 'critical' ? 'bg-red-50 border border-red-200' :
                    scoreCategory === 'needs-improvement' ? 'bg-yellow-50 border border-yellow-200' :
                    scoreCategory === 'good' ? 'bg-blue-50 border border-blue-200' :
                    'bg-green-50 border border-green-200'
                  }`}>
                    <div className="flex items-start gap-3">
                      {scoreCategory === 'critical' && <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />}
                      {scoreCategory === 'needs-improvement' && <Info className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />}
                      {scoreCategory === 'good' && <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />}
                      {scoreCategory === 'excellent' && <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />}
                      
                      <div>
                        <h3 className="font-telegraf font-bold text-xl mb-2">
                          {scoreCategory === 'critical' && (language === 'en' ? 'Critical: Immediate Action Needed' : 'Crítico: Acción Inmediata Necesaria')}
                          {scoreCategory === 'needs-improvement' && (language === 'en' ? 'Needs Improvement: Time to Modernize' : 'Necesita Mejoras: Tiempo de Modernizar')}
                          {scoreCategory === 'good' && (language === 'en' ? 'Good: On the Right Track' : 'Bueno: En el Camino Correcto')}
                          {scoreCategory === 'excellent' && (language === 'en' ? 'Excellent: Well-Positioned for Growth' : 'Excelente: Bien Posicionado para Crecimiento')}
                        </h3>
                        <p className="font-telegraf text-gray-700">
                          {scoreCategory === 'critical' && (language === 'en' 
                            ? 'Your current IT setup is significantly limiting your business potential. Without immediate improvements, you risk falling behind competitors, data loss, and operational inefficiencies. We recommend a comprehensive IT assessment and modernization plan.'
                            : 'Tu configuración TI actual está limitando significativamente el potencial de tu negocio. Sin mejoras inmediatas, corres el riesgo de quedarte atrás de competidores, pérdida de datos e ineficiencias operacionales. Recomendamos una evaluación TI integral y plan de modernización.'
                          )}
                          {scoreCategory === 'needs-improvement' && (language === 'en'
                            ? 'You have some technology in place, but there are significant gaps that could be costing you time, money, and opportunities. With targeted improvements, you could significantly boost efficiency and enable growth. Priority areas likely include system integration, automation, and data management.'
                            : 'Tienes algo de tecnología implementada, pero hay brechas significativas que podrían estar costándote tiempo, dinero y oportunidades. Con mejoras dirigidas, podrías aumentar significativamente la eficiencia y habilitar el crecimiento. Las áreas prioritarias probablemente incluyen integración de sistemas, automatización y gestión de datos.'
                          )}
                          {scoreCategory === 'good' && (language === 'en'
                            ? 'Your IT infrastructure is solid and supporting your business well. There are still opportunities for optimization and automation that could free up your team and improve decision-making. Focus on fine-tuning existing systems and adding strategic capabilities like advanced analytics or AI automation.'
                            : 'Tu infraestructura TI es sólida y está apoyando bien tu negocio. Todavía hay oportunidades de optimización y automatización que podrían liberar a tu equipo y mejorar la toma de decisiones. Enfócate en ajustar los sistemas existentes y agregar capacidades estratégicas como análisis avanzado o automatización IA.'
                          )}
                          {scoreCategory === 'excellent' && (language === 'en'
                            ? 'Outstanding! Your IT systems are a competitive advantage. You have modern, integrated systems that support data-driven decision-making and growth. Continue to stay ahead by exploring emerging technologies like AI and advanced analytics, and ensure your systems scale smoothly as you grow.'
                            : '¡Sobresaliente! Tus sistemas TI son una ventaja competitiva. Tienes sistemas modernos e integrados que apoyan la toma de decisiones basada en datos y el crecimiento. Continúa manteniéndote adelante explorando tecnologías emergentes como IA y análisis avanzado, y asegura que tus sistemas escalen sin problemas mientras creces.'
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Email Form */}
                  {!emailSubmitted ? (
                    <div className="bg-primary/5 p-6 rounded-lg">
                      <div className="flex items-center gap-3 mb-4">
                        <Mail className="h-5 w-5 text-primary" />
                        <h3 className="font-telegraf font-bold text-lg text-primary">
                          {language === 'en' ? 'Get Your Detailed Results' : 'Obtén Tus Resultados Detallados'}
                        </h3>
                      </div>
                      <p className="font-telegraf text-gray-600 mb-4">
                        {language === 'en'
                          ? 'Enter your email to receive a personalized report with specific recommendations for your business, plus access to our resource library.'
                          : 'Ingresa tu correo electrónico para recibir un informe personalizado con recomendaciones específicas para tu negocio, más acceso a nuestra biblioteca de recursos.'}
                      </p>
                      <form onSubmit={handleEmailSubmit} className="flex flex-col gap-3">
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Input
                            type="email"
                            placeholder={language === 'en' ? 'Enter your email' : 'Ingresa tu correo electrónico'}
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              setEmailError(null); // Clear error when user types
                            }}
                            required
                            disabled={submitting}
                            className={`flex-1 font-telegraf ${emailError ? 'border-red-500' : ''}`}
                          />
                          <Button 
                            type="submit" 
                            disabled={submitting}
                            className="bg-primary hover:bg-primary-800 text-white font-telegraf font-semibold px-6"
                          >
                            {submitting 
                              ? (language === 'en' ? 'Sending...' : 'Enviando...') 
                              : (language === 'en' ? 'Get Results' : 'Obtener Resultados')}
                          </Button>
                        </div>
                        {emailError && (
                          <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
                            <p className="font-telegraf text-sm text-red-700">{emailError}</p>
                            <p className="font-telegraf text-xs text-red-600 mt-1">
                              {language === 'en' 
                                ? 'Please check your email address and try again, or contact support if the problem persists.'
                                : 'Por favor verifica tu dirección de correo e intenta de nuevo, o contacta a soporte si el problema persiste.'}
                            </p>
                          </div>
                        )}
                      </form>
                    </div>
                  ) : (
                    <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <h3 className="font-telegraf font-bold text-lg text-green-800">
                          {language === 'en' ? 'Check Your Email!' : '¡Revisa Tu Correo!'}
                        </h3>
                      </div>
                      <p className="font-telegraf text-green-700">
                        {language === 'en'
                          ? 'We\'ve sent your detailed results and personalized recommendations to your inbox. Be sure to check your spam folder if you don\'t see it within a few minutes.'
                          : 'Hemos enviado tus resultados detallados y recomendaciones personalizadas a tu bandeja de entrada. Asegúrate de revisar tu carpeta de spam si no lo ves en unos minutos.'}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <Button
                      onClick={resetQuiz}
                      variant="outline"
                      className="flex-1 font-telegraf"
                    >
                      {language === 'en' ? 'Retake Assessment' : 'Volver a Realizar'}
                    </Button>
                    <Button
                      asChild
                      className="flex-1 bg-primary hover:bg-primary-800 text-white font-telegraf font-semibold"
                    >
                      <a href="https://calendly.com/jrodriguez4917/30min" target="_blank" rel="noopener noreferrer">
                        {language === 'en' ? 'Schedule Free Consultation' : 'Agendar Consulta Gratuita'}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Next Steps */}
              <Card>
                <CardContent className="p-8">
                  <h3 className="font-telegraf font-bold text-2xl text-primary mb-6">
                    {language === 'en' ? 'Recommended Next Steps' : 'Próximos Pasos Recomendados'}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <p className="font-telegraf text-gray-700">
                        {language === 'en' ? (
                          <>
                            Review our blog post on{' '}
                            <a href="/blog/understanding-your-organizations-it-needs" className="text-primary hover:underline font-semibold">
                              "Understanding Your Organization's IT Needs"
                            </a>{' '}
                            for a deeper dive into assessment frameworks
                          </>
                        ) : (
                          <>
                            Revisa nuestra publicación de blog sobre{' '}
                            <a href="/blog/understanding-your-organizations-it-needs" className="text-primary hover:underline font-semibold">
                              "Entendiendo las Necesidades TI de tu Organización"
                            </a>{' '}
                            para una inmersión más profunda en marcos de evaluación
                          </>
                        )}
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <p className="font-telegraf text-gray-700">
                        {language === 'en' ? (
                          <>
                            Explore our{' '}
                            <a href="/services" className="text-primary hover:underline font-semibold">
                              Services
                            </a>{' '}
                            to see how we can help optimize your systems
                          </>
                        ) : (
                          <>
                            Explora nuestros{' '}
                            <a href="/services" className="text-primary hover:underline font-semibold">
                              Servicios
                            </a>{' '}
                            para ver cómo podemos ayudar a optimizar tus sistemas
                          </>
                        )}
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <p className="font-telegraf text-gray-700">
                        {language === 'en' ? (
                          <>
                            Check out our{' '}
                            <a href="/projects" className="text-primary hover:underline font-semibold">
                              Case Studies
                            </a>{' '}
                            to see real-world examples of successful transformations
                          </>
                        ) : (
                          <>
                            Revisa nuestros{' '}
                            <a href="/projects" className="text-primary hover:underline font-semibold">
                              Casos de Estudio
                            </a>{' '}
                            para ver ejemplos del mundo real de transformaciones exitosas
                          </>
                        )}
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <p className="font-telegraf text-gray-700">
                        {language === 'en' ? (
                          <>
                            <a href="https://calendly.com/jrodriguez4917/30min" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">
                              Schedule a free 30-minute consultation
                            </a>{' '}
                            to discuss your specific needs and get personalized recommendations
                          </>
                        ) : (
                          <>
                            <a href="https://calendly.com/jrodriguez4917/30min" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">
                              Agenda una consulta gratuita de 30 minutos
                            </a>{' '}
                            para discutir tus necesidades específicas y obtener recomendaciones personalizadas
                          </>
                        )}
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <p className="font-telegraf text-gray-700">
                        {language === 'en'
                          ? 'Download our free IT Planning Template to start mapping your technology roadmap'
                          : 'Descarga nuestra plantilla gratuita de Planificación TI para comenzar a mapear tu hoja de ruta tecnológica'}
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <p className="font-telegraf text-gray-700">
                        {language === 'en'
                          ? 'Schedule a free 30-minute consultation with our team to discuss your specific situation and opportunities'
                          : 'Agenda una consulta gratuita de 30 minutos con nuestro equipo para discutir tu situación específica y oportunidades'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

    </div>
  );
};

export default Checklist;

