import React from 'react';
import { Train, Bus, Shield, Clock, Star, ArrowRight } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const features = [
    {
      icon: <Train className="h-8 w-8" />,
      title: 'Trenes de Alta Velocidad',
      description: 'Viaja cómodamente en los trenes más modernos del país'
    },
    {
      icon: <Bus className="h-8 w-8" />,
      title: 'Autobuses Premium',
      description: 'Flota moderna con todas las comodidades para tu viaje'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Reservas Seguras',
      description: 'Protección total en tus pagos y datos personales'
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: 'Puntualidad Garantizada',
      description: 'Horarios precisos y salidas puntuales siempre'
    }
  ];

  const testimonials = [
    {
      name: 'María González',
      rating: 5,
      comment: 'Excelente servicio, muy fácil de usar y los precios son muy competitivos.'
    },
    {
      name: 'Carlos Rodríguez',
      rating: 5,
      comment: 'Reservé mi viaje en minutos. La aplicación es muy intuitiva.'
    },
    {
      name: 'Ana Martín',
      rating: 5,
      comment: 'El proceso de pago es seguro y rápido. Definitivamente lo recomiendo.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Tu Próximo Viaje
              <span className="block text-yellow-400">Comienza Aquí</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Reserva fácilmente tus pasajes de tren y autobús. 
              Miles de rutas, mejores precios, máxima comodidad.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('search')}
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <span>Buscar Viajes</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                onClick={() => onNavigate('register')}
                className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200"
              >
                Crear Cuenta
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              ¿Por qué elegir ViajeExpress?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Ofrecemos la mejor experiencia de viaje con servicios de primera calidad
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-gray-50 dark:bg-gray-700 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-200">Rutas Disponibles</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100K+</div>
              <div className="text-blue-200">Viajeros Satisfechos</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-200">Ciudades Conectadas</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-200">Atención al Cliente</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Lo que dicen nuestros viajeros
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Miles de personas confían en nosotros para sus viajes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4 italic">
                  "{testimonial.comment}"
                </p>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {testimonial.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para tu próxima aventura?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Únete a miles de viajeros que ya disfrutan de nuestros servicios
          </p>
          <button
            onClick={() => onNavigate('search')}
            className="bg-white text-green-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200 inline-flex items-center space-x-2"
          >
            <span>Comenzar Ahora</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;