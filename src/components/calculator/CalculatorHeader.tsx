interface CalculatorHeaderProps {
  title: string;
  subtitle: string;
}

export const CalculatorHeader = ({ title, subtitle }: CalculatorHeaderProps) => {
  return (
    <div className="text-center mb-6 sm:mb-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{title}</h1>
      <p className="text-sm sm:text-base text-gray-600">{subtitle}</p>
    </div>
  );
};