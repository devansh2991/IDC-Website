import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";

interface Mentor {
  id: number;
  name: string;
  role: string;
  description: string;
  image: string;
}

interface MentorOverlayProps {
  mentor: Mentor | null;
  isOpen: boolean;
  onClose: () => void;
}

const MentorOverlay = ({ mentor, isOpen, onClose }: MentorOverlayProps) => {
  if (!mentor) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="absolute inset-0 bg-background/95 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="relative z-10 w-full max-w-5xl mx-4 md:mx-8 flex flex-col md:flex-row gap-8 md:gap-16 items-center"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >

            <motion.button
              className="absolute top-0 left-0 md:-left-4 flex items-center gap-3 text-foreground/70 hover:text-foreground transition-colors group"
              onClick={onClose}
              whileHover={{ x: -5 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-body text-sm uppercase tracking-[0.15em]">Go Back</span>
            </motion.button>

            <motion.button
              className="absolute -top-16 right-0 md:hidden w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors"
              onClick={onClose}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-5 h-5" />
            </motion.button>

            <motion.div
              className="w-full md:w-1/2 aspect-[3/4] max-h-[60vh] md:max-h-[70vh] rounded-lg overflow-hidden mt-12 md:mt-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img
                src={mentor.image}
                alt={mentor.name}
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              className="w-full md:w-1/2 text-center md:text-left"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.span
                className="text-xs font-body uppercase tracking-[0.25em] text-terracotta mb-4 block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {mentor.role}
              </motion.span>
              
              <motion.h2
                className="font-display text-4xl md:text-6xl lg:text-7xl font-medium text-foreground mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {mentor.name}
              </motion.h2>
              
              <motion.p
                className="font-body text-base md:text-lg text-muted-foreground leading-relaxed max-w-md mx-auto md:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                {mentor.description}
              </motion.p>

              <motion.div
                className="mt-8 flex items-center justify-center md:justify-start gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <div className="w-12 h-px bg-terracotta/50" />
                <span className="text-xs font-body uppercase tracking-[0.2em] text-muted-foreground">
                  Mentor #{mentor.id.toString().padStart(2, '0')}
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MentorOverlay;
