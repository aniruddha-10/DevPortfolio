"use client"

import { motion } from "framer-motion"
import { techStack } from "@/lib/data"
import { SkillsRadar } from "@/components/features/skills/SkillsRadar"
import { LiveStats } from "@/components/common/LiveStats"

export function AboutSection() {
  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">{"About Me👨‍💻?\n"} </h2>
        <div className="space-y-4">
          <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
            Hi, I'm Aniruddha, a final-year Computer Science student at the University of Calgary and currently working as a Junior Product Development Intern at Modular Solutions. I have a passion for software development and enjoy exploring different aspects of the software lifecycle, from design and architecture to deployment and optimization.
          </p>
          <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
            Beyond coding, I love expressing my creativity through music and art. Whether it's playing the guitar, painting, or experimenting in the kitchen, I enjoy working with my hands and bringing ideas to life. I'm always open to new challenges and opportunities—let's connect!
          </p>
        </div>
      </div>

      {/* Live Stats */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Live Developer Stats</h3>
        <LiveStats />
      </div>

      {/* Interactive Elements Grid */}
      <div className="grid gap-8 lg:grid-cols-2">
        <SkillsRadar />
        
        {/* Tech Stack (replacing TechStackOrbit) */}
        <div className="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6 text-center">Tech Stack</h3>
          <div className="flex flex-wrap gap-3">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded border border-gray-200 dark:border-gray-700">
                  {tech}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
