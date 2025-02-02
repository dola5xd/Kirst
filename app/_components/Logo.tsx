import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <Link href={"/"}>
      <Image
        src={"/assets/krist-logo.svg"}
        width={143}
        height={44}
        alt="krist logo"
      />
    </Link>
  );
}

export default Logo;
