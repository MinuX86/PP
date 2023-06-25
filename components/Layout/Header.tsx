import Link from "next/link";

const Header = (): JSX.Element => {
  return (
    <header className="flex flex-row h-[80px] w-full justify-between items-center border border-gray px-24">
      <Link href="/">
        <div className="flex flex-row justify-around gap-4">
          <div>Logo</div>
          <p>Minwoo Ra / Front end developer </p>
        </div>
      </Link>
      <div className="flex flex-row justify-around gap-6">
        <Link href="/resume">
          <p>Resume</p>
        </Link>
        <Link href="/components">
          <p>Components</p>
        </Link>
        <Link href="/projects">
          <p>Projects</p>
        </Link>
        <Link href="/contact">
          <p>Contact</p>
        </Link>
      </div>
    </header>
  );
};

export default Header;
