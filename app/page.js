import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="hero min-h-screen bg-base-200 text-black">
      <div className="hero-content text-center">
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold">GOOGLE SOLUTIONS CHALLENGE</h1>
          <h2 className="text-3xl font-bold">Pharma-Verify</h2>
          <p className="py-6 text-justify">
          Transforming global healthcare: Our groundbreaking initiative leverages blockchain to impeccably verify drug integrity, pioneering a new era of safety and trust.<br/>
          Pharma-Verify provides a portal for manufacturers to get their drugs verified by a Central Authority. And a platform for the Central Authority to view the submitted drugs and approve them.<br />
          <span className="underline italic">Addtionally, </span>one can see individual medicines details and approval status without having to login.
          </p>
          <Link href="/welcome">
            <button className="btn btn-primary">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
