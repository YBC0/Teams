import React from 'react';
import { motion } from 'framer-motion';
import { AccessibleButton } from '@/components/ui/accessible-button';

interface ImpactStory {
  id: string;
  title: string;
  location: string;
  description: string;
  imageUrl: string;
  metrics: {
    wellsBuilt: number;
    peopleServed: number;
    waterProvided: string;
  };
}

const IMPACT_STORIES: ImpactStory[] = [
  {
    id: '1',
    title: 'Clean Water for Kibera',
    location: 'Nairobi, Kenya',
    description: 'Through the generosity of our donors, we built 5 new wells in Kibera, providing clean water to over 2,500 residents who previously had to walk miles for water.',
    imageUrl: '/images/impact/kibera-well.jpg',
    metrics: {
      wellsBuilt: 5,
      peopleServed: 2500,
      waterProvided: '50,000 liters daily',
    },
  },
  {
    id: '2',
    title: 'Hope in Rural Uganda',
    location: 'Northern Uganda',
    description: 'Our team worked with local communities to construct 3 wells, bringing sustainable water solutions to villages that had been struggling with water scarcity for generations.',
    imageUrl: '/images/impact/uganda-well.jpg',
    metrics: {
      wellsBuilt: 3,
      peopleServed: 1500,
      waterProvided: '30,000 liters daily',
    },
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export const ImpactSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your Impact in Action
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Every donation helps us build more wells and transform more lives. Here are some of the communities we've helped together.
            </p>
          </motion.div>

          {/* Impact Stories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {IMPACT_STORIES.map((story) => (
              <motion.article
                key={story.id}
                variants={itemVariants}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="relative h-64">
                  <img
                    src={story.imageUrl}
                    alt={story.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{story.title}</h3>
                    <p className="text-sm opacity-90">{story.location}</p>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 mb-6">{story.description}</p>

                  {/* Impact Metrics */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {story.metrics.wellsBuilt}
                      </div>
                      <div className="text-sm text-gray-600">Wells Built</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {story.metrics.peopleServed.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">People Served</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {story.metrics.waterProvided}
                      </div>
                      <div className="text-sm text-gray-600">Water Provided</div>
                    </div>
                  </div>

                  <AccessibleButton
                    href={`/impact/${story.id}`}
                    variant="outline"
                    fullWidth
                  >
                    Read Full Story
                  </AccessibleButton>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-12"
          >
            <AccessibleButton
              href="/impact"
              size="lg"
              className="bg-primary text-white hover:bg-primary/90"
            >
              See More Impact Stories
            </AccessibleButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}; 