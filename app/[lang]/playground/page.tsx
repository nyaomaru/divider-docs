import { getDictionary, type Locale } from '@/lib/dictionaries';
import Playground from './Playground';

export default async function PlaygroundWrapper({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang ?? 'en');

  return <Playground dict={dict} />;
}
