import { getDictionary } from '@/lib/dictionaries';
import Playground from './Playground';

export default async function PlaygroundWrapper({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <Playground dict={dict} />;
}
