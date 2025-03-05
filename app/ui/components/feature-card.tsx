import { Card } from '@/ui/components/card';

interface FeatureCardProps {
  id?: string;
  title: string;
  description: string;
}

export function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <Card>
      <h3 className='text-lg font-medium mb-2'>{title}</h3>
      <p className='text-sm text-zinc-400'>{description}</p>
    </Card>
  );
}
