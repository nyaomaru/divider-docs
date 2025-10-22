import Image from 'next/image';
import Link from 'next/link';

export function LogoLink() {
  return (
    <Link href='https://github.com/nyaomaru/divider'>
      <Image
        src='/divider_logo2.svg'
        alt='divider logo'
        width={128}
        height={32}
      />
    </Link>
  );
}
