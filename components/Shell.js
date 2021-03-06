import Bio from "components/Bio";
export default function Shell({ children, className = "max-w-3xl mx-auto" }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className={className}>
        {children}
        <Bio />
      </div>
    </div>
  );
}
