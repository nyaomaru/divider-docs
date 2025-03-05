import Image from 'next/image';
import Link from 'next/link';

export function LogoLink() {
  return (
    <Link href='https://github.com/nyaomaru/divider'>
      <Image src='/logo.svg' alt='divider logo' width={32} height={32} />
    </Link>
  );
}
