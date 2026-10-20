type FeatureCardProps = {
  icon: string;
  title: string;
  text: string;
};

export default function FeatureCard({ icon, title, text }: FeatureCardProps) {
  return (
    <div className="feature-card">
      <span className="feature-icon">{icon}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}
