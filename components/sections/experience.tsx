"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import useCurSection from "@/hooks/use-cur-section";

import { Calendar, Building2, ExternalLink } from "lucide-react";
import experience from "@/data/experience";
import { Badge } from "../ui/badge";

export default function ExperienceSection() {
  const ref = useRef(null);
  useCurSection(ref, 0.2);

  return (
    <div
      ref={ref}
      id="experience"
      className="w-full container text-sm md:text-base"
    >
      <h1 className="text-center text-3xl md:text-5xl mb-12">
        <span className="text-gradient-primary">{"[ "}</span>
        Experience
        <span className="text-gradient-primary">{" ]"}</span>
      </h1>

      <div className="relative mx-auto max-w-4xl">
        {/* Vertical timeline line */}
        <div className="absolute left-0 md:left-1/2 top-0 h-full w-px bg-gradient-to-b from-primary/80 via-secondary/50 to-transparent transform md:-translate-x-1/2" />

        {experience.jobs.map((job, index) => (
          <motion.div
            key={`${job.company}-${job.role}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`relative mb-16 md:mb-24 ${
              index % 2 === 0
                ? "md:pr-12 md:ml-auto md:mr-[50%]"
                : "md:pl-12 md:mr-auto md:ml-[50%]"
            } md:w-[50%] px-6 py-3 rounded-lg border bg-muted/30 backdrop-blur-sm`}
          >
            {/* Timeline dot */}
            <div className="absolute top-6 left-0 md:left-auto md:top-6 size-4 rounded-full bg-gradient-primary transform -translate-x-1/2 md:-translate-x-1/2" />

            {/* Content */}
            <div className="pl-5 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="text-xl md:text-2xl font-bold text-gradient-secondary">
                  {job.role}
                </h3>
                {job.link && (
                  <a
                    href={job.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary flex items-center gap-1 text-sm"
                  >
                    <ExternalLink size={14} />
                    Visit
                  </a>
                )}
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <Building2 size={16} />
                <span className="font-medium">{job.company}</span>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar size={16} />
                <span>{job.period}</span>
              </div>

              <p className="text-muted-foreground">{job.description}</p>

              <div className="flex flex-wrap gap-2 pt-2">
                {job.technologies.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="bg-background/80"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
