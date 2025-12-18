interface Mentor {
  id: number;
  name: string;
  role: string;
  description: string;
  image: string;
}

interface MentorCardProps {
  mentor: Mentor;
  index: number;
  onClick: () => void;
}

const MentorCard = ({ mentor, index, onClick }: MentorCardProps) => {
  // Create staggered vertical offset like the reference
  const yOffsets = [0, 40, 80, 20, 60, 100, 30, 70, 10];
  const yOffset = yOffsets[index % yOffsets.length];

  return (
    <div
      className="mentor-card relative flex-shrink-0 w-[140px] md:w-[160px] h-[220px] md:h-[300px] cursor-pointer group overflow-hidden rounded-2xl transition-transform duration-300 hover:scale-105"
      onClick={onClick}
      style={{
        transform: `translateY(${yOffset}px)`,
      }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 bg-card rounded-2xl overflow-hidden">
        <img
          src={mentor.image}
          alt={mentor.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Subtle color tint overlay on some cards */}
        {index % 3 === 1 && (
          <div className="absolute inset-0 bg-purple-500/10 mix-blend-multiply" />
        )}
        {index % 3 === 2 && (
          <div className="absolute inset-0 bg-blue-500/10 mix-blend-multiply" />
        )}
      </div>

      {/* Border */}
      <div className="absolute inset-0 rounded-2xl border border-foreground/5 group-hover:border-foreground/20 transition-colors duration-300" />
    </div>
  );
};

export default MentorCard;
