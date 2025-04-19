import { Card } from '@/ui/components/card';
import type { FeatureCardProps } from '@/types/ui/components/feature-card';

export function FeatureCard({ title, description, id }: FeatureCardProps) {
  return (
    <Card id={id}>
      <h3 className='text-lg font-medium mb-2'>{title}</h3>
      <p className='text-sm text-zinc-400'>{description}</p>
    </Card>
  );
}
